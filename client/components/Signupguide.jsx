import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillPushpin } from "react-icons/ai";
import { GiStarFormation } from "react-icons/gi";
import { MdPersonAddAlt1, MdVerified } from "react-icons/md";

const Signupguide = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center mb-4 mt-24 gap-8">
      <div className="p-2 m-2 lg:m-0 lg:p-4 bg-[#2a2b2b] rounded-xl shadow-[--shadow]">
        <Image
          src="/Fipezo signup animation.gif"
          alt="signup animation"
          height={600}
          width={600}
          className="w-96"
        />
      </div>
      <div className="flex flex-col gap-4 mx-4 lg:mx-0 items-center lg:items-start">
        <h2 className="text-xl lg:text-3xl mt-1 font-semibold montserrat">
          Join Fipezo For Free, Begin Your Freelance Journey
        </h2>
        <ul className="flex flex-col gap-6">
          <li className="flex flex-col items-start">
            <span className="flex items-center text-xl gap-2 font-semibold">
              <MdPersonAddAlt1 /> Free to Join
            </span>
            <p className="ml-8 break-words">
              Joining Fipezo is quick, easy, and completely free. Create your
              account today and unlock a world of freelance opportunities.
            </p>
          </li>
          <li className="flex flex-col items-start">
            <span className="flex items-center text-xl gap-2 font-semibold">
              <MdVerified /> Get Verified
            </span>
            <p className="ml-8 break-words">
              Ensure trust and authenticity by completing the verification
              process. It&apos;s quick and secure.
            </p>
          </li>
          <li className="flex flex-col items-start">
            <span className="flex items-center text-xl gap-2 font-semibold">
              <AiFillPushpin /> Post Job or Hire a Freelancer
            </span>
            <p className="ml-8 break-words">
              Fipezo simplifies the process. Post a job or hire a freelancer
              with just a few clicks.
            </p>
          </li>
          <li className="flex flex-col items-start">
            <span className="flex items-center text-xl gap-2 font-semibold">
              <GiStarFormation /> Work with the Best Talent Hassle-Free
            </span>
            <p className="ml-8 break-words">
              Enjoy hassle-free work with top-notch freelancers. Fipezo makes it
              easy to connect with the best talent.
            </p>
          </li>
        </ul>
        <div className="flex items-center gap-2 mt-2">
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-2 md:px-6 py-2 md:py-3 rounded-3xl font-medium hover:bg-blue-800 text-center"
          >
            Sign up for free
          </Link>
          <Link
            href="/faqs"
            className="border border-blue-600 text-blue-600 px-2 lg:px-6 py-2 lg:py-3 rounded-3xl hover:text-blue-800 hover:border-blue-800 font-semibold text-center"
          >
            Learn how to hire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signupguide;
