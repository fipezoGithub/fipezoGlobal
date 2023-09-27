import styles from "../styles/Categories.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([
    "photographer",
    "model",
    "photo_editor",
    "video_editor",
    "anchor",
    "dancer",
    "dj",
    "influencer",
  ]);
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }
  const final = shuffleArray(categories);
  return (
    <div className={styles.categories}>
      {final.slice(0, 5).map((item, index) => (
        <Link
          href={`/explore/freelancer/${item}`}
          className={styles.category}
          key={index}
        >
          {item === "photographer" && (
            <Image
              src="/photographer-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="photographer logo"
            />
          )}
          {item === "anchor" && (
            <Image
              src="/anchor-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="anchor logo"
            />
          )}
          {item === "dancer" && (
            <Image
              src="/dancer-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="dancer logo"
            />
          )}
          {item === "dj" && (
            <Image
              src="/dj-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="dj logo"
            />
          )}
          {item === "influencer" && (
            <Image
              src="/influencer-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="influencer logo"
            />
          )}
          {item === "photo_editor" && (
            <Image
              src="/photo_editor.png"
              width={75}
              height={75}
              className={styles.image}
              alt="photo editor logo"
            />
          )}
          {item === "video_editor" && (
            <Image
              src="/video_editor.png"
              width={75}
              height={75}
              className={styles.image}
              alt="video editor logo"
            />
          )}
          {item === "model" && (
            <Image
              src="/model-illus.png"
              width={75}
              height={75}
              className={styles.image}
              alt="model logo"
            />
          )}
          {item === "photographer" && (
            <p className={styles.minText}>Photographer</p>
          )}
          {item === "anchor" && <p className={styles.minText}>Anchor</p>}
          {item === "dancer" && <p className={styles.minText}>Dancer</p>}
          {item === "dj" && <p className={styles.minText}>DJ</p>}
          {item === "influencer" && (
            <p className={styles.minText}>Influencer</p>
          )}
          {item === "photo_editor" && (
            <p className={styles.minText}>Photo Editor</p>
          )}
          {item === "video_editor" && (
            <p className={styles.minText}>Video Editor</p>
          )}
          {item === "model" && <p className={styles.minText}>Model</p>}
        </Link>
      ))}
    </div>
  );
}
