import styles from "@/styles/ProfileNav.module.css";

function ProfileNav(props) {
  return (
    <nav className={styles.profile_nav}>
      <h1
        className={styles.nav}
        id={styles.portfolio}
        onClick={props.handlePortfolio}
      >
        Portfolio
      </h1>
      <h1
        className={styles.nav}
        id={styles.review}
        onClick={props.handleReviews}
      >
        Reviews
      </h1>
    </nav>
  );
}

export default ProfileNav;
