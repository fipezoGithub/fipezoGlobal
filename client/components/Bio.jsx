import Image from "next/image";
import styles from "../styles/Bio.module.css";
import { IoLocationSharp } from "react-icons/io5";

export default function Bio() {
  return (
    <div className={styles.bio}>
      <div className={styles.fade}>
        <div className={styles.picturesNText}>
          <div className={styles.pictures}>
            <h1 className={styles.heading} id={styles.head}>
              Your Go-To Platform for Online Freelancer Hiring and Freelance Job
              Search
            </h1>
            <p className={styles.subHeading}>
              Find the Right Freelancer Online for Your Project with Our
              Easy-to-Use Platform
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
            <h1 className={styles.boxheading}>All Verified Freelancers</h1>
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
