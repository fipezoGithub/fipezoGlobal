import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { FaCheck, FaExclamation } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import Link from "next/link";

const TransacId = (props) => {
  const router = useRouter();
  let componentRef = useRef();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [transacId, setTransacId] = useState("");

  useEffect(() => {
    async function POST() {
      const merchantId = process.env.PHONEPE_MERCHANT_ID;
      const transactionId = router.query.transacId;

      const st =
        `/pg/v1/status/${merchantId}/${transactionId}` +
        process.env.PHONEPE_SALT_KEY;
      const dataSha256 = sha256(st);

      const checksum = dataSha256 + "###" + 1;

      const options = {
        method: "GET",
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": `${merchantId}`,
        },
      };

      // CHECK PAYMENT STATUS
      const response = await axios.request(options);
      if (response.data && response.data.code === "PAYMENT_SUCCESS") {
        setPaymentSuccess(true);
        setPaymentType(response.data.data.paymentInstrument?.type);
        setMobile(props.user?.phone);
        setAmount(response.data.data.amount / 100);
        setTransacId(response.data.data.transactionId);
      } else {
        setPaymentSuccess(false);
      }
    }
    POST();
  }, [props.user]);

  async function subMitPaymentDetails() {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    let paymentPack;
    if (amount < 499) {
      paymentPack = "99";
    } else {
      paymentPack = "499";
    }
    try {
      const res = await fetch(`${process.env.SERVER_URL}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentPack: paymentPack,
          transactionId: router.query.transacId,
        }),
      });
      const message = await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Fipezo | Payment Status</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div
        id="report_left_inner"
        className="flex items-center justify-center h-screen relative"
      >
        <div
          className="flex flex-col items-center md:w-[35rem] gap-6 border px-3 md:px-6 py-3 shadow-md rounded print:absolute print:top-1/2 print:left-1/2 print:-translate-x-1/2 print:-translate-y-1/2"
          ref={(el) => (componentRef = el)}
        >
          {paymentSuccess === true ? (
            <>
              <h1 className="text-xl md:text-3xl text-green-500 font-semibold">
                Payment successfull!
              </h1>
              <p className="text-3xl md:text-5xl rounded-full border-2 p-4 text-green-600 border-green-600">
                <FaCheck />
              </p>
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="capitalize text-neutral-500 text-base md:text-xl">
                    payment type
                  </p>
                  <p className="uppercase">{paymentType}</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="capitalize text-neutral-500 text-base md:text-xl">
                    mobile
                  </p>
                  <p className="text-base">{mobile}</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="capitalize font-bold text-neutral-500 text-base md:text-xl">
                    amount paid
                  </p>
                  <p className="text-base">₹ {amount}</p>
                </div>
                <div className="flex items-center justify-between w-full gap-4 md:gap-0">
                  <p className="capitalize text-neutral-500 text-base md:text-xl">
                    transaction id
                  </p>
                  <p className="md:text-base text-sm">{transacId}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 print:hidden">
                <ReactToPrint
                  trigger={() => (
                    <button
                      type="button"
                      onClick={subMitPaymentDetails}
                      className="text-base md:text-xl capitalize bg-blue-600 text-white px-2 md:px-4 py-1 md:py-2 rounded"
                    >
                      print
                    </button>
                  )}
                  content={() => componentRef}
                />
                <Link
                  href="/"
                  onClick={subMitPaymentDetails}
                  className="text-base md:text-xl capitalize bg-blue-600 text-white px-2 md:px-4 py-1 md:py-2 rounded"
                >
                  close
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl text-red-500 font-semibold">
                Payment failed!
              </h1>
              <p className="text-5xl rounded-full border-2 p-4 text-red-600 border-red-600">
                <FaExclamation />
              </p>
              <p className="text-lg text-center text-neutral-500">
                It would be occured because of Internet issue or banking related
                issue. If ammount already deducted from your account, it would
                be return between 3-5 business days.
              </p>
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 rounded text-xl text-white capitalize"
              >
                back to home
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TransacId;
