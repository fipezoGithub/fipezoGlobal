import Image from "next/image";
import styles from "../styles/CompanyBioCard.module.css";
import { RWebShare } from "react-web-share";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaShareSquare } from "react-icons/fa";

function CompanyBioCard(props) {
  const links = JSON.parse(props.company.links);
  const [display, setDisplay] = useState("none");
  const [city, setCity] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    const address = JSON.parse(props.company.companyaddress);
    setCity(address.city);
  }, []);
  useEffect(() => {
    if (props.user?.following?.includes(props.company._id)) {
      setIsFollowed(true);
    }
    setUrl(window.location.origin + "/company/" + props.company.uid);
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
              `${process.env.SERVER_URL}/follow/company`,
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
            props.company.followers.length = props.company.followers.length + 1;
          } else {
            if (isFollowed === true) {
              const res = await fetch(
                `${process.env.SERVER_URL}/unfollow/company`,
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
              props.company.followers.length =
                props.company.followers.length - 1;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={styles.company_bio_card}>
      <div className={styles.profile_pic + " overflow-hidden cursor-pointer"}>
        <Image
          src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.company.profilePicture}`}
          width={500}
          height={500}
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
          {props.company.companyname.toLowerCase()}
        </span>{" "}
        <span className={styles.con}>
          <Image
            className={styles.blueTick}
            onMouseOver={() => setDisplay("flex")}
            onMouseOut={() => setDisplay("none")}
            src={props.company.verified ? "/tick.png" : "/tickG.png"}
            height="40"
            width="40"
            alt="verified-tick"
          />{" "}
          {props.company.verified && (
            <div className={styles.overTick} style={{ display: display }}>
              <span>Verified</span>
              <div className={styles.rectangle}></div>
            </div>
          )}
        </span>
        <IoLocationSharp style={{ fontSize: 12, color: "red" }} />
        &nbsp;
        <span className={styles.location + " mr-2"}>{city}</span>
      </h1>
      <div className="flex w-full justify-start pl-6 gap-4">
        <p className="bg-red-500 p-2 text-sm text-white rounded-3xl px-3 mb-8 whitespace-nowrap">
          {props.company.companytype
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </p>
      </div>
      {props.copied && (
        <div className={styles.copy}>URL copied to clipboard!</div>
      )}
      <div className="w-full flex items-center justify-center">
        <button
          type="button"
          className="p-2 text-sm rounded-xl w-[80%] capitalize bg-[#0095f6] text-white"
          onClick={handelFollow}
        >
          {isFollowed === false ? "follow" : "unfollow"}
        </button>
      </div>
      <div className="flex flex-col items-center my-4">
        <p className="font-bold">{props.company?.followers?.length}</p>
        <p className="capitalize text-sm tracking-wide font-semibold">
          followers
        </p>
      </div>
      <div className={styles.equipment_available}>
        <h1
          className={styles.title}
          style={{ textAlign: "left", width: "100%" }}
        >
          About Us
        </h1>
        <p
          className={`w-full ${styles.bio} relative break-words border-2 rounded-lg`}
        >
          {props.company.bio}
        </p>
      </div>
      <RWebShare
        data={{
          text:
            "Share the profile of " +
            props.company.companyname +
            " on your social media!",
          url: url,
          title: "Fipezo",
        }}
      >
        <button className={styles.share}>
          <FaShareSquare style={{ color: "white" }} /> Share Profile
        </button>
      </RWebShare>
    </div>
  );
}
export default CompanyBioCard;
