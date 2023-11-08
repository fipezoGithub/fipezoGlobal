import styles from "@/styles/ContactCard.module.css";

function ContactCard(props) {
  const { message, issue, firstName, lastName, phone, email } = props.message;
  return (
    <div className={styles.contactCard}>
      <h2 className={styles.title}>Contact Us</h2>
      <p className={styles.label}>Name:</p>
      <p className={styles.p + " capitalize"}>
        {firstName} {lastName}
      </p>
      <p className={styles.label}>Issue:</p>
      <p className={styles.p}>{issue}</p>
      <p className={styles.label}>Message:</p>
      <p className={styles.p}>{message}</p>
      <p className={styles.label}>Phone:</p>
      <p className={styles.p}>{phone}</p>
      <p className={styles.label}>Email:</p>
      <p className={styles.p}>{email}</p>
    </div>
  );
}

export default ContactCard;
