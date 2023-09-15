import React, { useEffect, useState } from "react";
import styles from "../styles/Cover.module.css";
import Image from "next/image";
import { AiFillCamera, AiOutlineDrag, AiOutlineUpload } from "react-icons/ai";
import { useRouter } from "next/router";

function Cover(props) {
  const [position, setPosition] = useState("");
  const router = useRouter();
  useEffect(() => {
    console.log(localStorage.getItem("coverPosition"));
    setPosition(localStorage.getItem("coverPosition"));
  }, []);

  const handelCoverPostion = (e) => {
    setPosition(e.target.value);
    localStorage.setItem("coverPosition", e.target.value);
  };
  const handelCoverSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;
      const data = new FormData();
      data.append("coverPicture", e.target.files[0]);
      const res = await fetch(
        `${process.env.SERVER_URL}/update/freelancer/cover`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      const user = await res.json();
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={styles.cover}
      style={{
        backgroundImage: `url("https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.coverPicture}")`,
        backgroundPosition: position,
      }}
    >
      {/* <Image
        src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.coverPicture}`}
        width={4500}
        height={2270}
        layout="fill"
        onDrag={handelDrag}
        blurDataURL="/loadImg.gif"
        placeholder="blur"
        alt="cover picture"
        style={{ objectPosition: `center` }}
        className="object-fill"
      /> */}
      {/* <div className="absolute bottom-1/2 md:bottom-1/4 right-0 md:right-4 bg-white px-4 py-2 shadow-[var(--shadow)] rounded group">
        <p className="text-center group-hover:hidden capitalize flex items-center gap-2 text-sm md:text-inherit">
          <AiFillCamera size={"1.5rem"} />
          edit cover picture
        </p>
        <div className="items-center gap-4 hidden group-hover:flex">
          <label
            type="button"
            className="flex items-center gap-2 capitalize cursor-pointer"
            id="cover"
          >
            <AiOutlineUpload />
            upload photo
            <input
              type="file"
              accept="image/*"
              id="cover"
              className="hidden"
              onChange={handelCoverSubmit}
            />
          </label>
          <div className="flex flex-col items-center">
            <label
              htmlFor="reposition"
              className="flex items-center gap-2 capitalize"
            >
              <AiOutlineDrag />
              reposition
            </label>
            <select
              name=""
              id="reposition"
              value={position}
              onChange={handelCoverPostion}
            >
              <option value="top">top</option>
              <option value="bottom">bottom</option>
              <option value="left">left</option>
              <option value="right">right</option>
              <option value="center">center</option>
            </select>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Cover;
