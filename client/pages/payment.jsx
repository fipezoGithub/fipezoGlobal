import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React from "react";

const Payment = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | Freelancer Payment</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <main>
        <div className="bg-gradient-to-r from-sky-600 to-orange-500 h-24 w-full mt-16">
          <h1></h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="flex flex-col items-center">
            <h3 className="uppercase">upi qr code</h3>
            <Image
              src={"/qr.jpeg"}
              height={120}
              width={120}
              className="rounded-lg border-2 border-orange-500"
            />
            <h3 className="uppercase">scan me</h3>
          </div>
          <div>
            {/* <h3>submit your screenshot</h3> */}
            <div className="flex flex-col items-start">
              <label htmlFor="screenshot">submit your screenshot</label>
              <input
                type="file"
                accept="image/png, image/jpg"
                name=""
                id="screenshot"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Payment;
