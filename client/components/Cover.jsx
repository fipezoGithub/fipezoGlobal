import React, { useState } from "react";
import styles from "../styles/Cover.module.css";
import Image from "next/image";
import { AiFillCamera, AiOutlineCloseCircle } from "react-icons/ai";
import UpdateProfileAndCover from "./UpdateProfileAndCover";

function Cover(props) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div
      className={styles.cover}
      // style={{
      //   backgroundImage: `url("https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.coverPicture}")`,
      //   backgroundPosition: position,
      // }}
    >
      <Image
        src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.coverPicture}`}
        // width={4500}
        // height={2270}
        // layout="fill"
        fill={true}
        blurDataURL="/loadImg.gif"
        placeholder="blur"
        alt="cover picture"
        style={{ objectPosition: props.position?.coverPicture }}
        className="object-cover"
      />
      {props.user?.coverPicture === props.coverPicture && (
        <div className="absolute bottom-1/2 md:bottom-1/4 right-0 md:right-4 bg-white px-4 py-2 shadow-[var(--shadow)] rounded">
          <button
            type="button"
            className="text-center capitalize flex items-center gap-2 text-sm md:text-inherit"
            onClick={() => setShowEdit(true)}
          >
            <AiFillCamera size={"1.5rem"} />
            edit cover picture
          </button>
          {showEdit === true && (
            <div className="fixed flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-[1100] backdrop-blur h-full bg-black bg-opacity-50">
              <button
                className="absolute top-10 right-10"
                type="button"
                onClick={(e) => setShowEdit(false)}
              >
                <AiOutlineCloseCircle className="text-white" size={"2em"} />
              </button>
              <UpdateProfileAndCover
                user={props.user}
                position={props.position?.coverPicture}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cover;
