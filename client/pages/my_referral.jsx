import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsFillShareFill } from "react-icons/bs";
import { RWebShare } from "react-web-share";

const My_referral = (props) => {
  const [referCode, setReferCode] = useState("");
  const [url, setUrl] = useState("");
  const referalText = useRef();

  useEffect(() => {
    const loginType = JSON.parse(localStorage.getItem("type"));
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    async function getReferDetails() {
      if (loginType === "user") {
        const res = await fetch(`${process.env.SERVER_URL}/getrefer/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });
        const referalCode = await res.json();
        setReferCode(referalCode);
      } else if (loginType === "freelancer") {
        const res = await fetch(
          `${process.env.SERVER_URL}/getrefer/freelancer`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );
        const referalCode = await res.json();
        setReferCode(referalCode);
      }
    }
    getReferDetails();
  }, [referCode]);

  useEffect(() => {
    setUrl(window.location.origin + "/register/freelancer");
  }, []);

  async function generateReferCode() {
    const loginType = JSON.parse(localStorage.getItem("type"));
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (loginType === "user") {
      const res = await fetch(`${process.env.SERVER_URL}/generaterefer`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const refer = await res.json();
      setReferCode("");
    } else if (loginType === "freelancer") {
      const res = await fetch(`${process.env.SERVER_URL}/generaterefer`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ freelancer: true }),
      });
      const refer = await res.json();
      setReferCode("");
    }
  }
  function copyText() {
    navigator.clipboard.writeText(referalText.current.innerHTML);
  }
  return (
    <>
      <Head>
        <title>Fipezo | My Referrals</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="h-80 w-full relative mt-16 flex items-center justify-center">
        <Image
          src="/refer-friend.jpg"
          layout="fill"
          alt="refer friend"
          objectFit="contain"
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 rounded py-4 px-2 md:px-0 w-full">
        <h2 className="text-lg text-center">
          Invite your freelancer friend to{" "}
          <span className="font-bold">FIpezo</span> and earn ₹50 rupees for
          every successful freelancer joining
        </h2>
        {referCode ? (
          <div className="flex flex-col items-center">
            <h3 className="flex flex-col items-center gap-2 text-center">
              Your refer code{" "}
              <span
                className="px-4 py-2 border border-dashed border-neutral-600 font-semibold cursor-pointer"
                onClick={copyText}
                ref={referalText}
              >
                {referCode.referUid}
              </span>
              Tap on above box & copy the code to share with your friends
            </h3>
            <p>or</p>
            <div>
              <RWebShare
                data={{
                  text:
                    "Share refer code" +
                    referCode.referUid +
                    " with your frelancer friends",
                  url: url,
                  title: "Fipezo",
                }}
              >
                <button
                  type="button"
                  className="flex items-center justify-center border border-neutral-300 hover:bg-neutral-300 px-2 py-1 rounded-full capitalize"
                >
                  {/* <BsFillShareFill style={{ color: "blue" }} /> */}
                  share in social media
                </button>
              </RWebShare>
            </div>
          </div>
        ) : (
          <h3 className="flex flex-col items-center gap-2 text-lg text-center">
            looks like you do not have any referal code yet
            <button
              type="button"
              onClick={generateReferCode}
              className="px-4 py-2 border shadow capitalize font-semibold"
            >
              generate now
            </button>
          </h3>
        )}
        <div>
          <h3 className="text-center text-lg">
            Your successful refer is{" "}
            {referCode ? referCode.acceptedFreelancer?.length : `0`}
          </h3>
        </div>
        {/* <div className="flex items-center gap-4 justify-center">
          <label htmlFor="upi" className="text-center text-lg">
            please share your upi id
          </label>
          <input type="text" placeholder="enter upi id" id="upi" className="bg-neutral-300 p-2 placeholder:capitalize" />
        </div> */}
      </div>
      <hr className="my-8 border border-[#eaeaea]" />
      <Footer />
    </>
  );
};

export default My_referral;
