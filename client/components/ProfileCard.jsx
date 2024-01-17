import Image from "next/image";
import styles from "../styles/ProfileCard.module.css";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { ImCamera } from "react-icons/im";
import { FaVideo, FaStar } from "react-icons/fa";
import { TbDrone, TbPhotoEdit } from "react-icons/tb";
import { GiPaintBrush, GiTeacher } from "react-icons/gi";
import { BiPhotoAlbum } from "react-icons/bi";
import Link from "next/link";
import { useState } from "react";
import { MdMovieEdit, MdOutlineQueueMusic, MdWebhook } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

export default function ProfileCard(props) {
  const profession = props.profile.profession
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const [display, setDisplay] = useState("none");
  const position = JSON.parse(props.profile.pictureStyle);
  return (
    <Link
      className={styles.profileCard}
      href={`/profile/${props.profile.uid}`}
      target="_blank"
    >
      <div className={styles.cover + " relative overflow-hidden"}>
        <Image
          src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.profile.coverPicture}`}
          alt="cover picture"
          fill={true}
          style={{ objectPosition: position.coverPicture }}
          className="w-full h-24 absolute top-0 object-cover"
        />
        {props.profile.location && (
          <div className={styles.tag + " z-50"}>
            <IoLocationSharp style={{ color: "red" }} />
            &nbsp;
            <span className={styles.location + " mr-2 z-50"}>
              {props.profile.location}
            </span>
          </div>
        )}
        {props.profile.featured && (
          <div className={styles.tag + " z-50"}>
            <>
              <AiOutlineThunderbolt style={{ color: "yellow" }} />
              <p>&nbsp;Featured Freelancer</p>
            </>
          </div>
        )}
      </div>
      <div className={styles.image + " overflow-hidden"}>
        <Image
          src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.profile.profilePicture}`}
          alt="profile-dp"
          width={800}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>
      <div className={styles.right}>
        <div className={styles.rating}>
          <p>{props.profile.rating.toFixed(1)}</p>
          <FaStar className={styles.star} />
        </div>
        <div className={styles.noOfReviews}>
          <p className={styles.num}>({props.profile.reviewCount})</p>
        </div>
      </div>
      <h3 className={styles.name}>
        <span
          className="w-22 truncate capitalize"
          style={{ maxWidth: "10rem", letterSpacing: "0" }}
        >
          {props.profile.firstname.toLowerCase()}{" "}
          {props.profile.lastname.toLowerCase()}
        </span>
        <Image
          className={styles.blueTick}
          onMouseOver={() => setDisplay("flex")}
          onMouseOut={() => setDisplay("none")}
          src="/tick.png"
          height="40"
          width="40"
          alt="verified-tick"
        />
        {props.profile.featured && (
          <span className={styles.container}>
            <div className={styles.overTick} style={{ display: display }}>
              <span>Verified</span>
              <div className={styles.rectangle}></div>
            </div>
          </span>
        )}
      </h3>
      <p className={`w-full ${styles.bio} break-words max-w-xs`}>
        {props.profile.bio}
      </p>
      <div className={styles.category + " px-2"}>
        {profession === "Photographer" && <ImCamera className={styles.logo} />}
        {profession === "Photo Editor" && (
          <TbPhotoEdit className={styles.logo} />
        )}
        {profession === "Cinematographer" && (
          <FaVideo className={styles.logo} />
        )}
        {profession === "Drone Operator" && <TbDrone className={styles.logo} />}
        {profession === "Video Editor" && (
          <MdMovieEdit className={styles.logo} />
        )}
        {profession === "Makeup Artist" && (
          <GiPaintBrush className={styles.logo} />
        )}
        {profession === "Model" && (
          <Image
            src="/model-logo.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="model-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Anchor" && (
          <Image
            src="/anchor.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="anchor-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Web Developer" && (
          <MdWebhook className={styles.logo} />
        )}
        {profession === "Album Designer" && (
          <BiPhotoAlbum className={styles.logo} />
        )}
        {profession === "Dj" && (
          <Image
            src="/DJ.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="dj-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Dancer" && (
          <Image
            src="/Dancer.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="dancer-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Actor" && (
          <Image
            src="/actor.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="actor-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Actress" && (
          <Image
            src="/actress.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="actress-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Babysitter" && (
          <Image
            src="/babysitter.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="actress-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Influencer" && (
          <Image
            src="/Influencer.fipezo.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="influencer-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Graphics Designer" && (
          <Image
            src="/graphics-designer.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="graphics-designer-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Mehendi Artist" && (
          <Image
            src="/mehendi-artist-logo.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="mehendi-artist-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Drawing Teacher" && (
          <Image
            src="/drawing_teacher.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="drawing-teacher-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Dance Teacher" && (
          <Image
            src="/dance-teacher.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="dance-teacher-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Painter" && (
          <Image
            src="/painter.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="painter-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Maid" && (
          <Image
            src="/maid.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="maid-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Lyricist" && (
          <Image
            src="/lyricist.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="lyricist-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Musician" && (
          <Image
            src="/musician.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="musician-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Voice Over Artist" && (
          <Image
            src="/voice-over-artist.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="voice-over-artist-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Fashion Designer" && (
          <Image
            src="/fashion-designer.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="fashion-designer-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Vocalist" && (
          <Image
            src="/vocalist.png"
            className={styles.logo + " w-[0.7rem] md:w-6"}
            alt="vocalist-logo"
            width={200}
            height={200}
          />
        )}
        {profession === "Private Tutor" && (
          <GiTeacher className={styles.logo + " w-[0.7rem] md:w-6"} />
        )}
        {profession === "Music Teacher" && (
          <MdOutlineQueueMusic className={styles.logo + " w-[0.7rem] md:w-6"} />
        )}
        <h4>{profession}</h4>
        <div className={styles.rate}>
          <p className="whitespace-nowrap">
            Rs.{props.profile.rate} /{" "}
            {(profession === "Actor" ||
              profession === "Actress" ||
              profession === "Model") &&
              "Shoot"}
            {profession === "Influencer" && "Post"}
            {profession === "Fashion Designer" && "Dress"}
            {(profession === "Babysitter" ||
              profession === "Maid" ||
              profession === "Dance Teacher" ||
              profession === "Drawing Teacher" ||
              profession === "Music Teacher" ||
              profession == "Private Tutor") &&
              "Month"}
            {(profession === "Dj" ||
              profession == "Musician" ||
              profession === "Drone Operator") &&
              "Hour"}
            {(profession === "Album Designer" ||
              profession === "Dancer" ||
              profession === "Graphics Designer" ||
              profession === "Interior Designer" ||
              profession === "Mehendi Artist" ||
              profession === "Painter" ||
              profession === "Photo Editor" ||
              profession === "Video Editor" ||
              profession === "Voice Over Artist" ||
              profession === "Anchor" ||
              profession === "Lyricist" ||
              profession === "Makeup Artist" ||
              profession === "Vocalist" ||
              profession === "Web Developer") &&
              "Project"}
            {(profession === "Cinematographer" ||
              profession === "Photographer") &&
              "Day"}
          </p>
        </div>
      </div>
    </Link>
  );
}
