import React, { useState } from "react";
import styles from "../../styles/Careers.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BiMedal } from "react-icons/bi";
import Head from "next/head";
import { BsPersonBadgeFill } from "react-icons/bs";
import { RiUserVoiceFill } from "react-icons/ri";
import { FaLightbulb } from "react-icons/fa";
import Link from "next/link";

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
      <div className="md:bg-[url('/carrer-bg.png')] bg-cover bg-bottom bg-no-repeat min-h-[50vh] md:min-h-screen flex items-start justify-center will-change-[background-size] md:fixed top-2 left-0 w-full -z-10">
        <div className="flex flex-col items-center justify-center gap-8 mt-16">
          <h1 className="capitalize text-3xl text-center md:text-6xl mt-16 font-bold montserrat flex flex-col items-center justify-center gap-2">
            Let&apos;s Revolutionize Freelancing
            <span className="text-red- normal-case">
              for India
              <span className="bg-red-500 w-2 h-2 inline-block rounded-full ml-1"></span>
            </span>
          </h1>
          <Link
            href="/careers/all"
            className="uppercase px-6 py-3 text-xl bg-blue-500 text-white rounded-lg font-semibold"
          >
            explore openings
          </Link>
        </div>
      </div>
      <div
        className="h-screen bg-black text-white px-8 md:px-28 flex flex-col items-center justify-center mt-0 md:mt-[50vw]"
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
      <div className="h-[85vh] flex items-center justify-center gap-32 bg-white">
        <div className="flex flex-col items-center md:items-start gap-8 md:gap-4 mx-4 md:mx-0">
          <h2 className="font-bold text-3xl md:text-4xl relative">
            Tough, but worth it
          </h2>
          <p className="text-base md:text-lg font-medium md:w-[30rem]">
            At Fipezo, we face challenges together, and create a team
            that&apos;s collaborative and supportive.
            <br />
            <br />
            Join a family that promotes growth, and is dedicated to shaping the
            future of freelancing in India.
          </p>
        </div>
        <div className="relative min-w-fit hidden md:block">
          <Image
            src="/india_map_career.png"
            alt="India Map"
            width={550}
            height={950}
            className="w-[30rem] opacity-60"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 bg-black text-white py-20">
        <h1 className="text-3xl md:text-5xl mb-6 font-bold text-center">
          Why you should join Fipezo?
        </h1>
        <div className="flex items-center justify-center md:justify-between gap-8 flex-wrap">
          <div className="flex flex-col items-start p-8 w-60 rounded-3xl bg-[#1f212a] gap-4">
            <RiUserVoiceFill className="text-4xl " />
            <p className="text-xl capitalize">innovative Platform</p>
          </div>
          <div className="flex flex-col items-start p-8 w-60 rounded-3xl bg-[#1f212a] gap-4">
            <BsPersonBadgeFill className="text-4xl " />
            <p className="text-xl">Collaborative Culture</p>
          </div>
          <div className="flex flex-col items-start p-8 w-60 rounded-3xl bg-[#1f212a] gap-4">
            <BiMedal className="text-4xl " />
            <p className="text-xl">Growth Opportunities</p>
          </div>
          <div className="flex flex-col items-start p-8 h-44 w-60 rounded-3xl bg-[#1f212a] gap-4">
            <FaLightbulb className="text-4xl " />
            <p className="text-xl">Impactful Work. Learn, and grow.</p>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-normal gap-8 my-6 flex-wrap">
          <div className="bg-[url('/career1.png')] bg-cover bg-no-repeat h-80 w-52 rounded-2xl transition-transform hover:scale-110 duration-300"></div>
          <div className="flex flex-col items-start">
            <div className="h-0 md:h-28"></div>
            <div className="bg-[url('/career2.png')] bg-cover bg-no-repeat h-80 w-52 rounded-2xl transition-transform hover:scale-110 duration-300"></div>
          </div>
          <div className="bg-[url('/career3.png')] bg-cover bg-no-repeat h-80 w-52 rounded-2xl transition-transform hover:scale-110 duration-300"></div>
          <div className="flex flex-col items-start">
            <div className="h-0 md:h-28"></div>
            <div className="bg-[url('/career4.png')] bg-cover bg-no-repeat h-80 w-52 rounded-2xl transition-transform hover:scale-110 duration-300"></div>
          </div>
          <div className="bg-[url('/career5.png')] bg-cover bg-no-repeat h-80 w-52 rounded-2xl transition-transform hover:scale-110 duration-300"></div>
          <div className="flex flex-col items-start">
            <div className="h-0 md:h-28"></div>
            <div className="bg-[url('/career6.png')] bg-cover bg-no-repeat h-80 w-52 rounded-2xl transition-transform hover:scale-110 duration-300"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-black text-white p-8 gap-6">
        <div className="w-full h-16"></div>
        <h1 className="text-3xl md:text-5xl font-bold relative">
          Join Fipezo Team
        </h1>
        <p className="text-base md:text-xl text-center md:w-[55rem]">
          Dive into our talent pool by sending in your resume. We&apos;ll keep
          you in the loop about fresh job opportunities that align with your
          skills and give you a heads up if you&apos;re the perfect match for
          any of our available positions.
        </p>
        <Link
          href="/careers/all"
          className="capitalize text-lg font-semibold md:text-2xl bg-blue-600 rounded-2xl px-3 md:px-6 py-1 md:py-3 flex items-center gap-1"
        >
          explore openings
        </Link>
        <div className="w-full h-16"></div>
      </div>
      <Footer premium={props.user?.premium} />
      {/* {showJoinForm === true && <CVSubmit closeModal={setShowJoinForm} />} */}
    </div>
  );
}

export default Careers;
