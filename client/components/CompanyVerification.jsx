import styles from "../styles/Verification.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlinePlus, AiFillFile } from "react-icons/ai";
import TermsAndConditions from "./TermsAndConditions";

function Verification(props) {
  const [images, setImages] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [incorporationCertificate, setIncorporationCertificate] =
    useState(null);
  const [msmeCertificate, setMsmeCertificate] = useState(null);
  const [tradeLiecence, setTradeLiecence] = useState(null);
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

  useEffect(() => {
    props.setUser(null);
    props.setCompany(null);
  }, []);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    props.setWarns(false, -1);
    if (!file) {
      return;
    }

    if (file.size > 10485760 && index === 4) {
      props.setWarns(true, 0);
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
      setPanCard(file);
    }

    if (file.size > 10485760 && index === 7) {
      props.setWarns(true, 3);
      props.setPicError(false, 4);
      return;
    }

    if (index === 7) {
      props.getVerificationDetails(file, 7);
      setIncorporationCertificate(file);
    }

    if (file.size > 10485760) {
      props.setWarns(true, index);
      return;
    }

    if (index === 8) {
      props.getVerificationDetails(file, 8);
      setMsmeCertificate(file);
    }

    if (file.size > 10485760) {
      props.setWarns(true, index);
      return;
    }

    if (index === 9) {
      props.getVerificationDetails(file, 9);
      setTradeLiecence(file);
    }

    if (file.size > 10485760) {
      props.setWarns(true, index);
      return;
    }
    if (
      index === 15 ||
      index === 16 ||
      index === 17 ||
      index === 18 ||
      index === 19 ||
      index === 20 ||
      index === 21 ||
      index === 22
    ) {
      props.getVerificationDetails(file, index);
    }
    props.setWarns(false, -1);

    reader.onloadend = () => {
      const newImages = [...images];
      newImages[index] = reader.result;
      setImages(newImages);
    };

    reader.readAsDataURL(file);
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
      <div
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
          required
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
          backgroundImage: images[4] ? `url(${images[4]})` : `url('/dp.png')`,
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
          required
        />
        {props.profilePicError && (
          <p className={styles.warn}>Please Provide Profile Picture</p>
        )}
        {props.warns[0] && (
          <p className={styles.warn}>File size exceeds maximum limit of 10MB</p>
        )}
      </div>
      <div className={styles.uploads}>
        <label className={styles.boxC}>
          <AiOutlinePlus style={{ color: "white" }} />
          &nbsp;&nbsp;&nbsp;&nbsp;Company Pan Card
          <input
            type="file"
            className={styles.upload}
            onChange={(e) => handleImageChange(e, 6)}
            accept="image/jpeg,image/png"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {images[6] && <AiFillFile style={{ color: "white" }} />}
          {props.panError && (
            <p className={styles.warn}>Please Provide Company Pan Card</p>
          )}
          {props.warns[2] && (
            <p className={styles.warn}>
              File size exceeds maximum limit of 10MB
            </p>
          )}
        </label>
        <label className={styles.boxC}>
          <AiOutlinePlus style={{ color: "white" }} />
          &nbsp;&nbsp;&nbsp;&nbsp;Incorporation Certificate
          <input
            type="file"
            className={styles.upload}
            onChange={(e) => handleImageChange(e, 7)}
            accept="image/jpeg,image/png"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {images[7] && <AiFillFile style={{ color: "white" }} />}
          {props.incorporationCertificateError && (
            <p className={styles.warn}>
              Please Provide Company Incorporation Certificate
            </p>
          )}
          {props.warns[3] && (
            <p className={styles.warn}>
              File size exceeds maximum limit of 10MB
            </p>
          )}
        </label>
        <label className={styles.boxC}>
          <AiOutlinePlus style={{ color: "white" }} />
          &nbsp;&nbsp;&nbsp;&nbsp;MSME Certificate
          <input
            type="file"
            className={styles.upload}
            onChange={(e) => handleImageChange(e, 8)}
            accept="image/jpeg,image/png"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {images[8] && <AiFillFile style={{ color: "white" }} />}
          {props.msmeCertificateError && (
            <p className={styles.warn}>
              Please Provide Company MSME Certificate
            </p>
          )}
          {props.warns[4] && (
            <p className={styles.warn}>
              File size exceeds maximum limit of 10MB
            </p>
          )}
        </label>
        <label className={styles.boxC}>
          <AiOutlinePlus style={{ color: "white" }} />
          &nbsp;&nbsp;&nbsp;&nbsp;Trade Liecence
          <input
            type="file"
            className={styles.upload}
            onChange={(e) => handleImageChange(e, 9)}
            accept="image/jpeg,image/png"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {images[9] && <AiFillFile style={{ color: "white" }} />}
          {props.tradeLiecenceError && (
            <p className={styles.warn}>Please Provide Company Trade Liecence</p>
          )}
          {props.warns[5] && (
            <p className={styles.warn}>
              File size exceeds maximum limit of 10MB
            </p>
          )}
        </label>
      </div>
      <div className={styles.socials}>
        <label className={styles.social}>
          <span className="text-red-600">*</span>Facebook : <br />
          <input
            type="url"
            className={styles.input}
            placeholder="https://www.facebook.com/example"
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 10);
              setLinks({ ...links, facebook: e.target.value });
            }}
            value={links.facebook}
          />
        </label>
        <label className={styles.social}>
          <span className="text-red-600">*</span>Instagram : <br />
          <input
            type="url"
            className={styles.input}
            placeholder="https://www.instagram.com/example"
            onChange={(e) => {
              props.getVerificationDetails(e.target.value, 11);
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
              props.getVerificationDetails(e.target.value, 12);
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
              props.getVerificationDetails(e.target.value, 13);
              setLinks({ ...links, youtube: e.target.value });
            }}
            value={links.youtube}
          />
        </label>
      </div>
      <h1 className={styles.heading}>
        Add Your Works
        {props.worksError && (
          <p className={styles.err}>Please Provide atleast 8 Works for you</p>
        )}
      </h1>
      <div className={styles.portfolio}>
        <div
          className={styles.addBox}
          style={{
            backgroundImage: images[15] ? `url(${images[15]})` : `none`,
          }}
        >
          <input
            type="file"
            className={styles.work}
            id="workimg1"
            onChange={(e) => handleImageChange(e, 15)}
            accept="image/jpeg,image/png"
            required
          />
          {!images[15] && (
            <label htmlFor="workimg1" className="cursor-pointer">
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
            backgroundImage: images[16] ? `url(${images[16]})` : `none`,
          }}
        >
          <input
            type="file"
            className={styles.work}
            onChange={(e) => handleImageChange(e, 16)}
            accept="image/jpeg,image/png"
            id="workimg2"
            required
          />
          {!images[16] && (
            <label htmlFor="workimg2" className="cursor-pointer">
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
            backgroundImage: images[17] ? `url(${images[17]})` : `none`,
          }}
        >
          <input
            type="file"
            className={styles.work}
            onChange={(e) => handleImageChange(e, 17)}
            accept="image/jpeg,image/png"
            id="workimg3"
            required
          />
          {!images[17] && (
            <label htmlFor="workimg3" className="cursor-pointer">
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
            backgroundImage: images[18] ? `url(${images[18]})` : `none`,
          }}
        >
          <input
            type="file"
            className={styles.work}
            onChange={(e) => handleImageChange(e, 18)}
            accept="image/jpeg,image/png"
            id="workimg4"
            required
          />
          {!images[18] && (
            <label htmlFor="workimg4" className="cursor-pointer">
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
            backgroundImage: images[19] ? `url(${images[19]})` : `none`,
          }}
        >
          <input
            type="file"
            className={styles.work}
            onChange={(e) => handleImageChange(e, 19)}
            accept="image/jpeg,image/png"
            id="workimg5"
            required
          />
          {!images[19] && (
            <label htmlFor="workimg5" className="cursor-pointer">
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
            backgroundImage: images[20] ? `url(${images[20]})` : `none`,
          }}
        >
          <input
            type="file"
            className={styles.work}
            onChange={(e) => handleImageChange(e, 20)}
            accept="image/jpeg,image/png"
            id="workimg6"
            required
          />
          {!images[20] && (
            <label htmlFor="workimg6" className="cursor-pointer">
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
        <div
          className={styles.addBox}
          style={{
            backgroundImage: images[21] ? `url(${images[21]})` : `none`,
          }}
        >
          <input
            type="file"
            className={styles.work}
            onChange={(e) => handleImageChange(e, 21)}
            accept="image/jpeg,image/png"
            id="workimg7"
            required
          />
          {!images[21] && (
            <label htmlFor="workimg7" className="cursor-pointer">
              <AiOutlinePlus
                className={styles.plus}
                style={{ color: "#1f1c1c" }}
              />
            </label>
          )}
          {props.warns[12] && (
            <p className={styles.warn} id={styles.warn}>
              File size exceeds maximum limit of 10mb
            </p>
          )}
        </div>
        <div
          className={styles.addBox}
          style={{
            backgroundImage: images[22] ? `url(${images[22]})` : `none`,
          }}
        >
          <input
            type="file"
            className={styles.work}
            onChange={(e) => handleImageChange(e, 22)}
            accept="image/jpeg,image/png"
            id="workimg8"
            required
          />
          {!images[22] && (
            <label htmlFor="workimg8" className="cursor-pointer">
              <AiOutlinePlus
                className={styles.plus}
                style={{ color: "#1f1c1c" }}
              />
            </label>
          )}
          {props.warns[13] && (
            <p className={styles.warn} id={styles.warn}>
              File size exceeds maximum limit of 10mb
            </p>
          )}
        </div>
      </div>
      <div className={styles.check}>
        <input
          type="checkbox"
          required
          checked={termsAndConditions}
          className={styles.checkbox}
          onChange={(e) => {
            props.getVerificationDetails(e.target.checked, 16);
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
