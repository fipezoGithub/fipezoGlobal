import React from "react";
import styles from "../styles/Careers.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Head from "next/head";

function Careers(props) {
  return (
    <div className={styles.careersPage}>
      <Head>
        <title>Fipezo | Join Our Team at Fipezo</title>
        <meta
          name="description"
          content="At Fipezo, we believe that our people are the driving force behind our success. If you're looking for more than just a job, but a meaningful career where you can make a real impact, you've come to the right place.Join our team and be part of a dynamic and innovative company that values your skills, talents, and aspirations. Our commitment to excellence, diversity, and inclusion makes Fipezo a fantastic place to grow professionally and personally."
        />
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className={styles.body}>
        <h1 className={styles.h1}>Join Our Team</h1>
        <div className={styles.imageContainer}>
          <Image
            src="/careers.webp"
            alt="No Jobs Available"
            width={500}
            height={500}
          />
        </div>

        <div className={`flex flex-col items-center ${styles.p}`}>
          <h2 className="text-center text-xl font-semibold">
            Current Job Openings:
          </h2>
          <br />
          <ul className="flex flex-wrap gap-4 justify-center lg:w-2/3">
            <li className="my-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-xs">
                Web Developer
              </button>
            </li>
            <li className="my-2">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-xs">
                UI/UX Designer
              </button>
            </li>
            <li className="my-2">
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded text-xs">
                App Developer
              </button>
            </li>
            <li className="my-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-xs">
                Management
              </button>
            </li>
            <li className="my-2">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-xs">
                Operations Head
              </button>
            </li>
          </ul>
        </div>

        <p className={styles.p}>
          We are hiring! If you are a talented individual looking for exciting
          opportunities, we&apos;d love to hear from you.
        </p>
        <p className={styles.p}>
          Feel free to send us your resume for future consideration at{" "}
          <Link href="mailto:careers@fipezo.com">careers@fipezo.com</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Careers;
