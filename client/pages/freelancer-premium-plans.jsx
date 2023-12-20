import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Premium = (props) => {
  const [index, setIndex] = useState(1);
  const [callBack, setCallBack] = useState(false);
  const testimonalRef = useRef();
  const router = useRouter();

  const handelTestimonail = (range, direct) => {
    testimonalRef.current.scrollBy(range, 0);

    if (direct === "right") {
      if (index !== 5) {
        setIndex(index + 1);
      }
    } else if (direct === "left") {
      if (index !== 1) {
        setIndex(index - 1);
      }
    }
  };

  const handelCallback = async () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (!props.user || !props.user?.uid) {
      router.replace("/login");
      return;
    }
    try {
      const res = await fetch(`${process.env.SERVER_URL}/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const callBack = await res.json();
      if (callBack) {
        setCallBack(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async (e, ammount) => {
    if (!props.user || !props.user?.uid) {
      router.replace("/login");
      return;
    }
    e.preventDefault();

    const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);

    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionid,
      merchantUserId: "MUID-" + uuidv4().toString(36).slice(-6),
      amount: ammount,
      redirectUrl: `${process.env.CLIENT_URL}/status/${transactionid}`,
      redirectMode: "POST",
      callbackUrl: `${process.env.CLIENT_URL}/status/${transactionid}`,
      mobileNumber: props.user.phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);

    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    console.log(dataBase64);

    const fullURL = dataBase64 + "/pg/v1/pay" + process.env.PHONEPE_SALT_KEY;
    const dataSha256 = sha256(fullURL);

    const checksum = dataSha256 + "###" + 1;
    console.log(checksum);

    const UAT_PAY_API_URL = process.env.PHONEPE_URL;

    const response = await axios.post(
      UAT_PAY_API_URL,
      {
        request: dataBase64,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );

    const redirect = response.data.data.instrumentResponse.redirectInfo.url;
    router.push(redirect);
  };

  return (
    <>
      <Head>
        <title>Fipezo | Freelancer Premium Plans</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div
        className="mt-16 bg-gradient-to-l from-sky-600 to-indigo-600 text-white py-8"
        id="price"
      >
        <h1 className="text-center text-lg lg:text-3xl font-bold mt-4">
          Now increase your PROFIT by 10X
        </h1>
        <h3 className="text-center text-2xl lg:text-5xl font-bold mt-8">
          Post unlimited photos, get featured tag
        </h3>
        <div className="flex flex-col lg:flex-row items-center justify-center mt-12 gap-8">
          <div className="flex flex-col items-start gap-4 px-4 py-2 bg-white text-black rounded-xl w-72 h-72">
            <h3 className="lg:text-xl text-neutral-500 font-bold">
              1 month plan
            </h3>
            <hr className="w-full h-px" />
            <p className="font-bold text-6xl lg:text-5xl">₹99</p>
            <div className="flex items-center gap-4">
              <p className="line-through text-base lg:text-xl text-neutral-500">
                ₹140
              </p>
              <p className="px-2 py-1 bg-yellow-500 rounded-2xl text-white">
                Save 40%
              </p>
            </div>
            <div className="h-1/3"></div>
            <button
              // href="/payment"
              type="button"
              onClick={(e) => makePayment(e, 9900)}
              className="bg-orange-500 text-white px-4 py-2 w-full font-semibold rounded-lg text-center"
            >
              Buy now
            </button>
          </div>
          <div className="flex flex-col items-start gap-4 px-4 py-2 bg-white text-black rounded-xl w-72 h-72">
            <h3 className="lg:text-xl text-neutral-500 font-bold">
              1 month plan
            </h3>
            <hr className="w-full h-px" />
            <p className="font-bold text-6xl lg:text-5xl">₹499</p>
            <div className="flex items-center gap-4">
              <p className="line-through text-base lg:text-xl text-neutral-500">
                ₹700
              </p>
              <p className="px-2 py-1 bg-yellow-500 rounded-2xl text-white">
                Save 40%
              </p>
            </div>
            <div className="h-1/3"></div>
            <button
              // href="/payment"
              type="button"
              onClick={(e) => makePayment(e, 49900)}
              className="bg-orange-500 text-white px-4 py-2 w-full font-semibold rounded-lg text-center"
            >
              Buy now
            </button>
          </div>
          {/* <div className="flex flex-col items-start gap-4 px-4 py-2 bg-white text-black rounded-xl w-72 h-72">
            <h3 className="lg:text-xl text-neutral-500 font-bold">
              Custom plan
            </h3>
            <hr className="w-full h-px" />
            <p className="font-semibold text-2xl">
              {callBack === false
                ? "Explore the best solutions and offers for your hiring requirements"
                : "Thank you! Our representative will get back to you shortly."}
            </p>
            <div className="h-1/3"></div>
            <button
              type="button"
              className="bg-orange-500 text-white px-4 py-2 w-full font-semibold rounded-lg disabled:bg-neutral-600"
              disabled={callBack === false ? false : true}
              onClick={handelCallback}
            >
              {callBack === false ? "Request a callback" : "Callback requested"}
            </button>
          </div> */}
        </div>
        <p className="text-center mb-8 mt-12 text-lg">
          Reach out to us on <a href="tel:9038578787">+91 90385 78787</a> or
          <a href="mailto:help@fipezo.com"> help@fipezo.com</a> for more
          details.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center my-8 mb-16">
        <h2 className="text-xl lg:text-4xl mt-16 mb-12 font-semibold text-center mx-2 lg:mx-0">
          Now enjoy premium benefits for your professional profile
        </h2>
        <div className="flex items-center justify-center">
          <table className="text-lg lg:text-2xl text-left border mx-4 lg:mx-0">
            <thead className="text-base">
              <tr className="border-b">
                <th scope="col" className="uppercase px-4 lg:px-8 py-6">
                  benefits
                </th>
                <th scope="col" className="uppercase lg:px-10 py-6">
                  free
                </th>
                <th scope="col" className="uppercase lg:px-12 py-6">
                  @99
                </th>
                <th scope="col" className="uppercase lg:px-12 py-6">
                  @499
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto"
                >
                  World class product with features like
                  <p>apply jobs, hiring page, and more</p>
                </th>
                <td className="px-6 lg:px-12 py-6">
                  <FaCheck color="#12c96b" />
                </td>
                <td className="px-8 lg:px-16 py-4">
                  <FaCheck color="#12c96b" />
                </td>
                <td className="px-8 lg:px-16 py-4">
                  <FaCheck color="#12c96b" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto"
                >
                  Portfolio photos or videos upload
                </th>
                <td className="px-6 lg:px-12 py-6 text-sm lg:text-lg">8</td>
                <td className="lg:px-8 py-4 capitalize text-sm lg:text-lg">
                  unlimited
                </td>
                <td className="lg:px-8 py-4 capitalize text-sm lg:text-lg">
                  unlimited
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto"
                >
                  Extra visibility all over website
                </th>
                <td className="px-5 lg:px-10 py-6">
                  <IoClose color="#dddddd" size={"1.4em"} />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <FaCheck color="#12c96b" />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <FaCheck color="#12c96b" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto"
                >
                  Smart priority notification for all latest jobs
                </th>
                <td className="px-5 lg:px-10 py-6">
                  <IoClose color="#dddddd" size={"1.4em"} />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <FaCheck color="#12c96b" />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <FaCheck color="#12c96b" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto"
                >
                  Unlock premium features like
                  <p>featured tag, explore page top list, and more</p>
                </th>
                <td className="px-5 lg:px-10 py-6">
                  <IoClose color="#dddddd" size={"1.4em"} />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <FaCheck color="#12c96b" />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <FaCheck color="#12c96b" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto"
                >
                  Dedicated Relationship Manager
                </th>
                <td className="px-5 lg:px-10 py-6">
                  <IoClose color="#dddddd" size={"1.4em"} />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <FaCheck color="#12c96b" />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <FaCheck color="#12c96b" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto"
                >
                  5 lead{" "}
                  <span className="text-orange-600 font-bold capitalize">
                    assured
                  </span>
                </th>
                <td className="px-5 lg:px-10 py-6">
                  <IoClose color="#dddddd" size={"1.4em"} />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <IoClose color="#dddddd" size={"1.4em"} />
                </td>
                <td className="px-8 lg:px-16 py-4 capitalize">
                  <FaCheck color="#12c96b" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full bg-[#e7f6ff] pb-20">
        <h2 className="text-2xl lg:text-4xl font-medium my-16 mb-8 mx-2 lg:mx-0 text-center">
          What freelancers say about us!
        </h2>
        <div className="flex relative items-center gap-2 py-8">
          <button
            type="button"
            className="text-2xl text-blue-500 disabled:text-neutral-500 disabled:cursor-not-allowed"
            disabled={index === 1 ? true : false}
            onClick={() => handelTestimonail(-200, "left")}
          >
            <BsArrowLeftCircleFill />
          </button>
          <div
            className="flex items-start w-72 lg:w-[50rem] relative overflow-hidden overflow-x-scroll bg-white px-4 py-2 rounded-xl gap-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
            ref={testimonalRef}
          >
            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between min-w-full gap-6 snap-center">
              <div className="flex flex-col items-start gap-3">
                <p className="w-full">
                  I can&apos;t begin to express how thrilled I am with
                  Fipezo&apos;s Premium Package! This has truly been a
                  game-changer in my freelancing career. The premium package
                  from www.fipezo.com has not only transformed the way I work
                  but has also enhanced my overall freelancing experience.
                </p>
                <div className="flex flex-col items-start">
                  <p className="capitalize font-bold text-neutral-600">
                    rik mondal
                  </p>
                  <p className="capitalize">video editor, kolkata</p>
                </div>
              </div>
              <div>
                <Image
                  src="/rik_testimonial.png"
                  width={120}
                  height={120}
                  className="w-32 lg:w-[30rem] h-auto lg:h-48 rounded-md"
                  alt="profile"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between min-w-full gap-6 snap-center">
              <div className="flex flex-col items-start gap-3">
                <p className="w-full">
                  The Premium Package on Fipezo has significantly boosted my
                  visibility on the platform. This, in turn, has led to a
                  substantial increase in the number of clients reaching out to
                  me. The enhanced profile features and priority placement have
                  truly made a difference in my career.
                </p>
                <div className="flex flex-col items-start">
                  <p className="capitalize font-bold text-neutral-600">
                    debasis bag
                  </p>
                  <p className="capitalize">video editor, kolkata</p>
                </div>
              </div>
              <div>
                <Image
                  src="/deba_testimonial.png"
                  width={120}
                  height={120}
                  className="w-32 lg:w-[30rem] h-auto lg:h-48  rounded-md"
                  alt="profile"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between min-w-full gap-6 snap-center">
              <div className="flex flex-col items-start gap-3">
                <p className="w-full">
                  The clients I have connected with through the Premium Package
                  are not only more numerous but also higher in quality.
                  I&apos;ve had the pleasure of working with some fantastic
                  clients on meaningful projects that align perfectly with my
                  skills and interests.
                </p>
                <div className="flex flex-col items-start">
                  <p className="capitalize font-bold text-neutral-600">
                    lipika dey
                  </p>
                  <p className="capitalize">model, kolkata</p>
                </div>
              </div>
              <div>
                <Image
                  src="/lipika_testimonial.png"
                  width={120}
                  height={120}
                  className="w-32 lg:w-[30rem] h-auto lg:h-48 rounded-md"
                  alt="profile"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between min-w-full gap-6 snap-center">
              <div className="flex flex-col items-start gap-3">
                <p className="w-full">
                  Fipezo&apos;s customer support team has been incredibly
                  responsive and helpful. They genuinely care about my success
                  and are always ready to assist with any questions or concerns.
                  It&apos;s reassuring to know that I have a dedicated team
                  backing me up.
                </p>
                <div className="flex flex-col items-start">
                  <p className="capitalize font-bold text-neutral-600">
                    aniket saha
                  </p>
                  <p className="capitalize">web developer, kolkata</p>
                </div>
              </div>
              <div>
                <Image
                  src="/aniket_testimonial.png"
                  width={120}
                  height={120}
                  className="w-32 lg:w-[30rem] h-auto lg:h-48 rounded-md"
                  alt="profile"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between min-w-full gap-6 snap-center">
              <div className="flex flex-col items-start gap-3">
                <p className="w-full">
                  The Premium Package also grants me access to exclusive
                  networking events and forums, allowing me to connect with
                  other professionals and potential clients. These interactions
                  have expanded my network and opened up new opportunities.
                </p>
                <div className="flex flex-col items-start">
                  <p className="capitalize font-bold text-neutral-600">
                    tumpa biswas
                  </p>
                  <p className="capitalize">model, kolkata</p>
                </div>
              </div>
              <div>
                <Image
                  src="tumpa_testimonial.png"
                  width={120}
                  height={120}
                  className="w-32 lg:w-[30rem] h-auto lg:h-48 rounded-md"
                  alt="profile"
                />
              </div>
            </div>
          </div>
          <div className="absolute z-[100] flex space-x-3 -translate-x-1/2 bottom-0 left-1/2">
            <button
              type="button"
              className={
                "h-3 rounded-full border border-blue-500" +
                (index === 1 ? " bg-blue-500 w-8" : " bg-transparent w-3")
              }
            ></button>
            <button
              type="button"
              className={
                "h-3 rounded-full border border-blue-500" +
                (index === 2 ? " bg-blue-500 w-8" : " bg-transparent w-3")
              }
            ></button>
            <button
              type="button"
              className={
                "h-3 rounded-full border border-blue-500" +
                (index === 3 ? " bg-blue-500 w-8" : " bg-transparent w-3")
              }
            ></button>
            <button
              type="button"
              className={
                "h-3 rounded-full border border-blue-500" +
                (index === 4 ? " bg-blue-500 w-8" : " bg-transparent w-3")
              }
            ></button>
            <button
              type="button"
              className={
                "h-3 rounded-full border border-blue-500" +
                (index === 5 ? " bg-blue-500 w-8" : " bg-transparent w-3")
              }
            ></button>
          </div>
          <button
            type="button"
            className="text-2xl text-blue-500 disabled:text-neutral-500 disabled:cursor-not-allowed"
            disabled={index === 5 ? true : false}
            onClick={() => handelTestimonail(200, "right")}
          >
            <BsArrowRightCircleFill />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-16 bg-gray-200 p-20">
        <h1 className="text-2xl md:text-4xl my-6 font-semibold text-center">
          Explore the best solutions and offers for your hiring requirements.
        </h1>
        <button
          type="button"
          className="bg-orange-500 text-white px-4 lg:px-24 py-2 font-semibold rounded-lg disabled:bg-neutral-600 hover:shadow-md"
          disabled={callBack === false ? false : true}
          onClick={handelCallback}
        >
          {callBack === false ? "Request us a callback" : "Callback requested"}
        </button>
        <p className="text-center my-12 text-sm lg:text-lg lg:w-1/2">
          For any queries, reach out to us at{" "}
          <a href="tel:9038578787" className="font-semibold">
            +91 90385 78787
          </a>{" "}
          or
          <a
            href="mailto:help@fipezo.com"
            className="font-semibold text-blue-500"
          >
            {" "}
            help@fipezo.com
          </a>{" "}
          available from Mon-Sat, 10:30 AM to 6:30 PM.
        </p>
        <Link
          href="/faqs"
          className="text-[#00a5ec] border-[1.6px] border-[#00a5ec] px-16 lg:px-24 py-2 hover:shadow-md font-semibold whitespace-nowrap"
        >
          Have a question?
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Premium;
