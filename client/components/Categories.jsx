import styles from "../styles/Categories.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <div className={styles.categories}>
      <Link href="/explore/freelancer/photographer" className={styles.category}>
        <Image
          src="/photographerS.webp"
          width={75}
          height={75}
          className={styles.image}
          alt="photographer logo"
        />
        <p className={styles.minText}>Photographer</p>
      </Link>
      <Link href="/explore/freelancer/cinematographer" className={styles.category}>
        <Image
          src="/cinematographerrS.webp"
          width={72}
          height={72}
          className={styles.image}
          alt="cinematographer logo"
        />
        <p className={styles.minText}>Cinematographer</p>
      </Link>
      <Link href="/explore/freelancer/model" className={styles.category}>
        <Image
          src="/model-illus.png"
          width={90}
          height={90}
          className={styles.image}
          alt="model logo"
        />
        <p className={styles.minText}>Model</p>
      </Link>
      <Link href="/explore/freelancer/photo_editor" className={styles.category}>
        <Image
          src="/photo_editor.png"
          width={90}
          height={90}
          className={styles.image}
          alt="drone logo"
        />
        <p className={styles.minText}>Photo Editor</p>
      </Link>
      <Link href="/explore/freelancer/video_editor" className={styles.category}>
        <Image
          src="/video_editor.png"
          width={90}
          height={90}
          className={styles.image}
          alt="drone logo"
        />
        <p className={styles.minText}>Video Editor</p>
      </Link>
    </div>
  );
}
