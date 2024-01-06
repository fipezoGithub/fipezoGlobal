import React, { useEffect, useState } from "react";
import style from "../styles/User_profile.module.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { RiVipCrownFill } from "react-icons/ri";

const Profile = (props) => {
  const [pageData, setPageData] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logintype, setLoginType] = useState("");
  const [premium, setPremium] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoginType(JSON.parse(localStorage.getItem("type")));
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
          setPageData(data.user);
          setFirstname(data.user?.firstname);
          setLastname(data.user?.lastname);
          setCompanyName(data.user?.companyname);
          if (data.user?.phone) {
            setPhone(data.user?.phone);
          } else {
            setPhone(data.user?.companyphone);
          }
          if (data.user?.premium) {
            setPremium(true);
          }
          setProfilePicture(data.user?.profilePicture);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [!pageData]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    props.setUser(null);
    router.push("/");
  };

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
                backgroundImage: `url('${`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${profilePicture}`}')`,
              }}
            ></div>
          </div>

          <div className={style.profileInfo}>
            {props.user && (
              <h1 className={style.name}>
                {firstname} {lastname}
              </h1>
            )}
            {props.company && <h1 className={style.name}>{companyName}</h1>}
            {props.user && (
              <p className={style.phone}>
                <span className={style.phoneValue}>{phone}</span>
              </p>
            )}
            {props.company && (
              <p className={style.phone}>
                <span className={style.phoneValue}>{phone}</span>
              </p>
            )}
          </div>

          <div className={style.options}>
            {props.user?.uid && (
              <Link
                className={style.option + " flex items-center gap-2"}
                href={
                  premium === true
                    ? "/subscriptionstatus"
                    : "/freelancer-premium-plans"
                }
              >
                Fipezo Premium <RiVipCrownFill color="#007ae2" />
              </Link>
            )}
            {props.user?.uid && (
              <Link className={style.option} href="/my_job">
                Jobs
              </Link>
            )}
            {props.company && (
              <Link className={style.option} href="/posted-jobs">
                My Job Posts
              </Link>
            )}
            {props.user?.uid && (
              <Link className={style.option} href="/my_requests">
                Hire Requests
              </Link>
            )}
            {props.company && (
              <Link className={style.option} href="/my_hires">
                Hire Requests
              </Link>
            )}
            {props.user?.uid && (
              <Link href="/edit-profile" className={style.option}>
                Edit Profile
              </Link>
            )}
            {props.company && (
              <Link href="/edit-company" className={style.option}>
                Edit Profile
              </Link>
            )}
            {props.user?.uid && (
              <Link href="/update-portfolio" className={style.option}>
                Update Portfolio
              </Link>
            )}
            {props.user?.uid && (
              <Link className={style.option} href="/my_referral">
                My Referal
              </Link>
            )}
            <Link
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100094694632348&sk=reviews"
              className={style.option}
            >
              Rate our Services
            </Link>
          </div>

          <div>
            <button className={style.logout} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
