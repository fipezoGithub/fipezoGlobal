import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import ReactPlayer from "react-player";
import { FaShareSquare } from "react-icons/fa";
import { RWebShare } from "react-web-share";
import Link from "next/link";

const Feedcard = (props) => {
  const [isImage, setIsImage] = useState(false);
  const profession = props.feed.freelancer.profession
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  useEffect(() => {
    if (props.feed.postData.includes("postData-")) {
      setIsImage(true);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 w-96 lg:w-[30rem] border border-neutral-500 m-4 px-2 py-4 shadow rounded-md">
      <div className="flex items-center gap-4">
        <div>
          <Image
            src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.feed.freelancer.profilePicture}`}
            width={600}
            height={600}
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
        <p className="text-lg">{props.feed.description}</p>
      </div>
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
              width={window.innerWidth < 640 ? `350px` : `450px`}
              height={window.innerWidth < 640 ? `350px` : `450px`}
              url={props.feed.postData}
            />
          </div>
        )}
      </div>
      <p className="text-neutral-600">{props.feed.date.slice(0, 10)}</p>
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
    </div>
  );
};

export default Feedcard;
