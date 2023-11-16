import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ReactPlayer from "react-player";
import { FaRegShareSquare, FaShareSquare } from "react-icons/fa";
import { RWebShare } from "react-web-share";
import Link from "next/link";
import { BiCommentDetail } from "react-icons/bi";

const Feedcard = (props) => {
  const [isImage, setIsImage] = useState(false);
  const [url, setUrl] = useState("");
  const [love, setLove] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const descRef = useRef();
  const profession = props.feed.freelancer.profession
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
  const countShare = async (e) => {
    // e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/share/count/${props.feed._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const love = await res.json();
      setShareCount(props.feed.share.length + 1);
      props.setFetchData(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-[21rem] lg:w-[30rem] border m-4 px-2 py-4 shadow rounded-md">
      <div className="flex items-center gap-4">
        <div>
          <Image
            src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.feed.freelancer.profilePicture}`}
            width={600}
            height={600}
            alt="freelancer profile picture"
            className="h-12 w-12 rounded-full object-fill"
          />
        </div>
        <div>
          <Link
            className="capitalize"
            href={`/profile/${props.feed.freelancer.uid}`}
          >
            {props.feed.freelancer.firstname.toLowerCase()}{" "}
            {props.feed.freelancer.lastname.toLowerCase()}
          </Link>
          <p className="capitalize">{profession}</p>
        </div>
      </div>
      <div>
        <p className="text-lg truncate" ref={descRef}>
          {props.feed.description}{" "}
        </p>
        <button
          type="button"
          className="text-cyan-600 font-medium capitalize"
          onClick={(e) => {
            descRef.current.classList.remove("truncate");
            e.target.classList.add("hidden");
          }}
        >
          see more
        </button>
      </div>
      <Link
        className="self-center border border-neutral-500 p-2 w-full"
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
          <div className="w-full">
            <ReactPlayer
              controls={true}
              width={`100%`}
              height={window.innerWidth < 640 ? `350px` : `450px`}
              url={props.feed.postData}
            />
          </div>
        )}
      </Link>
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
            onClick={countShare}
          >
            <button className="text-[2rem]">
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
    </div>
  );
};

export default Feedcard;
