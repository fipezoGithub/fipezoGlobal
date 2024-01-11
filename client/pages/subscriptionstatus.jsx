import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPhotoVideo, FaRegEye } from "react-icons/fa";
import { IoNotificationsCircle, IoWomanSharp } from "react-icons/io5";
import { MdFeaturedVideo, MdLeaderboard } from "react-icons/md";

const Fipezopremium = (props) => {
  const [packageName, setPackageName] = useState("");
  const [transacId, setTransacId] = useState("");
  const [prize, setPrize] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const initializeRazorpaySDK = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true); //handle load success event here
      };

      script.onerror = () => {
        resolve(false); //handle load error event
      };

      document.body.appendChild(script);
    });
  };

  const openPaymentWindow = async (price) => {
    if (!props.user && !props.user?.uid) {
      router.replace("/login");
      return;
    }
    const res = await initializeRazorpaySDK(); //here we are calling function we just written before
    if (!res) {
      alert("Razorpay SDK Failed to load"); //you can also call any ui to show this error.
      return; //this return stops this function from loading if SDK is not loaded
    }
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    const d = new Date();
    const date = d.setDate(d.getDate() + 30);
    // Make API call to the serverless API
    const data = await fetch(`${process.env.SERVER_URL}/pay/razorpay`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: price,
      }),
    })
      .then((res) =>
        res.json((response) => {
          console.log(response);
        })
      )
      .catch((error) => {
        console.log(error);
      });

    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "Fipezo",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Payment for Fipezo premium",
      image: "/favi.png", //put secure url of the logo you wish to display
      handler: async function (response) {
        // Validate payment at server - using webhooks is a better idea.
        const res = await fetch(`${process.env.SERVER_URL}/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentPack: `${price}`,
            transactionId: response.razorpay_payment_id,
            startDate: new Date().toISOString(),
            endDate: new Date(date).toISOString(),
          }),
        });
        const message = await res.json();
        console.log(message);
        router.push(`/subscriptionstatus`);
      },
      ondismiss: () => {
        /*handle payment window close or dismiss here */
      },

      prefill: {
        name: props.user.firstname + props.user.lastname, //you can prefill Name of the Customer
        contact: props.user.phone, //Mobile Number can also be prefilled to fetch available payment accounts.
      },
      readonly: {
        contact: true, //edit this to allow editing of info
        name: true, //edit this to allow editing of info
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    async function getFreelancer() {
      setLoading(true);
      const paymentRes = await fetch(
        `${process.env.SERVER_URL}/freelancer/paymentdetails`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const paymentDetails = await paymentRes.json();
      if (paymentDetails) {
        if (paymentDetails.paymentPack === "99") {
          setPackageName("@99");
          setPrize(99);
        } else {
          setPackageName("@499");
          setPrize(499);
        }
        setTransacId(paymentDetails.transactionId);
        const start = new Date(paymentDetails.createdAt);
        setStartDate(
          new Date(paymentDetails.startDate).toLocaleString("en-IN", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
        );
        const d = new Date(paymentDetails.startDate);
        const end = new Date(paymentDetails.endDate);
        setEndDate(
          new Date(paymentDetails.endDate).toLocaleString("en-IN", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
        );
        const remainDays = Math.floor(
          (end.getTime() - new Date().getTime()) / 1000 / 3600 / 24
        );
        console.log(end.getTime());
        console.log(
          Math.floor((end.getTime() - new Date().getTime()) / 1000 / 3600 / 24)
        );
        if (remainDays <= 30 && remainDays >= 0) {
          setStatus("Active");
        } else {
          setStatus("Expired");
        }
      }
      setLoading(false);
    }
    getFreelancer();
  }, []);

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
        <p className="text-xl drop-shadow-md text-center md:text-left">
          You have unlocked fipezo premium for your account.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 py-8 md:h-[50vh]">
        <h1 className="text-3xl capitalize font-semibold">package details</h1>
        <div className="flex items-center justify-center">
          <table
            className={
              "w-full text-center rtl:text-right text-gray-600" +
              (!loading
                ? " "
                : " flex md:flex-col items-center justify-between")
            }
          >
            <thead className="text-gray-700 uppercase bg-gray-50 align-top md:align-middle table-cell md:table-row-group">
              <tr className="table-cell md:table-row">
                <th
                  scope="col"
                  className="capitalize md:px-6 py-3 block md:table-cell"
                >
                  package name
                </th>
                <th
                  scope="col"
                  className="capitalize md:px-6 py-3 block md:table-cell"
                >
                  transaction id
                </th>
                <th
                  scope="col"
                  className="capitalize md:px-6 py-3 block md:table-cell"
                >
                  amount
                </th>
                <th
                  scope="col"
                  className="capitalize md:px-6 py-3 block md:table-cell"
                >
                  start date
                </th>
                <th
                  scope="col"
                  className="capitalize md:px-6 py-3 block md:table-cell"
                >
                  end date
                </th>
                <th
                  scope="col"
                  className="capitalize md:px-6 py-3 block md:table-cell"
                >
                  status
                </th>
              </tr>
            </thead>
            {!loading ? (
              <tbody className="align-top md:align-middle table-cell md:table-row-group">
                <tr className="table-cell md:table-row odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 font-bold">
                  <td
                    scope="row"
                    className="px-2 md:px-4 h-[3.2rem] md:h-auto text-lg text-center block md:table-cell"
                  >
                    {packageName}
                  </td>
                  <td className="px-2 md:px-4 h-[3.2rem] md:h-auto text-lg text-center block md:table-cell">
                    {transacId}
                  </td>
                  <td className="px-2 md:px-4 h-[3.2rem] md:h-auto text-lg text-center block md:table-cell">
                    {prize}
                  </td>
                  <td className="px-2 md:px-4 h-[3.2rem] md:h-auto text-lg text-center block md:table-cell">
                    {startDate}
                  </td>
                  <td className="px-2 md:px-4 h-[3.2rem] md:h-auto text-lg text-center block md:table-cell">
                    {endDate}
                  </td>
                  <td
                    className={
                      "px-2 md:px-4 h-[3.2rem] md:h-auto text-lg uppercase text-center block md:table-cell " +
                      (status === "Active" ? "text-green-600" : "text-red-600")
                    }
                  >
                    {status}
                  </td>
                </tr>
              </tbody>
            ) : (
              <div className="flex items-center justify-center w-40 md:w-full">
                <Image
                  src="/mini-loading.gif"
                  alt="loading"
                  width={75}
                  height={50}
                  className=""
                />
              </div>
            )}
          </table>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 py-8 bg-[#f6f7f8]">
        <h1 className="text-4xl font-semibold">You have unlocked</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center flex-wrap">
          <div className="flex items-start flex-col gap-4 bg-[#ea6e77] text-white p-4 w-40 md:w-80 h-40">
            <FaPhotoVideo className="text-xl md:text-3xl" />
            <h2 className="text-base md:text-lg font-semibold">
              Unlimited photos or videos upload
            </h2>
          </div>
          <div className="flex items-start flex-col gap-4 bg-[#9f75a1] text-white p-4 w-40 md:w-80 h-40">
            <FaRegEye className="text-xl md:text-3xl" />
            <h2 className="text-base md:text-xl font-semibold">
              Extra visibility all over website
            </h2>
          </div>
          <div className="flex items-start flex-col gap-4 bg-[#ea6e77] text-white p-4 w-40 md:w-80 h-40">
            <IoNotificationsCircle className="text-xl md:text-3xl" />
            <h2 className="text-base md:text-xl font-semibold">
              Smart priority notification for all latest jobs
            </h2>
          </div>
          <div className="flex items-start flex-col gap-4 bg-[#9f75a1] text-white p-4 w-40 md:w-80 h-40">
            <MdFeaturedVideo className="text-xl md:text-3xl" />
            <h2 className="text-base md:text-xl font-semibold">
              Featured tag, explore page top list
            </h2>
          </div>
          <div className="flex items-start flex-col gap-4 bg-[#ea6e77] text-white p-4 w-40 md:w-80 h-40">
            <IoWomanSharp className="text-xl md:text-3xl" />
            <h2 className="text-base md:text-xl font-semibold">
              Dedicated Relationship Manager
            </h2>
          </div>
          {prize === 499 ? (
            <div className="flex items-start flex-col gap-4 bg-[#9f75a1] text-white p-4 w-40 md:w-80 h-40">
              <MdLeaderboard className="text-xl md:text-3xl" />
              <h2 className="text-base md:text-xl font-semibold">5 leads</h2>
            </div>
          ) : (
            <div className="flex items-start flex-col gap-2 bg-[#9f75a1] text-white p-4 w-40 md:w-80 h-40 relative">
              <MdLeaderboard className="text-xl md:text-3xl" />
              <h2 className="text-base md:text-xl font-semibold">5 leads</h2>
              <p className="text-sm font-semibold md:text-center">
                For pack @499 only
              </p>
              <button
                type="button"
                onClick={(e) => openPaymentWindow(499)}
                className="md:text-base capitalize border rounded-xl px-2 py-1"
              >
                upgrade now
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Fipezopremium;
