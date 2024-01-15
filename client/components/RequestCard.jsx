import React from "react";
import styles from "../styles/RequestCard.module.css";

function RequestCard(props) {
  // Function to format the date as "dd/mm/yyyy"
  const formatDate = (dateStr) => {
    console.log(dateStr);
    if (dateStr === undefined) {
      return;
    }
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
            type="button"
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
            type="button"
            id={styles.accept}
            onClick={() => {
              props.acceptRequest(props.request);
              props.setShowAcceptBox(true);
            }}
          >
            Accept
          </button>
        </div>
      )}
      {props.request.status !== "pending" &&
        (props.request.status === "accepted" ? (
          <div className={styles.btns}>
            <button
              className={`${styles.btn} ${styles.accepted}`}
              type="button"
              id={styles.accepted}
            >
              Accepted
            </button>
          </div>
        ) : (
          <div className={styles.btns}>
            <button
              className={`${styles.btn} ${styles.accepted} bg-red-600 text-white`}
              type="button"
            >
              Declined
            </button>
          </div>
        ))}
    </div>
  );
}

export default RequestCard;
