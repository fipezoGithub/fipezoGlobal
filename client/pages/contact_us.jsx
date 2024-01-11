import Navbar from "@/components/Navbar";
import styles from "../styles/Contact.module.css";
import Image from "next/image";
import Footer from "@/components/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useRef } from "react";
import { HiBuildingOffice2 } from "react-icons/hi2";
import Head from "next/head";
import Link from "next/link";

function Contact(props) {
  const siteKey = process.env.CAPTCHA_SITE_KEY;
  const [reCaptchaValue, setReCaptchaValue] = useState("");
  const captchaRef = useRef();
  const [contactError, setContactError] = useState(false);
  const [btnValue, setBtnValue] = useState("Submit");
  const [color, setColor] = useState("#00aaff");

  const handleCaptcha = (value) => {
    setReCaptchaValue(value);
    setContactError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reCaptchaValue === "") {
      alert("Please verify that you are a human!");
      captchaRef.current.reset();
      return;
    }
    const data = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      phone: e.target[2].value,
      email: e.target[3].value,
      issue: e.target[4].value,
      message: e.target[5].value,
      captcha: reCaptchaValue,
    };
    fetch(`${process.env.SERVER_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "success") {
          setBtnValue("Submitted");
          setColor("#2fe431");
          captchaRef.current.reset();
        } else {
          alert("Something went wrong!");
          captchaRef.current.reset();
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!");
        captchaRef.current.reset();
      });
  };

  return (
    <div className={styles.contact}>
      <Head>
        <title>Fipezo | Contact with us</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className={styles.body}>
        <div className={styles.contact_form}>
          <div className={styles.left}>
            <h1 className={styles.heading}>Contact Us</h1>
            <div className={styles.form_body}>
              {contactError && (
                <p className={styles.error}>Please fill all the fields!</p>
              )}
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputs}>
                  <label htmlFor="name" className={styles.label}>
                    <span className="text-red-500">* </span>First name :
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={styles.input}
                    onChange={() => setContactError(false)}
                    maxLength={13}
                    required
                  />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="name" className={styles.label}>
                    <span className="text-red-500">* </span>Last name :
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={styles.input}
                    onChange={() => setContactError(false)}
                    maxLength={13}
                    required
                  />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="phone" className={styles.label}>
                    <span className="text-red-500">* </span>Phone :
                  </label>
                  <input
                    type="number"
                    id={styles.phone}
                    className={styles.input}
                    onChange={() => setContactError(false)}
                    required
                  />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="email" className={styles.label}>
                    <span className="text-red-500">* </span>Email :
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={styles.input}
                    onChange={() => setContactError(false)}
                    required
                  />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="issue" className={styles.label}>
                    <span className="text-red-500">* </span>Issue :
                  </label>
                  <select
                    className={styles.options}
                    name="issue"
                    onChange={() => setContactError(false)}
                  >
                    <option
                      className={styles.option}
                      value="User Profile Related"
                    >
                      User Profile Related
                    </option>
                    <option
                      className={styles.option}
                      value="Freelancer Profile Related"
                    >
                      Freelancer Profile Related
                    </option>
                    <option
                      className={styles.option}
                      value="Company Profile Related"
                    >
                      Company Profile Related
                    </option>
                    <option className={styles.option} value="OTP Related">
                      OTP Related
                    </option>
                    <option className={styles.option} value="Refferal issue">
                      Refferal issue
                    </option>
                    <option className={styles.option} value="Fraud / Scam">
                      Fraud / Scam
                    </option>
                    <option className={styles.option} value="Delete Profile">
                      Delete Profile
                    </option>
                    <option className={styles.option} value="Update Profile">
                      Update Profile
                    </option>
                    <option className={styles.option} value="Other">
                      Other
                    </option>
                  </select>
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="message" className={styles.label}>
                    <span className="text-red-500">* </span>Message :
                  </label>
                  <textarea
                    className={styles.textarea}
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    onChange={() => setContactError(false)}
                    required
                    maxLength={500}
                  ></textarea>
                </div>
                <ReCAPTCHA
                  sitekey={siteKey}
                  onChange={handleCaptcha}
                  ref={captchaRef}
                  className={styles.captcha}
                />
                <button
                  className={styles.btn}
                  style={{ backgroundColor: color }}
                  type="submit"
                >
                  {btnValue}
                </button>
              </form>
            </div>
          </div>
          <div className={styles.right}>
            <Image
              src="/contactus.jpg"
              width="700"
              height="700"
              alt="contact_us"
            />
          </div>
        </div>
        {/* <ReactWhatsapp
          number="+919038578787"
          message="Hello Fipezo"
          className={styles.whatsapp}
        >
          <Image src="/chat.png" height={70} width={70} alt="whatsapp-icon" />
        </ReactWhatsapp> */}
      </div>
      <div className="flex justify-center">
        <div className="mx-8">
          <div className="my-6 ">
            <h2 className="text-xl md:text-3xl font-bold">Customer Support</h2>
            <p className="text-base">
              If you have any questions, concerns, or feedback, our customer
              support team is ready to assist you. Please email us at{" "}
              <Link href="mailto:help@fipezo.com" className="text-blue-500">
                help@fipezo.com
              </Link>{" "}
              for prompt assistance.
            </p>
          </div>
          <div className="my-6">
            <h2 className="text-xl md:text-3xl font-bold">Business Hours</h2>
            <p>
              Our customer support team operates during the following business
              hours:
            </p>
            <ul className="list-disc text-base">
              <li>
                Monday to Saturday: {"("} 10:10 - 18:50 {")"}
              </li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div className="my-6">
            <h2 className="text-xl md:text-3xl font-bold">Office Address</h2>
            <ul className="list-disc text-base">
              <li className="flex gap-2 items-center text-xl my-2">
                <HiBuildingOffice2 />
                2nd Floor, 17/40A, Dakshindari Road, West Bengal, Kolkata 700048
              </li>
            </ul>
          </div>
          <div className="my-6 flex flex-col gap-3">
            <h2 className="text-xl md:text-3xl font-bold">Social Media</h2>
            <p className="text-base">
              Stay connected with Fipezo through our social media channels for
              updates and announcements:
            </p>
            <ul className="flex items-center gap-4">
              <li>
                <Link href="https://www.facebook.com/fipezo/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0">
                  <Image
                    src="/facebook.png"
                    alt="facebook-logo"
                    width={60}
                    height={60}
                    className="w-8"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/fipezoindia">
                  <Image
                    src="/instagramC.png"
                    alt="instagram-logo"
                    width={60}
                    height={60}
                    className="w-8"
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/in/fipezo/">
                  <Image
                    src="/linkedinO.png"
                    alt="linkedin-logo"
                    width={60}
                    height={60}
                    className="w-8"
                  />
                </Link>
              </li>
            </ul>
            <p className="text-base">
              We appreciate your trust in Fipezo, and we look forward to serving
              you!
            </p>
          </div>
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </div>
  );
}

export default Contact;
