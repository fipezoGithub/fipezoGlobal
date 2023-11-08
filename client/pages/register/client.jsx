import styles from "../../styles/Signup.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Signup(props) {
  const [phone, setPhone] = useState("");
  const [otpForm, setOtpForm] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [signupFailed, setSignupFailed] = useState(false);
  const [otpFailed, setOtpFailed] = useState(false);
  const [count, setCount] = useState(120);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (props.user || props.company) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (count === 0) {
      clearInterval(timerId);
    }
  }, [count]);

  const startCountdown = () => {
    setCount(120);
    setTimerId(
      setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000)
    );
  };

  const handleSubmitOTP = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    async function postData() {
      try {
        const storedPhone = phone;
        const storedFirstname = firstname;
        const storedLastname = lastname;
        const response = await fetch(`${process.env.SERVER_URL}/otp/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: formData.get("otp"),
            phone: storedPhone,
            firstname: storedFirstname,
            lastname: storedLastname,
            email: email,
            password: password,
            type: "user",
          }),
        });
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");
      } catch (error) {
        setOtpFailed(true);
        console.error(error);
      }
    }

    postData();
  };

  function handleSubmit(event) {
    event.preventDefault();

    async function postData() {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone,
            profilePicture: null,
            type: "user",
          }),
        });
        const data = await response.json();
        setOtpForm(true);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        setSignupFailed(true);
        console.error(error);
      }
    }

    postData();
    startCountdown();
  }
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setSignupFailed(false);
      console.log(codeResponse);
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFirstname(data.given_name);
          setLastname(data.family_name);
          setEmail(data.email);
        });
    },
    onError: (error) => setSignupFailed(true),
  });

  const responseFacebook = async (response) => {
    console.log(response);
    setSignupFailed(false);
    if (response.status === "unknown") {
      setSignupFailed(true);
      return;
    }
    setFirstname(response.name.split(" ")[0]);
    setLastname(response.name.split(" ")[1]);
    setEmail(response.email);
  };

  return (
    <div className={styles.signup}>
      <Head>
        <title>Fipezo | Signup</title>
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className={styles.body}>
        {!otpForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <h1 className={styles.heading}>Welcome</h1>
              <p className={styles.subHeading}>Sign Up For a Free Account</p>
            </div>
            {signupFailed && (
              <span className={styles.warn}>
                Signup failed ! Please try again
              </span>
            )}
            <div className={styles.formBody}>
              <div className={styles.name}>
                <div className={styles.inputLabels}>
                  <label htmlFor="fisrtname" className={styles.labels}>
                    First Name -{" "}
                  </label>
                  <input
                    className={styles.inputs}
                    type="text"
                    placeholder="Enter Your firstname"
                    onChange={(e) => {
                      setFirstname(e.target.value);
                      setSignupFailed(false);
                      setOtpFailed(false);
                    }}
                    value={firstname}
                    id={styles.firstname}
                    name="firstname"
                    maxLength={13}
                  />{" "}
                  <br />
                </div>
                <div className={styles.inputLabels}>
                  <label htmlFor="lastname" className={styles.labels}>
                    Last Name -{" "}
                  </label>
                  <input
                    className={styles.inputs}
                    type="text"
                    placeholder="Enter Your lastname"
                    id={styles.lastname}
                    name="lastname"
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                      setSignupFailed(false);
                      setOtpFailed(false);
                    }}
                    maxLength={13}
                  />{" "}
                  <br />
                </div>
              </div>
              <div className={styles.name + " mt-6"}>
                <div className={styles.inputLabels}>
                  <label htmlFor="email" className={styles.labels}>
                    Email -{" "}
                  </label>
                  <input
                    className={styles.inputs}
                    type="email"
                    value={email}
                    placeholder="Enter Your email id"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSignupFailed(false);
                      setOtpFailed(false);
                    }}
                    id="email"
                    name="email"
                  />{" "}
                  <br />
                </div>
                <div className={styles.inputLabels}>
                  <label htmlFor="password" className={styles.labels}>
                    Password -{" "}
                  </label>
                  <input
                    className={styles.inputs}
                    type="password"
                    value={password}
                    placeholder="Enter Your password"
                    id="password"
                    minLength={8}
                    maxLength={15}
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setSignupFailed(false);
                      setOtpFailed(false);
                    }}
                  />{" "}
                  <br />
                </div>
              </div>
              <div id={styles.phone}>
                <div className={styles.inputLabels}>
                  <label htmlFor="phone" className={styles.labels}>
                    Phone No -{" "}
                  </label>
                  <input
                    className={styles.inputs}
                    type="number"
                    id={styles.number}
                    placeholder="Enter Your Phone no."
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setSignupFailed(false);
                      setOtpFailed(false);
                    }}
                  />{" "}
                  <br />
                </div>
              </div>
            </div>
            <div className="py-4">
              <button type="submit" className={styles.btn}>
                Submit
              </button>
            </div>
            <p className="flex w-full items-center gap-2">
              <hr className="w-full border-neutral-500" />
              OR <hr className="w-full border-neutral-500" />
            </p>
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-lg">Auto fill up by social</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => login()}
                  className="border px-4 py-2 rounded-md hover:scale-110 duration-300 hover:bg-[#2b2626] hover:border-[#2b2626]"
                >
                  <FcGoogle />
                </button>
                <button className="border flex items-center justify-center px-4 py-1 rounded-md hover:scale-110 duration-300 hover:bg-[#2b2626] hover:border-[#2b2626]">
                  <FacebookLogin
                    appId={process.env.FB_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="public_profile,email"
                    textButton=""
                    cssClass=""
                    isMobile={false}
                    callback={responseFacebook}
                    icon={<FaFacebookSquare color="#0866ff" />}
                  />
                </button>
              </div>
            </div>
            <div className={styles.lower}>
              <Link href="/login" className={`${styles.login}`}>
                Already have an Account?{" "}
                <Link href="/login" className="text-cyan-500">
                  Log in
                </Link>
              </Link>
            </div>
          </form>
        )}
        {otpForm && (
          <div className={styles.body}>
            <form
              method="post"
              className={styles.otpForm}
              onSubmit={handleSubmitOTP}
            >
              <div>
                <h1 className={styles.heading}>Welcome</h1>
                <p className={styles.subHeading}>
                  Enter a one-time password (OTP) to verify
                </p>
              </div>
              {otpFailed && (
                <span className={styles.warn}>
                  OTP verification failed ! Please try again
                </span>
              )}
              <div id={styles.otp}>
                <input
                  className={styles.inputs}
                  id={styles.otp}
                  type="number"
                  name="otp"
                  placeholder="Enter OTP"
                />
              </div>
              <div>
                <button className={styles.btn} type="submit">
                  Submit
                </button>
              </div>
              <div className={styles.lower}>
                {count > 0 && (
                  <p className={styles.resendOtp}>Resend OTP in {count}s?</p>
                )}
                {count === 0 && (
                  <p className={styles.resendOtp} onClick={handleSubmit}>
                    Resend OTP
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
        <div className={styles.presentation}>
          <Image
            id={styles.img}
            src="/pre3.jpg"
            alt="side-image"
            height="1006"
            width="1000"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
