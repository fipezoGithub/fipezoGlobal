import styles from '../styles/DialogBox.module.css';
import { BsCheckCircleFill } from 'react-icons/bs';

function DialogBox(props) {
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h1 className={styles.title}>{props.icon !== 'no' && <BsCheckCircleFill style={{color: "#00D280",}} />} &nbsp;{props.title}</h1>
        <h1 className={styles.heading}>{props.text}</h1>
        <div className={styles.btnBox}>
          <button className={styles.btn} onClick={() => props.handleDialogBox(false)}>OK</button>
        </div>
      </div>
    </div>
  )
}

export default DialogBox;