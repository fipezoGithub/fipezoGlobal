import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
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
  const bodyRef = useRef();

  useEffect(() => {
    setUrl(window.location.origin + "/resources/details/" + props.data.uid);
    const parser = new DOMParser();
    const html = parser.parseFromString(props.data.content, "text/html");
    if (bodyRef.current.childNodes.length === 0) {
      bodyRef.current.appendChild(html.body);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Fipezo | {props.data.title}</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 mx-8 flex flex-col gap-6">
        <div>
          <Image
            src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.data.cover}`}
            width={1080}
            height={720}
            alt="resources-cover"
          />
        </div>
        <h1 className="text-4xl font-medium">{props.data.title}</h1>
        <p className="">
          Fipezo Team |{" "}
          {new Date(props.data.createdAt).toLocaleString("en-IN", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <div ref={bodyRef} className="text-lg"></div>
        <div className="flex items-center gap-4">
          <span className="text-neutral-500">{props.data.view}</span>
          <button
            type="button"
            className="capitalize text-xl flex items-center gap-1"
          >
            <AiOutlineLike /> like
          </button>

          <RWebShare
            data={{
              text:
                "Share The Blog " + props.data.title + " on your social media!",
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
      <Footer />
    </>
  );
}
