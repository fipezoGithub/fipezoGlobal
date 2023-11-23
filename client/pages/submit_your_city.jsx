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
      <div className="pt-16 flex flex-col items-center justify-center lg:gap-4 gap-2 bg-[url('/bg10.jpg')] bg-no-repeat bg-cover overflow-hidden">
        <h1 className="text-2xl lg:text-5xl font-bold">
          Can&apos;t find us in your city?
        </h1>
        <p className="text-lg lg:text-2xl font-medium">Drop your city name.</p>
        <form
          action=""
          onSubmit={submitCity}
          className="flex flex-col items-center gap-4 border rounded-md p-4 bg-[#f0f0f0] shadow-lg"
        >
          <div className="flex flex-col lg:flex-row lg:w-full gap-2">
            <label htmlFor="name" className="text-lg font-medium">
              Full&nbsp;Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="focus:outline-none border-b px-2 lg:w-full bg-transparent"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:w-full gap-2">
            <label htmlFor="phone" className="text-lg font-medium">
              Phone&nbsp;Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(parseInt(e.target.value))}
              placeholder="Enter your phone number"
              className="focus:outline-none border-b px-2 lg:w-full bg-transparent"
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
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
                className="focus:outline-none border-b px-2 bg-transparent"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="pin" className="text-lg font-medium">
                Pincode
              </label>
              <input
                type="number"
                placeholder="Enter pincode"
                id="pin"
                value={pin}
                onChange={(e) => setPin(parseInt(e.target.value))}
                className="focus:outline-none border-b px-2 bg-transparent"
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
        <div className="relative bottom-0 lg:-bottom-[10px]">
          <Image
            src="/submit-page-bg.png"
            width={1280}
            height={520}
            className="w-full"
          />
        </div>
      </div>
      <Footer />
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
