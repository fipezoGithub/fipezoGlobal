import styles from "../styles/Verification.module.css";
import Image from "next/image";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import TermsAndConditions from "./TermsAndConditions";

function Verification(props) {
  const [images, setImages] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [aadhaarCard, setAadhaarCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [links, setLinks] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
  });
  const [works, setWorks] = useState([]);
  const [termsAndConditions, setTermsAndConditions] = useState(true);
  const [cameras, setCameras] = useState([false, false]);
  const [dialogBox, setDialogBox] = useState(false);
  const [warns, setWarns] = useState([]);

  useEffect(() => {
    props.setUser(null);
    props.setCompany(null);
  }, []);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 10485760 && index === 4) {
      setWarns((prev) => [...prev, (prev[4] = true)]);
      props.setPicError(false, 1);
      return;
    }

    if (index === 4) {
      setCameras([cameras[0], true]);
      props.getVerificationDetails(file, 4);
      setProfilePicture(file);
    }

    if (file.size > 10485760 && index === 5) {
      props.setWarns(true, 1);
      props.setPicError(false, 2);
      return;
    }

    if (index === 5) {
      setCameras([true, cameras[1]]);
      props.getVerificationDetails(file, 5);
      setCoverPicture(file);
    }

    if (file.size > 10485760 && index === 6) {
      props.setWarns(true, 2);
      props.setPicError(false, 3);
      return;
    }

    if (index === 6) {
      props.getVerificationDetails(file, 6);
      setAadhaarCard(file);
    }

    if (file.size > 10485760 && index === 7) {
      props.setWarns(true, 3);
      props.setPicError(false, 4);
      return;
    }

    if (index === 7) {
      props.getVerificationDetails(file, 7);
      setPanCard(file);
    }

    if (file.size > 10485760) {
      props.setWarns(true, index);
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
      props.getVerificationDetails(file, index);
      setWorks([...works, file]);
    }

    props.setWarns(false, -1);

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
      props.checkWorks(1);
    }

    if (index === 4) {
      props.checkWorks(4);
    }

    if (index === 5) {
      props.checkWorks(5);
    }

    if (index === 6) {
      props.checkWorks(2);
    }

    if (index === 7) {
      props.checkWorks(3);
    }
  };

  function handleImageClick(event) {
    const sibling = event.currentTarget.previousElementSibling;
    if (sibling) {
      sibling.click();
    }
  }

  function handleTermsAndConditions() {
    setDialogBox(true);
  }

  function handleClick(value) {
    setDialogBox(false);
    setTermsAndConditions(value);
  }

  return (
    <>
      <div className={styles.navigation}>
        <div className={styles.navStep}>
          <BsCheckLg
            style={{ color: "white", position: "absolute", zIndex: 100 }}
          />
          <p className={styles.navText}>Account Created</p>
        </div>
        <div className={styles.navStep}>
          2<p className={styles.navText}>Verification</p>
        </div>
        <div className={styles.navStep}>
          <Image src="/tick.png" width={80} height={80} alt="verified-tick" />
        </div>
        <div className={styles.navRoad}></div>
      </div>
      <h1 className={styles.title}>Verification Form</h1>
      <p className={styles.subTitle}>
        You&apos;re almost there! Just a final step to complete your profile.
      </p>
      {/* <div
        className={styles.imageFields}
        id={styles.cover}
        style={{
          backgroundImage: images[5] ? `url(${images[5]})` : `none`,
        }}
      >
        {!cameras[0] && (
          <Image
            className={styles.camera}
            src="/cameraIcon.png"
            width={40}
            height={40}
            alt="camera"
            onClick={handleImageClick}
          />
        )}
        <input
          type="file"
          className={styles.coverPreview}
          onChange={(e) => handleImageChange(e, 5)}
          accept="image/jpeg,image/png"
          name="coverPicture"
        />
        {props.coverPicError && (
          <p className={styles.warn}>Please Provide Cover Picture</p>
        )}
        {props.warns[1] && (
          <p className={styles.warn}>File size exceeds maximum limit of 10MB</p>
        )}
        <span className={styles.instruction}>
          Please upload images of maximum limit 10MB
        </span>
      </div>
      <div
        className={styles.imageFields}
        id={styles.profile_pic}
        style={{
          backgroundImage: images[4] ? `url(${images[4]})` : `url(/dp.png)`,
        }}
      >
        {!cameras[1] && (
          <Image
            className={styles.camera}
            id={styles.camera}
            src="/cameraIcon.png"
            width={40}
            height={40}
            alt="camera"
            onClick={handleImageClick}
          />
        )}
        <input
          type="file"
          className={styles.profilePicPreview}
          onChange={(e) => handleImageChange(e, 4)}
          accept="image/jpeg,image/png"
          name="profilePicture"
        />
        {props.profilePicError && (
          <p className={styles.warn}>Please Provide Profile Picture</p>
        )}
        {props.warns[0] && (
          <p className={styles.warn}>File size exceeds maximum limit of 10mb</p>
        )}
      </div> */}
      {/* <div className={styles.uploads}>
        <div className="flex flex-col md:block gap-1 relative">
          <label className={styles.box}>
            <AiOutlinePlus style={{ color: "white" }} />
            &nbsp;&nbsp;&nbsp;&nbsp;Aadhaar Card
            <input
              type="file"
              className={styles.upload}
              onChange={(e) => handleImageChange(e, 6)}
              accept="image/jpeg,image/png"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {images[6] && <AiFillFile style={{ color: "#ffffff" }} />}
            {props.addharError && (
              <p className={styles.warn}>Please Provide Addhar Card</p>
            )}
            <p className="w-60 capitalize absolute -bottom-6 right-0 text-[#686868] font-normal">
              optional
            </p>
            {props.warns[2] && (
              <p className={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </label>
        </div>
        <div className="flex flex-col md:block gap-1 relative">
          <label className={styles.box}>
            <AiOutlinePlus style={{ color: "white" }} />
            &nbsp;&nbsp;&nbsp;&nbsp;Pan Card
            <input
              type="file"
              className={styles.upload}
              onChange={(e) => handleImageChange(e, 7)}
              accept="image/jpeg,image/png"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {images[7] && <AiFillFile style={{ color: "#ffffff" }} />}
            {props.panError && (
              <p className={styles.warn}>Please Provide Pan Card</p>
            )}
            <p className="w-60 capitalize absolute -bottom-6 right-0 text-[#686868] font-normal">
              optional
            </p>
            {props.warns[3] && (
              <p className={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </label>
        </div>
      </div> */}
      {/* <div className={styles.socials}>
        <label className={styles.social}>
          Facebook : <br />
          <input
            type="url"
            className={styles.input}
            placeholder="https://www.facebook.com/example"
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 12);
              setLinks({ ...links, facebook: e.target.value });
            }}
            value={links.facebook}
          />
        </label>
        <label className={styles.social}>
          Instagram : <br />
          <input
            type="url"
            className={styles.input}
            placeholder="https://www.instagram.com/example"
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 13);
              setLinks({ ...links, instagram: e.target.value });
            }}
            value={links.instagram}
          />
        </label>
        <label className={styles.social}>
          Twitter : <br />
          <input
            type="url"
            className={styles.input}
            placeholder="https://www.twitter.com/example"
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 14);
              setLinks({ ...links, twitter: e.target.value });
            }}
            value={links.twitter}
          />
        </label>
        <label className={styles.social}>
          Youtube : <br />
          <input
            type="url"
            className={styles.input}
            placeholder="https://www.youtube.com/example"
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 15);
              setLinks({ ...links, youtube: e.target.value });
            }}
            value={links.youtube}
          />
        </label>
      </div> */}
      <h1 className={styles.heading}>
        Add Your Works
        {props.worksError && (
          <p className={styles.err}>Please Provide atleast 8 Works for you</p>
        )}
      </h1>
      {(props.profession === "photographer" ||
        props.profession === "photo_editor" ||
        props.profession === "model" ||
        props.profession === "makeup_artist" ||
        props.profession === "album_designer" ||
        props.profession === "web_developer" ||
        props.profession === "graphics_designer" ||
        props.profession === "mehendi_artist" ||
        props.profession === "private_tutor" ||
        props.profession === "drawing_teacher" ||
        props.profession === "painter" ||
        props.profession === "fashion_designer" ||
        props.profession === "babysitter" ||
        props.profession === "maid") && (
        <div className={styles.portfolio}>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[0] ? `url(${images[0]})` : `none`,
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
            {warns[0] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[1] ? `url(${images[1]})` : `none`,
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
                  className={styles.plus}
                  style={{ color: "#1f1c1c" }}
                />
              </label>
            )}
            {props.warns[5] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[2] ? `url(${images[2]})` : `none`,
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
                  className={styles.plus}
                  style={{ color: "#1f1c1c" }}
                />
              </label>
            )}
            {props.warns[6] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[3] ? `url(${images[3]})` : `none`,
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
                  className={styles.plus}
                  style={{ color: "#1f1c1c" }}
                />
              </label>
            )}
            {props.warns[7] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[8] ? `url(${images[8]})` : `none`,
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
                  className={styles.plus}
                  style={{ color: "#1f1c1c" }}
                />
              </label>
            )}
            {props.warns[8] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[9] ? `url(${images[9]})` : `none`,
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
                  className={styles.plus}
                  style={{ color: "#1f1c1c" }}
                />
              </label>
            )}
            {props.warns[9] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[10] ? `url(${images[10]})` : `none`,
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
                  className={styles.plus}
                  style={{ color: "#1f1c1c" }}
                />
              </label>
            )}
            {props.warns[10] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[11] ? `url(${images[11]})` : `none`,
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
                  className={styles.plus}
                  style={{ color: "#1f1c1c" }}
                />
              </label>
            )}
            {props.warns[11] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
        </div>
      )}
      {(props.profession === "drone_operator" ||
        props.profession === "anchor" ||
        props.profession === "dj" ||
        props.profession === "dancer" ||
        props.profession === "influencer" ||
        props.profession === "actor" ||
        props.profession === "actress" ||
        props.profession === "interior_designer") && (
        <div className={styles.portfolio}>
          <input
            type="url"
            className={styles.input}
            placeholder="https://www.youtube.com/example"
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 17);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 18);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 19);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 20);
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
              backgroundImage: images[8] ? `url(${images[8]})` : `none`,
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
                className={styles.plus}
                style={{ color: "#1f1c1c" }}
              />
            )}
            {props.warns[8] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[9] ? `url(${images[9]})` : `none`,
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
                className={styles.plus}
                style={{ color: "#1f1c1c" }}
              />
            )}
            {props.warns[9] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[10] ? `url(${images[10]})` : `none`,
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
                className={styles.plus}
                style={{ color: "#1f1c1c" }}
              />
            )}
            {props.warns[10] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
          <div
            className={styles.addBox}
            style={{
              backgroundImage: images[11] ? `url(${images[11]})` : `none`,
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
                className={styles.plus}
                style={{ color: "#1f1c1c" }}
              />
            )}
            {props.warns[11] && (
              <p className={styles.warn} id={styles.warn}>
                File size exceeds maximum limit of 10mb
              </p>
            )}
          </div>
        </div>
      )}
      {(props.profession === "cinematographer" ||
        props.profession === "video_editor" ||
        props.profession === "dance_teacher" ||
        props.profession === "music_teacher" ||
        props.profession === "lyricist" ||
        props.profession === "musician" ||
        props.profession === "voice_over_artist" ||
        props.profession === "vocalist") && (
        <div className={styles.portfolio}>
          <input
            type="url"
            className={styles.input}
            placeholder="https://www.youtube.com/example"
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 17);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 18);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 19);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 20);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 21);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 22);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 23);
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
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 24);
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
      <div className={styles.check}>
        <input
          type="checkbox"
          checked={termsAndConditions}
          className={styles.checkbox}
          onChange={(e) => {
            props.getVerificationDetails(e.target.checked, 25);
            setTermsAndConditions(e.target.checked);
          }}
        />
        I Agree to the{" "}
        <span className={styles.links}>
          <span onClick={handleTermsAndConditions}>Terms and Conditions</span>
        </span>
      </div>
      <button className={styles.btn} type="submit">
        Verify Now
      </button>
      <div className={styles.dialogBox}>
        {dialogBox && <TermsAndConditions handleClick={handleClick} />}
      </div>
    </>
  );
}

export default Verification;
