import React, { useEffect, useState } from "react";
import styles from "../styles/Verification.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

const UpdatePortfolio = (props) => {
  const [images, setImages] = useState([]);
  const [worksError, setWorksError] = useState(false);
  const [warns, setWarns] = useState([]);
  const [works, setWorks] = useState([]);
  const [workIndex, setWorkIndex] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!props.user?.works) {
      return;
    }
    setWorks(props.user?.works);
  }, [props.user]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 10485760) {
      setWarns(true, index);
      return;
    }

    if (
      index === 3 ||
      index === 2 ||
      index === 1 ||
      index === 0 ||
      index === 8 ||
      index === 9 ||
      index === 10 ||
      index === 11
    ) {
      getVerificationDetails(file, index);
    }

    reader.onloadend = () => {
      const newImages = [...images];
      newImages[index] = reader.result;
      setImages(newImages);
    };

    reader.readAsDataURL(file);

    if (
      works.length >= 7 &&
      (index === 3 ||
        index === 2 ||
        index === 1 ||
        index === 0 ||
        index === 8 ||
        index === 9 ||
        index === 10 ||
        index === 11)
    ) {
      checkWorks(1);
    }
  };

  const getVerificationDetails = (val, index) => {
    if (index === 8 || index === 9 || index === 10 || index === 11) {
      const newIndex = index - 4;
      const newWorks = [...works];
      newWorks[newIndex] = val;
      setWorks(newWorks);
    } else if (index === 0 || index === 1 || index === 2 || index === 3) {
      const newWorks = [...works];
      newWorks[index] = val;
      setWorks(newWorks);
    }
    if (
      index === 17 ||
      index === 18 ||
      index === 19 ||
      index === 20 ||
      index === 21 ||
      index === 22 ||
      index === 23 ||
      index === 24 ||
      index === 25
    ) {
      const newIndex = index - 17;
      const newWorks = [...works];
      newWorks[newIndex] = val;
      setWorks(newWorks);
    }
  };

  const checkWorks = (val) => {
    if (val === 1) setWorksError(false);
  };

  const updateWorks = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const data = new FormData();
      if (works.length > 0) {
        works.forEach((element) => {
          data.append("works[]", element);
        });
        data.append("index", workIndex);
        // data.append("works[]", works[1]);
        // data.append("works[]", works[2]);
        // data.append("works[]", works[3]);
        // data.append("works[]", works[4]);
        // data.append("works[]", works[5]);
        // data.append("works[]", works[6]);
        // data.append("works[]", works[7]);
      }
      const response = await fetch(
        `${process.env.SERVER_URL}/profile/protfolio/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      const responseData = await response.json();
      if (responseData) {
        router.push(`/freelancer_profile`);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar
        user={props?.user}
        company={props?.company}
        setCompany={props?.setCompany}
        setUser={props?.setUser}
      />
      <div className="mt-16 mx-8 flex flex-col items-center justify-center">
        <h1 className={styles.heading}>
          Update Your Works
          {worksError && (
            <p className={styles.err}>Please Provide atleast 8 Works for you</p>
          )}
        </h1>
        {(props.user?.profession === "photographer" ||
          props.user?.profession === "photo_editor" ||
          props.user?.profession === "model" ||
          props.user?.profession === "makeup_artist" ||
          props.user?.profession === "album_designer" ||
          props.user?.profession === "web_developer" ||
          props.user?.profession === "graphics_designer" ||
          props.user?.profession === "mehendi_artist") && (
          <div className={styles.portfolio}>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[0]
                  ? `url(${images[0]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.works[0]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                id="workimg1"
                onChange={(e) => handleImageChange(e, 0)}
                accept="image/jpeg,image/png"
              />
              {!images[0] && (
                <label htmlFor="workimg1" className="cursor-pointer">
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {props.warns && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[1]
                  ? `url('${images[1]}')`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.works[1]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 1)}
                accept="image/jpeg,image/png"
                id="workimg2"
              />
              {!images[1] && (
                <label htmlFor="workimg2" className="cursor-pointer">
                  <AiOutlinePlus
                    className={styles.plus + " hidden"}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {props.warns && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[2]
                  ? `url(${images[2]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user.works[2]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 2)}
                accept="image/jpeg,image/png"
                id="workimg3"
              />
              {!images[2] && (
                <label htmlFor="workimg3" className="cursor-pointer">
                  <AiOutlinePlus
                    className={styles.plus + " hidden"}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {props.warns && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[3]
                  ? `url(${images[3]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.works[3]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 3)}
                accept="image/jpeg,image/png"
                id="workimg4"
              />
              {!images[3] && (
                <label htmlFor="workimg4" className="cursor-pointer">
                  <AiOutlinePlus
                    className={styles.plus + " hidden"}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {props.warns && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[8]
                  ? `url(${images[8]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.works[4]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 8)}
                accept="image/jpeg,image/png"
                id="workimg5"
              />
              {!images[8] && (
                <label htmlFor="workimg5" className="cursor-pointer">
                  <AiOutlinePlus
                    className={styles.plus + " hidden"}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {props.warns && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[9]
                  ? `url(${images[9]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.works[5]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 9)}
                accept="image/jpeg,image/png"
                id="workimg6"
              />
              {!images[9] && (
                <label htmlFor="workimg6" className="cursor-pointer">
                  <AiOutlinePlus
                    className={styles.plus + " hidden"}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {props.warns && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[10]
                  ? `url(${images[10]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user.works[6]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 10)}
                accept="image/jpeg,image/png"
                id="workimg7"
              />
              {!images[10] && (
                <label htmlFor="workimg7" className="cursor-pointer">
                  <AiOutlinePlus
                    className={styles.plus + " hidden"}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {props.warns && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[11]
                  ? `url(${images[11]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.works[7]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 11)}
                accept="image/jpeg,image/png"
                id="workimg8"
              />
              {!images[11] && (
                <label htmlFor="workimg8" className="cursor-pointer">
                  <AiOutlinePlus
                    className={styles.plus + " hidden"}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {props.warns && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
          </div>
        )}
        {(props.user?.profession === "drone_operator" ||
          props.user?.profession === "anchor" ||
          props.user?.profession === "dj" ||
          props.user?.profession === "dancer" ||
          props.user?.profession === "influencer") && (
          <div className={styles.portfolio}>
            <input
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/example"
              value={props.user?.works[0]}
              onChange={(e) => {
                getVerificationDetails(e.target.value, 17);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/example"
              value={props.user?.works[1]}
              onChange={(e) => {
                getVerificationDetails(e.target.value, 18);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              value={props.user?.works[2]}
              placeholder="https://www.youtube.com/example"
              onChange={(e) => {
                getVerificationDetails(e.target.value, 19);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              value={props.user?.works[3]}
              placeholder="https://www.youtube.com/example"
              onChange={(e) => {
                getVerificationDetails(e.target.value, 20);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[8]
                  ? `url(${images[8]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user.works[4]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 8)}
                accept="image/jpeg,image/png"
              />
              {!images[8] && (
                <AiOutlinePlus
                  className={styles.plus + " hidden"}
                  style={{ color: "#1f1c1c" }}
                />
              )}
              {warns[8] && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[9]
                  ? `url(${images[9]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.works[5]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 9)}
                accept="image/jpeg,image/png"
              />
              {!images[9] && (
                <AiOutlinePlus
                  className={styles.plus + " hidden"}
                  style={{ color: "#1f1c1c" }}
                />
              )}
              {warns[9] && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[10]
                  ? `url(${images[10]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.works[6]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 10)}
                accept="image/jpeg,image/png"
              />
              {!images[10] && (
                <AiOutlinePlus
                  className={styles.plus + " hidden"}
                  style={{ color: "#1f1c1c" }}
                />
              )}
              {warns[10] && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: images[11]
                  ? `url(${images[11]})`
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.user?.works[7]}')`,
              }}
            >
              <input
                type="file"
                className={styles.work}
                onChange={(e) => handleImageChange(e, 11)}
                accept="image/jpeg,image/png"
              />
              {!images[11] && (
                <AiOutlinePlus
                  className={styles.plus + " hidden"}
                  style={{ color: "#1f1c1c" }}
                />
              )}
              {warns[11] && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
          </div>
        )}
        {(props.user?.profession === "cinematographer" ||
          props.user?.profession === "video_editor") && (
          <div className={styles.portfolio}>
            <input
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/example"
              value={works[0]}
              onChange={(e) => {
                getVerificationDetails(e.target.value, 17);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/example"
              value={works[1]}
              onChange={(e) => {
                getVerificationDetails(e.target.value, 18);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/example"
              value={works[2]}
              onChange={(e) => {
                getVerificationDetails(e.target.value, 19);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/example"
              value={works[3]}
              onChange={(e) => {
                getVerificationDetails(e.target.value, 20);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              value={works[4]}
              placeholder="https://www.youtube.com/example"
              onChange={(e) => {
                getVerificationDetails(e.target.value, 21);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/example"
              value={works[5]}
              onChange={(e) => {
                getVerificationDetails(e.target.value, 22);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/example"
              value={works[6]}
              onChange={(e) => {
                getVerificationDetails(e.target.value, 23);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
            <input
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/example"
              value={works[7]}
              onChange={(e) => {
                getVerificationDetails(e.target.value, 24);
                e.target.removeAttribute("style");
              }}
              onBlur={(e) => {
                if (!e.target.value.includes("https://youtu")) {
                  e.target.style.border = "1px solid red";
                  e.target.value = "";
                  e.target.placeholder = "url must be a youtube link";
                }
              }}
            />
          </div>
        )}
        <button
          type="button"
          className="px-6 py-3 text-xl capitalize font-semibold rounded-lg bg-blue-600 text-white shadow-lg shadow-[var(--shadow)]"
          onClick={updateWorks}
        >
          submit
        </button>
      </div>
    </>
  );
};

export default UpdatePortfolio;
