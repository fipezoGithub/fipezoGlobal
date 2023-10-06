import React, { useEffect, useState } from "react";
import { BsCash, BsStopCircle } from "react-icons/bs";
import { IoLocationSharp, IoPricetags } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { MdDateRange, MdOutlineNotStarted, MdPeopleAlt } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { AiFillProfile } from "react-icons/ai";
const Jobcard = ({ job }) => {
  const [loginType, setLoginType] = useState("");
  useEffect(() => {
    setLoginType(JSON.parse(localStorage.getItem("type")));
  }, []);
  const profession = job.profession
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  let one_day = 1000 * 60 * 60 * 24;
  let a = new Date(job.date[0]);
  let today = new Date();
  var Result = Math.round(a.getTime() - today.getTime()) / one_day;
  var Final_Result = Result.toFixed(0);
  return (
    <div className="flex flex-col items-start border rounded-lg shadow-md p-4 gap-3 w-2/3">
      <div className="p-2 border border-red-600 flex items-center gap-2 text-red-600">
        <BsStopCircle />
        {Final_Result} days left
      </div>
      <div className="flex items-start gap-4 justify-between w-full">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">{job.title}</h3>
          <Link
            href={`/company/${job.createdCompany.uid}`}
            className="text-lg font-bold text-neutral-600"
          >
            {job.createdCompany.companyname}
          </Link>
        </div>
        <div>
          <Image
            src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${job.createdCompany.profilePicture}`}
            width={100}
            height={100}
            alt="company profile picture"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <IoLocationSharp />
        <p className="capitalize">{job.location}</p>
      </div>
      <div className="flex items-center justify-around gap-6">
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <MdOutlineNotStarted />
            date
          </div>
          <div className="flex items-center gap-2">
            {job.date.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <BsCash />
            budget
          </div>
          <p>{job.budget}</p>
        </div>
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <GrGroup />
            vacancy
          </div>
          <p>{job.vacancy}</p>
        </div>
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <AiFillProfile />
            profession
          </div>
          <p className="capitalize">{profession}</p>
        </div>
      </div>
      <div className="flex flex-col items-start lg:text-lg">
        <div className="flex items-center gap-1 capitalize">
          <MdDateRange />
          posted at
        </div>
        <p className="">
          {new Date(job.createdAt).toLocaleString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      {loginType === "freelancer" && (
        <>
          <hr className="h-[1px] w-full bg-neutral-400" />
          <div className="self-end">
            <button
              type="button"
              className="bg-[#338ef4] capitalize px-4 py-2 text-white font-semibold lg:text-xl rounded-md"
            >
              apply
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Jobcard;
