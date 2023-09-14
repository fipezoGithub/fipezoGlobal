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

const feed = (props) => {
  const [feed, setfeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddFeed, setShowAddFeed] = useState(false);
  const router = useRouter();
  console.log(props);
  useEffect(() => {
    const getAllFeed = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.SERVER_URL}/feeds`);
        const feeds = await res.json();
        setfeed(feeds);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFeed();
  }, []);
  return loading === true ? (
    <Loading message={"While Loading your feeds"} />
  ) : (
    <>
      <Navbar
        // color="white"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="flex items-center justify-center pt-10 mr-0 lg:mr-20">
        <div className="flex items-center gap-4 w-[30rem]">
          <div>
            <Image
              src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.profilePicture}`}
              width={600}
              height={600}
              className="h-12 w-12 rounded-full object-fill"
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
            <p className="capitalize text-[#85868a] px-4">create feed</p>
          </div>
        </div>
      </div>
      {showAddFeed === true && (
        <AddFeed user={props.user} setShowAddFeed={setShowAddFeed} />
      )}
      <div className="flex justify-between">
        <div className="flex-col items-center hidden lg:flex">
          <h2 className="text-xl font-bold capitalize">
            freelancers you may follow
          </h2>
          <RandomPeople user={props.user} />
        </div>
        <div className="flex flex-col items-center gap-8 overflow-hidden overflow-y-scroll h-screen no-scrollbar">
          {feed.length > 0 &&
            feed
              .slice(0)
              .reverse()
              .map((post, index) => <Feedcard feed={post} key={index} />)}
        </div>
        <div className="flex-col items-center hidden lg:flex">
          <h2 className="text-xl font-bold capitalize">top feeds</h2>
          {feed.length > 0 &&
            feed
              .slice(0, 2)
              .map((post, index) => <RandomFeeds feed={post} key={index} />)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default feed;
