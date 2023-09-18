import styles from "../styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiTwotoneHeart } from "react-icons/ai";

function Footer() {
  const router = useRouter();
  const handleStates = (state) => {
    localStorage.setItem("city", state);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.upper}>
        <ul className={styles.about}>
          <li className={styles.heading}>About</li>
          <Link href="/about_us" className={styles.subHeading}>
            About Us
          </Link>
          <Link href="/careers" className={styles.subHeading}>
            Careers
          </Link>
          <Link href="/guides_and_reviews" className={styles.subHeading}>
            Guides and Reviews
          </Link>
        </ul>
        <ul className={styles.help}>
          <li className={styles.heading}>Help and Support</li>
          <Link href="/contact" className={styles.subHeading}>
            Support
          </Link>
          <Link href="/faqs" className={styles.subHeading}>
            FAQs
          </Link>
          <Link
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100094694632348&sk=reviews"
            className={styles.subHeading}
          >
            Rate our Services
          </Link>
        </ul>
        <ul className={styles.law}>
          <li className={styles.heading}>Law and Order</li>
          <Link href="/terms_and_conditions">
            <span className={styles.subHeading} id={styles.subTerm}>
              Terms of service
            </span>
          </Link>
          <Link href="/data_protection" className={styles.subHeading}>
            Data Protection
          </Link>
          <Link href="/privacy_and_policy" className={styles.subHeading}>
            Privacy Policy
          </Link>
        </ul>
        <ul className={styles.law}>
          <li className={styles.heading}>Freelancing Services</li>
          <Link
            href="/explore/freelancer/photographer"
            className={styles.subHeading}
          >
            Photographer
          </Link>
          <Link
            href="/explore/freelancer/cinematographer"
            className={styles.subHeading}
          >
            Cinematographer
          </Link>
          <Link
            href="/explore/freelancer/drone_operator"
            className={styles.subHeading}
          >
            Drone Operator
          </Link>
        </ul>
        <ul className={styles.law}>
          <li className={styles.heading}>Register as a</li>
          <Link className={styles.subHeading} href="/register/freelancer">
            Freelancer
          </Link>
          <Link className={styles.subHeading} href="/register/company">
            Company
          </Link>
        </ul>
        <ul id={styles.socials}>
          <li className={styles.heading}>Socials</li>
          <Link
            className={styles.subHeading}
            target="_blank"
            href="https://www.facebook.com/people/Fipezo/100094694632348/?mibextid=ZbWKwL"
          >
            Facebook
          </Link>
          <Link
            className={styles.subHeading}
            target="_blank"
            href="https://www.instagram.com/fipezoindia"
          >
            Instagram
          </Link>
          <Link
            className={styles.subHeading}
            target="_blank"
            href="https://twitter.com/fipezoindia"
          >
            Twitter
          </Link>
        </ul>
      </div>
      {/* <hr className={styles.divider} />
      <div className="flex flex-col justify-between">
        <h1 className="mb-4 whitespace-nowrap text-lg capitalize font-medium">
          what can you expect in kolkata!
        </h1>
        <ul className="flex items-center justify-between">
          <li className="capitalize text-slate-500">
            <Link
              href={"/explore/freelancer/photographer"}
              onClick={() => handleStates("Kolkata")}
            >
              top photographers in kolkata
            </Link>
          </li>
          <li className="capitalize text-slate-500">
            <Link
              href={"/explore/freelancer/model"}
              onClick={() => handleStates("Kolkata")}
            >
              top models in kolkata
            </Link>
          </li>
          <li className="capitalize text-slate-500">
            <Link
              href={"/explore/freelancer/makeup_artist"}
              onClick={() => handleStates("Kolkata")}
            >
              top make up artists in kolkata
            </Link>
          </li>
          <li className="capitalize text-slate-500">
            <Link
              href={"/explore/freelancer/freelancer/dancer"}
              onClick={() => handleStates("Kolkata")}
            >
              top dancers in kolkata
            </Link>
          </li>
        </ul>
      </div> */}
      {!router.pathname.includes("/explore/freelancer") && (
        <>
          <hr className={styles.divider} />
          <div className={styles.middle}>
            <h1 className={styles.middleHeading}>find in</h1>
            <div className={styles.stateBox}>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Agra")}
              >
                agra
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Ahemdabad")}
              >
                ahemdabad
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Amritsar")}
              >
                amritsar
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Auranghabad")}
              >
                aurangabad
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Bengaluru")}
              >
                bengaluru
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Bhopal")}
              >
                bhopal
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Bhubaneswar")}
              >
                bhubaneswar
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Burdwan")}
              >
                burdwan
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Chandigarh")}
              >
                chandigarh
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Chennai")}
              >
                chennai
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Coimbatore")}
              >
                coimbatore
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Dehradun")}
              >
                dehradun
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Durgapur")}
              >
                durgapur
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Faridabad")}
              >
                faridabad
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Ghaziabad")}
              >
                ghaziabad
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Guwahati")}
              >
                guwahati
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Gwalior")}
              >
                gwalior
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Hyderabad")}
              >
                hyderabad
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Indore")}
              >
                indore
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Jaipur")}
              >
                jaipur
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Jamshedpur")}
              >
                jamshedpur
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Jodhpur")}
              >
                jodhpur
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Kanpur")}
              >
                kanpur
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Kochi")}
              >
                kochi
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Kolkata")}
              >
                kolkata
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Ludhiana")}
              >
                ludhiana
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Lucknow")}
              >
                lucknow
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Madurai")}
              >
                madurai
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Mangaluru")}
              >
                mangaluru
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Meerut")}
              >
                meerut
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Mumbai")}
              >
                mumbai
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Mysuru")}
              >
                mysuru
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Nagpur")}
              >
                nagpur
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Nashik")}
              >
                nashik
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Navi Mumbai")}
              >
                navi mumbai
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("New Delhi")}
              >
                new delhi
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Patna")}
              >
                patna
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Prayagraj")}
              >
                prayagraj
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Puducherry")}
              >
                puducherry
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Pune")}
              >
                pune
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Raipur")}
              >
                raipur
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Rajkot")}
              >
                rajkot
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Ranchi")}
              >
                ranchi
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Siliguri")}
              >
                siliguri
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Surat")}
              >
                surat
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Thane")}
              >
                thane
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Thiruvananthapuram")}
              >
                thiruvananthapuram
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Udaipur")}
              >
                udaipur
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Vadodara")}
              >
                vadodara
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Varanasi")}
              >
                varanasi
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Vijayawada")}
              >
                vijayawada
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Visakhapatnam")}
              >
                visakhapatnam
              </Link>
              <Link
                href="/explore/freelancer"
                onClick={() => handleStates("Warangal")}
              >
                warangal
              </Link>
            </div>
          </div>
        </>
      )}
      <hr className={styles.divider} />
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
    </div>
  );
}

export default Footer;
