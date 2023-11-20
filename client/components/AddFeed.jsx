import React, { useState } from "react";
import styles from "../styles/AddFeed.module.css";
import {
  AiFillYoutube,
  AiOutlineCloseCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsCardImage } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";

const AddFeed = (props) => {
  const [image, setImage] = useState("");
  const [warns, setWarns] = useState(false);
  const [description, setDescription] = useState("");
  const [postData, setPostData] = useState("");
  const [date, setdate] = useState(new Date().toJSON());
  const [showImgBox, setShowImgBox] = useState(true);
  const [showUrlBox, setShowUrlBox] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      setImage("");
      return;
    }

    if (file.size > 10485760) {
      setWarns(true);
      return;
    }
    warns === true && setWarns(false);
    setPostData(file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.onerror = () => {
      console.error("Something went wrong!");
    };
  };

  const submitPost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const data = new FormData();
      data.append("description", description);
      data.append("postData", postData);
      data.append("date", date);
      const res = await fetch(`${process.env.SERVER_URL}/feed/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const save = await res.json();
      if (save) {
        router.push("/");
        props.setFeed((prev) => [...prev, save]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="fixed top-0 w-full h-full flex flex-col items-center justify-center backdrop-blur z-[1100]">
      <form
        action=""
        encType="multipart/form-data"
        className="relative flex flex-col items-center gap-2 border border-neutral-500 bg-white px-4 py-2 rounded-lg"
        onSubmit={submitPost}
      >
        <div className="absolute top-4 right-5">
          <button type="button" onClick={() => props.setShowAddFeed(false)}>
            <AiOutlineCloseCircle size={"2em"} />
          </button>
        </div>
        <div className="border-b border-neutral-500 w-full py-4">
          <h1 className="text-xl font-bold capitalize text-center">
            create feed
          </h1>
        </div>
        <div className="flex items-center gap-4 w-full">
          <div>
            <Image
              src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.profilePicture}`}
              alt="profile picture"
              width={600}
              height={600}
              className="h-10 w-10 rounded-full object-fill"
            />
          </div>
          <div>
            <div className="capitalize font-bold">
              {props.user?.firstname.toLowerCase()}{" "}
              {props.user?.lastname.toLowerCase()}
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="focus:outline-none placeholder:capitalize w-full px-4 py-2 h-12"
          ></textarea>
        </div>
        <div className="flex items-center w-full justify-around">
          <button
            className="flex items-center text-4xl capitalize"
            title="share image"
            type="button"
            onClick={() => {
              setShowImgBox(!showImgBox);
              setShowUrlBox(false);
            }}
          >
            <BsCardImage color="#45bd62" />
          </button>
          <button
            className="flex items-center text-4xl capitalize"
            title="share youtube url"
            type="button"
            onClick={() => {
              setShowUrlBox(!showUrlBox);
              setShowImgBox(false);
            }}
          >
            <AiFillYoutube color="#ff0000" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {showImgBox === true && (
            <div
              className={styles.addBox}
              style={{
                backgroundImage: image ? `url(${image})` : `none`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                id="feedimg"
                onChange={(e) => handleImageChange(e)}
                accept="image/jpeg,image/png"
              />
              {!image && (
                <label htmlFor="feedimg" className="cursor-pointer">
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {warns && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
          )}
          {showUrlBox === true && (
            <div className={styles.portfolio}>
              <input
                type="url"
                className={styles.input}
                placeholder="https://www.youtube.com/example"
                onChange={(e) => {
                  setPostData(e.target.value);
                  e.target.removeAttribute("style");
                }}
                onBlur={(e) => {
                  if (!e.target.value.includes("youtu")) {
                    e.target.style.border = "1px solid red";
                    e.target.value = "";
                    e.target.placeholder = "url must be a youtube link";
                  }
                }}
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`capitalize bg-neutral-500 text-neutral-400 w-full py-2 rounded-lg`}
          style={
            postData === ""
              ? { backgroundColor: "rgb(115 115 115)" }
              : { backgroundColor: "rgb(59 130 246)", color: "white" }
          }
        >
          create post
        </button>
      </form>
    </div>
  );
};

export default AddFeed;
