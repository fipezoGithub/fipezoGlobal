import styles from '../styles/FreelancerPoints.module.css';
import Link from 'next/link';
import { SiTrustpilot } from 'react-icons/si';

function FreelancerPoints() {
  return (
    <div className={styles.points}>
      <div className={styles.left}>
        <div className={styles.text}>
          <h1 className={styles.heading}>Why You should use <span className={styles.colorful}>Fipezo?</span></h1>
          <h1 className={styles.head}>Fipezo: Where Freelancers upscale! Unleash your potential with seamless connections, top gigs, and boundless success!</h1>
          <ul className={styles.ul}>
            <li>
              <p className={styles.para}><SiTrustpilot className={styles.icon} style={{color: "#9fd9e0", fontSize: '22px'}} /> &nbsp; most fraudless freelance profiles.</p>
            </li>
            <li>
              <p className={styles.para}><SiTrustpilot className={styles.icon} style={{color: "#9fd9e0", fontSize: '22px'}} /> &nbsp; unique project diversity.</p>
            </li>
            <li>
              <p className={styles.para}><SiTrustpilot className={styles.icon} style={{color: "#9fd9e0", fontSize: '22px'}} /> &nbsp; most seamless interface.</p>
            </li>
          </ul>
          <Link href='/faqs' className={styles.btn}>Learn More at FAQS</Link>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
}

export default FreelancerPoints;