import Navbar from "@/components/Navbar";
import Cover from "@/components/Cover";
import ProfileBioCard from "@/components/ProfileBioCard";
import Details from "@/components/Details";
import React from "react";
import styles from "@/styles/Profile.module.css";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Link from "next/link";
import Head from "next/head";
import { IoMdCloseCircleOutline } from "react-icons/io";

function Freelancer_Profile(props) {
  const router = useRouter();
  const [freelancer, setFreelancer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFreelancerLoaded, setIsFreelancerLoaded] = useState(false);
  const [clickedImg, setClickedImg] = useState(null);
  const [picturePosition, setPicturePosition] = useState();
  const [feeds, setFeeds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [updatePopup, setUpdatePopup] = useState(false);

  const handleClick = (item, index) => {
    if (!item.includes("works[]")) {
      return;
    }
    setCurrentIndex(index);
    setClickedImg(`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` + item);
  };
  const handelRotationRight = () => {
    if (
      currentIndex === null ||
      !freelancer.works.map((work) => work.includes("works[]"))
    ) {
      return;
    }
    const totalLength = freelancer.works.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl =
        `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` +
        freelancer.works[0];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = freelancer.works.filter((item) => {
      return freelancer.works.indexOf(item) === newIndex;
    });
    const newItem =
      `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` + newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    if (
      currentIndex === null ||
      !freelancer.works.map((work) => work.includes("works[]"))
    ) {
      return;
    }
    const totalLength = freelancer.works.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl =
        `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` +
        freelancer.works[totalLength - 1];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = freelancer.works.filter((item) => {
      return freelancer.works.indexOf(item) === newIndex;
    });
    const newItem =
      `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` + newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          setFreelancer(data);
          setIsFreelancerLoaded(true);
          !data.email && setUpdatePopup(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    async function fetchReviews() {
      try {
        const response = await fetch(
          `${process.env.SERVER_URL}/reviews/${freelancer._id}`
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    }
    async function getFeeds() {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/profile/feed`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });
        const data = await res.json();
        setFeeds(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (isFreelancerLoaded) {
      fetchReviews();
      getFeeds();
    }
  }, [freelancer, isFreelancerLoaded]);

  const checkLoggedIn = (val) => {
    setLoggedIn(val);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className={styles.profile}>
      <Head>
        <title>Fipezo | My Profile</title>
      </Head>
      <Navbar
        color="white"
        checkLoggedIn={checkLoggedIn}
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <Cover
        coverPicture={freelancer.coverPicture}
        user={props.user}
        position={picturePosition}
      />
      <div className={styles.profile_details}>
        <ProfileBioCard
          freelancer={freelancer}
          handleClick={handleClick}
          user={props.user}
        />
        {isFreelancerLoaded && (
          <Details
            profession={freelancer.profession}
            works={freelancer.works}
            premium={freelancer.premium}
            reviews={reviews}
            user={props.user}
            handleClick={handleClick}
          />
        )}
        <div className={styles.btnBox}>
          <Link
            className={styles.btn}
            style={{ width: "100%" }}
            id={styles.hire}
            href="/my_requests"
          >
            My Requests
          </Link>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer premium={props.user?.premium} />
      </div>
      <div>
        {clickedImg && (
          <Modal
            clickedImg={clickedImg}
            handelRotationRight={handelRotationRight}
            setClickedImg={setClickedImg}
            handelRotationLeft={handelRotationLeft}
          />
        )}
      </div>
      {updatePopup === true && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center backdrop-blur">
          <div className="flex items-center justify-center flex-col bg-gradient-to-r p-8 from-[#cccccc] to-[#4f70b9] text-white gap-4 relative">
            <div className="absolute top-1 right-1">
              <button type="button" onClick={() => setUpdatePopup(false)}>
                <IoMdCloseCircleOutline size={"2em"} />
              </button>
            </div>
            <h2 className="text-xl">
              Looks like you have not update your email, password yet.
            </h2>
            <Link
              href="/profile-setting"
              className="text-lg capitalize text-blue-600 font-bold drop-shadow-md"
            >
              update now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Freelancer_Profile;
