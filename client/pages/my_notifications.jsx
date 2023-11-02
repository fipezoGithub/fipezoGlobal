import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const My_notifications = (props) => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const type = JSON.parse(localStorage.getItem("type"));
    async function getNotifications() {
      const res = await fetch(
        `${process.env.SERVER_URL}/notification/${props.user._id}?type=${type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const noti = await res.json();
      console.log(noti);
      setNotifications(noti);
    }
    getNotifications();
  }, []);

  const seenNotification = async (noti) => {
    if (noti.seen === true) {
      return;
    }
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/notification/${noti._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Fipezo | Notifications</title>
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 mx-8 flex flex-col items-center justify-center gap-6 mb-8">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        {notifications.length > 0 ? (
          notifications.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={`flex items-center border px-6 py-3 gap-3 ${
                item.seen === false ? "bg-slate-50" : "bg-white"
              }`}
              onClick={() => seenNotification(item)}
            >
              <Image
                src={
                  (item.sentUser?.profilePicture &&
                    `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.sentUser.profilePicture}`) ||
                  (item.sentFreelancer?.profilePicture &&
                    `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.sentFreelancer.profilePicture}`) ||
                  (item.sentCompany.profilePicture &&
                    `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.sentCompany?.profilePicture}`) ||
                  "/dp.png"
                }
                width={120}
                height={120}
                alt="user-picture"
                className="rounded-full w-16 h-16 object-cover"
              />
              <div>
                <h1>{item.headline}</h1>
                <p>
                  {new Date(item.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default My_notifications;
