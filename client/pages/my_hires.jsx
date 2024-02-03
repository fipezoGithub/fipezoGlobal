import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "../styles/My_requests.module.css";
import Footer from "@/components/Footer";
import HireCard from "@/components/HireCard";
import DeleteBox from "@/components/DeleteBox";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import DialogBox from "@/components/DialogBox";
import Head from "next/head";
import PremiumHireCard from "@/components/PremiumHireCard";

export default function My_hires(props) {
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [hires, setHires] = useState([]);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [reqId, setReqId] = useState(null);
  const [notaccepted, setNotaccepted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [premiumHires, setPremiumHires] = useState([]);
  const [freelancerPhone, setFreelancerPhone] = useState(null);
  const [hireBox, setHireBox] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setIsUserLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/hires`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setHires(data);
        })
        .catch((error) => {
          console.error(error);
        });

      fetch(`${process.env.SERVER_URL}/hire/premium/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPremiumHires(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user, isUserLoaded]);

  const handleDeleteAccount = (id) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/delete/request/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setShowDeleteBox(false);
            setReqId(null);
            setHires(hires.filter((hire) => hire._id !== id));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const contactFreelancer = (status, phone) => {
    if (status === "accepted") {
      setAccepted(true);
      setFreelancerPhone(phone);
    } else if (status === "declined") {
      setDeclined(true);
    } else {
      setNotaccepted(true);
    }
  };

  return (
    <div className={styles.myRequests}>
      <Head>
        <title>Fipezo | My Hires</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      {notaccepted && (
        <DialogBox
          icon='no'
          title='Sorry!😔'
          text='Freelancer has not accepted your request yet.'
          handleDialogBox={setNotaccepted}
        />
      )}
      {accepted && (
        <DialogBox
          title='Congratulations!'
          text={`Freelancer has accepted your request. Contact on ${freelancerPhone} as soon as possible.`}
          handleDialogBox={setAccepted}
        />
      )}
      {declined && (
        <DialogBox
          icon='no'
          title='Sorry!😔'
          text='Freelancer has declined your request.'
          handleDialogBox={setDeclined}
        />
      )}
      <div className={styles.requests}>
        <h1 className={styles.heading}>My Requests</h1>
        <div className='my-8'>
          <ul className='flex items-center justify-between gap-12'>
            <li
              className='capitalize text-3xl font-semibold cursor-pointer relative flex flex-col items-center gap-1 group'
              onClick={() => setHireBox(true)}
            >
              hire
              <span
                className={`h-0.5 group-hover:w-full bg-black transition-[width] duration-300 ${
                  hireBox === true ? "w-full" : "w-0"
                }`}
              ></span>
            </li>
            <li
              className='capitalize text-3xl font-semibold cursor-pointer relative flex flex-col items-center gap-1 group'
              onClick={() => setHireBox(false)}
            >
              confirm hire
              <span
                className={`h-0.5 w-0 group-hover:w-full bg-black transition-[width] duration-300 ${
                  hireBox === false ? "w-full" : "w-0"
                }`}
              ></span>
            </li>
          </ul>
        </div>
        {hires.length === 0 ? (
          <div className={styles.noRequestsImage}>
            <Image
              src='/noRequests.webp'
              alt='no-request'
              width={500}
              height={500}
            />
            <p
              style={{
                fontSize: "18px",
                textAlign: "center",
                marginTop: "1.5rem",
              }}
            >
              You currently have No requests. To make a request, click on the
              button below.
            </p>
            <Link
              href='/explore/freelancers'
              style={{
                fontSize: "18px",
                textAlign: "center",
                marginTop: "1.5rem",
                color: "#00aaff",
                cursor: "pointer",
              }}
            >
              Hire freelancers for your project.
            </Link>
          </div>
        ) : hireBox === true ? (
          <div className={styles.requestsContainer}>
            {hires.map((hire, i) => {
              return (
                <HireCard
                  contactFreelancer={contactFreelancer}
                  setReqId={setReqId}
                  setShowDeleteBox={setShowDeleteBox}
                  key={i}
                  hire={hire}
                />
              );
            })}
          </div>
        ) : (
          <div className='flex items-center justify-center gap-4 flex-wrap'>
            {premiumHires.map((hire, i) => {
              return <PremiumHireCard key={i} hire={hire} />;
            })}
          </div>
        )}
        {showDeleteBox && (
          <div className={styles.deleteBox}>
            <DeleteBox
              reqId={reqId}
              setShowDeleteBox={setShowDeleteBox}
              handleDeleteAccount={handleDeleteAccount}
              delete='Request'
            />
          </div>
        )}
      </div>
      <Footer premium={props.user?.premium} />
    </div>
  );
}
