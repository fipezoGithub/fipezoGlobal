import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import ReactPlayer from "react-player";
import { FaShareSquare } from "react-icons/fa";
import { RWebShare } from "react-web-share";
import Link from "next/link";

const RandomFeeds = (props) => {
  const [isImage, setIsImage] = useState(false);
  useEffect(() => {
    if (props.feed.postData.includes("postData-")) {
      setIsImage(true);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 w-80 border m-4 px-2 py-4 shadow-md rounded-lg">
      <div className="self-center border border-neutral-500 p-2">
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
      </div>
      <div>
        <p className="text-lg">{props.feed.description}</p>
      </div>
      <p className="text-neutral-600">{props.feed?.date?.slice(0, 10)}</p>
      <div>
        <div className="text-[2rem] flex items-center gap-4">
          <button type="button">
            <AiOutlineHeart />
          </button>
          {/* <RWebShare
            data={{
              text:
                "Share the profile of " +
                props.freelancer.firstname +
                " " +
                props.freelancer.lastname +
                " on your social media!",
              url: url,
              title: "Fipezo",
            }}
          >
            <button className={styles.share}>
              <FaShareSquare style={{ color: "white" }} />
            </button>
          </RWebShare> */}
        </div>
      </div>
      <p></p>
    </div>
  );
};

export default RandomFeeds;
