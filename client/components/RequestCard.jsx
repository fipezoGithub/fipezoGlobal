import React, { useContext } from "react";
import styles from "../styles/RequestCard.module.css";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

function RequestCard(props) {
  const router = useRouter();
  const { data } = useContext(AuthContext);
  // Function to format the date as "dd/mm/yyyy"
  const formatDate = (dateStr) => {
    if (dateStr === undefined) {
      return;
    }
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const createChatRoom = async () => {
    if (!data.isLoggedIn) {
      router.push("/login");
    }
    try {
      let res;
      if (!props.request.userDetails.uid) {
        res = await fetch(`${process.env.SERVER_URL}/createmessagebox`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messageId: (
              data.userDetails.phone + props.request.userDetails.phone
            ).toString(),
            user: props.request.userDetails._id,
            freelancer: data.userDetails._id,
          }),
        });
      } else {
        res = await fetch(`${process.env.SERVER_URL}/createmessagebox`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messageId: (
              data.userDetails.phone + props.request.userDetails.companyphone
            ).toString(),
            company: props.request.userDetails._id,
            freelancer: data.userDetails._id,
          }),
        });
      }
      const respData = await res.json();
      if (res.ok) {
        router.push(
          `/chats/${data.userDetails.uid}+${props.request.userDetails?.uid}/${respData.messageId}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.requestCard}>
      <h2 className={styles.cardTitle}>{props.request.fullname}</h2>
      <a className={styles.cardInfo} href={`tel:${props.request.phone}`}>
        Phone: {props.request.phone}
      </a>
      <p className={`w-full ${styles.cardInfo} break-words max-w-xs`}>
        Description: {props.request.description}
      </p>
      <p className={styles.cardInfo}>Address: {props.request.address}</p>
      <p className={styles.cardInfo}>
        Date:{" "}
        {formatDate(props.request.date?.slice(0, 10)) === undefined
          ? "Non applicable"
          : formatDate(props.request.date.slice(0, 10))}
      </p>
      <p className={styles.cardInfo}>
        Time:{" "}
        {props.request.startTime === "00:00" &&
        props.request.endTime === "00:00"
          ? "Not applicable"
          : `${props.request.startTime} - ${props.request.endTime}`}
      </p>
      <p className={styles.cardInfo}>Budget: {props.request.budget}</p>
      {props.request.status === "pending" && (
        <div className={styles.btns}>
          <button
            className={styles.btn}
            type='button'
            id={styles.decline}
            onClick={() => {
              props.setShowDeleteBox(true);
              props.setReqId(props.request);
            }}
          >
            Decline
          </button>
          <button
            className={styles.btn}
            type='button'
            id={styles.accept}
            onClick={() => {
              props.acceptRequest(props.request);
              props.setShowAcceptBox(true);
            }}
          >
            Accept
          </button>
          <button
            className={
              styles.btn +
              " bg-blue-500 rounded-md text-white hover:bg-blue-700"
            }
            type='button'
            onClick={createChatRoom}
          >
            Message
          </button>
        </div>
      )}
      {props.request.status !== "pending" &&
        (props.request.status === "accepted" ? (
          <div className={styles.btns}>
            <button
              className={`${styles.btn} ${styles.accepted}`}
              type='button'
              id={styles.accepted}
            >
              Accepted
            </button>
          </div>
        ) : (
          <div className={styles.btns}>
            <button
              className={`${styles.btn} ${styles.accepted} bg-red-600 text-white`}
              type='button'
            >
              Declined
            </button>
          </div>
        ))}
    </div>
  );
}

export default RequestCard;
