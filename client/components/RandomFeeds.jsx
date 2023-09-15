import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactPlayer from "react-player";
import { FaRegShareSquare, FaShareSquare } from "react-icons/fa";
import { RWebShare } from "react-web-share";
import Link from "next/link";
import { useRouter } from "next/router";

const RandomFeeds = (props) => {
  const [isImage, setIsImage] = useState(false);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const [love, setLove] = useState(false);
  const date = props.feed.date.slice(0, 10).split("-").reverse().join("/");
  useEffect(() => {
    if (props.feed.postData.includes("postData-")) {
      setIsImage(true);
    }
    setUrl(window.location.origin + "/feed/" + props.feed._id);
    if (props.feed.love.includes(props.user?._id || props.company?._id)) {
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
        `${process.env.SERVER_URL}/love/${props.feed._id}`,
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
        `${process.env.SERVER_URL}/unlove/${props.feed._id}`,
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
    <div className="flex flex-col gap-4 w-80 border m-4 px-2 py-4 shadow-md rounded-lg">
      <Link
        className="self-center border border-neutral-500 p-2"
        href={`/feed/${props.feed._id}`}
      >
        {isImage === true ? (
          <Image
            src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.feed.postData}`}
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
              width="275px"
              height="200px"
              className=""
              url={props.feed.postData}
            />
          </div>
        )}
      </Link>
      <div>
        <p className="text-lg">{props.feed.description}</p>
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
                props.feed.freelancer.firstname +
                " " +
                props.feed.freelancer.lastname +
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
      <p></p>
    </div>
  );
};

export default RandomFeeds;
