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
      <div className="bg-[url('/carrer-bg.png')] bg-fixed bg-cover bg-bottom bg-no-repeat h-screen flex items-start mt-20 justify-center">
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="capitalize text-3xl text-center md:text-6xl mt-16 font-bold montserrat">
            Making freelancing simplified<span className="text-red-500">!</span>
          </h1>
          <a
            href="#open"
            className="capitalize px-6 py-3 text-xl bg-blue-500 text-white rounded-lg font-semibold"
          >
            explore openings
          </a>
        </div>
      </div>
      <div
        className="h-screen bg-black text-white px-8 md:px-28 flex flex-col items-center justify-center"
        id="open"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-8">
          <h2 className="text-6xl md:text-8xl capitalize font-bold ">
            Join Fipezo{" "}
            <span className="inline-block [-webkit-box-reflect:_below_0px_linear-gradient(to_bottom,_rgba(0,0,0,0.0),_rgba(0,0,0,0.35))]">
              team.
            </span>
          </h2>
          <p className="text-base md:text-xl flex flex-col items-start justify-between gap-8 self-end py-2">
            Are you ready to be part of an exciting journey? At Fipezo,
            we&apos;re not just offering jobs; we&apos;re inviting passionate
            individuals to join our dynamic team. If you&apos;re enthusiastic,
            innovative, and ready to make a meaningful impact in the world of
            freelancing, Fipezo is the place for you!
            <span className="font-bold md:text-3xl">
              Join Fipezo Team today and let&apos;s create success together!
            </span>
          </p>
        </div>
      </div>
      <div className="m-4 flex flex-col items-center gap-4">
        <h2 className="text-3xl md:text-5xl my-4 capitalize font-bold">
          open vacancies
        </h2>
        <div className="flex flex-wrap items-center justify-around gap-8">
          <div className="flex items-center flex-col">
            <Image
              src="/app_dev_carrer.png"
              width={500}
              height={315}
              alt="app developer"
              className="w-40 md:w-80"
            />
            <div className="flex flex-col">
              <p className="text-2xl md:text-4xl capitalize font-bold my-4">
                App developer
              </p>
              <p className="capitalize text-base md:text-xl font-semibold">
                experience: <span className="font-normal">1 year</span>
              </p>
              <p className="capitalize text-base md:text-xl font-semibold">
                mode: <span className="font-normal">work from office</span>
              </p>
              <Link
                href=""
                className="text-base md:text-xl capitalize px-2 py-1 bg-blue-600 font-bold my-4 text-white self-center rounded-lg"
              >
                learn more...
              </Link>
            </div>
          </div>
          <div className="flex items-center flex-col">
            <Image
              src="/web_dev_career.png"
              width={500}
              height={315}
              alt="app developer"
              className="w-40 md:w-80"
            />
            <div className="flex flex-col">
              <p className="text-2xl md:text-4xl capitalize font-bold my-4">
                web developer
              </p>
              <p className="capitalize text-base md:text-xl font-semibold">
                experience: <span className="font-normal">1 year</span>
              </p>
              <p className="capitalize text-base md:text-xl font-semibold">
                mode: <span className="font-normal">work from office</span>
              </p>
              <Link
                href=""
                className="text-base md:text-xl capitalize px-2 py-1 bg-blue-600 font-bold my-4 text-white self-center rounded-lg"
              >
                learn more...
              </Link>
            </div>
          </div>
          <div className="flex items-center flex-col">
            <Image
              src="/project-manager.png"
              width={500}
              height={315}
              alt="project manager"
              className="w-40 md:w-80"
            />
            <div className="flex flex-col">
              <p className="text-2xl md:text-4xl capitalize font-bold my-4">
                project manager
              </p>
              <p className="capitalize text-base md:text-xl font-semibold">
                experience: <span className="font-normal">1 year</span>
              </p>
              <p className="capitalize text-base md:text-xl font-semibold">
                mode: <span className="font-normal">work from office</span>
              </p>
              <Link
                href=""
                className="text-base md:text-xl capitalize px-2 py-1 bg-blue-600 font-bold my-4 text-white self-center rounded-lg"
              >
                learn more...
              </Link>
            </div>
          </div>
          <div className="flex items-center flex-col">
            <Image
              src="/social-media-executive-career.png"
              width={500}
              height={315}
              alt="social media executive"
              className="w-40 md:w-80"
            />
            <div className="flex flex-col">
              <p className="text-2xl md:text-4xl capitalize font-bold my-4">
                social media executive
              </p>
              <p className="capitalize text-base md:text-xl font-semibold">
                experience: <span className="font-normal">1 year</span>
              </p>
              <p className="capitalize text-base md:text-xl font-semibold">
                mode: <span className="font-normal">work from office</span>
              </p>
              <Link
                href=""
                className="text-base md:text-xl capitalize px-2 py-1 bg-blue-600 font-bold my-4 text-white self-center rounded-lg"
              >
                learn more...
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Careers;
