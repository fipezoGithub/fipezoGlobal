import React from "react";
import styles from "../styles/RequestCard.module.css";

function HireCard(props) {
  // Function to format the date as "dd/mm/yyyy"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.requestCard}>
      <h2 className={styles.cardTitle}>
        {props.hire.freelancerDetails.firstname}&nbsp;
        {props.hire.freelancerDetails.lastname} - &nbsp;
        {props.hire.freelancerDetails.profession
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
      {props.hire.status === "accepted" && (
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
      {props.hire.date && (
        <p className={styles.cardInfo}>
          Date: {formatDate(props.hire.date?.slice(0, 10))}
        </p>
      )}
      {(props.hire.startTime !== "00:00" || props.hire.endTime !== "00:00") && (
        <p className={styles.cardInfo}>
          Time: {props.hire.startTime} - {props.hire.endTime}
        </p>
      )}
      <p className={styles.cardInfo}>Budget: {props.hire.budget}</p>
      <div className={styles.btns}>
        <button
          className={styles.btn}
          type='button'
          id={styles.accept}
          onClick={() =>
            props.contactFreelancer(
              props.hire.status,
              props.hire.freelancerDetails.phone
            )
          }
        >
          Contact
        </button>
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
