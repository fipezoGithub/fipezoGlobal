import DialogBox from "@/components/DialogBox";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RWebShare } from "react-web-share";

const My_referral = (props) => {
  const [referCode, setReferCode] = useState("");
  const [url, setUrl] = useState("");
  const [showWithdrawlBox, setShowWithdrawlBox] = useState(false);
  const [upiID, setUpiID] = useState("");
  const [conUpiID, setConUpiID] = useState("");
  const [upiError, setUpiError] = useState(false);
  const [validId, setValidId] = useState(false);
  const [showDialougeBox, setShowDialougeBox] = useState(false);
  const referalText = useRef();

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    async function getReferDetails() {
      if (props.user && !props.user.uid) {
        const res = await fetch(`${process.env.SERVER_URL}/getrefer/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });
        const referalCode = await res.json();
        setReferCode(referalCode);
      } else if (props.user && props.user.uid) {
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
  }, [props.user]);

  useEffect(() => {
    setUrl(window.location.origin + "/register/freelancer");
  }, []);

  async function generateReferCode() {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (props.user && !props.user.uid) {
      const res = await fetch(`${process.env.SERVER_URL}/generaterefer`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const refer = await res.json();
      setReferCode("");
    } else if (props.user && props.user.uid) {
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

  async function withdrawlRequest() {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (upiID !== conUpiID || upiID === "") {
      setUpiError(true);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/referupi/requestwithdrawl`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            upiId: upiID,
          }),
        }
      );
      if (res.ok) {
        setShowDialougeBox(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handelDialouge() {
    setShowDialougeBox(false);
    setShowWithdrawlBox(true);
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
                  text: `Share refer code "${referCode.referUid}" with your frelancer friends`,
                  url: url,
                  title: "Fipezo",
                }}
              >
                <button
                  type="button"
                  className="flex items-center justify-center border bg-blue-500 text-white border-neutral-300 hover:bg-white hover:text-orange-500 px-2 py-1 rounded-full capitalize"
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
        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-center text-lg">Your successful refer is</h3>
          <div className="flex items-center justify-center">
            <span className="lg:text-lg text-white px-2 py-1 border bg-blue-500 rounded-full w-10 lg:h-10 text-center">
              0
            </span>
            <span
              className={
                "h-0.5 w-12 " +
                (referCode?.acceptedFreelancer?.length > 0
                  ? " bg-blue-500"
                  : " bg-neutral-500")
              }
            ></span>
            <span
              className={
                "lg:text-lg px-2 py-1 border rounded-full w-10 lg:h-10 text-center" +
                (referCode?.acceptedFreelancer?.length > 0
                  ? " bg-blue-500 text-white"
                  : " bg-neutral-500 text-white")
              }
            >
              1
            </span>
            <span
              className={
                "h-0.5 w-12 " +
                (referCode?.acceptedFreelancer?.length > 1
                  ? " bg-blue-500"
                  : " bg-neutral-500")
              }
            ></span>
            <span
              className={
                "lg:text-lg px-2 py-1 border rounded-full w-10 lg:h-10 text-center" +
                (referCode?.acceptedFreelancer?.length > 1
                  ? " bg-blue-500 text-white"
                  : " bg-neutral-500 text-white")
              }
            >
              2
            </span>
            <span
              className={
                "h-0.5 w-12 " +
                (referCode?.acceptedFreelancer?.length > 2
                  ? " bg-blue-500"
                  : " bg-neutral-500")
              }
            ></span>
            <span
              className={
                "lg:text-lg px-2 py-1 border rounded-full w-10 lg:h-10 text-center" +
                (referCode?.acceptedFreelancer?.length > 2
                  ? " bg-blue-500 text-white"
                  : " bg-neutral-500 text-white")
              }
            >
              3
            </span>
            <span
              className={
                "h-0.5 w-12 " +
                (referCode?.acceptedFreelancer?.length > 3
                  ? " bg-blue-500"
                  : " bg-neutral-500")
              }
            ></span>
            <span
              className={
                "lg:text-lg px-2 py-1 border rounded-full w-10 lg:h-10 text-center" +
                (referCode?.acceptedFreelancer?.length > 3
                  ? " bg-blue-500 text-white"
                  : " bg-neutral-500 text-white")
              }
            >
              4
            </span>
            <span
              className={
                "h-0.5 w-12 " +
                (referCode?.acceptedFreelancer?.length > 4
                  ? " bg-blue-500"
                  : " bg-neutral-500")
              }
            ></span>
            <span
              className={
                "lg:text-lg px-2 py-1 border rounded-full w-10 lg:h-10 text-center" +
                (referCode?.acceptedFreelancer?.length > 4
                  ? " bg-blue-500 text-white"
                  : " bg-neutral-500 text-white")
              }
            >
              5
            </span>
          </div>
        </div>
        <button
          type="button"
          className="px-4 py-2 capitalize lg:text-lg bg-blue-600 font-bold text-white self-center rounded-lg mt-4"
          onClick={() => setShowWithdrawlBox(true)}
        >
          withdraw now
        </button>
        {showWithdrawlBox === true && (
          <div className="flex items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur w-full h-full">
            <div className="relative flex flex-col items-center gap-4 justify-center bg-white p-4 rounded-lg mx-4 lg:mx-0">
              <div className="absolute top-1 right-1">
                <button
                  type="button"
                  className="text-3xl"
                  onClick={() => setShowWithdrawlBox(false)}
                >
                  <IoIosCloseCircleOutline />
                </button>
              </div>
              <h4 className=" text-lg lg:text-2xl capitalize">withdrawl</h4>
              {referCode?.acceptedFreelancer?.length >= 5 ? (
                <div className="flex flex-col items-center justify-between w-full gap-4 lg:gap-0">
                  <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4 lg:gap-0">
                    <div className="flex flex-col items-start relative">
                      <label
                        htmlFor="upi"
                        className="text-center lg:text-lg capitalize"
                      >
                        UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="enter upi id"
                        id="upi"
                        value={upiID}
                        onChange={(e) => {
                          setValidId(false);
                          setUpiError(false);
                          setUpiID(e.target.value);
                        }}
                        onBlur={(e) => {
                          if (!e.target.value.includes("@")) {
                            setValidId(true);
                          }
                        }}
                        className="bg-neutral-300 p-2 placeholder:capitalize"
                      />
                      {validId && (
                        <p className="text-red-600 font-bold absolute top-full">
                          upi is not valid
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <label
                        htmlFor="conupi"
                        className="text-center lg:text-lg capitalize"
                      >
                        confirm UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="confirm upi id"
                        id="conupi"
                        value={conUpiID}
                        onChange={(e) => {
                          setUpiError(false);
                          setConUpiID(e.target.value);
                        }}
                        className="bg-neutral-300 p-2 placeholder:capitalize"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={withdrawlRequest}
                    className="capitalize font-bold bg-blue-500 text-white px-2 py-1 rounded-lg"
                  >
                    submit
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="lg:text-xl">
                    You are not eligible to withdraw your amount. After 5
                    successful referrals, you are eligible to withdraw.
                  </h3>
                </div>
              )}
              {upiError && (
                <p className="text-red-500 font-bold">
                  UPI id mismatch. please check your upi id.
                </p>
              )}
              <div className="flex flex-col gap-4">
                <p className="text-neutral-500">
                  Once you submitted your upi id you can not change. Make sure
                  your upi id before submit.
                </p>
                <p className="text-neutral-500">
                  In case of any queries you can contact us by mail us at{" "}
                  <a href="mailto:help@fipezo.com" className="text-blue-500">
                    help@fipezo.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <hr className="my-8 border border-[#eaeaea]" />
      <Footer premium={props.user?.premium} />
      {showDialougeBox && (
        <DialogBox
          title="Success"
          text="Your upi id has been reached to us. Please keep patience. Amount will be creditted between next 24 business hours."
          handleDialogBox={handelDialouge}
        />
      )}
    </>
  );
};

export default My_referral;
