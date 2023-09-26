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
  const [type, setType] = useState("user");
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
        if (type === "user") {
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
          router.push("/");
        } else if (type === "company") {
          const res = await fetch(
            `${process.env.SERVER_URL}/profile/company/password/change`,
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
          router.push("/");
        } else if (type === "freelancer") {
          const res = await fetch(
            `${process.env.SERVER_URL}/profile/freelancer/password/change`,
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
      <div className="pt-16 flex items-center w-full justify-center bg-[url('/forget-password-background.jpg')] bg-no-repeat bg-cover">
        <div className="flex flex-col items-center bg-black text-white rounded-2xl px-4 md:px-10 py-4 md:py-5 h-full">
          <h2 className="font-bold text-2xl mb-4">Forget Password</h2>
          <label htmlFor="accType" className="flex gap-2 text-lg relative">
            <p className="p-2">Log in As</p>
            <select
              className="bg-[--primary-color] text-base border border-[rgb(129,_124,_124)] p-2 rounded-2xl text-white"
              id="accType"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="user">User</option>
              <option value="freelancer">Freelancer</option>
              <option value="company">Company</option>
            </select>
          </label>
          <div className="flex items-center flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <label htmlFor="phone">Phone</label>
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
                className="capitalize px-2 py-1 rounded-md bg-white text-black"
              >
                send OTP
              </button>
            </div>
          </div>
          {showOTP === true && (
            <div className="flex items-center flex-col gap-2">
              <div className="flex items-center gap-2">
                <label htmlFor="otpforget">Enter OTP</label>
                <input
                  type="text"
                  name=""
                  id="otpforget"
                  placeholder="Enter otp here"
                  value={otp}
                  className="bg-transparent focus:outline-none p-2 border-b border-slate-500"
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={submitOTP}
                className="capitalize px-2 py-1 rounded-md bg-white text-black"
              >
                submit
              </button>
            </div>
          )}
          {passwordBox === true && (
            <div className="flex items-center flex-col">
              <div className="flex items-center gap-2">
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
        <div className="relative hidden md:block">
          <Image src="/Forgot password-amico.png" width={600} height={600} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forget_password;
