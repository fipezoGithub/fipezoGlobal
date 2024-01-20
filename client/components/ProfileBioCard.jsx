import Image from "next/image";
import styles from "../styles/ProfileBioCard.module.css";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaFontAwesomeFlag, FaShareSquare, FaStar } from "react-icons/fa";
import FreelancerEditBox from "@/components/FreelancerEditBox";
import { AiOutlineThunderbolt, AiFillHeart } from "react-icons/ai";
import FollowerFollowingModal from "./FollowerFollowingModal";
import ReportModal from "./ReportModal";
import Link from "next/link";
import { RiVipCrownFill } from "react-icons/ri";

function ProfileBioCard(props) {
  // const links = JSON.parse(props.freelancer.links);
  const [display, setDisplay] = useState("none");
  const [display1, setDisplay1] = useState("none");
  const [showEditBox, setShowEditBox] = useState(false);
  const [showModalAs, setShowModalAs] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [url, setUrl] = useState("");
  const [loveCount, setLoveCount] = useState(0);
  const [showFollowingFollowerBox, setShowFollowingFollowerBox] =
    useState(false);
  const [loveError, setLoveError] = useState(false);
  const [showReportBox, setShowReportBox] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (props.user?.following?.includes(props.freelancer._id)) {
      setIsFollowed(true);
    }
    setLoveCount(props.freelancer.loveCount);
    setUrl(window.location.origin + "/profile/" + props.freelancer.uid);
  }, [props.user, props.freelancer]);

  function createParticle(x, y) {
    // Create a custom particle element
    const particle = document.createElement("particle");
    // Append the element into the body
    document.body.appendChild(particle);
    const size = Math.floor(Math.random() * 20 + 5);
    // Apply the size on each particle
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = "50%";
    particle.style.position = "fixed";
    particle.style.top = "0";
    particle.style.left = "0";
    particle.style.pointerEvents = "none";
    particle.style.opacity = "0";
    // Generate a random color in a blue/purple palette
    // particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
    particle.style.background = `rgb(249, 6, 47)`;

    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;

    // Store the animation in a variable because we will need it later
    const animation = particle.animate(
      [
        {
          // Set the origin position of the particle
          // We offset the particle with half its size to center it around the mouse
          transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
          opacity: 1,
        },
        {
          // We define the final coordinates as the second keyframe
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 0,
        },
      ],
      {
        // Set a random duration from 500 to 1500ms
        duration: 500 + Math.random() * 1000,
        easing: "cubic-bezier(0, .9, .57, 1)",
        // Delay every particle with a random value from 0ms to 200ms
        delay: Math.random() * 200,
      }
    );

    animation.onfinish = () => {
      particle.remove();
    };
  }

  function pop(e) {
    // Loop to generate 30 particles at once
    for (let i = 0; i < 30; i++) {
      // We pass the mouse coordinates to the createParticle() function
      createParticle(e.clientX, e.clientY);
    }
  }

  const handelFollow = async (e) => {
    e.target.disabled = true;
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

  const handelLove = async (e) => {
    e.target.disabled = true;
    if (props.user?._id === props.freelancer._id) {
      setLoveError(true);
      setTimeout(() => {
        setLoveError(false);
      }, 1500);
      return;
    }
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/profile/love/${props.freelancer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const status = await res.json();
      if (res.ok) {
        setLoveCount(loveCount + 1);
        pop(e);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.profile_bio_card}>
      <div className='relative flex flex-col items-center'>
        <div
          className={styles.profile_pic + " overflow-hidden"}
          style={
            props.freelancer.premium
              ? { border: "4px solid #FF9800" }
              : { border: "1px solid #ffffff" }
          }
        >
          <Image
            src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.freelancer.profilePicture}`}
            width={900}
            height={900}
            alt='profile picture'
            blurDataURL='/loadImg.gif'
            placeholder='blur'
            className='h-full w-full object-cover'
          />
        </div>
        {props.freelancer.premium && (
          <Link
            href='/freelancer-premium-plans'
            className='relative bottom-[15px] md:bottom-[20px]'
            onMouseOver={() => setDisplay1("flex")}
            onMouseOut={() => setDisplay1("none")}
          >
            <RiVipCrownFill
              className='w-6 h-6 md:w-10 md:h-10'
              color='#FF9800'
            />
            <div className={styles.overTick} style={{ display: display1 }}>
              <span>Premium</span>
              <div className={styles.rectangle}></div>
            </div>
          </Link>
        )}
      </div>
      <h1 className={styles.name}>
        <p className='flex items-center'>
          <span
            className='capitalize whitespace-nowrap'
            style={{ fontSize: "1.15rem" }}
          >
            {props.freelancer.firstname?.toLowerCase()}{" "}
            {props.freelancer.lastname?.toLowerCase()}
          </span>{" "}
          <span className={styles.con}>
            <Image
              className={styles.blueTick}
              onMouseOver={() => setDisplay("flex")}
              onMouseOut={() => setDisplay("none")}
              src={props.freelancer.verified ? "/tick.png" : "/tickG.png"}
              height='40'
              width='40'
              alt='verified-tick'
            />{" "}
            {props.freelancer.verified && (
              <div className={styles.overTick} style={{ display: display }}>
                <span>Verified</span>
                <div className={styles.rectangle}></div>
              </div>
            )}
          </span>
        </p>
        <span className={styles.location + " mr-2"}>
          <IoLocationSharp style={{ fontSize: 12, color: "red" }} />
          &nbsp;
          {props.freelancer.location
            ?.split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
        <div className='flex items-center gap-2'>
          <div className='flex items-center text-sm bg-[#25be25] px-3 py-1 rounded-lg text-white'>
            <p className='text-[0.9rem]'>
              {props.freelancer.rating?.toFixed(1)}
            </p>
            <FaStar className={styles.star} />
          </div>
          <div className={styles.noOfReviews}>
            <p className='text-sm text-neutral-500'>
              ({props.freelancer.reviewCount})
            </p>
          </div>
        </div>
      </h1>
      <div className='flex w-full justify-start pl-6 gap-4'>
        <p className='bg-red-500 p-2 text-sm text-white rounded-3xl px-3 mb-8 whitespace-nowrap'>
          {props.freelancer.profession
            ?.split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </p>
        {props.freelancer.featured && (
          <p className='bg-violet-500 text-sm p-2 mb-8 text-white rounded-3xl px-3 flex items-center whitespace-nowrap'>
            <AiOutlineThunderbolt
              style={{ color: "yellow" }}
              className='mr-2'
            />
            Featured Freelancer
          </p>
        )}
      </div>
      {props.copied && (
        <div className={styles.copy}>URL copied to clipboard!</div>
      )}
      {props.user?._id !== props.freelancer._id && (
        <div className='w-full flex items-center justify-center'>
          <button
            type='button'
            className='p-2 text-sm rounded-xl w-[80%] capitalize bg-[#0095f6] text-white'
            onClick={handelFollow}
          >
            {isFollowed === false ? "follow" : "unfollow"}
          </button>
        </div>
      )}
      <div className='flex gap-4 my-4'>
        <div
          className='flex flex-col items-center cursor-pointer'
          onClick={() => {
            setShowFollowingFollowerBox(true);
            setShowModalAs("followers");
          }}
        >
          <p className='font-bold'>{props.freelancer?.followers?.length}</p>
          <p className='capitalize text-sm tracking-wide font-semibold'>
            followers
          </p>
        </div>
        <div
          className='flex flex-col items-center cursor-pointer'
          onClick={() => {
            setShowFollowingFollowerBox(true);
            setShowModalAs("following");
          }}
        >
          <p className='font-bold'>{props.freelancer?.following?.length}</p>
          <p className='capitalize text-sm tracking-wide font-semibold'>
            following
          </p>
        </div>
      </div>
      {loveError === true && (
        <div className='mb-4'>
          <h3 className='text-red-500 font-semibold'>
            Sorry! you can not give love to your own profile
          </h3>
        </div>
      )}
      <div className='flex items-center justify-center gap-2 w-full mb-4'>
        <button
          type='button'
          className='text-3xl text-red-600'
          title='Like'
          onClick={handelLove}
        >
          <AiFillHeart className='hover:scale-125' />
        </button>
        <p>{loveCount} Loves</p>
      </div>
      <div className='flex w-full px-4 flex-wrap'>
        <p className='bg-white p-2 text-sm w-full text-black border-2 flex justify-center mb-8 rounded-3xl font-bold'>
          Rs. {props.freelancer.rate} /{" "}
          {(props.freelancer.profession === "actor" ||
            props.freelancer.profession === "actress" ||
            props.freelancer.profession === "model") &&
            "Shoot"}
          {props.freelancer.profession === "influencer" && "Post"}
          {props.freelancer.profession === "fashion_designer" && "Dress"}
          {(props.freelancer.profession === "babysitter" ||
            props.freelancer.profession === "maid" ||
            props.freelancer.profession === "dance_teacher" ||
            props.freelancer.profession === "drawing_teacher" ||
            props.freelancer.profession === "music_teacher" ||
            props.freelancer.profession == "private_tutor") &&
            "Month"}
          {(props.freelancer.profession === "dj" ||
            props.freelancer.profession == "musician" ||
            props.freelancer.profession === "drone_operator") &&
            "Hour"}
          {(props.freelancer.profession === "album_designer" ||
            props.freelancer.profession === "dancer" ||
            props.freelancer.profession === "graphics_designer" ||
            props.freelancer.profession === "interior_designer" ||
            props.freelancer.profession === "mehendi_artist" ||
            props.freelancer.profession === "painter" ||
            props.freelancer.profession === "photo_editor" ||
            props.freelancer.profession === "video_editor" ||
            props.freelancer.profession === "voice_over_artist" ||
            props.freelancer.profession === "anchor" ||
            props.freelancer.profession === "lyricist" ||
            props.freelancer.profession === "makeup_artist" ||
            props.freelancer.profession === "vocalist" ||
            props.freelancer.profession === "web_developer") &&
            "Project"}
          {(props.freelancer.profession === "cinematographer" ||
            props.freelancer.profession === "photographer") &&
            "Day"}
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
          props.freelancer.profession === "cinematographer" ||
          props.freelancer.profession === "musician") && (
          <h1 className={styles.title + " text-left"}>Equipments Available</h1>
        )}
        {(props.freelancer.profession === "model" ||
          props.freelancer.profession === "anchor" ||
          props.freelancer.profession === "dj" ||
          props.freelancer.profession === "dancer" ||
          props.freelancer.profession === "influencer" ||
          props.freelancer.profession === "private_tutor" ||
          props.freelancer.profession === "dance_teacher" ||
          props.freelancer.profession === "music_teacher" ||
          props.freelancer.profession === "drawing_teacher" ||
          props.freelancer.profession === "painter" ||
          props.freelancer.profession === "lyricist" ||
          props.freelancer.profession === "fashion_designer" ||
          props.freelancer.profession === "voice_over_artist" ||
          props.freelancer.profession === "vocalist" ||
          props.freelancer.profession === "actor" ||
          props.freelancer.profession === "actress" ||
          props.freelancer.profession === "babysitter" ||
          props.freelancer.profession === "maid" ||
          props.freelancer.profession === "interior_designer") && (
          <h1 className={styles.title + " text-left"}>Experience</h1>
        )}
        {(props.freelancer.profession === "makeup_artist" ||
          props.freelancer.profession === "mehendi_artist") && (
          <h1 className={styles.title + " text-left"}>Product Details</h1>
        )}
        {(props.freelancer.profession === "photo_editor" ||
          props.freelancer.profession === "video_editor" ||
          props.freelancer.profession === "album_designer" ||
          props.freelancer.profession === "video_editor" ||
          props.freelancer.profession === "graphics_designer") && (
          <h1 className={styles.title + " text-left"}>Software Knowledge</h1>
        )}
        {props.freelancer.profession === "web_developer" && (
          <h1 className={styles.title + " text-left"}>Fimiliar Language</h1>
        )}
        <p className={`w-full break-words relative border-2 p-4 rounded-lg`}>
          {props.freelancer.equipments}
        </p>
      </div>
      <div className={styles.equipment_available}>
        <h1 className='capitalize text-lg mb-4 font-medium text-left'>
          specialities
        </h1>
        <p className='w-full break-words relative border-2 p-4 rounded-lg capitalize'>
          {props.freelancer.services?.join(", ").toString()}
        </p>
      </div>
      <div className='flex items-center justify-between gap-4 mb-6'>
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
          <button className='bg-black text-white flex items-center p-2 md:text-lg gap-2 md:gap-4 px-2 md:px-4 rounded-lg'>
            <FaShareSquare style={{ color: "white" }} /> Share Profile
          </button>
        </RWebShare>
        {(props.user || props.company) &&
          props.freelancer._id !== props.user?._id && (
            <button
              type='button'
              onClick={() => setShowReportBox(true)}
              className='flex items-center gap-4 p-2 capitalize bg-red-500 text-white text-lg px-8 rounded-lg'
            >
              <FaFontAwesomeFlag /> report
            </button>
          )}
      </div>
      {showEditBox && (
        <div className='absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-80 md:top-1/3 md:left-0 md:translate-x-0 md:translate-y-0 md:w-auto z-10 mr-2'>
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
          showModalAs={showModalAs}
        />
      )}
      {showReportBox === true && (
        <ReportModal
          setShowReportBox={setShowReportBox}
          freelancer={props.freelancer}
        />
      )}
    </div>
  );
}

export default ProfileBioCard;
