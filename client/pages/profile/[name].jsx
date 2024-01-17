import Navbar from "@/components/Navbar";
import Cover from "@/components/Cover";
import ProfileBioCard from "@/components/ProfileBioCard";
import Details from "@/components/Details";
import React from "react";
import styles from "@/styles/Profile.module.css";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReviewBox from "@/components/ReviewBox";
import HireBox from "@/components/HireBox";
import Link from "next/link";
import DialogBox from "@/components/DialogBox";
import Modal from "@/components/Modal";
import Head from "next/head";
import SimilarFreelancer from "@/components/SimilarFreelancer";

export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/profile/freelancer/${ctx.query.name}`
  );
  const data = await response.json();
  return { props: { data } };
};

export default function Name(props) {
  const router = useRouter();
  const uid = router.query.name;
  const [freelancer, setFreelancer] = useState({});
  const [reviewBox, setReviewBox] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [hireBox, setHireBox] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFreelancerLoaded, setIsFreelancerLoaded] = useState(true);
  const [user, setUser] = useState(null);
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [showReviewDialogBox, setShowReviewDialogBox] = useState(false);

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
      !props.data.works.map((work) => work.includes("works[]"))
    ) {
      return;
    }
    if (currentIndex === null) {
      return;
    }
    const totalLength = props.data.works.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl =
        `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` +
        props.data.works[0];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = props.data.works.filter((item) => {
      if (item.includes("works[]")) {
        return props.data.works.indexOf(item) === newIndex;
      }
    });
    const newItem =
      `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` + newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    if (
      currentIndex === null ||
      !props.data.works.map((work) => work.includes("works[]"))
    ) {
      return;
    }
    if (currentIndex === null) {
      return;
    }
    const totalLength = props.data.works.length;
    if (currentIndex !== null && currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl =
        `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` +
        props.data.works[totalLength - 1];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = props.data.works.filter((item) => {
      return props.data.works.indexOf(item) === newIndex;
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
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // useEffect(() => {
  //   async function fetchFreelancer() {
  //     try {
  //       const response = await fetch(
  //         `${process.env.SERVER_URL}/profile/freelancer/${uid}`
  //       );
  //       const data = await response.json();
  //       if (data.error) {
  //         router.push("/404");
  //       }
  //       setFreelancer(data);
  //       setIsFreelancerLoaded(true);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchFreelancer();
  //   setFreelancer(props.data);
  //   setIsFreelancerLoaded(true);
  // }, [uid]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `${process.env.SERVER_URL}/reviews/${props.data._id}`
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (isFreelancerLoaded) {
      fetchReviews();
    }
  }, [freelancer, isFreelancerLoaded]);

  const handleReviewBox = (val) => {
    setReviewBox(val);
  };

  const handleHireBox = (val) => {
    setHireBox(val);
  };

  const appendReview = (review) => {
    setReviews([...reviews, review]);
  };

  const checkLoggedIn = (val) => {
    setLoggedIn(val);
  };

  const copyURL = () => {
    const currentURL = window.location.origin + router.asPath;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
      });
  };

  const handleDialogBox = (val) => {
    setShowDialogBox(val);
  };

  const handleReviewDialogBox = (val) => {
    setShowReviewDialogBox(val);
  };

  useEffect(() => {
    if (props.user !== null && props.user?.uid === uid) {
      router.push("/freelancer_profile");
    }
  }, [props.user]);
  return (
    <>
      <Head>
        <title>
          Fipezo | {props.data.firstname + " " + props.data.lastname}
        </title>
        <meta name="description" content={props.data.bio}></meta>
        <meta
          property="og:title"
          content={
            "Fipezo || " + props.data.firstname + " " + props.data.lastname
          }
        />

        <meta property="og:description" content={props.data.bio} />

        <meta
          property="og:image"
          content={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.data.profilePicture}`}
        />

        <meta property="og:type" content="profile" />
        <meta property="og:image:type" content="image/webp" />

        <meta property="og:url" content="https://fipezo.com/" />
      </Head>
      <div className={styles.profile}>
        <Navbar
          color="white"
          checkLoggedIn={checkLoggedIn}
          user={props.user}
          company={props.company}
          setCompany={props.setCompany}
          setUser={props.setUser}
        />
        <Cover
          coverPicture={props.data.coverPicture}
          position={JSON.parse(props.data.pictureStyle)}
        />
        {!props.user?.uid && (
          <div className={styles.btnBox2}>
            {!loggedIn && (
              <Link href="/login" className={styles.btn} id={styles.hire}>
                Hire Me
              </Link>
            )}
            {loggedIn && (
              <button
                className={styles.btn}
                id={styles.hire}
                onClick={handleHireBox}
              >
                Hire Me
              </button>
            )}
            {loggedIn && (
              <button
                className={styles.btn}
                id={styles.msg}
                onClick={() => handleReviewBox(true)}
              >
                Give Review
              </button>
            )}
            {!loggedIn && (
              <Link href="/login" className={styles.btn} id={styles.msg}>
                Give Review
              </Link>
            )}
            {reviewBox && (
              <div id={styles.boxContainer}>
                <ReviewBox
                  handleReviewBox={handleReviewBox}
                  appendReview={appendReview}
                  freelancer={props.data}
                  setShowReviewDialogBox={setShowReviewDialogBox}
                />
              </div>
            )}
            {hireBox && (
              <div id={styles.boxContainer2}>
                <HireBox
                  handleHireBox={handleHireBox}
                  freelancer={props.data}
                  user={user}
                  setShowDialogBox={setShowDialogBox}
                />
              </div>
            )}
          </div>
        )}
        {showDialogBox && (
          <DialogBox
            title="Sent Successfully!"
            text={`Your request has been sent to ${
              props.data.firstname + " " + props.data.lastname
            }. You will be contacted within 24 hours via sms. If you have any queries feel free to reach out to us.`}
            handleDialogBox={handleDialogBox}
          />
        )}
        {showReviewDialogBox && (
          <DialogBox
            title="Review Submitted Successfully!"
            text="Thank you for the review. Your valuable feedback will help us to enhance our services and better serve our clients."
            handleDialogBox={handleReviewDialogBox}
          />
        )}
        <div className={styles.profile_details}>
          {props.data.bio && (
            <ProfileBioCard
              freelancer={props.data}
              copyURL={copyURL}
              copied={copied}
              user={user}
              handleClick={handleClick}
            />
          )}
          {isFreelancerLoaded && (
            <Details
              profession={props.data?.profession}
              works={props.data?.works}
              reviews={reviews}
              premium={props.data?.premium}
              user={props.user}
              company={props.company}
              handleClick={handleClick}
            />
          )}
          {!props.user?.uid && (
            <div className={styles.btnBox}>
              {!loggedIn && (
                <Link href="/login" className={styles.btn} id={styles.hire}>
                  Hire Me
                </Link>
              )}
              {loggedIn && (
                <button
                  className={styles.btn + " pl-6 sm:pl-0"}
                  id={styles.hire}
                  onClick={handleHireBox}
                >
                  Hire Me
                </button>
              )}
              {loggedIn && (
                <button
                  className={styles.btn}
                  id={styles.msg}
                  onClick={() => handleReviewBox(true)}
                >
                  Give Review
                </button>
              )}
              {!loggedIn && (
                <Link href="/login" className={styles.btn} id={styles.msg}>
                  Give Review
                </Link>
              )}
              {reviewBox && (
                <div id={styles.boxContainer} className="">
                  <ReviewBox
                    handleReviewBox={handleReviewBox}
                    appendReview={appendReview}
                    freelancer={props.data}
                    setShowReviewDialogBox={setShowReviewDialogBox}
                  />
                </div>
              )}
              {hireBox && (
                <div id={styles.boxContainer2}>
                  <HireBox
                    handleHireBox={handleHireBox}
                    freelancer={props.data}
                    user={user}
                    setShowDialogBox={setShowDialogBox}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col relative">
          <h1 className="py-6 px-5 md:px-9 capitalize md:pt-6 text-lg font-bold">
            Similar{" "}
            {props.data.profession
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>
          <div className={styles.cards}>
            <SimilarFreelancer
              profession={props.data.profession}
              location={props.data.location}
            />
          </div>
        </div>
        <Footer premium={props.user?.premium} />
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
      </div>
    </>
  );
}
