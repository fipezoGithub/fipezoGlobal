import React from "react";
import styles from "../styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { AiTwotoneHeart } from "react-icons/ai";
const Footer2 = () => {
  return (
    <>
      <div className="bg-black p-4">
        <Image
          src="/footermap.png"
          width={800}
          height={800}
          className="w-96"
        />
      </div>
      <div className={styles.lower}>
        <div className={styles.company}>
          <Link className={styles.logo} href="/">
            <i style={{ fontWeight: "800", letterSpacing: "-0.5px" }}>Fipezo</i>
          </Link>
          <div className={styles.copyri8}>
            <p>Copyright © 2023 Fipezo, All rights reserved.</p>
          </div>
        </div>
        <div className={styles.socials}>
          <Link
            href="https://www.facebook.com/people/Fipezo/100094694632348/?mibextid=ZbWKwL"
            target="_blank"
          >
            <Image
              src="/fb.png"
              alt="facebook"
              width={30}
              height={30}
              className={styles.social}
            ></Image>
          </Link>
          <Link href="https://www.instagram.com/fipezoindia" target="_blank">
            <Image
              src="/insta.png"
              alt="Instagram"
              width={30}
              height={30}
              className={styles.social}
            ></Image>
          </Link>
          <Link href="https://twitter.com/fipezoindia" target="_blank">
            <Image
              src="/twitterX.png"
              alt="Twitter"
              width={30}
              height={30}
              className={styles.social}
            ></Image>
          </Link>
          <Link href="https://in.pinterest.com/fipezoindia" target="_blank">
            <Image
              src="/pinterest.png"
              alt="Pinterest"
              width={30}
              height={30}
              className={styles.social}
            ></Image>
          </Link>
          <Link href="https://www.youtube.com/@Fipezo" target="_blank">
            <Image
              src="/yt.png"
              alt="Youtube"
              width={30}
              height={30}
              className={styles.social}
            ></Image>
          </Link>
          <Link href="https://www.linkedin.com/in/fipezo" target="_blank">
            <Image
              src="/linkedin.png"
              alt="Linkedin"
              width={30}
              height={30}
              className={styles.social}
            ></Image>
          </Link>
        </div>
        <div className={styles.app}>
          <div className={styles.google_play}>
            <Link href="/google_play">
              <Image
                src="/google-play.png"
                alt="Google Play"
                width={130}
                height={130}
                className={styles.appLogo}
              ></Image>
            </Link>
          </div>
          <div className={styles.app_store}>
            <Link href="/app_store">
              <Image
                src="/apple-png.png"
                alt="App Store"
                width={143}
                height={143}
                className={styles.appLogo}
              ></Image>
            </Link>
          </div>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className="">
        <h1 className="flex items-center gap-1 font-bold justify-center">
          Made in India with <AiTwotoneHeart className="text-red-600 text-lg" />
        </h1>
      </div>
    </>
  );
};

export default Footer2;
