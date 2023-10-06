import styles from "../styles/Featured.module.css";
import ProfileCard from "./ProfileCard";
import { useEffect, useState } from "react";

export default function Featured() {
  const [freelancers, setFreelancers] = useState([]);
  useEffect(() => {
    async function fetchFreelancer() {
      try {
        const response = await fetch(
          `${process.env.SERVER_URL}/profiles/featured/freelancer`,
          { cache: "no-store" }
        );
        const data = await response.json();
        setFreelancers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFreelancer();
  }, []);

  return (
    <div className={styles.featured}>
      {freelancers.length > 0 && (
        <h1 className={styles.heading}>Featured Freelancers</h1>
      )}
      {freelancers.length > 0 && (
        <p className={styles.subHeading}>
          Discover Skilled Freelancers on Our Platform
        </p>
      )}
      <div className={styles.cards}>
        {freelancers.slice(0,8).map((freelancer, index) => {
          return <ProfileCard key={index} profile={freelancer} />;
        })}
      </div>
    </div>
  );
}
