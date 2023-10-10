import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillProfile } from "react-icons/ai";
import { BiBriefcase, BiTimeFive } from "react-icons/bi";
import { BsCash, BsPostageHeart, BsStopCircle } from "react-icons/bs";
import { FaPlaceOfWorship } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import {
  MdDateRange,
  MdOutlineNotStarted,
  MdOutlinePeopleAlt,
} from "react-icons/md";
export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/job/get/${ctx.query.jobuid}`
  );
  const data = await response.json();
  return { props: { data } };
};
const Jobuid = (props) => {
  const [loginType, setLoginType] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    setLoginType(JSON.parse(localStorage.getItem("type")));
    props.data.appliedFreelancers.forEach((element) => {
      if (props.user?._id === element._id) {
        setIsApplied(true);
      }
    });
  }, []);
  const applyJob = async (e) => {
    e.target.disabled = true;
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(`${process.env.SERVER_URL}/job/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobid: props.data._id }),
      });
      const data = await res.json();
      if (data) {
        setIsApplied(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const profession = props.data.profession
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  let one_day = 1000 * 60 * 60 * 24;
  let a = new Date(props.data.dueDate);
  let today = new Date();
  var Result = Math.round(a.getTime() - today.getTime()) / one_day;
  var Final_Result = Result.toFixed(0);
  return (
    <>
      <Head>
        <meta name="description" content={props.data.description}></meta>
        <meta
          property="og:title"
          content={
            props.data.title +
            " job at " +
            props.data.createdCompany.companyname
          }
        />

        <meta property="og:description" content={props.data.description} />

        <meta property="og:image" content={`/favi.png`} />

        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg" />

        <meta property="og:url" content="http://fipezo.com/" />
        <title>
          {props.data.title +
            " job at " +
            props.data.createdCompany.companyname}
        </title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 flex flex-col items-start p-8 gap-3 relative">
        <div className="p-1 lg:p-2 border border-red-600 flex items-center gap-2 text-red-600">
          <BsStopCircle />
          {Final_Result} days left
        </div>
        <div className="flex items-start gap-4 justify-between w-full">
          <div className="flex flex-col">
            <h3 className="lg:text-2xl font-bold">{props.data.title}</h3>
            <Link
              href={`/company/${props.data.createdCompany.uid}`}
              className="text-sm lg:text-lg font-bold text-neutral-600"
            >
              {props.data.createdCompany.companyname}
            </Link>
          </div>
          <div>
            <Image
              src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.data.createdCompany.profilePicture}`}
              width={70}
              height={70}
              alt="company profile picture"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex items-start w-full">
          <p className="lg:text-lg">{props.data.description}</p>
        </div>
        <div className="flex items-center gap-1">
          <IoLocationSharp />
          <p className="capitalize">{props.data.location}</p>
        </div>
        <div className="flex items-start lg:justify-around gap-6 flex-wrap lg:flex-nowrap">
          <div className="flex flex-col items-start lg:text-lg">
            <div className="flex items-center gap-1 capitalize">
              <MdOutlineNotStarted />
              date
            </div>
            <div className="flex items-center flex-col gap-2">
              <p>{props.data.date?.split("-").reverse().join("-")}</p>
            </div>
          </div>
          <div className="flex flex-col items-start lg:text-lg">
            <div className="flex items-center gap-1 capitalize">
              <BsCash />
              budget
            </div>
            <p>{props.data.budget}</p>
          </div>
          <div className="flex flex-col items-start lg:text-lg">
            <div className="flex items-center gap-1 capitalize">
              <GrGroup />
              vacancy
            </div>
            <p>{props.data.vacancy}</p>
          </div>
          <div className="flex flex-col items-start lg:text-lg">
            <div className="flex items-center gap-1 capitalize">
              <AiFillProfile />
              profession
            </div>
            <p className="capitalize">{profession}</p>
          </div>
          <div className="flex flex-col items-start lg:text-lg">
            <div className="flex items-center gap-1 capitalize">
              <FaPlaceOfWorship />
              venue
            </div>
            <p className="capitalize">{props.data.venue}</p>
          </div>
          <div className="flex flex-col items-start lg:text-lg">
            <div className="flex items-center gap-1 capitalize">
              <BsPostageHeart />
              event type
            </div>
            <p className="capitalize">{props.data.eventType}</p>
          </div>
          <div className="flex flex-col items-start lg:text-lg">
            <div className="flex items-center gap-1 capitalize">
              <BiTimeFive />
              event time
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h4 className="capitalize">start time</h4>
                <p>{JSON.parse(props.data?.eventTime)?.startTime}</p>
              </div>
              <div>
                <h4 className="capitalize">end time</h4>
                <p>{JSON.parse(props.data?.eventTime)?.endTime}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <MdOutlinePeopleAlt />
            applicants
          </div>
          <p className="">{props.data.appliedFreelancers.length}</p>
        </div>
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <MdDateRange />
            posted at
          </div>
          <p className="">
            {new Date(props.data.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex flex-col items-start lg:text-lg gap-2">
          <div className="flex items-center gap-1 capitalize">
            <h3 className="font-bold capitalize lg:text-xl">
              about {props.data.createdCompany.companyname}
            </h3>
          </div>
          <div>
            <p>{props.data.createdCompany.bio}</p>
          </div>
          <div className="flex items-center gap-4">
            <BiBriefcase />
            <p>{props.data.createdCompany.jobPosted.length} jobs posted</p>
          </div>
        </div>
        {loginType !== "company" && (
          <>
            <hr className="h-[1px] w-full bg-neutral-400" />
            <div className="self-center">
              <button
                type="button"
                className="bg-[#338ef4] disabled:bg-neutral-600 disabled:cursor-not-allowed capitalize px-4 py-2 text-white font-semibold lg:text-xl rounded-md"
                disabled={
                  loginType !== "freelancer" && isApplied === false
                    ? true
                    : false
                }
                onClick={applyJob}
              >
                {isApplied === false ? "apply" : "applied"}
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Jobuid;
