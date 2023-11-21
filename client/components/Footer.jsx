import styles from "../styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiTwotoneHeart } from "react-icons/ai";

function Footer(props) {
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
            href="/explore/freelancers/photographer"
            className={styles.subHeading}
          >
            Photographer
          </Link>
          <Link
            href="/explore/freelancers/cinematographer"
            className={styles.subHeading}
          >
            Cinematographer
          </Link>
          <Link
            href="/explore/freelancers/drone_operator"
            className={styles.subHeading}
          >
            Drone Operator
          </Link>
        </ul>
        <ul className={styles.law}>
          <li className={styles.heading}>Useful Links</li>
          <Link className={styles.subHeading} href="/referandearn">
            Refer and Earn
          </Link>
          <Link className={styles.subHeading} href="/sitemap">
            Sitemap
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
              href={"/explore/freelancers/photographer"}
              onClick={() => handleStates("Kolkata")}
            >
              top photographers in kolkata
            </Link>
          </li>
          <li className="capitalize text-slate-500">
            <Link
              href={"/explore/freelancers/model"}
              onClick={() => handleStates("Kolkata")}
            >
              top models in kolkata
            </Link>
          </li>
          <li className="capitalize text-slate-500">
            <Link
              href={"/explore/freelancers/makeup_artist"}
              onClick={() => handleStates("Kolkata")}
            >
              top make up artists in kolkata
            </Link>
          </li>
          <li className="capitalize text-slate-500">
            <Link
              href={"/explore/freelancers/freelancer/dancer"}
              onClick={() => handleStates("Kolkata")}
            >
              top dancers in kolkata
            </Link>
          </li>
        </ul>
      </div> */}
      {!router.pathname.includes("/explore/freelancers") && (
        <>
          <hr className={styles.divider} />
          <div className={styles.middle}>
            <h1 className={styles.middleHeading}>find in</h1>
            <div className={styles.stateBox}>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Agra")}
              >
                agra
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Ahemdabad")}
              >
                ahemdabad
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Amritsar")}
              >
                amritsar
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Auranghabad")}
              >
                aurangabad
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Bengaluru")}
              >
                bengaluru
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Bhopal")}
              >
                bhopal
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Bhubaneswar")}
              >
                bhubaneswar
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Burdwan")}
              >
                burdwan
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Chandigarh")}
              >
                chandigarh
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Chennai")}
              >
                chennai
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Coimbatore")}
              >
                coimbatore
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Dehradun")}
              >
                dehradun
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Durgapur")}
              >
                durgapur
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Faridabad")}
              >
                faridabad
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Ghaziabad")}
              >
                ghaziabad
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Guwahati")}
              >
                guwahati
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Gwalior")}
              >
                gwalior
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Hyderabad")}
              >
                hyderabad
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Indore")}
              >
                indore
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Jaipur")}
              >
                jaipur
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Jamshedpur")}
              >
                jamshedpur
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Jodhpur")}
              >
                jodhpur
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Kanpur")}
              >
                kanpur
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Kochi")}
              >
                kochi
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Kolkata")}
              >
                kolkata
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Ludhiana")}
              >
                ludhiana
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Lucknow")}
              >
                lucknow
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Madurai")}
              >
                madurai
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Mangaluru")}
              >
                mangaluru
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Meerut")}
              >
                meerut
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Mumbai")}
              >
                mumbai
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Mysuru")}
              >
                mysuru
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Nagpur")}
              >
                nagpur
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Nashik")}
              >
                nashik
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Navi Mumbai")}
              >
                navi mumbai
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("New Delhi")}
              >
                new delhi
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Patna")}
              >
                patna
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Prayagraj")}
              >
                prayagraj
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Puducherry")}
              >
                puducherry
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Pune")}
              >
                pune
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Raipur")}
              >
                raipur
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Rajkot")}
              >
                rajkot
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Ranchi")}
              >
                ranchi
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Siliguri")}
              >
                siliguri
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Surat")}
              >
                surat
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Thane")}
              >
                thane
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Thiruvananthapuram")}
              >
                thiruvananthapuram
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Udaipur")}
              >
                udaipur
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Vadodara")}
              >
                vadodara
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Varanasi")}
              >
                varanasi
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Vijayawada")}
              >
                vijayawada
              </Link>
              <Link
                href="/explore/freelancers"
                onClick={() => handleStates("Visakhapatnam")}
              >
                visakhapatnam
              </Link>
              <Link
                href="/explore/freelancers"
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
                src="/google-play-btn.png"
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
