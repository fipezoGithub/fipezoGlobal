import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/UpdateProfileAndCover.module.css";
import { AiOutlineDrag, AiOutlineUpload } from "react-icons/ai";
import { useRouter } from "next/router";

const UpdateProfileAndCover = (props) => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [warns, setWarns] = useState(false);
  const [position, setPosition] = useState("center");
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const router = useRouter();
  useEffect(() => {
    setPosition(props.position);
  }, []);
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 10485760) {
      props.setWarns(true);
      return;
    }

    setProfilePicture(file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.onerror = () => {
      console.error("Something went wrong!");
    };
  };
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 10485760) {
      props.setWarns(true);
      return;
    }

    setCoverPicture(file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setCoverImage(reader.result);
    };

    reader.onerror = () => {
      console.error("Something went wrong!");
    };
  };
  const handelCoverPostion = (e) => {
    setPosition(e.target.value);
  };
  const handelUpdateProfileCover = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    const data = new FormData();
    if (profilePicture !== "" && coverPicture === "") {
      data.append("profilePicture", profilePicture);
      data.append(
        "pictureStyle",
        JSON.stringify({ profilePicture: "center", coverPicture: "center" })
      );
      const response = await fetch(
        `${process.env.SERVER_URL}/update/freelancer/profile-picture`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      const result = await response.json();
      console.log(result);
      router.push(`/freelancer_profile`);
    } else if (coverPicture !== "" && profilePicture === "") {
      data.append("coverPicture", coverPicture);
      data.append(
        "pictureStyle",
        JSON.stringify({ profilePicture: "center", coverPicture: position })
      );
      const response = await fetch(
        `${process.env.SERVER_URL}/update/freelancer/cover`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      const result = await response.json();
      console.log(result);
      router.push(`/freelancer_profile`);
    } else if (profilePicture === "" && coverPicture === "") {
      data.append(
        "pictureStyle",
        JSON.stringify({ profilePicture: "center", coverPicture: position })
      );
      const response = await fetch(
        `${process.env.SERVER_URL}/update/freelancer/cover`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      const result = await response.json();
      console.log(result);
      router.push(`/freelancer_profile`);
    }
  };
  return (
    <div className={styles.profile_bio_card}>
      <form
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={handelUpdateProfileCover}
      >
        <Image
          src={
            coverImage
              ? coverImage
              : `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.coverPicture}`
          }
          layout="fill"
          blurDataURL="/loadImg.gif"
          placeholder="blur"
          alt="cover picture"
          style={{ objectPosition: position }}
          className="object-cover"
        />
        {/* <div
          className={styles.cover}
          style={{
            backgroundImage: `url(${
              coverImage
                ? coverImage
                : `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.coverPicture}`
            })`,
          }}
        ></div> */}
        <div className="relative bg-white self-end">
          <label
            htmlFor="coverChange"
            className="px-4 py-2 capitalize font-medium cursor-pointer flex items-center text-lg gap-1"
          >
            <AiOutlineUpload />
            upload cover
          </label>
          <input
            type="file"
            id="coverChange"
            accept="image/*"
            name="profilePicture"
            onChange={handleCoverImageChange}
            className="hidden"
          />
        </div>
        <div className="flex flex-col items-center relative bg-white group self-end">
          <label
            htmlFor="reposition"
            className="px-4 py-2 capitalize font-medium cursor-pointer flex items-center text-lg gap-1 "
          >
            <AiOutlineDrag />
            reposition
          </label>
          <select
            name=""
            id="reposition"
            className="hidden group-hover:block px-4 py-2 capitalize"
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
        <div className={styles.profile_pic + " overflow-hidden cursor-pointer"}>
          {/* <Image
          src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.profilePicture}`}
          width={500}
          height={500}
          alt="profile picture"
          blurDataURL="/loadImg.gif"
          placeholder="blur"
          className="h-full w-full object-cover"
        /> */}
          <div className={styles.editProfile}>
            <div
              className={styles.editProfileImage}
              style={{
                backgroundImage: `url(${
                  profileImage
                    ? profileImage
                    : `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.profilePicture}`
                })`,
              }}
            >
              {!profileImage && (
                <Image
                  className={styles.camera}
                  id={styles.camera}
                  src="/cameraIcon.png"
                  width={35}
                  height={35}
                  alt="camera"
                  //   onClick={handleImageClick}
                />
              )}
              <input
                type="file"
                id="file"
                accept="image/*"
                name="profilePicture"
                onChange={handleProfileImageChange}
                className={styles.fileInput}
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 self-end">
          <button
            type="submit"
            className="px-4 py-2 capitalize bg-blue-600 text-white rounded-md font-semibold"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileAndCover;
