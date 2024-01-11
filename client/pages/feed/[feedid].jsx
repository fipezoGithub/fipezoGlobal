import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegShareSquare } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
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
  const [description, setDescription] = useState("");
  const [commentDate, setCommentDate] = useState(new Date().toJSON());
  const [comments, setComments] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const profession = props.data.freelancer.profession
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const date = props.data.date.slice(0, 10).split("-").reverse().join("/");
  useEffect(() => {
    async function getComments() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/feed/comment/list/${router.query.feedid}`
        );
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
    if (props.data.postData.includes("postData-")) {
      setIsImage(true);
    }
    setUrl(window.location.origin + "/feed/" + props.data._id);
    if (props.data.love.includes(props.user?._id)) {
      setLove(true);
    }
    if (window.innerWidth < 640) {
      setIsMobile(true);
    }
  }, [comments]);

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
  const addComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(`${process.env.SERVER_URL}/feed/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: description,
          feedId: router.query.feedid,
          date: commentDate,
        }),
      });
      const newComment = await res.json();
      setComments((prevData) => [...prevData, newComment]);
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = async (e, id) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/feed/comment/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([]);
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
            " on Fipezo Feed"}
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
      <div className="flex flex-col gap-4 px-4 md:px-8 pt-16 shadow rounded-md">
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
        <p className="text-lg">{props.data.description}</p>
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
                height={isMobile === true ? `350px` : `650px`}
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
                <p className="text-sm text-neutral-500">
                  {props.data.love.length}
                </p>
              </button>
            ) : (
              <button type="button" onClick={unfollowFeed}>
                <AiFillHeart color="#ff3040" />
                <p className="text-sm text-neutral-500">
                  {props.data.love.length}
                </p>
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
              <button className="text-[2rem]">
                <FaRegShareSquare />
                <p className="text-sm text-neutral-500">
                  {props.data.share.length}
                </p>
              </button>
            </RWebShare>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold capitalize self-start">comments</h1>
          <form className="flex items-center gap-2 mb-8" onSubmit={addComment}>
            <div>
              <Image
                src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.profilePicture}`}
                alt="profile picture"
                width={600}
                height={600}
                className="h-8 md:h-12 w-8 md:w-12 rounded-full object-fill"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="write comment"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-2 py-1 placeholder:capitalize focus:outline-none border-b border-neutral-600"
              />
            </div>
            <div>
              <button
                type="submit"
                className="text-lg bg-blue-600 px-4 py-2 rounded-lg text-white"
              >
                <IoSend />
              </button>
            </div>
          </form>
          {comments.length !== 0 ? (
            comments.map((comment, index) => (
              <div
                className="flex relative items-center border-b py-4 w-full md:w-[65%] md:px-4 border-neutral-500 self-center gap-2 md:gap-12 group"
                key={index}
              >
                <div className="absolute top-0 right-0">
                  <button className="" type="button">
                    <BsThreeDotsVertical size={"1.5em"} />
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 capitalize hidden group-hover:block absolute top-0 right-0 bg-white border"
                    onClick={(e) => handelDelete(e, comment._id)}
                  >
                    delete
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${comment.freelancer.profilePicture}`}
                    width={600}
                    height={600}
                    className="h-8 md:h-12 w-8 md:w-12 rounded-full object-fill"
                  />{" "}
                  <Link
                    href={`/profile/${comment.freelancer.uid}`}
                    className="capitalize font-medium text-xs md:text-base"
                  >
                    {comment.freelancer.firstname.toLowerCase() +
                      " " +
                      comment.freelancer.lastname.toLowerCase()}
                  </Link>
                </div>
                <div>
                  <p className="text-base md:text-xl">{comment.description}</p>
                  <p className="text-neutral-500 text-xs md:text-sm">
                    {comment.date.slice(0, 10).split("-").reverse().join("/")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <Image src="/no-comment.jpg" width={500} height={500} />
              <p className="capitalize font-bold text-lg">no comments found</p>
            </div>
          )}
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Feedid;
