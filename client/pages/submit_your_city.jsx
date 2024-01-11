import DialogBox from "@/components/DialogBox";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

const SubmitYourCity = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [city, setCity] = useState("");
  const [pin, setPin] = useState();
  const [dialogBox, setDialogBox] = useState(false);

  const submitCity = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.SERVER_URL}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          city: city + ", " + pin,
        }),
      });
      const request = await res.json();
      if (request) {
        setDialogBox(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Fipezo | Submit Your City</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="pt-16 flex flex-col items-center justify-center lg:gap-4 gap-2">
        <div className="flex flex-col lg:flex-row items-start justify-evenly my-4 mx-6 gap-4 lg:gap-0">
          <div className="flex flex-col items-start gap-4 justify-between lg:w-1/4">
            <h1 className="text-3xl lg:text-4xl font-extrabold">
              Can&apos;t find us in your city?
            </h1>
            <p className="text-sm lg:text-base">
              Tell us your city name! When you drop your city, it helps us grow
              and serve more places. Your input makes our website better for you
              and others. Thanks for helping us expand!
            </p>
            <Image
              src="/city-not-found.png"
              alt="city not found"
              width={400}
              height={250}
              className="w-1/2 mt-8 lg:mt-16 self-center"
            />
          </div>
          <form
            action=""
            onSubmit={submitCity}
            className="flex flex-col items-center justify-center gap-4 px-8 border py-4 rounded-md shadow-lg bg-[#dacb7c]"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-lg font-medium">
                Full&nbsp;Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="focus:outline-none p-2 lg:w-full border"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-lg font-medium">
                Phone&nbsp;Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(parseInt(e.target.value))}
                placeholder="Enter your phone number"
                className="focus:outline-none p-2 lg:w-full border"
              />
            </div>
            <div className="flex flex-col items-center justify-between gap-4">
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="city" className="text-lg font-medium">
                  City&nbsp;Name
                </label>
                <input
                  type="text"
                  placeholder="Enter city name"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="focus:outline-none p-2 lg:w-full border"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <label htmlFor="pin" className="text-lg font-medium">
                  Pincode
                </label>
                <input
                  type="number"
                  placeholder="Enter pincode"
                  id="pin"
                  value={pin}
                  onChange={(e) => setPin(parseInt(e.target.value))}
                  className="focus:outline-none p-2 lg:w-full border"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 p-2 rounded-md font-medium text-lg"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-full">
          <Image
            src="/submit-page-bg.png"
            alt="submit page"
            width={1280}
            height={520}
            className="w-full"
          />
        </div>
      </div>
      <Footer premium={props.user?.premium} />
      {dialogBox === true && (
        <DialogBox
          title="Your request is registered"
          text="Our support team will verified your request. And once your requested city is added you'll be notified"
          handleDialogBox={setDialogBox}
          home={true}
        />
      )}
    </>
  );
};

export default SubmitYourCity;
