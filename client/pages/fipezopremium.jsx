import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";
import { FaPhotoVideo, FaRegEye } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { IoNotificationsCircle, IoWomanSharp } from "react-icons/io5";
import { MdFeaturedVideo, MdLeaderboard } from "react-icons/md";

const Fipezopremium = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | Fipezo Premium</title>
      </Head>
      <Navbar
        color="white"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="pt-16 flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-blue-400 text-white gap-4 py-6">
        <h1 className="text-4xl font-bold [text-shadow:2px_4px_#000000]">
          Congratulation!
        </h1>
        <p className="text-xl drop-shadow-md">
          You have unlocked fipezo premium for your account.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 py-8 bg-[#f6f7f8]">
        <h1 className="text-4xl font-semibold">You have unlocked</h1>
        <div className="grid grid-cols-3 items-center justify-center flex-wrap">
          <div className="flex items-start flex-col gap-4 bg-[#ea6e77] text-white p-4 w-80 h-40">
            <FaPhotoVideo size={"1.8rem"} />
            <h2 className="text-lg font-semibold">
              Unlimited photos or videos upload
            </h2>
          </div>
          <div className="flex items-start flex-col gap-4 bg-[#9f75a1] text-white p-4 w-80 h-40">
            <FaRegEye size={"1.8rem"} />
            <h2 className="text-xl font-semibold">
              Extra visibility all over website
            </h2>
          </div>
          <div className="flex items-start flex-col gap-4 bg-[#ea6e77] text-white p-4 w-80 h-40">
            <IoNotificationsCircle size={"1.8rem"} />
            <h2 className="text-xl font-semibold">
              Smart priority notification for all latest jobs
            </h2>
          </div>
          <div className="flex items-start flex-col gap-4 bg-[#9f75a1] text-white p-4 w-80 h-40">
            <MdFeaturedVideo size={"1.8rem"} />
            <h2 className="text-xl font-semibold">
              Featured tag, explore page top list
            </h2>
          </div>
          <div className="flex items-start flex-col gap-4 bg-[#ea6e77] text-white p-4 w-80 h-40">
            <IoWomanSharp size={"1.8rem"} />
            <h2 className="text-xl font-semibold">
              Dedicated Relationship Manager
            </h2>
          </div>
          <div className="flex items-start flex-col gap-4 bg-[#9f75a1] text-white p-4 w-80 h-40">
            <MdLeaderboard size={"1.8rem"} />
            <h2 className="text-xl font-semibold">5 leads</h2>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <table class="table-auto border-spacing-5">
          <thead>
            <tr>
              <th className="capitalize">package name</th>
              <th className="capitalize">transaction id</th>
              <th className="capitalize">prize</th>
              <th className="capitalize">start date</th>
              <th className="capitalize">end date</th>
              <th className="capitalize">status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>@499</td>
              <td>t12454eer15484754</td>
              <td>499</td>
              <td>01/01/2023</td>
              <td>31/01/2023</td>
              <td>expire</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Fipezopremium;
