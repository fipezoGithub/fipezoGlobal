import React, { useContext, useEffect, useState } from "react";
import style from "../styles/User_profile.module.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { RiVipCrownFill } from "react-icons/ri";
import { AuthContext } from "@/context/AuthContext";

const Profile = (props) => {
  const [pageData, setPageData] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [premium, setPremium] = useState(false);
  const router = useRouter();

  const { data } = useContext(AuthContext);

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
        color='black'
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      <div className={style.body}>
        <div className={style.profileBox}>
          <div className={style.profileImage}>
            <div
              className={style.editProfileImage}
              style={{
                backgroundImage: `url('${`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${profilePicture}`}')`,
              }}
            ></div>
          </div>

          <div className={style.profileInfo}>
            {data.userDetails && (
              <h1 className={style.name}>
                {firstname} {lastname}
              </h1>
            )}
            {data.userDetails?.companyname && (
              <h1 className={style.name}>{companyName}</h1>
            )}
            {data.userDetails && (
              <p className={style.phone}>
                <span className={style.phoneValue}>{phone}</span>
              </p>
            )}
          </div>

          <div className={style.options}>
            {((data.userDetails && !data.userDetails?.uid) ||
              data.userDetails?.companyname) && (
              <Link
                href='/my_wishlist'
                className={style.option + " flex items-center gap-2"}
              >
                Wishlist
              </Link>
            )}
            {!data.userDetails?.companyphone && data.userDetails?.uid && (
              <Link
                className={style.option + " flex items-center gap-2"}
                href={
                  premium === true
                    ? "/subscriptionstatus"
                    : "/freelancer-premium-plans"
                }
              >
                Fipezo Premium <RiVipCrownFill color='#007ae2' />
              </Link>
            )}
            {!data.userDetails?.companyphone && data.userDetails?.uid && (
              <Link className={style.option} href='/my_job'>
                Jobs
              </Link>
            )}
            {data.userDetails?.companyphone && (
              <Link className={style.option} href='/posted-jobs'>
                My Job Posts
              </Link>
            )}
            {!data.userDetails?.companyphone && data.userDetails?.uid && (
              <Link className={style.option} href='/my_requests'>
                Hire Inbox
              </Link>
            )}
            <Link className={style.option} href='/my_hires'>
              Hire Requests
            </Link>
            {!data.userDetails?.companyphone && data.userDetails?.uid && (
              <Link href='/edit-profile' className={style.option}>
                Edit Profile
              </Link>
            )}
            {data.userDetails?.companyphone && (
              <Link href='/edit-company' className={style.option}>
                Edit Profile
              </Link>
            )}
            {!data.userDetails?.companyphone && data.userDetails?.uid && (
              <Link href='/update-portfolio' className={style.option}>
                Update Portfolio
              </Link>
            )}
            {!data.userDetails?.companyphone && data.userDetails?.uid && (
              <Link className={style.option} href='/my_referral'>
                My Referal
              </Link>
            )}
            <Link
              target='_blank'
              href='https://www.facebook.com/profile.php?id=100094694632348&sk=reviews'
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
