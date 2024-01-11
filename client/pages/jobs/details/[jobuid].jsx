import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillProfile } from "react-icons/ai";
import { BiBriefcase, BiTimeFive } from "react-icons/bi";
import {
  BsCash,
  BsFillShareFill,
  BsPostageHeart,
  BsStopCircle,
} from "react-icons/bs";
import { FaPlaceOfWorship } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import {
  MdDateRange,
  MdOutlineNotStarted,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { RWebShare } from "react-web-share";
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
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoginType(JSON.parse(localStorage.getItem("type")));
    setUrl(window.location.origin + "/jobs/details/" + props.data.uid);
    props.data.appliedFreelancers.forEach((element) => {
      if (props.user?._id === element._id) {
        setIsApplied(true);
      }
    });
  }, [props.data.appliedFreelancers, props.data.uid]);

  const applyJob = async (e) => {
    setLoading(true);
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
        setLoading(false);
        const res = await fetch(
          `${process.env.SERVER_URL}/notification/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "Job apply",
              headline: `${props.user.firstname} ${props.user.lastname} applied to your posted job`,
              acceptedCompany: props.data.createdCompany._id,
              sentFreelancer: props.user._id,
              href: "/posted-jobs",
            }),
          }
        );
        const data = await res.json();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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

        <meta
          property="og:image"
          content={`https://fipezo.com/Fipezo-Jobs.png`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg" />

        <meta property="og:url" content="https://fipezo.com/" />
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
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="mt-16 flex bg-gradient-to-r from-white to-rose-400 items-center justify-between p-2 lg:p-4 border lg:w-2/3 lg:gap-2">
          <div className="flex flex-col gap-1 lg:gap-3">
            <h4 className="text-base lg:text-xl font-semibold">
              Want to increase your earnings up to{" "}
              <span className="text-2xl text-orange-500">10x</span>
            </h4>
            <p className="text-sm lg:text-2xl font-semibold text-blue-500">
              Join Fipezo as a freelancer
            </p>
            <p className="text-sm lg:text-xl font-semibold">
              Create account for free
            </p>
          </div>
          <Link
            href="/register/freelancer"
            className="px-2 lg:px-4 py-1 lg:py-2 capitalize bg-blue-500 text-white rounded-md font-medium text-sm lg:text-lg whitespace-nowrap"
          >
            try now
          </Link>
          <Image
            src="/job-details-banner.png"
            width={150}
            height={150}
            alt="job-vector"
            className="w-20 lg:w-32"
          />
        </div>
        <div>
          <h1 className="font-bold text-center text-lg lg:text-2xl">
            {props.data.title} job in {props.data.location} at{" "}
            {props.data.createdCompany.companyname}
          </h1>
        </div>
        <div className="flex flex-col items-start p-8 gap-3 relative border lg:w-2/3">
          <div className="p-1 lg:p-2 border border-red-600 flex items-center gap-2 text-red-600">
            <BsStopCircle />
            {Final_Result > 0 ? `${Final_Result} days left` : `Expired`}
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
            {props.data.eventType && (
              <div className="flex flex-col items-start lg:text-lg">
                <div className="flex items-center gap-1 capitalize">
                  <BsPostageHeart />
                  event type
                </div>
                <p className="capitalize">{props.data.eventType}</p>
              </div>
            )}
            {JSON.parse(props.data?.eventTime)?.startTime &&
              JSON.parse(props.data?.eventTime)?.endTime && (
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
              )}
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start lg:text-lg">
              <div className="flex items-center gap-1 capitalize">
                <MdOutlinePeopleAlt />
                applicants
              </div>
              <p className="">{props.data.appliedFreelancers.length}</p>
            </div>
            <div>
              <RWebShare
                data={{
                  text:
                    "Share job details of " +
                    props.data.title +
                    " on your social media!",
                  url: url,
                  title: "Fipezo",
                }}
              >
                <button
                  type="button"
                  className="w-12 h-12 flex items-center justify-center hover:bg-neutral-300 px-2 py-1 rounded-full"
                >
                  <BsFillShareFill style={{ color: "blue" }} />
                </button>
              </RWebShare>
            </div>
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
          {!props.user && !props.company && (
            <>
              <hr className="h-[1px] w-full bg-neutral-400" />
              <div className="self-center">
                <Link
                  href="/login"
                  className="bg-[#338ef4] disabled:bg-neutral-600 disabled:cursor-not-allowed capitalize px-4 py-2 text-white font-semibold lg:text-xl rounded-md"
                >
                  apply now
                </Link>
              </div>
            </>
          )}
          {props.user?.uid && (
            <>
              <hr className="h-[1px] w-full bg-neutral-400" />
              <div className="self-center">
                {loading === false ? (
                  <button
                    type="button"
                    className="bg-[#338ef4] disabled:bg-neutral-600 disabled:cursor-not-allowed capitalize px-4 py-2 text-white font-semibold lg:text-xl rounded-md"
                    disabled={
                      Final_Result > 0 && isApplied === false ? false : true
                    }
                    onClick={applyJob}
                  >
                    {isApplied === false ? "apply now" : "applied"}
                  </button>
                ) : (
                  <Image
                    src="/mini-loading.gif"
                    width={80}
                    height={80}
                    alt="loading"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Jobuid;
