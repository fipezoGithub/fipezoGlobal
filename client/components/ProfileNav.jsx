import styles from "@/styles/ProfileNav.module.css";

function ProfileNav(props) {
  return (
    <nav className={styles.profile_nav}>
      <div className="relative flex flex-col items-center justify-center">
        <h1
          className={styles.nav}
          id={styles.portfolio}
          onClick={props.handlePortfolio}
        >
          Portfolio
        </h1>
        <span
          className={
            "absolute bottom-0 left-0 bg-black h-0.5" +
            (props.showPortfolio ? " w-full" : " w-0")
          }
        ></span>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <h1
          className={styles.nav}
          id={styles.review}
          onClick={props.handleReviews}
        >
          Reviews
        </h1>
        <span
          className={
            "absolute bottom-0 left-0 bg-black h-0.5" +
            (props.showReviews ? " w-full" : " w-0")
          }
        ></span>
      </div>
    </nav>
  );
}

export default ProfileNav;
