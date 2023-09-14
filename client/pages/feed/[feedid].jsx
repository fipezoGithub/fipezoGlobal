import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import ReactPlayer from "react-player";
import { RWebShare } from "react-web-share";

export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/feed/${ctx.query.feedid}`
  );
  const data = await response.json();
  return { props: { data } };
};
const Feedid = (props) => {
  const [isImage, setIsImage] = useState(false);
  const [url, setUrl] = useState("");
  const [love, setLove] = useState(false);
  const router = useRouter();
  const profession = props.data.freelancer.profession
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const date = props.data.date.slice(0, 10).split("-").reverse().join("/");
  useEffect(() => {
    if (props.data.postData.includes("postData-")) {
      setIsImage(true);
    }
    setUrl(window.location.origin + "/feed/" + props.data._id);
    if (props.data.love.includes(props.user._id)) {
      setLove(true);
    }
  }, []);
  const followFeed = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/love/${props.data._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const love = await res.json();
      setLove(true);
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowFeed = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/unlove/${props.data._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const love = await res.json();
      setLove(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>
          {props.data.freelancer.firstname +
            " " +
            props.data.freelancer.lastname +
            "on Fipezo Feed"}
        </title>
        <meta name="description" content={props.data.bio}></meta>
        <meta
          property="og:title"
          content={
            "Fipezo || " +
            props.data.freelancer.firstname +
            " " +
            props.data.freelancer.lastname +
            " Feed"
          }
        />

        <meta property="og:description" content={props.data.description} />

        <meta
          property="og:image"
          content={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.data.postData}`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg" />

        <meta property="og:url" content="http://fipezo.com/" />
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="flex flex-col gap-4 px-8 pt-16 shadow rounded-md">
        <div className="flex items-center gap-4">
          <div>
            <Image
              src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.data.freelancer.profilePicture}`}
              width={600}
              height={600}
              className="h-12 w-12 rounded-full object-fill"
            />
          </div>
          <div>
            <Link
              className="capitalize"
              href={`/profile/${props.data.freelancer.uid}`}
            >
              {props.data.freelancer.firstname.toLowerCase()}{" "}
              {props.data.freelancer.lastname.toLowerCase()}
            </Link>
            <p className="capitalize">{profession}</p>
          </div>
        </div>
        <div>
          <p className="text-lg">{props.data.description}</p>
        </div>
        <div className="border border-neutral-500 p-2">
          {isImage === true ? (
            <Image
              src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.data.postData}`}
              width={500}
              height={500}
              blurDataURL="/loadImg.gif"
              placeholder="blur"
              alt="feed_img"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="">
              <ReactPlayer
                controls={true}
                width={`100%`}
                height={window.innerWidth < 640 ? `350px` : `650px`}
                url={props.data.postData}
              />
            </div>
          )}
        </div>
        <p className="text-neutral-600">{date}</p>
        <div>
          <div className="text-[2rem] flex items-center gap-4">
            {love === false ? (
              <button type="button" onClick={followFeed}>
                <AiOutlineHeart />
              </button>
            ) : (
              <button type="button" onClick={unfollowFeed}>
                <AiFillHeart color="#ff3040" />
              </button>
            )}
            <RWebShare
              data={{
                text:
                  "Share the feed of " +
                  props.data.freelancer.firstname +
                  " " +
                  props.data.freelancer.lastname +
                  " on your social media!",
                url: url,
                title: "Fipezo",
              }}
            >
              <button className="text-[2rem] flex items-center gap-4">
                <FaRegShareSquare />
              </button>
            </RWebShare>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedid;
