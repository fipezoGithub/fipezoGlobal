import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsFingerprint, BsPersonPlus } from "react-icons/bs";

const Referandearn = (props) => {

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
        <div className="flex items-center justify-center mx-8 lg:mx-16 gap-4 my-6 flex-wrap md:flex-nowrap">
          <div className="flex items-start flex-col gap-2 border rounded-md px-4 pt-2 shadow-md w-80 h-48">
            <BsFingerprint className="text-4xl" />
            <p className="text-2xl">Step 1:</p>
            <p className="text-lg">
              Login to Fipezo and navigate to refer and earn page
            </p>
          </div>
          <div className="flex items-start flex-col gap-2 border rounded-md px-4 pt-2 shadow-md w-80 h-48">
            <BsPersonPlus className="text-4xl" />
            <p className="text-2xl">Step 2:</p>
            <p className="text-lg">
              Copy the invition code and send it to your freelancer friend
            </p>
          </div>
          <div className="flex items-start flex-col gap-2 border rounded-md px-4 pt-2 shadow-md w-80 h-48">
            <AiOutlineStar className="text-4xl" />
            <p className="text-2xl">Step 3:</p>
            <p className="text-lg">
              Once a referall create a new account, you get paid 50 as reward
            </p>
          </div>
          <div className="flex items-start flex-col gap-2 border rounded-md px-4 pt-2 shadow-md w-80 h-48">
            <BiMoneyWithdraw className="text-4xl" />
            <p className="text-2xl">Step 4:</p>
            <p className="text-lg">
              After 6 successfull referral, you can withdraw your amount on your
              UPI bank account easily
            </p>
          </div>
        </div>
        {props.user ? (
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
      <div className="mx-8 lg:mx-16 flex flex-col items-center">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">
          Terms and Conditions
        </h1>
        <div className="flex flex-col items-start">
          <ul className="mb-4">
            <p className="text-lg font-bold">Eligibility :</p>
            <li className="list-disc ml-6">
              You must be a registered user of Fipezo to participate in the
              program
            </li>
          </ul>
          <ul className="mb-4">
            <p className="text-lg font-bold">Referral Reward :</p>
            <li className="list-disc ml-6">
              For each successful referral, where a referred user creates a
              Fipezo profile and is a freelancer, you will receive a reward of
              50 Indian Rupees {"("}INR{")"}.
            </li>
            <li className="list-disc ml-6">
              The referred user must sign up using your unique referral code to
              be considered a successful referral.
            </li>
          </ul>
          <ul className="mb-4">
            <p className="text-lg font-bold">Limits and Conditions :</p>
            <li className="list-disc ml-6">
              Each referral code is applicable for one profile creation only.
            </li>
            <li className="list-disc ml-6">
              To be eligible for withdrawal, you must accumulate a minimum of
              300 INR in referral rewards.
            </li>
          </ul>
          <ul className="mb-4">
            <p className="text-lg font-bold">Withdrawal Method :</p>
            <li className="list-disc ml-6">
              Referral rewards can only be withdrawn using the UPI {"("}Unified
              Payments Interface{")"} payment method.
            </li>
          </ul>
          <ul className="mb-4">
            <p className="text-lg font-bold">Fraud and Misuse :</p>
            <li className="list-disc ml-6">
              Fipezo reserves the right to investigate and withhold rewards in
              cases of fraudulent activity or misuse of the &quot;Refer and
              Earn&quot; program.
            </li>
            <li className="list-disc ml-6">
              Fraudulent activity includes but is not limited to, creating fake
              profiles or referring oneself.
            </li>
          </ul>
          <ul className="mb-4">
            <p className="text-lg font-bold">Contact :</p>
            <li className="list-disc ml-6">
              If you have any questions or concerns regarding the &quot;Refer
              and Earn&quot; program, please contact our{" "}
              <Link href="/contact_us" className="text-blue-600 font-medium">
                customer support.
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-8 border border-[#eaeaea]" />
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Referandearn;
