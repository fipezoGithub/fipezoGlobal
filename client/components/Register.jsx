import styles from "../styles/Register.module.css";
import Image from "next/image";
import Link from "next/link";

function Register() {
  return (
    <div className={styles.features}>
      <Image
        src="/mac41.png"
        alt="computer-screen"
        width={700}
        className={styles.image}
        height={700}
      />
      <div className={styles.container}>
        <div className={styles.btns}>
          <Link href="/register/freelancer" className={styles.btn}>
            <h1 className={styles.h1}>Register as a Freelancer</h1>
            <p className={styles.p}>
              Are you a skilled professional? Register as a freelancer to
              showcase your talents and connect with potential clients, opening
              the door to exciting new opportunities.
            </p>
          </Link>
          <Link href="/register/company" className={styles.btn}>
            <h1 className={styles.h1}>Register as a Company</h1>
            <p className={styles.p}>
              Grow your team with the best talent available. Register your
              company to post job opportunities and find qualified freelancers
              and professionals who can contribute to your projects and business
              growth.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
