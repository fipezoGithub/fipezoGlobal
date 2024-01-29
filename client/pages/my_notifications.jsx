import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const My_notifications = (props) => {
  const [notifications, setNotifications] = useState([]);

  const { data } = useContext(AuthContext);

  useEffect(() => {
    async function getNotifications() {
      const res = await fetch(
        `${process.env.SERVER_URL}/notification/${data.userDetails._id}?type=${data.userType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const noti = await res.json();
      setNotifications(noti.reverse());
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

  const seenAllNoti = async () => {
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/notification/seenall/${data.userDetails._id}?type=${data.userType}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const seenNoti = await res.json();
      setNotifications(seenNoti.reverse());
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
        color='black'
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      <div className='mt-16 mx-4 lg:mx-8 flex flex-col items-center justify-center gap-6 mb-8'>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-semibold self-center'>Notifications</h1>
          {notifications.length > 0 && (
            <button
              type='button'
              className='self-end capitalize text-blue-500'
              onClick={seenAllNoti}
            >
              mark all as read
            </button>
          )}
          {notifications.length > 0 ? (
            notifications.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`flex items-center border px-3 lg:px-6 py-3 gap-3 lg:w-[30rem] ${
                  item.seen === false ? "bg-slate-200" : "bg-white"
                }`}
                onClick={() => seenNotification(item)}
              >
                <Image
                  src={
                    (item.sentUser?.profilePicture &&
                      `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.sentUser.profilePicture}`) ||
                    (item.sentFreelancer?.profilePicture &&
                      `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.sentFreelancer.profilePicture}`) ||
                    (item.sentCompany?.profilePicture &&
                      `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.sentCompany?.profilePicture}`) ||
                    "/dp.png"
                  }
                  width={120}
                  height={120}
                  alt='user-picture'
                  className='rounded-full w-12 lg:w-16 h-12 lg:h-16 object-cover'
                />
                <div className='flex flex-col gap-1'>
                  <h1 className='text-sm lg:text-lg'>{item.headline}</h1>
                  <p className='text-sm lg:text-base'>
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
            <div className='flex flex-col items-center'>
              <Image
                src={"/nojobs.webp"}
                height={800}
                width={800}
                className=''
                alt='no notification'
              />
              <p className='capitalize font-semibold lg:text-xl'>
                no pending notifications
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default My_notifications;
