import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Forget_password = (props) => {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [passwordBox, setShowPasswordBox] = useState(false);
  const [type, setType] = useState("forget");
  const router = useRouter();

  const handelOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.SERVER_URL}/otp/forget-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ type: type, phone: phone }),
      });
      if (res.ok) {
        setShowOTP(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/forget-password/submitotp`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ type: type, phone: phone, otp: otp }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setShowPasswordBox(true);
      }
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async (e) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      if (password === conPassword) {
        const res = await fetch(
          `${process.env.SERVER_URL}/profile/user/password/change`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password: password }),
          }
        );
        const data = await res.json();
        if (data) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Fipezo | Forget Password</title>
        <meta
          name="description"
          content="Welcome to our forget password page, where you can safely access your account with confidence. At Fipezo, we prioritize your security and convenience, ensuring that your personal information remains protected."
        />
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 flex justify-center py-12 bg-[url('/bgX.jpg')] bg-no-repeat bg-cover">
        <div className="flex flex-col items-center justify-center bg-black text-white rounded-2xl px-4 md:px-10 py-4 md:py-5 shadow-lg">
          <h2 className="font-bold text-3xl mb-4">Forget Password</h2>
          {passwordBox === false && (
            <>
              <div className="flex items-center flex-col gap-4 my-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="phone" className="text-lg font-semibold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="Enter your phone number"
                    value={phone}
                    className="bg-transparent focus:outline-none p-2 border-b border-slate-500"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handelOTP}
                    className="capitalize px-8 py-2 rounded-md font-semibold bg-white text-black"
                  >
                    send OTP
                  </button>
                </div>
              </div>
              {showOTP === true && (
                <div className="flex items-center flex-col gap-4 my-4">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="otpforget"
                      className="text-lg font-semibold"
                    >
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      name=""
                      id="otpforget"
                      placeholder="Enter OTP here"
                      value={otp}
                      className="bg-transparent focus:outline-none p-2 border-b border-slate-500"
                      onChange={(e) => setOTP(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={submitOTP}
                    className="capitalize px-8 py-2 rounded-md font-semibold bg-white text-black"
                  >
                    submit
                  </button>
                </div>
              )}
            </>
          )}
          {passwordBox === true && (
            <div className="flex items-center flex-col mt-4 gap-2">
              <div className="flex items-center gap-2 flex-col md:flex-row">
                <div className="flex flex-col">
                  <label htmlFor="password" className="ml-2">
                    New password
                  </label>
                  <input
                    type="password"
                    id="password"
                    minLength={8}
                    maxLength={15}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new passoword"
                    className="bg-transparent focus:outline-none p-2 border-b border-slate-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="conpassword" className="ml-2">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="conpassword"
                    minLength={8}
                    maxLength={15}
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    placeholder="Confirm your passoword"
                    className="bg-transparent focus:outline-none p-2 border-b border-slate-500"
                  />
                </div>
              </div>
              <button
                type="button"
                className="capitalize px-2 py-1 rounded-md bg-white text-black"
                onClick={changePassword}
              >
                submit
              </button>
            </div>
          )}
        </div>
        <div className="relative hidden md:flex items-center justify-center p-8 bg-white h-[70vh] shadow-lg rounded-2xl">
          <Image
            src="/Forgot password-amico.png"
            width={600}
            height={600}
            alt="forget password"
            className="w-96"
          />
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Forget_password;
