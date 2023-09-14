import React from "react";
import styles from "../styles/Cover.module.css";
import Image from "next/image";

function Cover(props) {
  return (
    <div className={styles.cover}>
      <Image
        src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.coverPicture}`}
        // width={4500}
        // height={2270}
        layout="fill"
        blurDataURL="/loadImg.gif"
        placeholder="blur"
        alt="cover picture"
        className="object-cover xl:[height:100vh!important]"
      />
    </div>
  );
}

export default Cover;
