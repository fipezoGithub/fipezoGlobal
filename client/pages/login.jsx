import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Login.module.css";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { FaFacebookSquare } from "react-icons/fa";

export default function Login(props) {
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [otpForm, setOtpForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogEmail, setShowLogEmail] = useState("");
  const [googleToken, setGoogleToken] = useState("");
  const [passowordInputType, setPasswordInputType] = useState("password");
  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);
  const [otpFailed, setOtpFailed] = useState(false);
  const [count, setCount] = useState(30);
  const [timerId, setTimerId] = useState(null);
  const passwordRef = useRef();
  useEffect(() => {
    if (count === 0) {
      clearInterval(timerId);
    }
  }, [count]);

  useEffect(() => {
    async function getGoogleData() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken.access_token}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${googleToken.access_token}`,
              Accept: "application/json",
            },
          }
        );
        const googleData = await res.json();
        const response = await fetch(
          `${process.env.SERVER_URL}/email/login/social`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: googleData.email,
              type: type,
            }),
          }
        );
        if (response.status === 403) {
          setLoginFailed(true);
          if (type === "user") {
            router.push("/signup");
          } else if (type === "freelancer") {
            router.push("/register/freelancer");
          } else if (type === "company") {
            router.push("/register/company");
          }
        }
        const data = await response.json();
        if (data.message) {
          setLoginFailed(true);
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("type", JSON.stringify(type));
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (googleToken) {
      getGoogleData();
    }
  }, [googleToken]);

  const startCountdown = () => {
    setCount(30);
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
        const storedType = type;
        const response = await fetch(`${process.env.SERVER_URL}/otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: formData.get("otp"),
            phone: storedPhone,
            type: storedType,
          }),
        });
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("type", JSON.stringify(type));
        router.push("/");
      } catch (error) {
        setOtpFailed(true);
        console.error(error);
      }
    }

    postData();
  };

  function handelLoginEmail(e) {
    e.preventDefault();
    async function postData() {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/email/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            type: type,
          }),
        });
        const data = await response.json();
        if (data.message) {
          setLoginFailed(true);
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("type", JSON.stringify(type));
          router.push("/");
        }
      } catch (error) {
        setLoginFailed(true);
        console.error(error);
      }
    }
    postData();
  }

  function handleSubmit(e) {
    e.preventDefault();
    async function postData() {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phone,
            type: type,
          }),
        });
        const data = await response.json();
        setOtpForm(true);
      } catch (error) {
        setLoginFailed(true);
        console.error(error);
      }
    }

    postData();
    startCountdown();
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleToken(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const responseFacebook = async (response) => {
    console.log(response);
    // Login failed
    if (response.status === "unknown") {
      return false;
    }
    const res = await fetch(`${process.env.SERVER_URL}/email/login/social`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: response.email,
        type: type,
      }),
    });
    if (res.status === 403) {
      setLoginFailed(true);
      if (type === "user") {
        router.push("/signup");
      } else if (type === "freelancer") {
        router.push("/register/freelancer");
      } else if (type === "company") {
        router.push("/register/company");
      }
    }
    const data = await res.json();
    if (data.message) {
      setLoginFailed(true);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("type", JSON.stringify(type));
      router.push("/");
    }
  };

  const logOut = () => {
    googleLogout();
  };

  return (
    <div className={styles.login}>
      <Head>
        <title>Fipezo | Login</title>
        <meta
          name="description"
          content="Welcome to our secure login page, where you can safely access your account with confidence. At Fipezo, we prioritize your security and convenience, ensuring that your personal information remains protected."
        />
      </Head>
      <div className={styles.navbar}>
        <Navbar
          color="black"
          user={props.user}
          company={props.company}
          setCompany={props.setCompany}
          setUser={props.setUser}
        />
      </div>
      {!otpForm && (
        <div className={styles.body}>
          <div className={styles.form}>
            <div>
              <h1 className={styles.heading + " text-center"}>Welcome</h1>
              <p className={styles.subHeading}>Log In To Your Account</p>
            </div>
            {loginFailed && (
              <span className={styles.warn}>
                Login Failed ! Please try again
              </span>
            )}
            <label htmlFor="accType" className={styles.accLabel}>
              <p className={styles.label}>Log in As</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="user"
                    name="logintype"
                    value="user"
                    onChange={(e) => {
                      setType(e.target.value);
                      setLoginFailed(false);
                      setOtpFailed(false);
                    }}
                  />
                  <label htmlFor="user" className="lg:text-lg capitalize">
                    user
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="freelancer"
                    name="logintype"
                    value="freelancer"
                    onChange={(e) => {
                      setType(e.target.value);
                      setLoginFailed(false);
                      setOtpFailed(false);
                    }}
                  />
                  <label htmlFor="freelancer" className="lg:text-lg capitalize">
                    freelancer
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="company"
                    name="logintype"
                    value="company"
                    onChange={(e) => {
                      setType(e.target.value);
                      setLoginFailed(false);
                      setOtpFailed(false);
                    }}
                  />
                  <label htmlFor="company" className="lg:text-lg capitalize">
                    company
                  </label>
                </div>
              </div>
            </label>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-2">
              <button
                type="button"
                className="flex flex-col items-center text-sm capitalize border px-4 py-2 rounded-md hover:scale-110 duration-300 hover:bg-[#2b2626] hover:border-[#2b2626]"
                onClick={() => setShowLogEmail(true)}
              >
                <MdMarkEmailUnread size={"2em"} />
                log in with your email
              </button>
              <button
                type="button"
                className="flex flex-col items-center text-sm capitalize border px-4 py-2 rounded-md hover:scale-110 duration-300 hover:bg-[#2b2626] hover:border-[#2b2626]"
                onClick={() => setShowLogEmail(false)}
              >
                <IoPhonePortrait size={"2em"} />
                log in with your phone
              </button>
            </div>
            {showLogEmail === true && (
              <form className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-4 mt-4 items-center">
                  <div className="flex flex-col md:flex-row gap-1 items-center text-lg">
                    <div className="flex flex-col gap-2 rounded-2xl bg-[#242424]">
                      <label htmlFor="email" className="p-1 capitalize">
                        email
                      </label>
                      <input
                        type="email"
                        name=""
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="focus:outline-none text-white bg-transparent border-b border-b-[#878787] p-1"
                      />
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl bg-[#242424]">
                      <label htmlFor="password" className="p-1 capitalize">
                        password
                      </label>
                      <div className="flex border-b border-b-[#878787]">
                        <input
                          type="password"
                          name=""
                          id="password"
                          value={password}
                          ref={passwordRef}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="focus:outline-none text-white bg-transparent p-1"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (passwordRef.current.type === "password") {
                              passwordRef.current.type = "text";
                              setPasswordInputType("text");
                            } else {
                              passwordRef.current.type = "password";
                              setPasswordInputType("password");
                            }
                          }}
                        >
                          {passowordInputType === "password" ? (
                            <AiFillEye />
                          ) : (
                            <AiFillEyeInvisible />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={handelLoginEmail}
                    >
                      Login
                    </button>
                  </div>
                  <Link
                    href="/forget_password"
                    className="text-sm text-cyan-500 font-semibold tracking-wide"
                  >
                    Forget password!
                  </Link>
                </div>
              </form>
            )}
            {showLogEmail === false && (
              <form
                className="flex flex-col items-center gap-4"
                onSubmit={(e) => handleSubmit(e)}
              >
                {loginFailed && (
                  <span className={styles.warn}>
                    Login Failed ! Please try again
                  </span>
                )}
                <div id={styles.phone}>
                  <div className={styles.countryCode}>+91</div>
                  <input
                    className={styles.inputs}
                    id={styles.number}
                    name="phone"
                    type="number"
                    placeholder="Enter Your Phone no."
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setLoginFailed(false);
                      setOtpFailed(false);
                    }}
                  />{" "}
                  <br />
                </div>
                <div>
                  <button className={styles.btn} type="submit">
                    Send OTP
                  </button>
                </div>
              </form>
            )}
            <p className="flex w-full items-center gap-2">
              <hr className="w-full border-neutral-500" />
              OR <hr className="w-full border-neutral-500" />
            </p>
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-lg">Log in with social</h3>
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
              {type === "user" && (
                <p className={`${styles.signup}`}>
                  Don&apos;t have an Account?{" "}
                  <Link className="text-cyan-500" href="/signup">
                    Sign up now
                  </Link>
                </p>
              )}
              {type === "freelancer" && (
                <p className={`${styles.signup}`}>
                  Don&apos;t have an Account?{" "}
                  <Link className="text-cyan-500" href="/register/freelancer">
                    Register now As a Freelancer
                  </Link>
                </p>
              )}
              {type === "company" && (
                <p className={`${styles.signup}`}>
                  Don&apos;t have an Account?{" "}
                  <Link className="text-cyan-500" href="/register/company">
                    Register now As a Company
                  </Link>
                </p>
              )}
            </div>
          </div>
          <div className={styles.presentation}>
            <Image
              src="/loginbg.jpg"
              alt="side-image"
              height="1006"
              width="1000"
            />
          </div>
        </div>
      )}
      {otpForm && (
        <div className={styles.body}>
          <form
            method="post"
            className={styles.form}
            onSubmit={handleSubmitOTP}
          >
            <div>
              <h1 className={styles.heading + " text-center"}>Welcome</h1>
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
            <p className="text-sm text-neutral-400">OTP will be valid for 5 minutes</p>
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
          <div className={styles.presentation}>
            <Image
              src="/loginbg.jpg"
              alt="side-image"
              height="1006"
              width="1000"
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
