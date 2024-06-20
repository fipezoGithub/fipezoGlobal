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
      fetch(`${process.env.SERVER_URL}/hire/premium/request-freelancers`, {
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
      fetch(`${process.env.SERVER_URL}/hire/freelancer/action/${req._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ freelancer_status: "declined" }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          const oldRequest = [...requests];
          oldRequest.forEach((elm) => {
            if (elm._id === req._id) {
              elm.freelancer_status = "declined";
            }
          });
          setRequests(oldRequest);
          if (data.success) {
            req.freelancer_status = "declined";
            props.socket.emit("send-notification", {
              type: "Hire Reject",
              headline: `Your hire request is rejected by ${req.freelancerDetails.firstname} ${req.freelancerDetails.lastname}`,
              acceptedUser: req.user,
              sentFreelancer: req.freelancer,
              href: "/my_hires",
            });
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
      fetch(`${process.env.SERVER_URL}/hire/freelancer/action/${req._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ freelancer_status: "accepted" }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.success) {
            setShowDeleteBox(false);
            const oldRequest = [...requests];
            oldRequest.forEach((elm) => {
              if (elm._id === req._id) {
                elm.freelancer_status = "accepted";
              }
            });
            setRequests(oldRequest);
            props.socket.emit("send-notification", {
              type: "Hire Accept",
              headline: `Your hire request is accepted by ${req.freelancerDetails.firstname} ${req.freelancerDetails.lastname}`,
              acceptedUser: req.user,
              sentFreelancer: req.freelancer,
              href: "/my_hires",
            });
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
        socket={props.socket}
      />
      <div className={styles.requests}>
        <h1 className={styles.heading}>My Requests</h1>
        {requests.length === 0 ? (
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
              delete='Request'
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
