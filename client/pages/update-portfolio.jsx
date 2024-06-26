import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Verification.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Link from "next/link";
import Loading from "@/components/Loading";
import { AuthContext } from "@/context/AuthContext";

const UpdatePortfolio = (props) => {
  const [images, setImages] = useState([]);
  const [newWorkImages, setNewWorkImages] = useState([]);
  const [worksError, setWorksError] = useState(false);
  const [warns, setWarns] = useState([]);
  const [currentWarns, setCurrentWarns] = useState([]);
  const [works, setWorks] = useState([]);
  const [currentWorks, setCurrentWorks] = useState([]);
  const [newPortfolioWorks, setNewPortfolioWorks] = useState([]);
  const [workIndex, setWorkIndex] = useState([]);
  const [loading, setLoading] = useState(false);
  const [premium, setPremium] = useState(false);
  const router = useRouter();

  const { data } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (!data.userDetails?.works) {
      return;
    }
    if (data.userDetails?.works.length < 8) {
      const dummyWorks = [...data.userDetails?.works];
      for (let index = 0; index < 8 - data.userDetails?.works.length; index++) {
        dummyWorks.push("");
      }
      setCurrentWorks(dummyWorks);
    } else {
      setCurrentWorks(data.userDetails?.works);
    }
    console.log(data.userDetails.premium);
    if (data.userDetails.premium) {
      setPremium(true);
    }
  }, [data.userDetails]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 10485760) {
      let newWarns = [...currentWarns];
      newWarns[index] = true;
      setCurrentWarns(newWarns);
      return;
    }

    // if (
    //   index === 3 ||
    //   index === 2 ||
    //   index === 1 ||
    //   index === 0 ||
    //   index === 8 ||
    //   index === 9 ||
    //   index === 10 ||
    //   index === 11
    // ) {
    // }
    getVerificationDetails(file, index);
    let newWarns = [...currentWarns];
    newWarns[index] = false;
    setCurrentWarns(newWarns);
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

  const handleNewImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 10485760) {
      let newWarns = [...warns];
      newWarns[index] = true;
      setWarns(newWarns);
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
      newGetVerificationDetails(file, index);
    }
    let newWarns = [...warns];
    newWarns[index] = false;
    setWarns(newWarns);

    reader.onloadend = () => {
      const newImages = [...newWorkImages];
      newImages[index] = reader.result;
      setNewWorkImages(newImages);
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
    const newWorks = [...currentWorks];
    const newIndex = [...workIndex];
    newWorks[index] = val;
    newIndex[index] = index;
    setWorkIndex(newIndex);
    setWorks(newWorks);
    // if (index === 8 || index === 9 || index === 10 || index === 11) {
    //   const newIndex = index - 4;
    // } else if (index === 0 || index === 1 || index === 2 || index === 3) {
    //   const newWorks = [...works];
    //   newWorks[index] = val;
    //   setWorks(newWorks);
    // }
    // if (
    //   index === 17 ||
    //   index === 18 ||
    //   index === 19 ||
    //   index === 20 ||
    //   index === 21 ||
    //   index === 22 ||
    //   index === 23 ||
    //   index === 24 ||
    //   index === 25
    // ) {
    //   const newIndex = index - 17;
    //   const newWorks = [...works];
    //   newWorks[newIndex] = val;
    //   setWorks(newWorks);
    // }
  };

  const newGetVerificationDetails = (val, index) => {
    if (index === 8 || index === 9 || index === 10 || index === 11) {
      const newIndex = index - 4;
      const newWorks = [...newPortfolioWorks];
      newWorks[newIndex] = val;
      setNewPortfolioWorks(newWorks);
    } else if (index === 0 || index === 1 || index === 2 || index === 3) {
      const newWorks = [...newPortfolioWorks];
      newWorks[index] = val;
      setNewPortfolioWorks(newWorks);
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
      const newWorks = [...newPortfolioWorks];
      newWorks[newIndex] = val;
      setNewPortfolioWorks(newWorks);
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

  const verificationDetails = async (e) => {
    if (newPortfolioWorks.length < 0) {
      return;
    }
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const data = new FormData();
      if (newPortfolioWorks.length > 0) {
        newPortfolioWorks.forEach((element) => {
          data.append("works[]", element);
        });
      }
      const response = await fetch(
        `${process.env.SERVER_URL}/freelancer/premiumupload`,
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
        props.setUser(null);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return loading ? (
    <Loading message={"Update your portfolio"} />
  ) : (
    <>
      <Navbar
        user={props?.user}
        company={props?.company}
        setCompany={props?.setCompany}
        setUser={props?.setUser}
        socket={props.socket}
      />
      <div className='mt-16 mx-8 flex flex-col items-center justify-center'>
        <h1 className={styles.heading}>
          Update Your Works
          {worksError && (
            <p className={styles.err}>Please Provide atleast 8 Works for you</p>
          )}
        </h1>
        {(data.userDetails?.profession === "photographer" ||
          data.userDetails?.profession === "photo_editor" ||
          data.userDetails?.profession === "model" ||
          data.userDetails?.profession === "makeup_artist" ||
          data.userDetails?.profession === "album_designer" ||
          data.userDetails?.profession === "web_developer" ||
          data.userDetails?.profession === "graphics_designer" ||
          data.userDetails?.profession === "mehendi_artist" ||
          data.userDetails?.profession === "private_tutor" ||
          data.userDetails?.profession === "drawing_teacher" ||
          data.userDetails?.profession === "painter" ||
          data.userDetails?.profession === "fashion_designer" ||
          data.userDetails?.profession === "babysitter" ||
          data.userDetails?.profession === "maid") && (
          <div className={styles.portfolio}>
            {currentWorks.map((work, i) => (
              <div
                className={styles.addBox}
                key={i}
                style={{
                  backgroundImage: images[i]
                    ? `url(${images[i]})`
                    : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${work}')`,
                }}
              >
                <input
                  type='file'
                  className={styles.work}
                  id={`workimg${i}`}
                  onChange={(e) => handleImageChange(e, i)}
                  accept='image/jpeg,image/png'
                />
                {!images[i] && (
                  <label htmlFor={`workimg${i}`} className='cursor-pointer'>
                    <AiOutlinePlus
                      className={styles.plus}
                      style={{ color: "#1f1c1c" }}
                    />
                  </label>
                )}
                {currentWarns[i] && (
                  <p className={styles.warn} id={styles.warn}>
                    File size exceeds maximum limit of 10mb
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        {(data.userDetails?.profession === "drone_operator" ||
          data.userDetails?.profession === "anchor" ||
          data.userDetails?.profession === "dj" ||
          data.userDetails?.profession === "dancer" ||
          data.userDetails?.profession === "influencer" ||
          data.userDetails?.profession === "actor" ||
          data.userDetails?.profession === "actress" ||
          data.userDetails?.profession === "interior_designer") && (
          <div className={styles.portfolio}>
            {currentWorks.map((work, i) => {
              if (work === "") {
                if (i <= 3) {
                  return (
                    <input
                      type='url'
                      className={styles.input}
                      placeholder={work}
                      key={i}
                      // value={work}
                      onChange={(e) => {
                        e.target.removeAttribute("style");
                      }}
                      onBlur={(e) => {
                        if (!e.target.value.includes("https://youtu")) {
                          e.target.style.border = "1px solid red";
                          e.target.value = "";
                          e.target.placeholder = "url must be a youtube link";
                        } else {
                          getVerificationDetails(e.target.value, i);
                        }
                      }}
                    />
                  );
                } else {
                  return (
                    <div
                      className={styles.addBox}
                      key={i}
                      style={{
                        backgroundImage: images[i] ? `url(${images[i]})` : ``,
                      }}
                    >
                      <input
                        type='file'
                        className={styles.work}
                        onChange={(e) => handleImageChange(e, i)}
                        accept='image/jpeg,image/png'
                      />
                      {!images[i] && (
                        <AiOutlinePlus
                          className={styles.plus + " hidden"}
                          style={{ color: "#1f1c1c" }}
                        />
                      )}
                      {currentWarns[i] && (
                        <p className={styles.warn} id={styles.warn}>
                          File size exceeds maximum limit of 10mb
                        </p>
                      )}
                    </div>
                  );
                }
              } else if (work?.includes("https://youtu")) {
                return (
                  <input
                    type='url'
                    className={styles.input}
                    placeholder={work}
                    key={i}
                    // value={work}
                    onChange={(e) => {
                      e.target.removeAttribute("style");
                    }}
                    onBlur={(e) => {
                      if (!e.target.value.includes("https://youtu")) {
                        e.target.style.border = "1px solid red";
                        e.target.value = "";
                        e.target.placeholder = "url must be a youtube link";
                      } else {
                        getVerificationDetails(e.target.value, i);
                      }
                    }}
                  />
                );
              } else {
                return (
                  <div
                    className={styles.addBox}
                    key={i}
                    style={{
                      backgroundImage: images[i]
                        ? `url(${images[i]})`
                        : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${work}')`,
                    }}
                  >
                    <input
                      type='file'
                      className={styles.work}
                      onChange={(e) => handleImageChange(e, i)}
                      accept='image/jpeg,image/png'
                    />
                    {!images[i] && (
                      <AiOutlinePlus
                        className={styles.plus + " hidden"}
                        style={{ color: "#1f1c1c" }}
                      />
                    )}
                    {currentWarns[i] && (
                      <p className={styles.warn} id={styles.warn}>
                        File size exceeds maximum limit of 10mb
                      </p>
                    )}
                  </div>
                );
              }
            })}
          </div>
        )}
        {(data.userDetails?.profession === "cinematographer" ||
          data.userDetails?.profession === "video_editor" ||
          data.userDetails?.profession === "dance_teacher" ||
          data.userDetails?.profession === "music_teacher" ||
          data.userDetails?.profession === "lyricist" ||
          data.userDetails?.profession === "musician" ||
          data.userDetails?.profession === "voice_over_artist" ||
          data.userDetails?.profession === "vocalist") && (
          <div className={styles.portfolio}>
            {currentWorks.map((work, i) => (
              <input
                type='url'
                key={i}
                className={styles.input}
                placeholder={work}
                onChange={(e) => {
                  e.target.removeAttribute("style");
                }}
                onBlur={(e) => {
                  if (!e.target.value.includes("https://youtu")) {
                    e.target.style.border = "1px solid red";
                    e.target.value = "";
                    e.target.placeholder = "url must be a youtube link";
                  } else {
                    getVerificationDetails(e.target.value, i);
                  }
                }}
              />
            ))}
            {/* <input
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
            /> */}
          </div>
        )}
        <button
          type='button'
          className='px-6 py-3 text-xl capitalize font-semibold rounded-lg bg-blue-600 text-white shadow-lg shadow-[var(--shadow)]'
          onClick={updateWorks}
        >
          submit
        </button>
      </div>
      <div className='flex items-center justify-center my-16'>
        <hr className='h-0.5 w-40 border-gray-700' />
      </div>
      <div className='mt-16 mx-8 flex flex-col items-center justify-center relative'>
        {premium === false && (
          <div className='absolute w-full h-full flex items-center justify-center z-10 backdrop-blur-sm'>
            <Link
              href='/freelancer-premium-plans'
              className='text-3xl capitalize px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold'
            >
              unlock now
            </Link>
          </div>
        )}
        <h1 className={styles.heading}>
          Add new Works
          {worksError && (
            <p className={styles.err}>Please Provide atleast 8 Works for you</p>
          )}
        </h1>
        {(data.userDetails?.profession === "photographer" ||
          data.userDetails?.profession === "photo_editor" ||
          data.userDetails?.profession === "model" ||
          data.userDetails?.profession === "makeup_artist" ||
          data.userDetails?.profession === "album_designer" ||
          data.userDetails?.profession === "web_developer" ||
          data.userDetails?.profession === "graphics_designer" ||
          data.userDetails?.profession === "mehendi_artist" ||
          data.userDetails?.profession === "private_tutor" ||
          data.userDetails?.profession === "drawing_teacher" ||
          data.userDetails?.profession === "painter" ||
          data.userDetails?.profession === "fashion_designer" ||
          data.userDetails?.profession === "babysitter" ||
          data.userDetails?.profession === "maid") && (
          <div className={styles.portfolio}>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: newWorkImages[0]
                  ? `url(${newWorkImages[0]})`
                  : `none')`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                id='workimg1'
                onChange={(e) => handleNewImageChange(e, 0)}
                accept='image/jpeg,image/png'
              />
              {!newWorkImages[0] && (
                <label htmlFor='workimg1' className='cursor-pointer'>
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {warns[0] && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: newWorkImages[1]
                  ? `url('${newWorkImages[1]}')`
                  : `none')`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 1)}
                accept='image/jpeg,image/png'
                id='workimg2'
              />
              {!newWorkImages[1] && (
                <label htmlFor='workimg2' className='cursor-pointer'>
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {warns[1] && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: newWorkImages[2]
                  ? `url(${newWorkImages[2]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 2)}
                accept='image/jpeg,image/png'
                id='workimg3'
              />
              {!newWorkImages[2] && (
                <label htmlFor='workimg3' className='cursor-pointer'>
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {warns[2] && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: newWorkImages[3]
                  ? `url(${newWorkImages[3]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 3)}
                accept='image/jpeg,image/png'
                id='workimg4'
              />
              {!newWorkImages[3] && (
                <label htmlFor='workimg4' className='cursor-pointer'>
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {warns[3] && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div
              className={styles.addBox}
              style={{
                backgroundImage: newWorkImages[8]
                  ? `url(${newWorkImages[8]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 8)}
                accept='image/jpeg,image/png'
                id='workimg5'
              />
              {!newWorkImages[8] && (
                <label htmlFor='workimg5' className='cursor-pointer'>
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
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
                backgroundImage: newWorkImages[9]
                  ? `url(${newWorkImages[9]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 9)}
                accept='image/jpeg,image/png'
                id='workimg6'
              />
              {!newWorkImages[9] && (
                <label htmlFor='workimg6' className='cursor-pointer'>
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
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
                backgroundImage: newWorkImages[10]
                  ? `url(${newWorkImages[10]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 10)}
                accept='image/jpeg,image/png'
                id='workimg7'
              />
              {!newWorkImages[10] && (
                <label htmlFor='workimg7' className='cursor-pointer'>
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
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
                backgroundImage: newWorkImages[11]
                  ? `url(${newWorkImages[11]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 11)}
                accept='image/jpeg,image/png'
                id='workimg8'
              />
              {!newWorkImages[11] && (
                <label htmlFor='workimg8' className='cursor-pointer'>
                  <AiOutlinePlus
                    className={styles.plus}
                    style={{ color: "#1f1c1c" }}
                  />
                </label>
              )}
              {warns[11] && (
                <p className={styles.warn} id={styles.warn}>
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
          </div>
        )}
        {(data.userDetails?.profession === "drone_operator" ||
          data.userDetails?.profession === "anchor" ||
          data.userDetails?.profession === "dj" ||
          data.userDetails?.profession === "dancer" ||
          data.userDetails?.profession === "influencer" ||
          data.userDetails?.profession === "actor" ||
          data.userDetails?.profession === "actress" ||
          data.userDetails?.profession === "interior_designer") && (
          <div className={styles.portfolio}>
            <input
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 17);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 18);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 19);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 20);
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
                backgroundImage: newWorkImages[8]
                  ? `url(${newWorkImages[8]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 8)}
                accept='image/jpeg,image/png'
              />
              {!newWorkImages[8] && (
                <AiOutlinePlus
                  className={styles.plus}
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
                backgroundImage: newWorkImages[9]
                  ? `url(${newWorkImages[9]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 9)}
                accept='image/jpeg,image/png'
              />
              {!newWorkImages[9] && (
                <AiOutlinePlus
                  className={styles.plus}
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
                backgroundImage: newWorkImages[10]
                  ? `url(${newWorkImages[10]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 10)}
                accept='image/jpeg,image/png'
              />
              {!newWorkImages[10] && (
                <AiOutlinePlus
                  className={styles.plus}
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
                backgroundImage: newWorkImages[11]
                  ? `url(${newWorkImages[11]})`
                  : `none`,
              }}
            >
              <input
                type='file'
                className={styles.work}
                onChange={(e) => handleNewImageChange(e, 11)}
                accept='image/jpeg,image/png'
              />
              {!newWorkImages[11] && (
                <AiOutlinePlus
                  className={styles.plus}
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
        {(data.userDetails?.profession === "cinematographer" ||
          data.userDetails?.profession === "video_editor" ||
          data.userDetails?.profession === "dance_teacher" ||
          data.userDetails?.profession === "music_teacher" ||
          data.userDetails?.profession === "lyricist" ||
          data.userDetails?.profession === "musician" ||
          data.userDetails?.profession === "voice_over_artist" ||
          data.userDetails?.profession === "vocalist") && (
          <div className={styles.portfolio}>
            <input
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 17);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 18);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 19);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 20);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 21);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 22);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 23);
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
              type='url'
              className={styles.input}
              placeholder='https://www.youtube.com/example'
              onChange={(e) => {
                newGetVerificationDetails(e.target.value, 24);
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
          type='button'
          className='px-6 py-3 text-xl capitalize font-semibold rounded-lg bg-blue-600 text-white shadow-lg shadow-[var(--shadow)]'
          onClick={verificationDetails}
        >
          submit
        </button>
      </div>
      <div className='w-full mt-8'></div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default UpdatePortfolio;
