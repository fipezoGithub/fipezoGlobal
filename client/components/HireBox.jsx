import styles from "../styles/HireBox.module.css";
import { ImCross } from "react-icons/im";
import { useState } from "react";

function HireBox(props) {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [budget, setBudget] = useState("");
  const [hireError, setHireError] = useState(false);

  const submitHire = () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
      console.log(props.freelancer);
    async function postHire() {
      try {
        if (token) {
          const response = await fetch(`${process.env.SERVER_URL}/add/hire`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              freelancer: props.freelancer._id,
              fullname: `${props.user.firstname} ${props.user.lastname}`,
              phone: props.user.phone,
              description: description,
              address: address,
              date: date,
              startTime: startTime,
              endTime: endTime,
              budget: budget,
            }),
          });
          const data = await response.json();
        }
        props.setShowDialogBox(true);
        props.handleHireBox(false);
      } catch (error) {
        setHireError(true);
        console.error(error);
      }
    }

    postHire();
  };

  return (
    <div className={styles.hireBox}>
      <span onClick={() => props.handleHireBox(false)} className={styles.cross}>
        <ImCross />
      </span>
      <h1 className={styles.heading}>Send Your Task</h1>
      <p className={styles.error}>
        {hireError ? "Please fill all the fields" : ""}
      </p>
      <div className={styles.fields}>
        <div className={styles.field}>
          <div className={styles.subField}>
            <label htmlFor="name" className={styles.label}>
              <span className="text-red-500">* </span>Full Name
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="fullname"
              value={`${props.user.firstname} ${props.user.lastname}`}
              placeholder="Enter full name"
            />
          </div>
          <div className={styles.subField}>
            <label htmlFor="phone" className={styles.label}>
              <span className="text-red-500">* </span>Phone
            </label>
            <input
              className={styles.input}
              type="number"
              id="phone"
              name="phone"
              value={
                props.user.phone ? props.user.phone : props.user.companyphone
              }
              placeholder="Enter your Phone Number"
            />
          </div>
        </div>
        <div className={styles.field} id={styles.purpose}>
          <label htmlFor="description" className={styles.label}>
            <span className="text-red-500">* </span>Task Description
          </label>
          <textarea
            className={styles.textarea}
            name="description"
            id="description"
            placeholder=""
            cols="30"
            rows="10"
            value={description}
            maxLength={500}
            onChange={(e) => {
              setHireError(false);
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label htmlFor="location" className={styles.label}>
            <span className="text-red-500">* </span>Address
          </label>
          <input
            className={styles.input}
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => {
              setHireError(false);
              setAddress(e.target.value);
            }}
            maxLength={80}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="date" className={styles.label}>
            <span className="text-red-500">* </span>Date
          </label>
          <input
            className={styles.input}
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => {
              setHireError(false);
              setDate(e.target.value);
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="startTime" className={styles.label}>
            <span className="text-red-500">* </span>Start Time
          </label>
          <input
            className={styles.input}
            type="time"
            id="startTime"
            name="startTime"
            value={startTime}
            onChange={(e) => {
              setHireError(false);
              setStartTime(e.target.value);
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="endTime" className={styles.label}>
            <span className="text-red-500">* </span>End Time
          </label>
          <input
            className={styles.input}
            type="time"
            id="endTime"
            name="endTime"
            value={endTime}
            onChange={(e) => {
              setHireError(false);
              setEndTime(e.target.value);
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="budget" className={styles.label}>
            <span className="text-red-500">* </span>Total Budget (&#8377;)
          </label>
          <input
            className={styles.input}
            type="number"
            id="budget"
            name="budget"
            value={budget}
            onChange={(e) => {
              setHireError(false);
              setBudget(e.target.value);
            }}
          />
        </div>
        <div className={styles.field} id={styles.btn}>
          <button className={styles.btn} onClick={submitHire}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default HireBox;
