import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Payment = (props) => {
  const [screenshot, setScreenshot] = useState("");
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 10485760) {
      props.setWarns(true);
      return;
    }

    setScreenshot(file);

    reader.readAsDataURL(file);

    reader.onerror = () => {
      console.error("Something went wrong!");
    };
  };
  async function handelSubmit(e) {
    const data = new FormData();
    data.append("screenshot", screenshot);
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    const res = await fetch(`${process.env.SERVER_URL}/payment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const paymnet = await res.json();
    if (paymnet) {
      router.push("/");
    }
  }
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
        <div className="bg-gradient-to-r from-sky-600 to-orange-500 h-24 w-full mt-16 flex items-center justify-center">
          <h1 className="text-4xl text-white capitalize">
            payment for premium plans
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
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
              <label
                htmlFor="screenshot"
                className="bg-black text-white px-4 py-2 rounded-lg capitalize cursor-pointer"
              >
                submit your screenshot
              </label>
              <input
                type="file"
                accept="image/png, image/jpg"
                name=""
                onChange={handleImageChange}
                className="hidden"
                id="screenshot"
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handelSubmit}
              className="uppercase px-2 py-1 bg-blue-500 text-white rounded-md"
            >
              submit
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Payment;
