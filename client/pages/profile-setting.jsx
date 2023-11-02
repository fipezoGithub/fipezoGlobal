import React, { useEffect, useState } from "react";
import style from "../styles/User_profile.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from "@/components/Loading";

const Profile = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFirstname(data.user.firstname);
          setLastname(data.user.lastname);
          setPhone(data.user.phone);
          setProfilePicture(data.user.profilePicture);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return (
    <div className={style.profile}>
      <Head>
        <title>Fipezo | My Profile</title>
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className={style.body}>
        <div className={style.profileBox}>
          <div className={style.profileImage}>
            {/* <Image className={style.dp} src={profilePicture === '' ? '/dp.png' : `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${profilePicture}`} alt="profile-pic" height='100' width='100' /> */}
            <div
              className={style.editProfileImage}
              style={{
                backgroundImage: `url(${`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${profilePicture}`})`,
              }}
            ></div>
          </div>

          <div className={style.profileInfo}>
            <h1 className={style.name}>
              {firstname} {lastname}
            </h1>
            <p className={style.phone}>
              <span className={style.phoneValue}>{phone}</span>
            </p>
          </div>

          <div className={style.options}>
            <Link className={style.option} href="/my_job">
              Jobs
            </Link>
            <Link className={style.option} href="/my_notifications">
              Notifications
            </Link>
            <Link className={style.option} href="/my_requests">
              Hire Requests
            </Link>
            <Link href="/edit-profile" className={style.option}>
              Edit Profile
            </Link>
            <Link className={style.option} href="/my_referral">
              My Referal
            </Link>
            <Link
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100094694632348&sk=reviews"
              className={style.option}
            >
              Rate our Services
            </Link>
          </div>

          <div>
            <button className={style.logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
