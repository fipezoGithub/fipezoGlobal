import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CancellationAndRefund = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | Cancellation And Refund</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 mx-8 flex flex-col items-center mb-8 bg-[url('/bg14.jpg')] ">
        <h1 className="text-4xl font-bold">
          Welcome to Fipezo - Your Trusted Freelance Platform
        </h1>
        <div className="flex flex-col relative items-center w-full md:w-1/2 p-4 m-8 gap-4 h-screen overflow-hidden overflow-y-scroll bg-white">
          <Link className="absolute top-[2%] right-[2%]" href="/">
            <Image
              src="/cross.png"
              height={28}
              width={28}
              alt="cross"
              className=""
            ></Image>
          </Link>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Returns and Exchanges</h2>
            <p className="text-lg">
              We understand that circumstances may arise where you need to
              cancel or request a refund for a service on Fipezo. Our
              Cancellation and Refund Policy is designed to provide clarity on
              the process.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 flex-col">
                <h2 className="font-bold text-lg">
                  1. Eligibility for Returns or Exchanges
                </h2>
                <p className="text-lg">
                  Services on Fipezo may be eligible for return or exchange
                  under the following conditions:
                </p>

                <p className="text-lg">
                  <span className="font-bold">Cancellation Period:</span> Users
                  may cancel a project within 7 days of the purchase date.
                </p>

                <p className="text-lg">
                  <span className="font-bold">Refund Period:</span> Refund
                  requests must be initiated within 7 days of the purchase date.
                </p>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="font-bold text-lg">
                  2. How to Initiate a Return or Exchange
                </h2>
                <p className="text-lg">
                  To initiate a cancellation, return, or exchange, please
                  contact our customer support team at{" "}
                  <Link href="mailto:help@fipezo.com" className="text-blue-500">
                    help@fipezo.com
                  </Link>{" "}
                  Provide your order details, including the project name and
                  purchase date, along with a brief description of the reason
                  for cancellation or refund.
                  <br />
                  <br />
                  Our customer support team will guide you through the process
                  and address any questions or concerns you may have.
                </p>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="font-bold text-lg">3. Refund Processing Time</h2>
                <p className="text-lg">
                  Once a return or refund request is approved, the processing
                  time for refunds is typically 3-5 days. Please note that the
                  exact time may vary depending on your payment method and
                  financial institution.
                </p>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="font-bold text-lg">4. Exceptions</h2>
                <p className="text-lg">
                  Certain circumstances may affect the eligibility for returns
                  or exchanges, and we reserve the right to make exceptions on a
                  case-by-case basis. This includes but is not limited to cases
                  of fraud, misuse, or violations of our Terms and Conditions.
                </p>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="font-bold text-lg">
                  5. Changes to the Cancellation and Refund Policy
                </h2>
                <p className="text-lg">
                  Fipezo reserves the right to modify or update this
                  Cancellation and Refund Policy at any time. Changes will be
                  effective immediately upon posting on our website. It is the
                  responsibility of users to review this policy periodically for
                  any updates.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xl text-neutral-500">
              If you have any questions or concerns regarding our Cancellation
              and Refund Policy, please contact us at{" "}
              <Link href="mailto:help@fipezo.com" className="text-blue-500">
                help@fipezo.com
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default CancellationAndRefund;
