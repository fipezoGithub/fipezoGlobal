import Image from "next/image";
import styles from "../styles/ProfileBioCard.module.css";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaShareSquare, FaStar } from "react-icons/fa";
import FreelancerEditBox from "@/components/FreelancerEditBox";
import { AiOutlineThunderbolt, AiFillEdit } from "react-icons/ai";
import FollowerFollowingModal from "./FollowerFollowingModal";

function ProfileBioCard(props) {
  const links = JSON.parse(props.freelancer.links);
  const [display, setDisplay] = useState("none");
  const [showEditBox, setShowEditBox] = useState(false);
  const [showModalAs, setShowModalAs] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [url, setUrl] = useState("");
  const [showFollowingFollowerBox, setShowFollowingFollowerBox] =
    useState(false);
  const router = useRouter();
  useEffect(() => {
    if (props.user?.following?.includes(props.freelancer._id)) {
      setIsFollowed(true);
    }
    setUrl(window.location.origin + "/profile/" + props.freelancer.uid);
  }, [props.user]);

  const handelFollow = async () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (!props.user || !props.user?.uid) {
      router.push("/register/freelancer");
    } else {
      try {
        if (token) {
          if (isFollowed === false) {
            const res = await fetch(
              `${process.env.SERVER_URL}/follow/freelancer`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userid: props.freelancer._id }),
              }
            );
            const data = await res.json();
            setIsFollowed(true);
            props.freelancer.followers.length =
              props.freelancer.followers.length + 1;
          } else {
            if (isFollowed === true) {
              const res = await fetch(
                `${process.env.SERVER_URL}/unfollow/freelancer`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ userid: props.freelancer._id }),
                }
              );
              const data = await res.json();
              setIsFollowed(false);
              props.freelancer.followers.length =
                props.freelancer.followers.length - 1;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={styles.profile_bio_card}>
      <div className={styles.profile_pic + " overflow-hidden cursor-pointer"}>
        <Image
          src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.freelancer.profilePicture}`}
          width={900}
          height={900}
          alt="profile picture"
          blurDataURL="/loadImg.gif"
          placeholder="blur"
          className="h-full w-full object-cover"
        />
      </div>
      <h1 className={styles.name}>
        <span
          className="whitespace-nowrap capitalize"
          style={{ maxWidth: "12.5rem", fontSize: "1.15rem" }}
        >
          {props.freelancer.firstname.toLowerCase()}{" "}
          {props.freelancer.lastname.toLowerCase()}
        </span>{" "}
        <span className={styles.con}>
          <Image
            className={styles.blueTick}
            onMouseOver={() => setDisplay("flex")}
            onMouseOut={() => setDisplay("none")}
            src={props.freelancer.verified ? "/tick.png" : "/tickG.png"}
            height="40"
            width="40"
            alt="verified-tick"
          />{" "}
          {props.freelancer.verified && (
            <div className={styles.overTick} style={{ display: display }}>
              <span>Verified</span>
              <div className={styles.rectangle}></div>
            </div>
          )}
        </span>
        <span className={styles.location + " mr-2"}>
          <IoLocationSharp style={{ fontSize: 12, color: "red" }} />
          &nbsp;
          {props.freelancer.location}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-sm bg-[#25be25] px-3 py-1 rounded-lg text-white">
            <p className="text-[0.9rem]">
              {props.freelancer.rating.toFixed(1)}
            </p>
            <FaStar className={styles.star} />
          </div>
          <div className={styles.noOfReviews}>
            <p className="text-sm text-neutral-500">
              ({props.freelancer.reviewCount})
            </p>
          </div>
        </div>
      </h1>
      <div className="flex w-full justify-start pl-6 gap-4">
        <p className="bg-red-500 p-2 text-sm text-white rounded-3xl px-3 mb-8 whitespace-nowrap">
          {props.freelancer.profession
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </p>
        {props.freelancer.featured && (
          <p className="bg-violet-500 text-sm p-2 mb-8 text-white rounded-3xl px-3 flex items-center whitespace-nowrap">
            <AiOutlineThunderbolt
              style={{ color: "yellow" }}
              className="mr-2"
            />
            Featured Freelancer
          </p>
        )}
      </div>
      {props.copied && (
        <div className={styles.copy}>URL copied to clipboard!</div>
      )}
      {props.user?._id !== props.freelancer._id && (
        <div className="w-full flex items-center justify-center">
          <button
            type="button"
            className="p-2 text-sm rounded-xl w-[80%] capitalize bg-[#0095f6] text-white"
            onClick={handelFollow}
          >
            {isFollowed === false ? "follow" : "unfollow"}
          </button>
        </div>
      )}
      <div className="flex gap-4 my-4">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            setShowFollowingFollowerBox(true);
            setShowModalAs("followers");
          }}
        >
          <p className="font-bold">{props.freelancer?.followers?.length}</p>
          <p className="capitalize text-sm tracking-wide font-semibold">
            followers
          </p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            setShowFollowingFollowerBox(true);
            setShowModalAs("following");
          }}
        >
          <p className="font-bold">{props.freelancer?.following?.length}</p>
          <p className="capitalize text-sm tracking-wide font-semibold">
            following
          </p>
        </div>
      </div>
      <div className="flex w-full px-4 flex-wrap">
        <p className="bg-white p-2 text-sm w-full text-black border-2 flex justify-center mb-8 rounded-3xl font-bold">
          Rs. {props.freelancer.rate} / Day
        </p>
      </div>
      <div className={styles.equipment_available}>
        <h1
          className={styles.title}
          style={{ textAlign: "left", width: "100%" }}
        >
          About Me
        </h1>
        <p
          className={`w-full ${styles.bio} relative break-words border-2 rounded-lg`}
        >
          {props.freelancer.bio}
        </p>
      </div>
      <div className={styles.equipment_available}>
        {(props.freelancer.profession === "photographer" ||
          props.freelancer.profession === "cinematographer" ||
          props.freelancer.profession === "drone_operator" ||
          props.freelancer.profession === "cinematographer") && (
          <h1 className={styles.title + " text-left"}>Equipments Available</h1>
        )}
        {(props.freelancer.profession === "model" ||
          props.freelancer.profession === "anchor" ||
          props.freelancer.profession === "dj" ||
          props.freelancer.profession === "dancer" ||
          props.freelancer.profession === "influencer") && (
          <h1 className={styles.title + " text-left"}>Experience</h1>
        )}
        {props.freelancer.profession === "makeup_artist" && (
          <h1 className={styles.title + " text-left"}>Product Details</h1>
        )}
        {(props.freelancer.profession === "photo_editor" ||
          props.freelancer.profession === "video_editor" ||
          props.freelancer.profession === "album_designer" ||
          props.freelancer.profession === "video_editor") && (
          <h1 className={styles.title + " text-left"}>Software Knowledge</h1>
        )}
        {props.freelancer.profession === "web_developer" && (
          <h1 className={styles.title + " text-left"}>Fimiliar Language</h1>
        )}
        <p
          className={`w-full break-words relative border-2 p-4 rounded-lg`}
        >
          {props.freelancer.equipments}
        </p>
      </div>
      <RWebShare
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
          <FaShareSquare style={{ color: "white" }} /> Share Profile
        </button>
      </RWebShare>
      {showEditBox && (
        <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-80 md:top-1/3 md:left-0 md:translate-x-0 md:translate-y-0 md:w-auto z-10 mr-2">
          <FreelancerEditBox
            id={props.freelancer._id}
            bio={props.freelancer.bio}
            equipments={props.freelancer.equipments}
            profession={props.freelancer.profession}
            setShowEditBox={setShowEditBox}
          />
        </div>
      )}
      {showFollowingFollowerBox === true && (
        <FollowerFollowingModal
          setShowFollowingFollowerBox={setShowFollowingFollowerBox}
          user={props.user}
          freelancer={props.freelancer}
          userId={props.freelancer._id}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
          showModalAs={showModalAs}
          handelFollow={handelFollow}
        />
      )}
    </div>
  );
}

export default ProfileBioCard;
