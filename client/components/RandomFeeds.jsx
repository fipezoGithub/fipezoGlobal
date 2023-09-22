import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactPlayer from "react-player";
import { FaRegShareSquare, FaShareSquare } from "react-icons/fa";
import { RWebShare } from "react-web-share";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";

const RandomFeeds = (props) => {
  const [isImage, setIsImage] = useState(false);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const [love, setLove] = useState(false);
  const date = props.feed.date.slice(0, 10).split("-").reverse().join("/");
  console.log(props);
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
      props.setFetchData(true);
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
      props.setFetchData(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/delete/feed/${props.feed._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const del = await res.json();
      props.setFetchData(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col relative gap-4 w-80 border m-4 px-2 py-4 shadow-md rounded-lg">
      {props.feed.freelancer._id === props.user._id && (
        <div className="absolute top-0 right-0 pl-2 py-1 group">
          <div className="hidden group-hover:flex flex-col items-center bg-white absolute right-0">
            <button
              type="button"
              className="px-4 py-2 capitalize"
              onClick={handelDelete}
            >
              delete
            </button>
          </div>

          <button className="" type="button">
            <BsThreeDotsVertical size={"1.5em"} />
          </button>
        </div>
      )}
      <Link
        className="self-center border border-neutral-500 p-2 mr-4"
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
            className={`w-full object-cover ${
              props.height ? "h-[12.5rem]" : "h-[12.5rem]"
            }`}
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
        <p className="text-lg truncate">{props.feed.description}</p>
      </div>
      <p className="text-neutral-600">{date}</p>
      <div>
        <div className="text-[2rem] flex items-center gap-4">
          {love === false ? (
            <button type="button" onClick={followFeed}>
              <AiOutlineHeart />
              <p className="text-sm text-neutral-500">
                {props.feed.love.length}
              </p>
            </button>
          ) : (
            <button type="button" onClick={unfollowFeed}>
              <AiFillHeart color="#ff3040" />
              <p className="text-sm text-neutral-500">
                {props.feed.love.length}
              </p>
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
            <button className="text-[2rem] items-center gap-4">
              <FaRegShareSquare />
              <p className="text-sm text-neutral-500">
                {props.feed.share.length}
              </p>
            </button>
          </RWebShare>
          <Link href={`/feed/${props.feed._id}`} className="text-[2rem]">
            <BiCommentDetail />
            <p className="text-sm text-neutral-500 text-center">
              {props.feed.comment.length}
            </p>
          </Link>
        </div>
      </div>
      <p></p>
    </div>
  );
};

export default RandomFeeds;
