import React from "react";
import styles from "../styles/Cover.module.css";
import Image from "next/image";

function Cover(props) {
  return (
    <div className={styles.cover}>
      <Image
        src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.coverPicture}`}
        fill={true}
        blurDataURL="/loadImg.gif"
        placeholder="blur"
        alt="cover picture"
        style={{ objectPosition: props.position?.coverPicture }}
        className="object-cover"
      />
    </div>
  );
}

export default Cover;
