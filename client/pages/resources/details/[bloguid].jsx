import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RelatedBlogs from "@/components/RelatedBlogs";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiShareAlt } from "react-icons/bi";
import { RWebShare } from "react-web-share";

export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/blog/${ctx.query.bloguid}`
  );
  const data = await response.json();
  return { props: { data } };
};

export default function Bloguid(props) {
  const [url, setUrl] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const bodyRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setUrl(window.location.origin + "/resources/details/" + props.data.uid);
    const parser = new DOMParser();
    const html = parser.parseFromString(props.data.content, "text/html");
    if (bodyRef.current.childNodes.length === 0) {
      bodyRef.current.appendChild(html.body);
    }
    const type = JSON.parse(localStorage.getItem("type"));
    if (type !== "company") {
      if (
        props.data.likeuser?.includes(props.user?._id) ||
        props.data.likefreelancer?.includes(props.user?._id)
      ) {
        setIsLiked(true);
      }
    } else {
      if (props.data.likecompany?.includes(props.company?._id)) {
        setIsLiked(true);
      }
    }
    const viewCount = async (id) => {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/blog/viewcount`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });
        const view = await res.json();
      } catch (error) {
        console.log(error);
      }
    };
    viewCount(props.data._id);
  }, []);

  const likePost = async (id) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    const type = JSON.parse(localStorage.getItem("type"));
    if (type === null) {
      router.push("/login");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/blog/${id}?type=${type}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const like = await res.json();
      if (like) {
        setIsLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Fipezo | {props.data.title}</title>
        <meta name="description" content={props.data.bio}></meta>
        <meta property="og:title" content={"Fipezo || " + props.data.title} />

        <meta property="og:description" content={props.data.metaDescriptions} />

        <meta
          property="og:image"
          content={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.data.cover}`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/*" />

        <meta property="og:url" content="http://fipezo.com/" />
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 mx-8 flex flex-col lg:flex-row lg:items-start gap-8">
        <div className="mx-16 hidden lg:block"></div>
        <div className="flex flex-col lg:gap-6 gap-3">
          <div className="">
            <Image
              src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.data.cover}`}
              width={1200}
              height={720}
              className="object-cover shadow-inner hover:shadow-xl hover:scale-95 duration-300"
              alt="resources-cover"
            />
          </div>
          <h1 className="text-2xl lg:text-4xl font-bold">
            {props.data.title}
          </h1>
          <p className="">
            <span className="font-bold text-lg">Fipezo Team</span> |{" "}
            <span>
              {new Date(props.data.createdAt).toLocaleString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </p>
          <div ref={bodyRef} className="text-lg"></div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-500">{props.data.view} views</span>
            <button
              type="button"
              className="capitalize text-xl flex items-center gap-1"
              onClick={() => likePost(props.data._id)}
              disabled={isLiked === true ? true : false}
            >
              {isLiked === true ? (
                <>
                  <AiFillLike /> liked
                </>
              ) : (
                <>
                  <AiOutlineLike /> like
                </>
              )}
            </button>

            <RWebShare
              data={{
                text:
                  "Share The Blog " +
                  props.data.title +
                  " on your social media!",
                url: url,
                title: "Fipezo",
              }}
            >
              <button
                type="button"
                className="capitalize text-xl flex items-center gap-1"
              >
                <BiShareAlt /> share
              </button>
            </RWebShare>
          </div>
        </div>
        <hr className="w-full h-px lg:hidden" />
        <div className="w-full">
          <RelatedBlogs />
        </div>
      </div>
      <div className="flex items-center justify-center w-full my-4">
        <Image
          src="/blog-page-banner.png"
          width={1080}
          height={760}
          alt="fipezo banner"
          className="w-full"
        />
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
}
