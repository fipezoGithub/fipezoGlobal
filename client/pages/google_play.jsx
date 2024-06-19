import Navbar from "@/components/Navbar";
import styles from "../styles/Mobile.module.css";
import Image from "next/image";
import Footer from "@/components/Footer";
import { BsCheckCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Head from "next/head";
import ReactConfetti from "react-confetti";
import Link from "next/link";

function Mobile(props) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.mobile}>
      <Head>
        <title>Fipezo | Comming soon on Android Devices</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      <div className={styles.body}>
        <ReactConfetti
          height={dimensions.height}
          width={dimensions.width}
          numberOfPieces={150}
        />
        <Image
          className={styles.img}
          src='/mobile.png'
          alt='mobile'
          width={400}
          height={400}
        />
        <div className='flex flex-col items-center gap-[4vmin]'>
          <h1 className='font-semibold text-[3vmax]'>
            <span className='text-amber-500'>Voila!</span> Fipezo is now on Play
            store
          </h1>
          <Link
            href='https://play.google.com/store/apps/details?id=com.fipezo&pcampaignid=web_share'
            target='_blank'
            referrerPolicy='no-referrer'
            className='capitalize font-medium bg-blue-600 text-neutral-100 py-[2vmin] min-w-[10vmax] text-center rounded-3xl shadow-md hover:bg-blue-800'
          >
            download now
          </Link>
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </div>
  );
}

export default Mobile;
