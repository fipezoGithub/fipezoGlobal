import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Referandearn = (props) => {
  const [type, setType] = useState("");
  useEffect(() => {
    setType(JSON.parse(localStorage.getItem("type")));
  }, []);

  return (
    <>
      <Head>
        <title>Fipezo | Refer and Earn</title>
      </Head>
      <div className="h-1">
        <Navbar
          color="black"
          user={props.user}
          company={props.company}
          setCompany={props.setCompany}
          setUser={props.setUser}
        />
      </div>
      <div className="h-80 w-full relative mt-16 flex items-center justify-center">
        <Image
          src="/refer-friend.jpg"
          layout="fill"
          alt="refer friend"
          objectFit="contain"
        />
      </div>
      <div className="mt-4 flex flex-col items-center gap-4 rounded py-4 px-2 md:px-0">
        <h2 className="text-lg text-center">
          Invite your freelancer friend to{" "}
          <span className="font-bold">Fipezo</span> and earn ₹50 rupees for
          every successful freelancer joining
        </h2>
        {type === "user" || type === "freelancer" ? (
          <Link
            href="/my_referral"
            className="px-4 py-2 border-[1.8px] shadow capitalize font-semibold w-fit border-[#00aaff] hover:bg-[#00aaff] hover:text-white"
          >
            generate now
          </Link>
        ) : (
          <Link
            href="/register/freelancer"
            className="px-4 py-2 border-[1.8px] shadow capitalize font-semibold w-fit border-[#00aaff] hover:bg-[#00aaff] hover:text-white"
          >
            generate now
          </Link>
        )}
      </div>
      <hr className="my-8 border border-[#eaeaea]" />
      <Footer />
    </>
  );
};

export default Referandearn;
