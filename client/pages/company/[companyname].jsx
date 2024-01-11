import { useRouter } from "next/router";
import styles from "@/styles/Company.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Cover from "@/components/Cover";
import CompanyBioCard from "@/components/CompanyBioCard";
import Details from "@/components/Details";
import Modal from "@/components/Modal";
import Head from "next/head";
export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/profile/company/${ctx.query.companyname}`
  );
  const data = await response.json();
  return { props: { data } };
};
const Companyname = (props) => {
  const router = useRouter();
  const uid = router.query.companyname;
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [logInType, setLogInType] = useState("");
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    setLogInType(JSON.parse(localStorage.getItem("type")));
    if (props.user !== null && props.user?.uid === uid) {
      router.push("/freelancer_profile");
    }
  }, [props.user,router]);

  const checkLoggedIn = (val) => {
    setLoggedIn(val);
  };

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
      return props.data.works.indexOf(item) === newIndex;
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

  return (
    <>
      <Head>
        <title>Fipezo | {props.data.companyname}</title>
        <meta name="description" content={props.data.bio}></meta>
        <meta
          property="og:title"
          content={"Fipezo || " + props.data.companyname}
        />

        <meta property="og:description" content={props.data.bio} />

        <meta
          property="og:image"
          content={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.data.profilePicture}`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg" />

        <meta property="og:url" content="http://fipezo.com/" />
      </Head>
      <div className={styles.company}>
        <Navbar
          color="white"
          checkLoggedIn={checkLoggedIn}
          user={props.user}
          company={props.company}
          setCompany={props.setCompany}
          setUser={props.setUser}
        />
        <Cover coverPicture={props.data.coverPicture} />
        <div className={styles.company_details}>
          {props.data.links && (
            <CompanyBioCard
              company={props.data}
              copyURL={copyURL}
              copied={copied}
              user={user}
              handleClick={handleClick}
            />
          )}
          <Details
            works={props.data?.works}
            user={props.user}
            handleClick={handleClick}
          />
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
};

export default Companyname;
