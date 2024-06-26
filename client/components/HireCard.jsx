import React, { useContext } from "react";
import styles from "../styles/RequestCard.module.css";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

function HireCard(props) {
  const router = useRouter();
  const { data } = useContext(AuthContext);

  // Function to format the date as "dd/mm/yyyy"
  const formatDate = (dateStr) => {
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
      if (!props.hire.userDetails.uid) {
        res = await fetch(`${process.env.SERVER_URL}/createmessagebox`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messageId: (
              data.userDetails.phone + props.hire.freelancer.phone
            ).toString(),
            user: data.userDetails._id,
            freelancer: props.hire.freelancer._id,
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
              data.userDetails.companyphone + props.hire.freelancer.phone
            ).toString(),
            company: data.userDetails._id,
            freelancer: props.hire.freelancer._id,
          }),
        });
      }
      const respData = await res.json();
      if (res.ok) {
        if (!props.hire.userDetails.uid) {
          router.push(
            `/chats/${
              data.userDetails.firstname + "_" + data.userDetails.lastname
            }+${props.hire.freelancer?.uid}/${respData.messageId}`
          );
        } else {
          router.push(
            `/chats/${data.userDetails.uid}+${props.hire.freelancer?.uid}/${respData.messageId}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.requestCard}>
      <h2 className={styles.cardTitle}>
        <span className='capitalize'>
          {props.hire.hired_freelancer.firstname}&nbsp;
          {props.hire.hired_freelancer.lastname} - &nbsp;
        </span>
        {props.hire.hired_freelancer.profession
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h2>
      {props.hire.status === "pending" && (
        <div className={styles.tag}>
          <span id={styles.pending} className={styles.status}>
            Pending
          </span>
        </div>
      )}
      {props.hire.status === "complete" && (
        <div className={styles.tag}>
          <span id={styles.accepted} className={styles.status}>
            Accepted
          </span>
        </div>
      )}
      {props.hire.status === "declined" && (
        <div className={styles.tag}>
          <span id={styles.declined} className={styles.status}>
            Declined
          </span>
        </div>
      )}
      <p className={styles.cardInfo}>Phone: {props.hire.phone}</p>
      <p className={`w-full ${styles.cardInfo} break-words max-w-xs`}>
        Description: {props.hire.description}
      </p>
      <p className={styles.cardInfo}>Address: {props.hire.address}</p>
      {props.hire.reuireDate && (
        <p className={styles.cardInfo}>
          Date: {new Date(props.hire.reuireDate).toDateString()}
        </p>
      )}
      {(props.hire.startTime !== "00:00" || props.hire.endTime !== "00:00") && (
        <p className={styles.cardInfo}>
          Time: {props.hire.startTime} - {props.hire.endTime}
        </p>
      )}
      <p className={styles.cardInfo}>Budget: {props.hire.budget}</p>
      <div className={styles.btns}>
        <Link
          className={styles.btn}
          href={`tel:${props.hire.hired_freelancer.phone}`}
          id={styles.accept}
        >
          Contact
        </Link>
        <button
          className={styles.btn}
          type='button'
          id={styles.decline}
          onClick={() => {
            props.setShowDeleteBox(true);
            props.setReqId(props.hire._id);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default HireCard;
