import styles from "../styles/Categories.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([
    "photographer",
    "cinematographer",
    "model",
    "photo_editor",
    "video_editor",
    "anchor",
    "web_developer",
    "makeup_artist",
    "mehendi_artist",
    "album_designer",
    "drone_operator",
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
          {item === "cinematographer" && (
            <Image
              src="/cinematographer-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="cinematographer logo"
            />
          )}
          {item === "album_designer" && (
            <Image
              src="/album-designer-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="album designer logo"
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
          {item === "drone_operator" && (
            <Image
              src="/drone-operator-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="drone operator logo"
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
          {item === "makeup_artist" && (
            <Image
              src="/Makeup-artist-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="makeup artist logo"
            />
          )}
          {item === "mehendi_artist" && (
            <Image
              src="/Mehendi-artist-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="mehendi artist logo"
            />
          )}
          {item === "web_developer" && (
            <Image
              src="/web-developer-cat.png"
              width={75}
              height={75}
              className={styles.image}
              alt="web developer logo"
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
          {item === "cinematographer" && (
            <p className={styles.minText}>Cinematographer</p>
          )}
          {item === "album_designer" && (
            <p className={styles.minText}>Album Designer</p>
          )}
          {item === "anchor" && <p className={styles.minText}>Anchor</p>}
          {item === "dancer" && <p className={styles.minText}>Dancer</p>}
          {item === "dj" && <p className={styles.minText}>DJ</p>}
          {item === "drone_operator" && (
            <p className={styles.minText}>Drone Operator</p>
          )}
          {item === "influencer" && (
            <p className={styles.minText}>Influencer</p>
          )}
          {item === "makeup_artist" && (
            <p className={styles.minText}>Makeup Artist</p>
          )}
          {item === "mehendi_artist" && (
            <p className={styles.minText}>Mehendi Artist</p>
          )}
          {item === "web_developer" && (
            <p className={styles.minText}>Web Developer</p>
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
