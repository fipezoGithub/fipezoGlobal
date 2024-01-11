import AddFeed from "@/components/AddFeed";
import Feedcard from "@/components/Feedcard";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import RandomFeeds from "@/components/RandomFeeds";
import RandomPeople from "@/components/RandomPeople";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Feed = (props) => {
  const [feed, setfeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddFeed, setShowAddFeed] = useState(false);
  const [loginType, setLoginType] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getAllFeed = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.SERVER_URL}/feeds`);
        const feeds = await res.json();
        setfeed(feeds);
        setFetchData(false);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFeed();
    setLoginType(JSON.parse(localStorage.getItem("type")));
  }, [fetchData === true]);
  return loading === true ? (
    <Loading message={"While Loading your feeds"} />
  ) : (
    <>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="flex items-center justify-center pt-14 lg:pt-10 mr-0 lg:mr-20">
        {loginType === "freelancer" ? (
          <div className="flex items-center gap-4 w-[21rem] lg:w-[30rem]">
            <div>
              <Image
                src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.profilePicture}`}
                width={600}
                height={600}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div
              className="bg-[#f0f2f5] w-full py-4 rounded-3xl cursor-pointer"
              onClick={() => {
                if (!props.user) {
                  router.push("/register/freelancer");
                }
                setShowAddFeed(true);
              }}
            >
              <p className="capitalize text-[#85868a] px-4">create post</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            {/* <p className="pt-4 text-center">
              You have to logged in as "Freelancer" in order to create a feed{" "}
              <Link href="/register/freelancer" className="font-bold text-cyan-500">Register now!</Link>
            </p> */}
          </div>
        )}
      </div>
      {showAddFeed === true && (
        <AddFeed
          user={props.user}
          setShowAddFeed={setShowAddFeed}
          setfeed={setfeed}
        />
      )}
      <div className="flex justify-center lg:justify-between mt-8">
        <div className="flex-col items-center hidden lg:flex">
          <h2 className="text-xl font-bold capitalize">
            {loginType === "freelancer"
              ? "freelancers you may follow"
              : "freelancers"}
          </h2>
          <RandomPeople user={props.user} />
        </div>
        <div className="flex flex-col items-center gap-8">
          {feed.length > 0 &&
            feed
              .slice(0)
              .reverse()
              .map((post, index) => (
                <Feedcard
                  feed={post}
                  key={index}
                  user={props.user}
                  setFetchData={setFetchData}
                />
              ))}
        </div>
        <div className="flex-col items-center hidden lg:flex">
          <h2 className="text-xl font-bold capitalize">top feeds</h2>
          {feed.length > 0 &&
            feed
              .slice(0, 2)
              .map((post, index) => (
                <RandomFeeds feed={post} key={index} user={props.user} setFetchData={setFetchData} />
              ))}
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Feed;
