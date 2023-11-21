import React, { useState } from "react";
import styles from "../styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { AiTwotoneHeart } from "react-icons/ai";
const Footer2 = () => {
  const [location, setLocation] = useState("Kolkata");
  const [freelancerCount, setFreelancerCount] = useState(0);

  return (
    <footer className="bg-black text-white w-full pt-8">
      <div className="flex flex-col mx-4">
        <div className="ml-4">
          <Link className="text-4xl" href="/">
            <i style={{ fontWeight: "800", letterSpacing: "-0.5px" }}>Fipezo</i>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row items-start justify-around gap-4 lg:gap-0">
          <div>
            <div className="flex items-center justify-center relative">
              <Image
                src="/footermap.png"
                width={800}
                height={800}
                className="w-[30rem]"
              />
              <span
                className="absolute top-[51%] right-[33%] w-4 h-4 bg-yellow-500 rounded-full animate-pulse peer"
                onMouseEnter={() => {
                  setLocation("Kolkata");
                  setFreelancerCount(122);
                }}
                onMouseLeave={() => {
                  setLocation("");
                  setFreelancerCount(0);
                }}
              ></span>
              <span
                className="absolute top-[34%] right-[65%] w-4 h-4 bg-yellow-500 rounded-full animate-pulse peer"
                onMouseEnter={() => {
                  setLocation("New Delhi");
                  setFreelancerCount(83);
                }}
                onMouseLeave={() => {
                  setLocation("");
                  setFreelancerCount(0);
                }}
              ></span>
              <span
                className="absolute top-[80%] right-[70%] w-4 h-4 bg-yellow-500 rounded-full animate-pulse peer"
                onMouseEnter={() => {
                  setLocation("Bangalore");
                  setFreelancerCount(75);
                }}
                onMouseLeave={() => {
                  setLocation("");
                  setFreelancerCount(0);
                }}
              ></span>
              {location.length > 0 && (
                <div className="absolute bottom-3/4 right-0 border px-2 py-1 transition-[opacity] opacity-0 peer-hover:opacity-100 delay-300 duration-700">
                  <p className="text-lg font-semibold tracking-wider">
                    {location}
                  </p>
                  <p className="text-sm font-semibold tracking-wider capitalize text-neutral-400">
                    freelancer registered {freelancerCount}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <a href="tel:9038578787" className="text-yellow-500">
                  +91 90385 78787
                </a>
                |
                <a
                  href="mailto:fipezocare@gmail.com"
                  className="hover:text-yellow-500"
                >
                  fipezocare@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-normal w-full lg:w-auto">
                <Link
                  href="https://www.facebook.com/people/Fipezo/100094694632348/?mibextid=ZbWKwL"
                  target="_blank"
                >
                  <Image
                    src="/fb.png"
                    alt="facebook"
                    width={30}
                    height={30}
                    className={styles.social + " invert"}
                  ></Image>
                </Link>
                <Link
                  href="https://www.instagram.com/fipezoindia"
                  target="_blank"
                >
                  <Image
                    src="/insta.png"
                    alt="Instagram"
                    width={30}
                    height={30}
                    className={styles.social + " invert"}
                  ></Image>
                </Link>
                <Link href="https://twitter.com/fipezoindia" target="_blank">
                  <Image
                    src="/twitterX.png"
                    alt="Twitter"
                    width={30}
                    height={30}
                    className={styles.social + " invert"}
                  ></Image>
                </Link>
                <Link
                  href="https://in.pinterest.com/fipezoindia"
                  target="_blank"
                >
                  <Image
                    src="/pinterest.png"
                    alt="Pinterest"
                    width={30}
                    height={30}
                    className={styles.social + " invert"}
                  ></Image>
                </Link>
                <Link href="https://www.youtube.com/@Fipezo" target="_blank">
                  <Image
                    src="/yt.png"
                    alt="Youtube"
                    width={30}
                    height={30}
                    className={styles.social + " invert"}
                  ></Image>
                </Link>
                <Link href="https://www.linkedin.com/in/fipezo" target="_blank">
                  <Image
                    src="/linkedin.png"
                    alt="Linkedin"
                    width={30}
                    height={30}
                    className={styles.social + " invert"}
                  ></Image>
                </Link>
              </div>
              <div className="hidden lg:block">
                <p className="text-neutral-500">
                  Copyright © 2023 Fipezo, All rights reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="py-2 px-3 lg:px-6 flex flex-col gap-4 lg:w-1/3">
            <div className="flex flex-col gap-4">
              <nav className="flex items-center justify-between w-full bg-neutral-800 px-4 py-2">
                <p className="capitalize text-xl w-full font-bold">
                  freelancing services
                </p>
              </nav>
              <ul className="grid grid-cols-2 gap-4 lg:gap-0">
                <li>
                  <Link
                    href="/explore/freelancers/album_designer"
                    className="capitalize text-lg text-neutral-500"
                  >
                    album designer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/anchor"
                    className="capitalize text-lg text-neutral-500"
                  >
                    anchor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/cinematographer"
                    className="capitalize text-lg text-neutral-500"
                  >
                    cinematographer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/dancer"
                    className="capitalize text-lg text-neutral-500"
                  >
                    dancer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/dj"
                    className="capitalize text-lg text-neutral-500"
                  >
                    DJ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/drone_operator"
                    className="capitalize text-lg text-neutral-500"
                  >
                    drone operator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/graphics_designer"
                    className="capitalize text-lg text-neutral-500"
                  >
                    graphics designer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/influencer"
                    className="capitalize text-lg text-neutral-500"
                  >
                    influencer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/makeup_artist"
                    className="capitalize text-lg text-neutral-500"
                  >
                    makeup artist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/mehendi_artist"
                    className="capitalize text-lg text-neutral-500"
                  >
                    mehendi artist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/model"
                    className="capitalize text-lg text-neutral-500"
                  >
                    model
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/photographer"
                    className="capitalize text-lg text-neutral-500"
                  >
                    photographer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/photo_editor"
                    className="capitalize text-lg text-neutral-500"
                  >
                    photo editor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/video_editor"
                    className="capitalize text-lg text-neutral-500"
                  >
                    video editor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore/freelancers/web_developer"
                    className="capitalize text-lg text-neutral-500"
                  >
                    web developer
                  </Link>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:gap-2">
              <ul className="flex flex-col items-start gap-2">
                <p className="capitalize text-xl font-bold">about</p>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/about_us">About Us</Link>
                </li>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/careers">Careers</Link>
                </li>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/guides_and_reviews">Guides &amp; Reviews</Link>
                </li>
              </ul>
              <ul className="flex flex-col items-start gap-2">
                <p className="capitalize text-xl font-bold">law &amp; order</p>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/terms_and_conditions">terms of service</Link>
                </li>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/data_protection">data protection</Link>
                </li>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/privacy_and_policy">privacy policy</Link>
                </li>
              </ul>
              <ul className="flex flex-col items-start gap-2">
                <p className="capitalize text-xl font-bold">
                  help &amp; support
                </p>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/contact">support</Link>
                </li>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/faqs">FAQs</Link>
                </li>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/guides_and_reviews">Rate our services</Link>
                </li>
              </ul>
              <ul className="flex flex-col items-start gap-2">
                <p className="capitalize text-xl font-bold">useful links</p>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/terms_and_conditions">refer &amp; earn</Link>
                </li>
                <li className="text-base text-neutral-500 capitalize">
                  <Link href="/site">sitemap</Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <Link href="/google_play">
                  <Image
                    src="/google-play-btn.png"
                    alt="Google Play"
                    width={143}
                    height={143}
                    className="w-32"
                  ></Image>
                </Link>
              </div>
              <div className="lg:mr-20">
                <Link href="/app_store">
                  <Image
                    src="/apple-png.png"
                    alt="App Store"
                    width={143}
                    height={143}
                    className="w-32"
                  ></Image>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-neutral-500 lg:hidden text-center">
        Copyright © 2023 Fipezo, All rights reserved.
      </p>
      <div className="mb-2">
        <h1 className="flex items-center gap-1 font-bold justify-center">
          Made in India with <AiTwotoneHeart className="text-red-600 text-lg" />
        </h1>
      </div>
    </footer>
  );
};

export default Footer2;
