import { useRouter } from "next/router";
import styles from "../styles/DialogBox.module.css";
import { BsCheckCircleFill } from "react-icons/bs";

function DialogBox(props) {
  const router = useRouter();
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {props.icon !== "no" && (
            <BsCheckCircleFill style={{ color: "#00D280" }} />
          )}{" "}
          &nbsp;{props.title}
        </h1>
        <h1 className={styles.heading}>{props.text}</h1>
        <div className={styles.btnBox}>
          <button
            className={styles.btn}
            onClick={() => {
              props.handleDialogBox(false);
              if (props.home && props.home === true) {
                router.push("/");
              }
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogBox;
