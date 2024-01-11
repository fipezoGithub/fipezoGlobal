import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CallbackRequest = (props) => {
  const [callbacks, setCallBacks] = useState([]);
  useEffect(() => {
    getCallbacks();
  }, []);
  async function getCallbacks() {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/callback`);
      const callback = await res.json();
      setCallBacks(callback);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Head>
        <title>Fipezo | Request Callback</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-12">
        <h1 className="capitalize font-bold text-4xl text-center">
          Request callback panel
        </h1>
      </div>
      <div>
        <table className="w-full mt-8 border border-collapse">
          <thead className="">
            <tr className="py-4">
              <th className="capitalize text-sm lg:text-2xl">dp</th>
              <th className="capitalize text-sm lg:text-2xl">name</th>
              <th className="capitalize text-sm lg:text-2xl">profession</th>
              <th className="capitalize text-sm lg:text-2xl">phone</th>
              <th className="capitalize text-sm lg:text-2xl">location</th>
            </tr>
          </thead>
          <tbody className="">
            {callbacks.length > 0 &&
              callbacks.map((it, i) => (
                <tr key={i} className="border-b">
                  <th className="flex items-center justify-center py-4">
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${it.requestedUser.profilePicture}`}
                      width={120}
                      height={120}
                      alt="callback user profile picture"
                      className="w-12 lg:w-16"
                    />
                  </th>
                  <th className="capitalize text-sm lg:text-xl font-medium py-4">
                    <Link
                      href={`/profile/${it.requestedUser.uid}`}
                      target="_blank"
                    >
                      {it.requestedUser.firstname +
                        " " +
                        it.requestedUser.lastname}
                    </Link>
                  </th>
                  <th className="capitalize text-sm lg:text-xl font-medium py-4">
                    {it.requestedUser.profession
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </th>
                  <th className="capitalize text-sm lg:text-xl font-medium py-4">
                    <a href={`tel:${it.requestedUser.phone}`}>
                      {it.requestedUser.phone}
                    </a>
                  </th>
                  <th className="capitalize text-sm lg:text-xl font-medium py-4">
                    {it.requestedUser.location}
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default CallbackRequest;
