import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "../styles/My_requests.module.css";
import Footer from "@/components/Footer";
import RequestCard from "@/components/RequestCard";
import DeleteBox from "@/components/DeleteBox";
import { BsCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

export default function My_requests(props) {
  const [freelancer, setFreelancer] = useState(null);
  const [isFreelancerLoaded, setIsFreelancerLoaded] = useState(false);
  const [requests, setRequests] = useState([]);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [reqId, setReqId] = useState(null);
  const [showAcceptBox, setShowAcceptBox] = useState(false);
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
          setFreelancer(data);
          setIsFreelancerLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      router.push("/login");
    }
  }, [requests.length === 0]);

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [freelancer, isFreelancerLoaded]);

  const handleDeleteAccount = (req) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/cancel/request/${req._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.success) {
            let res;
            if (!req.userDetails.uid) {
              res = await fetch(
                `${process.env.SERVER_URL}/notification/create`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    type: "Hire Reject",
                    headline: `Your hire request is rejected by ${req.freelancerDetails.firstname} ${req.freelancerDetails.lastname}`,
                    acceptedUser: req.user,
                    sentFreelancer: req.freelancer,
                    href: "/my_hires",
                  }),
                }
              );
            } else {
              res = await fetch(
                `${process.env.SERVER_URL}/notification/create`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    type: "Hire Reject",
                    headline: `Your hire request is rejected by ${req.freelancerDetails.firstname} ${req.freelancerDetails.lastname}`,
                    acceptedCompany: req.user,
                    sentFreelancer: req.freelancer,
                    href: "/my_hires",
                  }),
                }
              );
            }
            const data = await res.json();
            setShowDeleteBox(false);
            setReqId(null);
            setRequests([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const acceptRequest = (req) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/accept/request/${req._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.success) {
            setShowDeleteBox(false);
            let res;
            if (!req.userDetails.uid) {
              res = await fetch(
                `${process.env.SERVER_URL}/notification/create`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    type: "Hire Accept",
                    headline: `Your hire request is accepted by ${req.freelancerDetails.firstname} ${req.freelancerDetails.lastname}`,
                    acceptedUser: req.user,
                    sentFreelancer: req.freelancer,
                    href: "/my_hires",
                  }),
                }
              );
            } else {
              res = await fetch(
                `${process.env.SERVER_URL}/notification/create`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    type: "Hire Accept",
                    headline: `Your hire request is accepted by ${req.freelancerDetails.firstname} ${req.freelancerDetails.lastname}`,
                    acceptedCompany: req.user,
                    sentFreelancer: req.freelancer,
                    href: "/my_hires",
                  }),
                }
              );
            }
            const data = await res.json();
            setRequests([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className={styles.myRequests}>
      <Head>
        <title>Fipezo | My Requests</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className={styles.requests}>
        <h1 className={styles.heading}>My Requests</h1>
        {requests.length === 0 ? (
          <div className={styles.noRequestsImage}>
            <Image src="/noRequests.webp" alt="no-request" width={500} height={500} />
            <p
              style={{
                fontSize: "18px",
                textAlign: "center",
                marginTop: "1.5rem",
              }}
            >
              You currently have no requests. Please wait for a client to send
              you a request.
            </p>
          </div>
        ) : (
          <div className={styles.requestsContainer}>
            {requests.map((request, i) => {
              return (
                <RequestCard
                  setShowAcceptBox={setShowAcceptBox}
                  acceptRequest={acceptRequest}
                  setReqId={setReqId}
                  setShowDeleteBox={setShowDeleteBox}
                  key={i}
                  request={request}
                />
              );
            })}
          </div>
        )}
        {showDeleteBox && (
          <div className={styles.deleteBox}>
            <DeleteBox
              reqId={reqId}
              setShowDeleteBox={setShowDeleteBox}
              handleDeleteAccount={handleDeleteAccount}
              delete="Request"
            />
          </div>
        )}
        {showAcceptBox && (
          <div className={styles.acceptBox}>
            <div className={styles.box}>
              <h1 className={styles.headingReq}>
                Request Accepted{" "}
                <BsCheckCircleFill style={{ color: "#1bd03f" }} />
              </h1>
              <p className={styles.textReq}>
                Please contact the client to discuss the details. Ensure that
                you are punctual and perform the job diligently. Remember to
                collect the payment from the client. Failing to arrive on time
                may result in a negative review or even a suspension.
              </p>
              <button
                className={styles.btnReq}
                onClick={() => setShowAcceptBox(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer premium={props.user?.premium} />
    </div>
  );
}
