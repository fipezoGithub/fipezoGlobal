import styles from "@/styles/ContactCard.module.css";

const Hire249Card = (props) => {
  console.log(props);
  return (
    <div className='border m-2 md:m-0 p-2 md:p-4 md:w-[50vw]'>
      <h2 className={styles.title}>Hire Request</h2>
      <div className='flex items-start justify-between gap-4 md:gap-0'>
        <div>
          <p className={styles.label}>Name:</p>
          <p className={styles.p + " capitalize"}>{props.hire.fullname}</p>
          <p className={styles.label}>Address:</p>
          <p className={styles.p}>{props.hire.address}</p>
          <p className={styles.label}>Description:</p>
          <p className={styles.p}>{props.hire.description}</p>
          <p className={styles.label}>Phone:</p>
          <p className={styles.p}>{props.hire.phone}</p>
          <p className={styles.label}>Email:</p>
          <p className={styles.p}>{props.hire.email}</p>
        </div>
        <div>
          <p className={styles.label}>Budget:</p>
          <p className={styles.p}>
            ₹{props.hire.minBudget} - ₹{props.hire.maxBudget}
          </p>
          <p className={styles.label}>Freelancer Requirement:</p>
          <p className={styles.p}>{props.hire.freelancerCount}</p>
          <p className={styles.label}>Freelancer Profession:</p>
          <p className={styles.p}>
            {props.hire.freelancerCategory
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
          <p className={styles.label}>Freelancer Location:</p>
          <p className={styles.p}>
            {props.hire.freelancerLocation
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
          <p className={styles.label}>Client need multiple category:</p>
          <p className={styles.p}>
            {props.hire.multipleCategory ? "Yes" : "No"}
          </p>
          {props.hire.requiredDate && (
            <>
              <p className={styles.label}>Required Date:</p>
              <p className={styles.p}>
                {new Date(props.hire.requiredDate).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hire249Card;
