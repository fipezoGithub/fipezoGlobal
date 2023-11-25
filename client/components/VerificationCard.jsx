import styles from "../styles/VerificationCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function VerificationCard(props) {
  const [screen, setScreen] = useState("");
  let work1, work2, work3, work4, work5, work6, work7, work8;
  if (props.profile.works) {
    work1 = props.profile.works[0];
    work2 = props.profile.works[1];
    work3 = props.profile.works[2];
    work4 = props.profile.works[3];
    work5 = props.profile.works[4];
    work6 = props.profile.works[5];
    work7 = props.profile.works[6];
    work8 = props.profile.works[7];
  }
  let aadhaarCard;
  if (props.profile.aadhaarCard) {
    aadhaarCard = props.profile.aadhaarCard;
  }
  let incorporationCertificate;
  if (props.profile.incorporationCertificate) {
    incorporationCertificate = props.profile.incorporationCertificate;
  }
  let panCard;
  if (props.profile.panCard) {
    panCard = props.profile.panCard;
  }
  let msmeCertificate;
  if (props.profile.msmeCertificate) {
    msmeCertificate = props.profile.msmeCertificate;
  }
  let tradeLiecence;
  if (props.profile.tradeLiecence) {
    tradeLiecence = props.profile.tradeLiecence;
  }
  let profession;
  if (props.profile.profession) {
    profession = props.profile.profession
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const links = props.profile.links && JSON.parse(props.profile.links);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/delete/freelancer/${props.profile._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (props.updateFreelancers) props.updateFreelancers(data.id);
      if (props.updateCompanies) props.updateCompanies(data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/verify/freelancer/${props.profile._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (props.updateFreelancers) props.updateFreelancers(data.id);
      if (props.updateCompanies) props.updateCompanies(data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompanyDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/delete/company/${props.profile._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      props.updateCompanies(data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompanyVerify = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/verify/company/${props.profile._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      props.updateCompanies(data.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.verificationCard}>
      <div className={styles.details}>
        <div
          className={styles.cover}
          style={{
            backgroundImage: `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.profile.coverPicture}')`,
          }}
        ></div>
        <div className={styles.profileImg}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${props.profile.profilePicture}')`,
            }}
          ></div>
        </div>
        <div className={styles.socials}>
          {links?.facebook && (
            <Link href={links.facebook} target="_black">
              <Image
                className={styles.social}
                src="/facebook.png"
                width="160"
                height="160"
                alt="facebook"
              />
            </Link>
          )}
          {links?.instagram && (
            <Link href={links.instagram} target="_black">
              <Image
                className={styles.social}
                src="/instagramC.png"
                width="160"
                height="160"
                alt="instagram"
              />
            </Link>
          )}
          {links?.twitter && (
            <Link href={links.twitter} target="_black">
              <Image
                className={styles.social}
                src="/twitterC.png"
                width="160"
                height="160"
                alt="twitter"
              />
            </Link>
          )}
          {links?.youtube && (
            <Link href={links.youtube} target="_black">
              <Image
                className={styles.social}
                src="/youtube.png"
                width="160"
                height="160"
                alt="youtube"
              />
            </Link>
          )}
        </div>
        <div className={styles.fields + " no-scrollbar"}>
          {props.profile.firstname && (
            <div className={styles.field + " capitalize"}>
              <h1>
                Name : {props.profile.firstname} {props.profile.lastname}
              </h1>
            </div>
          )}
          {props.profile.companyname && (
            <div className={styles.field}>
              <h1>Company Name : {props.profile.companyname}</h1>
            </div>
          )}
          {props.profile.phone && (
            <div className={styles.field}>
              <h1>Phone : {props.profile.phone}</h1>
            </div>
          )}
          {props.profile.companyphone && (
            <div className={styles.field}>
              <h1>Company Phone : {props.profile.companyphone}</h1>
            </div>
          )}
          {props.profile.location && (
            <div className={styles.field}>
              <h1>Location : {props.profile.location}</h1>
            </div>
          )}
          {props.profile.companyaddress && (
            <div className={styles.field}>
              <h1>Company Location : {props.profile.companyaddress}</h1>
            </div>
          )}
          {props.profile.profession && (
            <div className={styles.field}>
              <h1>Profession : {profession}</h1>
            </div>
          )}
          {props.profile.position && (
            <div className={styles.field}>
              <h1>Company Profession : {props.profile.position}</h1>
            </div>
          )}
          {props.profile.companytype && (
            <div className={styles.field}>
              <h1>Company Type : {props.profile.companytype}</h1>
            </div>
          )}
          {props.profile.rate && (
            <div className={styles.field}>
              <h1>Rate/day : Rs.{props.profile.rate}</h1>
            </div>
          )}
          <div className={styles.field}>
            <h1>Bio : {props.profile.bio}</h1>
          </div>
          {props.profile.equipments && (
            <div className={styles.field}>
              <h1>Equipments : {props.profile.equipments}</h1>
            </div>
          )}
        </div>
        {props.profile.works.length === 0 && (
          <h3 className="text-lg text-rose-600 font-bold text-center">
            This profile is not completed yet!
          </h3>
        )}
        <div className={styles.cards + " no-scrollbar"}>
          {props.profile.aadhaarCard && (
            <div
              className={styles.card}
              onClick={() => {
                setScreen(aadhaarCard);
              }}
            >
              <h1>Aadhaar Card</h1>
            </div>
          )}
          {props.profile.incorporationCertificate && (
            <div
              className={styles.card}
              onClick={() => setScreen(incorporationCertificate)}
            >
              <h1>Incorporation Certificate</h1>
            </div>
          )}
          {props.profile.panCard && (
            <div className={styles.card} onClick={() => setScreen(panCard)}>
              <h1>Pan Card</h1>
            </div>
          )}
          {props.profile.msmeCertificate && (
            <div
              className={styles.card}
              onClick={() => setScreen(msmeCertificate)}
            >
              <h1>MSME Certificate</h1>
            </div>
          )}
          {props.profile.tradeLiecence && (
            <div
              className={styles.card}
              onClick={() => setScreen(tradeLiecence)}
            >
              <h1>Trade Liecence</h1>
            </div>
          )}
        </div>
        {props.profile.works && (
          <div className={styles.works + " no-scrollbar"}>
            <div
              className={styles.work}
              onClick={() => {
                setScreen(work1);
              }}
            >
              <h1>Work 1</h1>
            </div>
            <div className={styles.work} onClick={() => setScreen(work2)}>
              <h1>Work 2</h1>
            </div>
            <div className={styles.work} onClick={() => setScreen(work3)}>
              <h1>Work 3</h1>
            </div>
            <div className={styles.work} onClick={() => setScreen(work4)}>
              <h1>Work 4</h1>
            </div>
            <div className={styles.work} onClick={() => setScreen(work5)}>
              <h1>Work 5</h1>
            </div>
            <div className={styles.work} onClick={() => setScreen(work6)}>
              <h1>Work 6</h1>
            </div>
            <div className={styles.work} onClick={() => setScreen(work7)}>
              <h1>Work 7</h1>
            </div>
            <div className={styles.work} onClick={() => setScreen(work8)}>
              <h1>Work 8</h1>
            </div>
          </div>
        )}
      </div>
      <div className={styles.right}>
        <div
          className={styles.screen}
          style={{
            backgroundImage: `url("https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${screen}")`,
          }}
        ></div>
        <div className={styles.btns}>
          {props.profile.profession && (
            <button
              className={styles.btn}
              id={styles.verify}
              onClick={handleVerify}
            >
              Verify
            </button>
          )}
          {props.profile.profession && (
            <button
              className={styles.btn}
              id={styles.delete}
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          {props.profile.companyname && (
            <button
              className={styles.btn}
              id={styles.verify}
              onClick={handleCompanyVerify}
            >
              Verify
            </button>
          )}
          {props.profile.companyname && (
            <button
              className={styles.btn}
              id={styles.delete}
              onClick={handleCompanyDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerificationCard;
