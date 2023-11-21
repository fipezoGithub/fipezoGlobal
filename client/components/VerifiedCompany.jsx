import styles from "@/styles/VerifiedCompany.module.css";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

function VerifiedCompany() {
  return (
    <div className={styles.verified}>
      <div className={styles.text}>
        <h1 className={styles.heading}>
          Explore All <span className={styles.span}>Verified Companies</span>{" "}
          And Find The Best Job For You.
        </h1>
        <Link className={styles.btn} href="/explore/companies">
          Explore Company &nbsp;&nbsp;
          <BsArrowRight id={styles.arrow} />
        </Link>
      </div>
      <div className={styles.image}>
        <Image
          src="/verifiedPX.svg"
          width="300"
          height="300"
          alt="verified tick"
          className="w-3/4 lg:w-full"
        />
      </div>
    </div>
  );
}

export default VerifiedCompany;
