import React, { useState } from "react";
import styles from "../styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { AiTwotoneHeart } from "react-icons/ai";
const Footer = (props) => {
  const [showBengaluru, setShowBengaluru] = useState(false);
  const [showChennai, setShowChennai] = useState(false);
  const [showDelhi, setShowDelhi] = useState(false);
  const [showHyderabad, setShowHyderabad] = useState(false);
  const [showKolkata, setShowKolkata] = useState(false);
  const [showMumbai, setShowMumbai] = useState(false);
  const [showAmritsar, setShowAmritsar] = useState(false);
  const [showGuwahati, setShowGuwahati] = useState(false);
  const [showAhemdabad, setShowAhemdabad] = useState(false);

  return (
    <footer className="bg-black text-white w-full pt-4 lg:pt-8">
      <div className="flex flex-col lg:flex-row m-4 lg:m-8 justify-between">
        <div className="lg:ml-4 mb-4 flex flex-col items-center justify-between gap-2">
          <Link className="text-4xl" href="/">
            <i style={{ fontWeight: "800", letterSpacing: "-0.5px" }}>Fipezo</i>
            <i className="text-2xl font-semibold not-italic">
              {" "}
              | Cities we are currently operating
            </i>
          </Link>
          <div className="flex items-center justify-center relative">
            <Image
              src="/footermap.png"
              alt="india map"
              width={800}
              height={800}
              className="w-[30rem]"
            />
            <span
              className="absolute top-[51%] right-[33%] w-4 h-4 bg-yellow-500 rounded-full radar"
              onMouseEnter={() => setShowKolkata(true)}
              onMouseLeave={() => setShowKolkata(false)}
            ></span>
            {showKolkata === true && (
              <span className="absolute top-[50%] right-[16%] lg:right-[18%] capitalize font-bold text-sm lg:text-lg">
                kolkata
              </span>
            )}
            <span
              className="absolute top-[34%] right-[65%] w-4 h-4 bg-yellow-500 rounded-full peer radar"
              onMouseEnter={() => setShowDelhi(true)}
              onMouseLeave={() => setShowDelhi(false)}
            ></span>
            {showDelhi === true && (
              <span className="absolute top-[33%] right-[42%] lg:right-[45%] capitalize font-bold text-sm lg:text-lg">
                new delhi
              </span>
            )}
            <span
              className="absolute top-[80%] right-[70%] w-4 h-4 bg-yellow-500 rounded-full peer radar"
              onMouseEnter={() => setShowBengaluru(true)}
              onMouseLeave={() => setShowBengaluru(false)}
            ></span>
            {showBengaluru === true && (
              <span className="absolute top-[79%] right-[48%] lg:right-[50%] capitalize font-bold text-sm lg:text-lg">
                bangalore
              </span>
            )}
            <span
              className="absolute top-[71%] right-[53%] w-4 h-4 bg-yellow-500 rounded-full peer radar"
              onMouseEnter={() => setShowChennai(true)}
              onMouseLeave={() => setShowChennai(false)}
            ></span>
            {showChennai === true && (
              <span className="absolute top-[70%] right-[34%] lg:right-[36%] capitalize font-bold text-sm lg:text-lg">
                Chennai
              </span>
            )}
            <span
              className="absolute top-[63%] right-[60%] w-4 h-4 bg-yellow-500 rounded-full peer radar"
              onMouseEnter={() => setShowHyderabad(true)}
              onMouseLeave={() => setShowHyderabad(false)}
            ></span>
            {showHyderabad === true && (
              <span className="absolute top-[62%] right-[36%] lg:right-[38%] capitalize font-bold text-sm lg:text-lg">
                hyderabad
              </span>
            )}
            <span
              className="absolute top-[66%] right-[80%] w-4 h-4 bg-yellow-500 rounded-full peer radar"
              onMouseEnter={() => setShowMumbai(true)}
              onMouseLeave={() => setShowMumbai(false)}
            ></span>
            {showMumbai === true && (
              <span className="absolute top-[67%] lg:top-[65%] right-[62%] lg:right-[64%] capitalize font-bold text-sm lg:text-lg">
                mumbai
              </span>
            )}
            <span
              className="absolute top-[25%] right-[75%] w-4 h-4 bg-yellow-500 rounded-full peer radar"
              onMouseEnter={() => setShowAmritsar(true)}
              onMouseLeave={() => setShowAmritsar(false)}
            ></span>
            {showAmritsar === true && (
              <span className="absolute top-[25%] lg:top-[24%] right-[56%] lg:right-[58%] capitalize font-bold text-sm lg:text-lg">
                amritsar
              </span>
            )}
            <span
              className="absolute top-[45%] right-[15%] w-4 h-4 bg-yellow-500 rounded-full peer radar"
              onMouseEnter={() => setShowGuwahati(true)}
              onMouseLeave={() => setShowGuwahati(false)}
            ></span>
            {showGuwahati === true && (
              <span className="absolute top-[50%] lg:top-[44%] right-[0%] lg:-right-[4%] capitalize font-bold text-sm lg:text-lg">
                guwahati
              </span>
            )}
            <span
              className="absolute top-[50%] right-[82%] w-4 h-4 bg-yellow-500 rounded-full peer radar"
              onMouseEnter={() => setShowAhemdabad(true)}
              onMouseLeave={() => setShowAhemdabad(false)}
            ></span>
            {showAhemdabad === true && (
              <span className="absolute top-[50%] lg:top-[49%] right-[56%] lg:right-[59%] capitalize font-bold text-sm lg:text-lg">
                ahemdabad
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-4 mt-4">
            {/* <div className="flex items-center justify-center lg:justify-normal w-full lg:w-auto">
                <p>
                  Help &amp; support,&nbsp;
                  <a
                    href="mailto:help@fipezo.com"
                    className="hover:text-yellow-500"
                  >
                    help@fipezo.com
                  </a>
                </p>
              </div> */}
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
              <Link href="https://in.pinterest.com/fipezoindia" target="_blank">
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
        <div className="py-2 lg:pt-0 px-3 lg:px-6 flex flex-col gap-4 lg:gap-2">
          <div className="flex flex-col gap-4">
            <nav className="flex items-center justify-between w-full bg-neutral-800 px-4 py-2">
              <p className="capitalize text-xl w-full font-bold">
                freelancing services
              </p>
            </nav>
            <ul className="grid grid-cols-2 gap-x-4 lg:gap-x-24">
              <li>
                <Link
                  href="/explore/freelancers/actor"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  actor
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/actress"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  actress
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/album_designer"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  album designer
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/anchor"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  anchor
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/babysitter"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  babysitter
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/cinematographer"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  cinematographer
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/dancer"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  dancer
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/dance_teacher"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  dance teacher
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/dj"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  DJ
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/drawing_teacher"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  drawing teacher
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/drone_operator"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  drone operator
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/fashion_designer"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  fashion designer
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/graphics_designer"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  graphics designer
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/influencer"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  influencer
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/interior_designer"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  interior designer
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/lyricist"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  lyricist
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/maid"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  maid
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/makeup_artist"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  makeup artist
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/mehendi_artist"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  mehendi artist
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/model"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  model
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/musician"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  musician
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/music_teacher"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  music teacher
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/painter"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  painter
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/photographer"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  photographer
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/photo_editor"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  photo editor
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/private_tutor"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  Private Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/video_editor"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  video editor
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/vocalist"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  vocalist
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/voice_over_artist"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  voice over artist
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/freelancers/web_developer"
                  className="capitalize lg:text-lg text-neutral-500 hover:text-yellow-400"
                >
                  web developer
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:gap-x-24">
            <ul className="flex flex-col items-start gap-2">
              <p className="capitalize text-xl font-bold">about</p>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/about_us">About Us</Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/careers">Careers</Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/guides_and_reviews">Guides &amp; Reviews</Link>
              </li>
            </ul>
            <ul className="flex flex-col items-start gap-2">
              <p className="capitalize text-xl font-bold">law &amp; order</p>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/terms_and_conditions">terms &amp; conditions</Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/data_protection">data protection</Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/privacy_and_policy">privacy policy</Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/cancellation_and_refund">
                  Cancellation &amp; Refund
                </Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/shipping_and_delivery">
                  Shipping &amp; Delivery
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col items-start gap-2">
              <p className="capitalize text-xl font-bold">help &amp; support</p>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/contact_us">contact us</Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/faqs">FAQs</Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link
                  href="https://www.facebook.com/fipezo/reviews/?id=100094694632348&sk=reviews"
                  target="_blank"
                >
                  Rate our services
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col items-start gap-2">
              <p className="capitalize text-xl font-bold">useful links</p>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link
                  href={
                    props.premium
                      ? "/subscriptionstatus"
                      : "/freelancer-premium-plans"
                  }
                >
                  Fipezo premium
                </Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/referandearn">refer &amp; earn</Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/sitemap">sitemap</Link>
              </li>
              <li className="text-base text-neutral-500 hover:text-yellow-400 capitalize">
                <Link href="/submit_your_city">submit your city</Link>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:gap-x-24">
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
            <div className="">
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
      <p className="text-neutral-500 lg:hidden text-center">
        Copyright © 2023 Fipezo, All rights reserved.
      </p>
      <div className="my-2">
        <h1 className="flex items-center gap-1 font-bold justify-center">
          Made in India with <AiTwotoneHeart className="text-red-600 text-lg" />
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
