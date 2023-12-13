import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const JobPostViewBox = (props) => {
  return (
    <Link
      href={`/careers/details/${props.job.uid}`}
      className="flex w-80 md:w-96 justify-between py-8 shadow-sm md:px-4 my-4"
    >
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-bold">{props.job.title}</h1>
        <p className="text-sm font-bold text-slate-500 tracking-wide">
          {props.job.location}
        </p>
        <p className="text-sm font-bold text-slate-500 tracking-wide">
          full time
        </p>
      </div>
      <div>
        <MdKeyboardArrowRight size={"1.5em"} />
      </div>
    </Link>
  );
};

export default JobPostViewBox;
