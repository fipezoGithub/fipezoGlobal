import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
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
  MdMessage,
  MdOutlineNotStarted,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { RWebShare } from "react-web-share";
export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/job/get/${ctx.query.jobuid}`
  );
  const pageData = await response.json();
  return { props: { pageData } };
};
const Jobuid = (props) => {
  const [isApplied, setIsApplied] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data } = useContext(AuthContext);

  useEffect(() => {
    setUrl(window.location.origin + "/jobs/details/" + props.pageData.uid);
    props.pageData.appliedFreelancers.forEach((element) => {
      if (data.userDetails?._id === element._id) {
        setIsApplied(true);
      }
    });
  }, [props.pageData.appliedFreelancers, props.pageData.uid]);

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
        body: JSON.stringify({ jobid: props.pageData._id }),
      });
      const respData = await res.json();
      if (respData) {
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
              headline: `${data.userDetails.firstname} ${data.userDetails.lastname} applied to your posted job`,
              acceptedCompany: props.pageData.createdCompany._id,
              sentFreelancer: data.userDetails._id,
              href: "/posted-jobs",
            }),
          }
        );
        const respData = await res.json();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const createChatRoom = async () => {
    if (!data.isLoggedIn) {
      router.push("/login");
    }
    try {
      const res = await fetch(`${process.env.SERVER_URL}/createmessagebox`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: (
            data.userDetails.phone + props.pageData.createdCompany.companyphone
          ).toString(),
          company: props.pageData.createdCompany._id,
          freelancer: data.userDetails._id,
        }),
      });
      const respData = await res.json();
      if (res.ok) {
        router.push(
          `/chats/${data.userDetails.uid}+${props.pageData.createdCompany.uid}/${respData.messageId}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const profession = props.pageData.profession
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  let one_day = 1000 * 60 * 60 * 24;
  let a = new Date(props.pageData.dueDate);
  let today = new Date();
  var Result = Math.round(a.getTime() - today.getTime()) / one_day;
  var Final_Result = Result.toFixed(0);

  return (
    <>
      <Head>
        <meta name='description' content={props.pageData.description}></meta>
        <meta
          property='og:title'
          content={
            props.pageData.title +
            " job at " +
            props.pageData.createdCompany.companyname
          }
        />

        <meta property='og:description' content={props.pageData.description} />

        <meta
          property='og:image'
          content={`https://fipezo.com/Fipezo-Jobs.png`}
        />

        <meta property='og:type' content='website' />
        <meta property='og:image:type' content='image/jpeg' />

        <meta property='og:url' content='https://fipezo.com/' />
        <title>
          {props.pageData.title +
            " job at " +
            props.pageData.createdCompany.companyname}
        </title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      <div className='flex flex-col items-center justify-center gap-8'>
        <div className='mt-16 flex bg-gradient-to-r from-white to-rose-400 items-center justify-between p-2 lg:p-4 border lg:w-2/3 lg:gap-2'>
          <div className='flex flex-col gap-1 lg:gap-3'>
            <h4 className='text-base lg:text-xl font-semibold'>
              Want to increase your earnings up to{" "}
              <span className='text-2xl text-orange-500'>10x</span>
            </h4>
            <p className='text-sm lg:text-2xl font-semibold text-blue-500'>
              Join Fipezo as a freelancer
            </p>
            <p className='text-sm lg:text-xl font-semibold'>
              Create account for free
            </p>
          </div>
          <Link
            href='/register/freelancer'
            className='px-2 lg:px-4 py-1 lg:py-2 capitalize bg-blue-500 text-white rounded-md font-medium text-sm lg:text-lg whitespace-nowrap'
          >
            try now
          </Link>
          <Image
            src='/job-details-banner.png'
            width={150}
            height={150}
            alt='job-vector'
            className='w-20 lg:w-32'
          />
        </div>
        <div>
          <h1 className='font-bold text-center text-lg lg:text-2xl'>
            {props.pageData.title} job in {props.pageData.location} at{" "}
            {props.pageData.createdCompany.companyname}
          </h1>
        </div>
        <div className='flex flex-col items-start p-8 gap-3 relative border lg:w-2/3'>
          <div
            className={
              "p-1 lg:p-2 border flex items-center gap-2" +
              (Final_Result > 0
                ? " border-green-500 text-green-500"
                : " border-red-600 text-red-600")
            }
          >
            <BsStopCircle />
            {Final_Result > 0 ? `${Final_Result} days left` : `Expired`}
          </div>
          <div className='flex items-start gap-4 justify-between w-full'>
            <div className='flex flex-col'>
              <h3 className='lg:text-2xl font-bold'>{props.pageData.title}</h3>
              <Link
                href={`/company/${props.pageData.createdCompany.uid}`}
                className='text-sm lg:text-lg font-bold text-neutral-600'
              >
                {props.pageData.createdCompany.companyname}
              </Link>
            </div>
            <div>
              <Image
                src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.pageData.createdCompany.profilePicture}`}
                width={70}
                height={70}
                alt='company profile picture'
                className='rounded-full'
              />
            </div>
          </div>
          <div className='flex items-start w-full'>
            <p className='lg:text-lg'>{props.pageData.description}</p>
          </div>
          <div className='flex items-center gap-1'>
            <IoLocationSharp />
            <p className='capitalize'>{props.pageData.location}</p>
          </div>
          <div className='flex items-start lg:justify-around gap-6 flex-wrap lg:flex-nowrap'>
            <div className='flex flex-col items-start lg:text-lg'>
              <div className='flex items-center gap-1 capitalize'>
                <MdOutlineNotStarted />
                date
              </div>
              <div className='flex items-center flex-col gap-2'>
                <p>{props.pageData.date?.split("-").reverse().join("-")}</p>
              </div>
            </div>
            <div className='flex flex-col items-start lg:text-lg'>
              <div className='flex items-center gap-1 capitalize'>
                <BsCash />
                budget
              </div>
              <p>{props.pageData.budget}</p>
            </div>
            <div className='flex flex-col items-start lg:text-lg'>
              <div className='flex items-center gap-1 capitalize'>
                <GrGroup />
                vacancy
              </div>
              <p>{props.pageData.vacancy}</p>
            </div>
            <div className='flex flex-col items-start lg:text-lg'>
              <div className='flex items-center gap-1 capitalize'>
                <AiFillProfile />
                profession
              </div>
              <p className='capitalize'>{profession}</p>
            </div>
            <div className='flex flex-col items-start lg:text-lg'>
              <div className='flex items-center gap-1 capitalize'>
                <FaPlaceOfWorship />
                venue
              </div>
              <p className='capitalize'>{props.pageData.venue}</p>
            </div>
            {props.pageData.eventType && (
              <div className='flex flex-col items-start lg:text-lg'>
                <div className='flex items-center gap-1 capitalize'>
                  <BsPostageHeart />
                  event type
                </div>
                <p className='capitalize'>{props.pageData.eventType}</p>
              </div>
            )}
            {JSON.parse(props.pageData?.eventTime)?.startTime &&
              JSON.parse(props.pageData?.eventTime)?.endTime && (
                <div className='flex flex-col items-start lg:text-lg'>
                  <div className='flex items-center gap-1 capitalize'>
                    <BiTimeFive />
                    event time
                  </div>
                  <div className='flex items-center gap-4'>
                    <div>
                      <h4 className='capitalize'>start time</h4>
                      <p>{JSON.parse(props.pageData?.eventTime)?.startTime}</p>
                    </div>
                    <div>
                      <h4 className='capitalize'>end time</h4>
                      <p>{JSON.parse(props.pageData?.eventTime)?.endTime}</p>
                    </div>
                  </div>
                </div>
              )}
          </div>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col items-start lg:text-lg'>
              <div className='flex items-center gap-1 capitalize'>
                <MdOutlinePeopleAlt />
                applicants
              </div>
              <p className=''>{props.pageData.appliedFreelancers.length}</p>
            </div>
            <div className='flex items-center gap-2'>
              <RWebShare
                data={{
                  text:
                    "Share job details of " +
                    props.pageData.title +
                    " on your social media!",
                  url: url,
                  title: "Fipezo",
                }}
              >
                <button
                  type='button'
                  className='flex w-12 h-12 items-center justify-center hover:bg-neutral-300 px-2 py-1 rounded-full'
                >
                  <BsFillShareFill style={{ color: "blue" }} size={"1.3em"} />
                </button>
              </RWebShare>
              <button
                type='button'
                onClick={createChatRoom}
                className='flex w-12 h-12 items-center justify-center hover:bg-neutral-300 px-2 py-1 rounded-full'
              >
                <MdMessage style={{ color: "blue" }} size={"1.5em"} />
              </button>
            </div>
          </div>
          <div className='flex flex-col items-start lg:text-lg'>
            <div className='flex items-center gap-1 capitalize'>
              <MdDateRange />
              posted at
            </div>
            <p className=''>
              {new Date(props.pageData.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className='flex flex-col items-start lg:text-lg gap-2'>
            <div className='flex items-center gap-1 capitalize'>
              <h3 className='font-bold capitalize lg:text-xl'>
                about {props.pageData.createdCompany.companyname}
              </h3>
            </div>
            <div>
              <p>{props.pageData.createdCompany.bio}</p>
            </div>
            <div className='flex items-center gap-4'>
              <BiBriefcase />
              <p>
                {props.pageData.createdCompany.jobPosted.length} jobs posted
              </p>
            </div>
          </div>
          {!data.userDetails && (
            <>
              <hr className='h-[1px] w-full bg-neutral-400' />
              <div className='self-center'>
                <Link
                  href='/login'
                  className='bg-[#338ef4] disabled:bg-neutral-600 disabled:cursor-not-allowed capitalize px-4 py-2 text-white font-semibold lg:text-xl rounded-md'
                >
                  apply now
                </Link>
              </div>
            </>
          )}
          {!data.userDetails?.companyname && data.userDetails?.uid && (
            <>
              <hr className='h-[1px] w-full bg-neutral-400' />
              <div className='self-center'>
                {loading === false ? (
                  <button
                    type='button'
                    className='bg-[#338ef4] disabled:bg-neutral-600 disabled:cursor-not-allowed capitalize px-4 py-2 text-white font-semibold lg:text-xl rounded-md'
                    disabled={
                      Final_Result > 0 && isApplied === false ? false : true
                    }
                    onClick={applyJob}
                  >
                    {isApplied === false ? "apply now" : "applied"}
                  </button>
                ) : (
                  <Image
                    src='/mini-loading.gif'
                    width={80}
                    height={80}
                    alt='loading'
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
