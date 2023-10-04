import Image from "next/image";
import styles from "../styles/ProfileCard.module.css";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";

export default function CompanyCard(props) {
  const type = props.profile.companytype
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const [display, setDisplay] = useState("none");
  const [city, setCity] = useState("");
  useEffect(() => {
    const companyLoc = JSON.parse(props.profile.companyaddress);
    setCity(companyLoc.city);
  }, []);

  return (
    <Link
      className={styles.profileCard}
      href={`/company/${props.profile.uid}`}
      target="_blank"
    >
      <div className={styles.cover + " relative overflow-hidden"}>
        <img
          src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.profile.coverPicture}`}
          alt="cover picture"
          className="w-full h-24 absolute top-0 object-cover"
        />
        {props.profile.companyaddress && (
          <div className={styles.tag + " z-50"}>
            <IoLocationSharp style={{ color: "red" }} />
            &nbsp;
            <span className={styles.location + " mr-2 z-50"}>{city}</span>
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
        <img
          src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.profile.profilePicture}`}
          alt="profile-dp"
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className={styles.name}>
        <span
          className="w-22 truncate capitalize"
          style={{ maxWidth: "11rem", letterSpacing: "0" }}
        >
          {props.profile.companyname.toLowerCase()}
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
      <div className={styles.category}>
        {type === "Advertising Agency" && (
          <Image
            src="/advertising-logo.png"
            alt="ad_agency_logo"
            className={styles.logo + " w-[1.5rem] md:w-20"}
            width={1000}
            height={1000}
          />
        )}
        {type === "Photography" && (
          <Image
            src="/photography-logo.png"
            alt="photography_logo"
            className={styles.logo + " w-[1.5rem] md:w-20"}
            width={1000}
            height={1000}
          />
        )}
        {type === "ECommerce" && (
          <Image
            src="/ecom-logo.png"
            alt="eCommerce_logo"
            className={styles.logo + " w-[1.5rem] md:w-20"}
            width={1000}
            height={1000}
          />
        )}
        {type === "Production House" && (
          <Image
            src="/production_house.png"
            alt="production_house_logo"
            className={styles.logo + " w-[1.5rem] md:w-20"}
            width={1000}
            height={1000}
          />
        )}
        {type === "Other" && (
          <Image
            src="/other.png"
            alt="other_logo"
            className={styles.logo + " w-[1.5rem] md:w-20"}
            width={1000}
            height={1000}
          />
        )}
        <h4 className="capitalize">{type} company</h4>
      </div>
    </Link>
  );
}
