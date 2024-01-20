import Image from "next/image";
import styles from "../styles/Bio.module.css";
import { IoLocationSharp } from "react-icons/io5";

export default function Bio() {
  return (
    <div className={styles.bio}>
      <div className={styles.fade}>
        <div className={styles.picturesNText}>
          <div className={styles.pictures}>
            <h1 className={styles.heading + " montserrat"} id={styles.head}>
              Unlock Your Potential! Find Freelancers in India and Explore
              High-Paying Freelance Jobs Online with Fipezo!
            </h1>
            <p className={styles.subHeading}>
              Discover talent on Fipezo - where top freelancers in India await.
              From freelance graphic designers to freelance content writers and
              video editors, find the best for your projects. Elevate your work
              with Fipezo, a booming freelance marketplace.
            </p>
            <button className={styles.button}>
              <span className={styles.location}>
                <IoLocationSharp id={styles.location} />
              </span>
              <span className={styles.span}>India</span>
            </button>
          </div>
          <div className={styles.Text}>
            <h1 className={styles.boxtext}>Fipezo</h1>
            <h1 className={styles.boxheading + " montserrat"}>
              All Verified Freelancers
            </h1>
            <div className={styles.container}>
              <p className={styles.boxsubheading}>
                {" "}
                We prioritize quality over quantity, ensuring every professional
                freelancer on our platform is carefully verified. You can trust
                our skilled professionals to consistently deliver top-notch
                results.
              </p>
            </div>
            <div className={styles.images}>
              <Image
                id={styles.photographer}
                src="/person1.jpg"
                width={300}
                height={300}
                alt="person-image"
              />
              <Image
                id={styles.cinematographer}
                src="/cover05.jpg"
                width={300}
                height={300}
                alt="drone-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.circle}></div>
    </div>
  );
}
