import Navbar from "@/components/Navbar";
import React from "react";
import styles from "../../styles/Freelancer.module.css";
import Image from "next/image";
import Footer from "@/components/Footer";
import Verification from "@/components/Verification";
import { IoReloadOutline } from "react-icons/io5";
import Router, { withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import ReactWhatsapp from "react-whatsapp/dist";
import Loading from "@/components/Loading";
import FacebookLogin from "react-facebook-login";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";

export default withRouter(
  class Freelancer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        progress: 0,
        currentPage: 1,
        btn: "Next",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        otp: "",
        location: "Kolkata",
        profession: "photographer",
        rate: 1000,
        bio: "",
        equipments: "",
        profilePicture: null,
        coverPicture: null,
        aadhaarCard: null,
        panCard: null,
        works: [],
        images: [],
        links: { instagram: "", facebook: "", twitter: "", youtube: "" },
        usedReferalId: "",
        termsAndConditions: true,
        passowordInputType: "password",
        error: false,
        form: false,
        exist: false,
        phoneError: false,
        passwordError: false,
        worksError: false,
        referError: false,
        addharError: false,
        panError: false,
        profilePicError: false,
        coverPicError: false,
        textareaError: false,
        invalidOtp: false,
        registerFailed: false,
        warns: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        count: 30,
        resendOtp: false,
        timerId: null,
        isLoading: false,
      };
      this.passwordRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.count === 0 && prevState.currentPage === 3) {
        clearInterval(this.state.timerId);
        this.setState({ resendOtp: true });
      }
    }

    componentDidMount() {
      if (this.props.user || this.props.company) {
        this.props.router.push("/");
      }
    }

    startCountdown = () => {
      this.setState({ resendOtp: false });
      this.setState({
        count: 30,
        timerId: setInterval(() => {
          this.setState((prevState) => ({
            count: prevState.count - 1,
          }));
        }, 1000),
      });
    };

    increProgress = async (val) => {
      if (this.state.progress + val > 121) {
        return;
      }

      if (
        (this.state?.firstName === "" || this.state?.lastName === "") &&
        this.state?.currentPage === 1
      ) {
        this.setState({ error: true });
        return;
      }

      if (this.state.phone === "" && this.state.currentPage === 2) {
        this.setState({ error: true });
        return;
      }

      if (this.state.phone.length !== 10 && this.state.currentPage === 2) {
        this.setState({ phoneError: true });
        return;
      }

      if (this.state.currentPage === 2) {
        if (this.state.exist === true) {
          return;
        }
      }

      if (this.state.otp === "" && this.state.currentPage === 3) {
        this.setState({ error: true });
        return;
      }

      if (this.state.currentPage === 3) {
        if (this.state.invalidOtp) {
          return;
        }
      }
      if (
        this.state.usedReferalId.length > 0 &&
        this.state.usedReferalId.length < 6
      ) {
        this.setState({ referError: true });
        return;
      }
      if (this.state.location === "" && this.state.currentPage === 4) {
        this.setState({ error: true });
        return;
      }

      if (this.state.profession === "" && this.state.currentPage === 5) {
        this.setState({ error: true });
        return;
      }
      if (
        (this.state.email === "" || this.state.password === "") &&
        this.state.currentPage === 6
      ) {
        this.setState({ error: true });
        return;
      }
      if (
        (this.state.password.length < 8 || this.state.password.length > 15) &&
        this.state.currentPage === 6
      ) {
        this.setState({ passwordError: true });
        return;
      }
      if (this.state.rate === "" && this.state.currentPage === 7) {
        this.setState({ error: true });
        return;
      }

      if (this.state.profilePicture === null && this.state.currentPage === 8) {
        this.setState({ profilePicError: true });
        return;
      }

      if (this.state.coverPicture === null && this.state.currentPage === 9) {
        this.setState({ coverPicError: true });
        return;
      }

      if (
        (this.state.bio.length > 200 || this.state.bio.length < 50) &&
        this.state.currentPage === 10
      ) {
        this.setState({ textareaError: true });
        return;
      }

      if (this.state.bio === "" && this.state.currentPage === 10) {
        this.setState({ error: true });
        return;
      }

      if (
        (this.state?.equipments?.length > 200 ||
          this.state.equipments.length < 50) &&
        this.state.currentPage === 11
      ) {
        this.setState({ textareaError: true });
        return;
      }

      if (this.state.equipments === "" && this.state.currentPage === 11) {
        this.setState({ error: true });
        return;
      }

      if (this.state.currentPage === 11) {
        this.setState({ error: false });
        this.setState({ form: true });
        return;
      }

      if (this.currentPage === 2 && this.state.exist === true) {
        return;
      }

      this.setState({ progress: this.state.progress + val });
      this.setState({ error: false });
      this.setState({ phoneError: false });
      this.setState({ textareaError: false });
      this.setState({ registerFailed: false });
      this.setState({ invalidOtp: false });
      if (this.state.currentPage === 3) {
        this.setState({ resendOtp: false });
        this.setState({ count: 120 });
      }
      this.increPage();
    };

    decreProgress = (val) => {
      if (this.state.progress - val < 0) return;

      this.setState({ error: false });
      this.setState({ phoneError: false });
      this.setState({ textareaError: false });
      this.setState({ registerFailed: false });

      this.setState({ progress: this.state.progress - val });
      this.decrePage();
    };

    increPage = () => {
      if (this.state.currentPage === 12) {
        return;
      }

      if (this.state.currentPage === 11) {
        this.setState({ btn: "Submit" });
      }

      this.setState({ currentPage: this.state.currentPage + 1 });
    };

    async checkEmail(val) {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/verify/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: this.state.email }),
        });
        if (res.status === 404) {
          this.setState({ exist: true });
          return;
        }
        this.increProgress(11);
      } catch (error) {
        console.log(error);
      }
    }

    decrePage = () => {
      if (this.state.currentPage === 1) return;

      if (this.state.currentPage === 10) {
        this.setState({ btn: "Next" });
      }

      this.setState({ currentPage: this.state.currentPage - 1 });
    };

    getVerificationDetails = (val, index) => {
      if (index === 4) this.setState({ profilePicture: val });
      if (index === 5) this.setState({ coverPicture: val });
      if (index === 6) this.setState({ aadhaarCard: val });
      if (index === 7) this.setState({ panCard: val });
      if (index === 8 || index === 9 || index === 10 || index === 11) {
        const newIndex = index - 4;
        this.setState((prevState) => ({
          works: [
            ...prevState.works.slice(0, newIndex),
            val,
            ...prevState.works.slice(newIndex),
          ],
        }));
      } else if (index === 0 || index === 1 || index === 2 || index === 3) {
        this.setState((prevState) => ({
          works: [
            ...prevState.works.slice(0, index),
            val,
            ...prevState.works.slice(index),
          ],
        }));
      }
      if (index === 12) {
        this.setState({ links: { ...this.state.links, instagram: val } });
      }
      if (index === 13) {
        this.setState({ links: { ...this.state.links, facebook: val } });
      }
      if (index === 14) {
        this.setState({ links: { ...this.state.links, twitter: val } });
      }
      if (index === 15) {
        this.setState({ links: { ...this.state.links, youtube: val } });
      }
      if (index === 16) {
        this.setState({ termsAndConditions: val });
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
        this.setState((prevState) => ({
          works: [
            ...prevState.works.slice(0, newIndex),
            val,
            ...prevState.works.slice(newIndex),
          ],
        }));
      }
    };

    handleTextChange = (event, val) => {
      if (val === 1) {
        this.setState({ bio: event.target.value });
        if (this.state.bio.length > 300) this.setState({ textareaError: true });
        else this.setState({ textareaError: false });
      }
      if (val === 2) {
        this.setState({ equipments: event.target.value });
        if (this.state?.equipments?.length > 300)
          this.setState({ textareaError: true });
        else this.setState({ textareaError: false });
      }
    };

    handleSubmit = (event) => {
      event.preventDefault();
      let c = 0;
      // if (this.state.works.length < 8) {
      //   this.setState({ worksError: true });
      //   c++;
      // }
      // if (this.state.profilePicture === null) {
      //   this.setState({ profilePicError: true });
      //   this.setState({ warns: [false, ...this.state.warns.slice(1)] });
      //   return;
      // }
      // if (this.state.coverPicture === null) {
      //   this.setState({ coverPicError: true });
      //   this.setState({
      //     warns: [
      //       ...this.state.warns.slice(0, 1),
      //       false,
      //       ...this.state.warns.slice(2),
      //     ],
      //   });
      //   return;
      // }
      // if (this.state.aadhaarCard === null) {
      //   this.setState({ addharError: true });
      //   this.setState({
      //     warns: [
      //       ...this.state.warns.slice(0, 2),
      //       false,
      //       ...this.state.warns.slice(3),
      //     ],
      //   });
      //   return;
      // }
      // if (this.state.panCard === null) {
      //   this.setState({ panError: true });
      //   this.setState({
      //     warns: [
      //       ...this.state.warns.slice(0, 3),
      //       false,
      //       ...this.state.warns.slice(4),
      //     ],
      //   });
      //   return;
      // }
      // if (c > 0) return;
      this.setState({ isLoading: true });
      const postData = async () => {
        this.setState({ isLoading: true });
        const token = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null;
        try {
          const data = new FormData();
          data.append(
            "uid",
            this.state.firstName.toLowerCase() +
              "." +
              this.state.lastName.toLowerCase() +
              "_" +
              parseInt(this.state.phone).toString(16)
          );
          data.append("firstname", this.state.firstName.toLowerCase());
          data.append("lastname", this.state.lastName.toLowerCase());
          data.append("phone", this.state.phone);
          data.append("location", this.state.location);
          data.append("profession", this.state.profession);
          data.append("email", this.state.email);
          data.append("password", this.state.password);
          data.append("rate", this.state.rate);
          data.append("bio", this.state.bio);
          data.append("equipments", this.state.equipments);
          data.append("followers", null);
          data.append("following", null);
          data.append("profilePicture", this.state.profilePicture);
          data.append("coverPicture", this.state.coverPicture);
          // data.append("aadhaarCard", this.state.aadhaarCard);
          // data.append("panCard", this.state.panCard);
          // data.append("works[]", this.state.works[0]);
          // data.append("works[]", this.state.works[1]);
          // data.append("works[]", this.state.works[2]);
          // data.append("works[]", this.state.works[3]);
          // data.append("works[]", this.state.works[4]);
          // data.append("works[]", this.state.works[5]);
          // data.append("works[]", this.state.works[6]);
          // data.append("works[]", this.state.works[7]);
          // data.append("links", JSON.stringify(this.state.links));
          data.append(
            "pictureStyle",
            JSON.stringify({ coverPicture: "center", profilePicture: "center" })
          );
          data.append("usedReferalId", this.state.usedReferalId);
          // data.append("termsAndConditions", this.state.termsAndConditions);
          data.append("verified", false);
          const response = await fetch(
            `${process.env.SERVER_URL}/register/freelancer`,
            {
              method: "POST",
              headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              // body: JSON.stringify({
              //   uid:
              //     this.state.firstName.toLowerCase() +
              //     "." +
              //     this.state.lastName.toLowerCase() +
              //     "_" +
              //     parseInt(this.state.phone).toString(16),
              //   firstname: this.state.firstName.toLowerCase(),
              //   lastname: this.state.lastName.toLowerCase(),
              //   phone: this.state.phone,
              //   location: this.state.location,
              //   profession: this.state.profession,
              //   email: this.state.email,
              //   password: this.state.password,
              //   rate: this.state.rate,
              //   bio: this.state.bio,
              //   equipments: this.state.equipments,
              //   pictureStyle: JSON.stringify({
              //     coverPicture: "center",
              //     profilePicture: "center",
              //   }),
              //   usedReferalId: this.state.usedReferalId,
              //   verified: false,
              // }),
              body: data,
            }
          );
          const responseData = await response.json();
          localStorage.setItem(
            "user",
            JSON.stringify({ token: responseData.token })
          );
          Router.push("/contact_soon");
        } catch (error) {
          console.error(error);
          this.setState({ isLoading: false });
          this.setState({ registerFailed: true });
        }
      };

      postData();
    };

    handleOtp = () => {
      const postData = async () => {
        try {
          const response = await fetch(
            `${process.env.SERVER_URL}/verify/freelancer/phone`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                otp: this.state?.otp,
                phone: this.state?.phone,
                type: "freelancer",
              }),
            }
          );
          if (response.status === 403) {
            this.setState({ invalidOtp: true });
            return;
          } else {
            this.setState({ invalidOtp: false });
          }
          const data = await response.json();
          this.increProgress(11);
          localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
          console.error(error);
        }
      };

      postData();
    };

    getOtp = () => {
      const postData = async () => {
        try {
          const res = await fetch(`${process.env.SERVER_URL}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: this.state.phone,
              type: "freelancer",
            }),
          });
          if (res.status === 403) {
            this.setState({ exist: true });
            return;
          } else {
            this.setState({ exist: false });
            this.startCountdown();
            this.setState({ invalidOtp: false });
            this.increProgress(11);
          }
        } catch (error) {
          console.error(error);
        }
      };
      postData();
    };

    checkWorks = (val) => {
      if (val === 1) this.setState({ worksError: false });
      if (val === 2) this.setState({ addharError: false });
      if (val === 3) this.setState({ panError: false });
      if (val === 4) this.setState({ profilePicError: false });
      if (val === 5) this.setState({ coverPicError: false });
    };

    setPicError = (val, i) => {
      if (i === 1) this.setState({ profilePicError: val });
      if (i === 2) this.setState({ coverPicError: val });
      if (i === 3) this.setState({ addharError: val });
      if (i === 4) this.setState({ panError: val });
    };

    setWarns = (val, i) => {
      if (i === -1) {
        const temp = Array(12).fill(val);
        this.setState({ warns: temp });
      } else {
        this.setState((prevState) => {
          const temp = [...prevState.warns];
          temp[i] = val;
          return { warns: temp };
        });
      }
    };

    handelGoogleFbResponse = (val, i) => {
      if (i === 1) {
        this.setState({ firstName: val });
      } else if (i === 2) {
        this.setState({ lastName: val });
      } else if (i === 3) {
        this.setState({ email: val });
      }
    };

    handleEnterKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.increProgress(14.25);
      }
    };

    handleImageChange = (e, index) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      if (!file) {
        return;
      }

      if (file.size > 10485760 && index === 4) {
        this.setWarns(true, 0);
        this.setPicError(false, 1);
        return;
      }

      if (index === 4) {
        this.setState({ cameras: true });
        this.setState({ profilePicError: false });
        this.setState({ profilePicture: file });
      }

      if (file.size > 10485760 && index === 5) {
        this.setWarns(true, 1);
        this.setPicError(false, 2);
        return;
      }

      if (index === 5) {
        this.setState({ cameras: true });
        this.setState({ coverPicError: false });
        this.setState({ coverPicture: file });
      }

      this.setWarns(false, -1);

      reader.onloadend = () => {
        const newImages = [...this.state.images];
        newImages[index] = reader.result;
        this.setState({ images: newImages });
      };

      reader.readAsDataURL(file);
    };

    handleImageClick(event) {
      const sibling = event.currentTarget.previousElementSibling;
      if (sibling) {
        sibling.click();
      }
    }

    render() {
      return (
        <>
          <Head>
            <title>Fipezo | Register as a Freelancer</title>
          </Head>
          {this.state.isLoading && (
            <Loading message={"Sending Your Profile Details..."} />
          )}
          {!this.state.isLoading && (
            <div className={styles.main}>
              <Navbar
                user={this.props?.user}
                company={this.props?.company}
                setCompany={this.props?.setCompany}
                setUser={this.props?.setUser}
              />
              <div
                className={`${this.state?.form ? styles.newBody : styles.body}`}
              >
                <div
                  className={
                    `${this.state.form ? styles.newLeft : styles.left}` +
                    ` ${
                      this.state.currentPage === 9 &&
                      " [width:100%_!important] [max-width:1024px_!important]"
                    }`
                  }
                >
                  {!this.state.form && (
                    <h1 className={styles.heading}>
                      Fill Up The Registration Form.
                    </h1>
                  )}
                  {!this.state.form && (
                    <p className={styles.subHeading}>
                      Verify Yourself to explore more freelancing opportunities.
                    </p>
                  )}
                  <form
                    className={`${
                      this.state.form ? styles.newForm : styles.form
                    }`}
                    onSubmit={(event) => this.handleSubmit(event)}
                    encType="multipart/form-data"
                  >
                    {this.state.error && (
                      <p className={styles.error}>
                        Please provide all the inputs the fields.
                      </p>
                    )}
                    {this.state.phoneError && (
                      <p className={styles.error}>
                        Please provide a valid phone number of 10 digits.
                      </p>
                    )}
                    {this.state.registerFailed && (
                      <p className={styles.error}>
                        Registration Failed. Please try again.
                      </p>
                    )}
                    {this.state.invalidOtp && (
                      <p className={styles.error}>
                        Invalid OTP. Please try again.
                      </p>
                    )}
                    {this.state.exist && (
                      <p className={styles.error}>
                        Details already exists. Try login.
                      </p>
                    )}
                    {this.state.profilePicError && (
                      <p className={styles.error}>
                        Profile picture can&apos;t be blank
                      </p>
                    )}
                    {this.state.coverPicError && (
                      <p className={styles.error}>
                        Cover picture can&apos;t be blank
                      </p>
                    )}
                    {this.state.currentPage === 1 && (
                      <div className={styles.inputField} id={styles.firstname}>
                        <label htmlFor="firstname" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>First name :
                        </label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Enter Your First name"
                          name="firstname"
                          id="firstname"
                          required
                          onChange={(event) => {
                            const inputValue = event.target.value;
                            if (/^[a-zA-Z]*$/.test(inputValue)) {
                              this.setState({
                                firstName: inputValue,
                                error: false,
                              });
                            }
                          }}
                          onKeyDown={this.handleEnterKeyPress}
                          value={this.state.firstName}
                          maxLength={13}
                        />
                      </div>
                    )}
                    {this.state.currentPage === 1 && (
                      <div className={styles.inputField} id={styles.lastname}>
                        <label htmlFor="lastname" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Last name :
                        </label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Enter Your Last name"
                          name="lastname"
                          id="lastname"
                          required
                          onKeyDown={this.handleEnterKeyPress}
                          onChange={(event) => {
                            const inputValue = event.target.value;
                            if (/^[a-zA-Z]*$/.test(inputValue)) {
                              this.setState({
                                lastName: inputValue,
                                error: false,
                              });
                            }
                          }}
                          value={this.state.lastName}
                          maxLength={13}
                        />
                      </div>
                    )}
                    {this.state.currentPage === 2 && (
                      <div className={styles.inputField} id={styles.phone}>
                        <label htmlFor="phone" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Phone :
                        </label>
                        <input
                          type="tel"
                          id={styles.number}
                          className={styles.input}
                          placeholder="Enter Your Phone no."
                          name="phone"
                          maxLength={10}
                          required
                          onChange={(event) =>
                            this.setState({
                              phone: event.target.value,
                              error: false,
                              exist: false,
                            })
                          }
                          value={this.state.phone}
                          onKeyDown={this.handleEnterKeyPress}
                          max={10}
                        />
                      </div>
                    )}
                    {this.state.currentPage === 3 && (
                      <div className={styles.inputField} id={styles.otp}>
                        <label htmlFor="otp" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>OTP :
                        </label>
                        <input
                          type="number"
                          id={styles.number}
                          className={styles.input}
                          placeholder="Enter Your OTP"
                          name="otp"
                          required
                          onKeyDown={this.handleEnterKeyPress}
                          onChange={(event) =>
                            this.setState({
                              otp: event.target.value,
                              error: false,
                            })
                          }
                          value={this.state.otp}
                        />
                        <p className="pt-4 text-neutral-400">
                          OTP will be valid for 5 minutes
                        </p>
                      </div>
                    )}
                    {this.state.currentPage === 4 && (
                      <div>
                        <h2 className={styles.label}>
                          Do you have any referal code
                        </h2>
                        <div>
                          <input
                            type="text"
                            className={styles.input}
                            onChange={(e) => {
                              this.setState({ usedReferalId: e.target.value });
                            }}
                            onKeyDown={this.handleEnterKeyPress}
                            value={this.state.usedReferalId}
                            placeholder="Put your referal code here (Optional)"
                          />
                          {this.state.referError === true && (
                            <p className={styles.error}>
                              Invalid Referal Code. It should be 6 digit.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {this.state.currentPage === 4 && (
                      <div className={styles.inputField} id={styles.location}>
                        <label htmlFor="location" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Where do you
                          live?
                        </label>
                        <select
                          required
                          className={styles.options}
                          name="location"
                          onChange={(event) =>
                            this.setState({ location: event.target.value })
                          }
                          id="location"
                          value={this.state.location}
                          onKeyDown={this.handleEnterKeyPress}
                        >
                          <option className={styles.option} value="Agra">
                            Agra
                          </option>
                          <option className={styles.option} value="Ahmedabad">
                            Ahmedabad
                          </option>
                          <option className={styles.option} value="Amritsar">
                            Amritsar
                          </option>
                          <option className={styles.option} value="Aurangabad">
                            Aurangabad
                          </option>
                          <option className={styles.option} value="Bengaluru">
                            Bengaluru
                          </option>
                          <option className={styles.option} value="Bhopal">
                            Bhopal
                          </option>
                          <option className={styles.option} value="Bhubaneswar">
                            Bhubaneswar
                          </option>
                          <option className={styles.option} value="Burdwan">
                            Burdwan
                          </option>
                          <option className={styles.option} value="Chandigarh">
                            Chandigarh
                          </option>
                          <option className={styles.option} value="Chennai">
                            Chennai
                          </option>
                          <option className={styles.option} value="Coimbatore">
                            Coimbatore
                          </option>
                          <option className={styles.option} value="Dehradun">
                            Dehradun
                          </option>
                          <option className={styles.option} value="Delhi">
                            Delhi
                          </option>
                          <option className={styles.option} value="Dhanbad">
                            Dhanbad
                          </option>
                          <option className={styles.option} value="Durgapur">
                            Durgapur
                          </option>
                          <option className={styles.option} value="Faridabad">
                            Faridabad
                          </option>
                          <option className={styles.option} value="Ghaziabad">
                            Ghaziabad
                          </option>
                          <option className={styles.option} value="Guwahati">
                            Guwahati
                          </option>
                          <option className={styles.option} value="Gwalior">
                            Gwalior
                          </option>
                          <option className={styles.option} value="Hyderabad">
                            Hyderabad
                          </option>
                          <option className={styles.option} value="Indore">
                            Indore
                          </option>
                          <option className={styles.option} value="Jaipur">
                            Jaipur
                          </option>
                          <option className={styles.option} value="Jamshedpur">
                            Jamshedpur
                          </option>
                          <option className={styles.option} value="Jodhpur">
                            Jodhpur
                          </option>
                          <option className={styles.option} value="Kanpur">
                            Kanpur
                          </option>
                          <option className={styles.option} value="Kochi">
                            Kochi
                          </option>
                          <option className={styles.option} value="Kolkata">
                            Kolkata
                          </option>
                          <option className={styles.option} value="Lucknow">
                            Lucknow
                          </option>
                          <option className={styles.option} value="Ludhiana">
                            Ludhiana
                          </option>
                          <option className={styles.option} value="Madurai">
                            Madurai
                          </option>
                          <option className={styles.option} value="Mangaluru">
                            Mangaluru
                          </option>
                          <option className={styles.option} value="Meerut">
                            Meerut
                          </option>
                          <option className={styles.option} value="Mumbai">
                            Mumbai
                          </option>
                          <option className={styles.option} value="Mysuru">
                            Mysuru
                          </option>
                          <option className={styles.option} value="Nagpur">
                            Nagpur
                          </option>
                          <option className={styles.option} value="Nashik">
                            Nashik
                          </option>
                          <option className={styles.option} value="New_Delhi">
                            New Delhi
                          </option>
                          <option className={styles.option} value="Navi_Mumbai">
                            Navi Mumbai
                          </option>
                          <option className={styles.option} value="Patna">
                            Patna
                          </option>
                          <option className={styles.option} value="Prayagraj">
                            Prayagraj
                          </option>
                          <option className={styles.option} value="Puducherry">
                            Puducherry
                          </option>
                          <option className={styles.option} value="Pune">
                            Pune
                          </option>
                          <option className={styles.option} value="Raipur">
                            Raipur
                          </option>
                          <option className={styles.option} value="Rajkot">
                            Rajkot
                          </option>
                          <option className={styles.option} value="Ranchi">
                            Ranchi
                          </option>
                          <option className={styles.option} value="Siliguri">
                            Siliguri
                          </option>
                          <option className={styles.option} value="Surat">
                            Surat
                          </option>
                          <option className={styles.option} value="Thane">
                            Thane
                          </option>
                          <option
                            className={styles.option}
                            value="Thiruvananthapuram"
                          >
                            Thiruvananthapuram
                          </option>
                          <option className={styles.option} value="Udaipur">
                            Udaipur
                          </option>
                          <option className={styles.option} value="Vadodara">
                            Vadodara
                          </option>
                          <option className={styles.option} value="Varanasi">
                            Varanasi
                          </option>
                          <option className={styles.option} value="Vijayawada">
                            Vijayawada
                          </option>
                          <option
                            className={styles.option}
                            value="Visakhapatnam"
                          >
                            Visakhapatnam
                          </option>
                          <option className={styles.option} value="Warangal">
                            Warangal
                          </option>
                        </select>
                      </div>
                    )}
                    {this.state.currentPage === 5 && (
                      <div className={styles.inputField} id={styles.profession}>
                        <label htmlFor="profession" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>What is your
                          profession?
                        </label>
                        <select
                          required
                          className={styles.options}
                          name="profession"
                          onChange={(event) =>
                            this.setState({ profession: event.target.value })
                          }
                          id="profession"
                          value={this.state.profession}
                          onKeyDown={this.handleEnterKeyPress}
                        >
                          <option className={styles.option} value="actor">
                            Actor
                          </option>
                          <option className={styles.option} value="actress">
                            Actress
                          </option>
                          <option
                            className={styles.option}
                            value="album_designer"
                          >
                            Album Designer
                          </option>
                          <option className={styles.option} value="anchor">
                            Anchor
                          </option>
                          <option className={styles.option} value="babysitter">
                            Babysitter
                          </option>
                          <option
                            className={styles.option}
                            value="cinematographer"
                          >
                            Cinematographer
                          </option>
                          <option className={styles.option} value="dancer">
                            Dancer
                          </option>
                          <option
                            className={styles.option}
                            value="dance_teacher"
                          >
                            Dance Teacher
                          </option>
                          <option className={styles.option} value="dj">
                            DJ
                          </option>
                          <option
                            className={styles.option}
                            value="drawing_teacher"
                          >
                            Drawing Teacher
                          </option>
                          <option
                            className={styles.option}
                            value="drone_operator"
                          >
                            Drone Operator
                          </option>
                          <option
                            className={styles.option}
                            value="fashion_designer"
                          >
                            Fashion Designer
                          </option>
                          <option
                            className={styles.option}
                            value="graphics_designer"
                          >
                            Graphics Designer
                          </option>
                          <option className={styles.option} value="influencer">
                            Influencer
                          </option>
                          <option
                            className={styles.option}
                            value="interior_designer"
                          >
                            Interior Designer
                          </option>
                          <option className={styles.option} value="lyricist">
                            Lyricist
                          </option>
                          <option className={styles.option} value="maid">
                            Maid
                          </option>
                          <option
                            className={styles.option}
                            value="makeup_artist"
                          >
                            Makeup Artist
                          </option>
                          <option
                            className={styles.option}
                            value="mehendi_artist"
                          >
                            Mehendi Artist
                          </option>
                          <option className={styles.option} value="model">
                            Model
                          </option>
                          <option className={styles.option} value="musician">
                            Musician
                          </option>
                          <option
                            className={styles.option}
                            value="music_teacher"
                          >
                            Music Teacher
                          </option>
                          <option className={styles.option} value="painter">
                            Painter
                          </option>
                          <option
                            className={styles.option}
                            value="photographer"
                          >
                            Photographer
                          </option>
                          <option
                            className={styles.option}
                            value="photo_editor"
                          >
                            Photo Editor
                          </option>
                          <option
                            className={styles.option}
                            value="private_tutor"
                          >
                            Private Tutor
                          </option>
                          <option
                            className={styles.option}
                            value="video_editor"
                          >
                            Video Editor
                          </option>
                          <option className={styles.option} value="vocalist">
                            Vocalist
                          </option>
                          <option
                            className={styles.option}
                            value="voice_over_artist"
                          >
                            Voice Over Artist
                          </option>
                          <option
                            className={styles.option}
                            value="web_developer"
                          >
                            Web Developer
                          </option>
                        </select>
                      </div>
                    )}
                    {this.state.currentPage === 6 && (
                      <>
                        <div className={styles.inputField} id={styles.otp}>
                          <label htmlFor="email" className={styles.label}>
                            <span style={{ color: "white" }}>* </span>Email :
                          </label>
                          <input
                            type="email"
                            className={styles.input}
                            placeholder="Enter your email address"
                            name="email"
                            required
                            onKeyDown={this.handleEnterKeyPress}
                            onChange={(event) =>
                              this.setState({
                                email: event.target.value,
                                error: false,
                                exist: false,
                              })
                            }
                            value={this.state.email}
                          />
                        </div>
                        <div className={styles.inputField} id={styles.otp}>
                          <label htmlFor="password" className={styles.label}>
                            <span style={{ color: "white" }}>* </span>Create
                            your password :
                          </label>
                          <div>
                            <div className="flex border-b border-b-[#878787] items-center justify-between">
                              <input
                                type="password"
                                className="focus:outline-none text-white bg-transparent p-1"
                                placeholder="Enter password"
                                name="password"
                                minLength={8}
                                maxLength={15}
                                ref={this.passwordRef}
                                required
                                onKeyDown={this.handleEnterKeyPress}
                                onChange={(event) =>
                                  this.setState({
                                    password: event.target.value,
                                    error: false,
                                  })
                                }
                                value={this.state.password}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (
                                    this.passwordRef.current.type === "password"
                                  ) {
                                    this.passwordRef.current.type = "text";
                                    this.setState({
                                      passowordInputType: "text",
                                    });
                                  } else {
                                    this.passwordRef.current.type = "password";
                                    this.setState({
                                      passowordInputType: "password",
                                    });
                                  }
                                }}
                              >
                                {this.state.passowordInputType ===
                                "password" ? (
                                  <AiFillEye />
                                ) : (
                                  <AiFillEyeInvisible />
                                )}
                              </button>
                            </div>
                            {this.state.passwordError && (
                              <p className={styles.error}>
                                Password should not be empty and password must
                                be contains minimum 8 characters
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {this.state.currentPage === 7 && (
                      <div className={styles.inputField} id={styles.rate}>
                        <label htmlFor="rate" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>What is your
                          fee per day?
                        </label>
                        {this.state.rate && (
                          <p className={styles.rate}>
                            Rs. {this.state.rate} / Day
                          </p>
                        )}
                        <input
                          required
                          className={
                            styles.rateInput +
                            " p-2 my-2 border-[1px] border-solid w-[80%] bg-transparent border-[hsl(0,0%,52%)] text-white"
                          }
                          name="rate"
                          type="number"
                          placeholder="Enter your remuneration per day amount"
                          onBlur={(e) => {
                            if (e.target.value < 500) {
                              e.target.value = 500;
                              this.setState({ rate: e.target.value });
                            }
                            if (e.target.value > 50000) {
                              e.target.value = 50000;
                              this.setState({ rate: e.target.value });
                            }
                          }}
                          onChange={(event) =>
                            this.setState({ rate: event.target.value })
                          }
                          id="rate"
                          value={this.state.rate}
                          onKeyDown={this.handleEnterKeyPress}
                        />
                        <input
                          required
                          className={styles.range}
                          name="rate"
                          type="range"
                          min="500"
                          max="50000"
                          step="100"
                          onChange={(event) =>
                            this.setState({ rate: event.target.value })
                          }
                          id="rate"
                          value={this.state.rate}
                          onKeyDown={this.handleEnterKeyPress}
                        />
                      </div>
                    )}
                    {this.state.currentPage === 8 && (
                      <div
                        className={
                          styles.imageFields +
                          " relative flex justify-center h-28 lg:h-44 w-28 lg:w-44 rounded-full border border-gray-300 bg-cover bg-no-repeat bg-center shadow-[var(--shadow)]"
                        }
                        id={styles.profile_pic}
                        style={{
                          backgroundImage: this.state.images[4]
                            ? `url(${this.state.images[4]})`
                            : `url(/dp.png)`,
                        }}
                      >
                        {!this.state.cameras && (
                          <Image
                            className={
                              styles.camera +
                              " absolute bottom-2 lg:bottom-6 left-3 lg:left-8 flex items-center justify-center cursor-pointer opacity-20 border-2 p-[5px] rounded-full"
                            }
                            id={styles.camera}
                            src="/cameraIcon.png"
                            width={40}
                            height={40}
                            alt="camera"
                            onClick={this.handleImageClick}
                          />
                        )}
                        <input
                          type="file"
                          className={
                            styles.profilePicPreview +
                            " h-full w-full cursor-pointer rounded-full"
                          }
                          onChange={(e) => this.handleImageChange(e, 4)}
                          accept="image/jpeg,image/png"
                          name="profilePicture"
                        />
                        {this.state.profilePicError && (
                          <p className={styles.warn}>
                            Please Provide Profile Picture
                          </p>
                        )}
                        {this.state.warns[0] && (
                          <p className={styles.warn}>
                            File size exceeds maximum limit of 10mb
                          </p>
                        )}
                      </div>
                    )}
                    {this.state.currentPage === 9 && (
                      <div
                        className={styles.imageFields}
                        id={styles.cover}
                        style={{
                          backgroundImage: this.state.images[5]
                            ? `url(${this.state.images[5]})`
                            : `none`,
                        }}
                      >
                        {!this.state.cameras && (
                          <Image
                            className={styles.camera}
                            src="/cameraIcon.png"
                            width={40}
                            height={40}
                            alt="camera"
                            onClick={this.handleImageClick}
                          />
                        )}
                        <input
                          type="file"
                          className={styles.coverPreview}
                          onChange={(e) => this.handleImageChange(e, 5)}
                          accept="image/jpeg,image/png"
                          name="coverPicture"
                        />
                        {this.state.coverPicError && (
                          <p className={styles.warn}>
                            Please Provide Cover Picture
                          </p>
                        )}
                        {this.state.warns[1] && (
                          <p className={styles.warn}>
                            File size exceeds maximum limit of 10MB
                          </p>
                        )}
                        <span className={styles.instruction}>
                          Please upload images of maximum limit 10MB
                        </span>
                      </div>
                    )}
                    {this.state.textareaError && (
                      <p className={styles.error}>
                        Please provide less than 300 characters and atleast 50
                        characters.
                      </p>
                    )}
                    {this.state.currentPage === 10 &&
                      this.state.bio.length < 50 &&
                      !this.state.textareaError && (
                        <p>
                          No of characters left: {50 - this.state.bio.length}
                        </p>
                      )}
                    {this.state.currentPage === 10 &&
                      this.state.bio.length > 300 &&
                      !this.state.textareaError && (
                        <p>
                          No of characters excceded:{" "}
                          {this.state.bio.length - 300}
                        </p>
                      )}
                    {this.state.currentPage === 10 && (
                      <div className={styles.inputField} id={styles.bio}>
                        <label htmlFor="bio" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Bio :
                        </label>
                        <textarea
                          required
                          name="bio"
                          id="bio"
                          cols="30"
                          rows="10"
                          onChange={(event) => this.handleTextChange(event, 1)}
                          onKeyDown={this.handleEnterKeyPress}
                          className={styles.textarea}
                          placeholder="Write Your Yourself here..."
                          value={this.state.bio}
                        ></textarea>
                      </div>
                    )}
                    {this.state.currentPage === 11 &&
                      this.state?.equipments?.length < 50 &&
                      !this.state.textareaError && (
                        <p>
                          No of characters left:{" "}
                          {50 - this.state?.equipments?.length}
                        </p>
                      )}
                    {this.state.currentPage === 11 &&
                      this.state?.equipments?.length > 300 &&
                      !this.state.textareaError && (
                        <p>
                          No of characters excceded:{" "}
                          {this.state?.equipments?.length - 300}
                        </p>
                      )}
                    {!this.state.form &&
                      this.state.currentPage === 11 &&
                      (this.state.profession === "photographer" ||
                        this.state.profession === "drone_operator" ||
                        this.state.profession === "cinematographer" ||
                        this.state.profession === "musician") && (
                        <div
                          className={styles.inputField}
                          id={styles.equipment}
                        >
                          <label htmlFor="equipments" className={styles.label}>
                            <span style={{ color: "white" }}>* </span>Equipments
                            Available :
                          </label>
                          <textarea
                            required
                            name="equipments"
                            id="equipments"
                            cols="30"
                            rows="10"
                            onChange={(event) =>
                              this.handleTextChange(event, 2)
                            }
                            onKeyDown={this.handleEnterKeyPress}
                            className={styles.textarea}
                            placeholder="Write Your equipments here..."
                            value={this.state?.equipments}
                          ></textarea>
                        </div>
                      )}
                    {!this.state.form &&
                      this.state.currentPage === 11 &&
                      (this.state.profession === "makeup_artist" ||
                        this.state.profession === "mehendi_artist") && (
                        <div
                          className={styles.inputField}
                          id={styles.equipment}
                        >
                          <label htmlFor="products" className={styles.label}>
                            <span style={{ color: "white" }}>* </span>Products
                            Use :
                          </label>
                          <textarea
                            required
                            name="equipments"
                            id="products"
                            cols="30"
                            rows="10"
                            onChange={(event) =>
                              this.handleTextChange(event, 2)
                            }
                            onKeyDown={this.handleEnterKeyPress}
                            className={styles.textarea}
                            placeholder="Write Your products here..."
                            value={this.state?.equipments}
                          ></textarea>
                        </div>
                      )}
                    {!this.state.form &&
                      this.state.currentPage === 11 &&
                      (this.state.profession === "model" ||
                        this.state.profession === "anchor" ||
                        this.state.profession === "dj" ||
                        this.state.profession === "dancer" ||
                        this.state.profession === "influencer" ||
                        this.state.profession === "private_tutor" ||
                        this.state.profession === "dance_teacher" ||
                        this.state.profession === "music_teacher" ||
                        this.state.profession === "drawing_teacher" ||
                        this.state.profession === "painter" ||
                        this.state.profession === "lyricist" ||
                        this.state.profession === "voice_over_artist" ||
                        this.state.profession === "fashion_designer" ||
                        this.state.profession === "vocalist" ||
                        this.state.profession === "actor" ||
                        this.state.profession === "actress" ||
                        this.state.profession === "babysitter" ||
                        this.state.profession === "maid" ||
                        this.state.profession === "interior_designer") && (
                        <div
                          className={styles.inputField}
                          id={styles.equipment}
                        >
                          <label htmlFor="products" className={styles.label}>
                            <span style={{ color: "white" }}>* </span>Describe
                            your work experience :
                          </label>
                          <textarea
                            required
                            name="equipments"
                            id="products"
                            cols="30"
                            rows="10"
                            onChange={(event) =>
                              this.handleTextChange(event, 2)
                            }
                            onKeyDown={this.handleEnterKeyPress}
                            className={styles.textarea}
                            placeholder="Write about Your working experience here..."
                            value={this.state?.equipments}
                          ></textarea>
                        </div>
                      )}
                    {!this.state.form &&
                      this.state.currentPage === 11 &&
                      (this.state.profession === "photo_editor" ||
                        this.state.profession === "video_editor" ||
                        this.state.profession === "album_designer" ||
                        this.state.profession === "graphics_designer") && (
                        <div
                          className={styles.inputField}
                          id={styles.equipment}
                        >
                          <label
                            htmlFor="fimiliarSoft"
                            className={styles.label}
                          >
                            <span style={{ color: "white" }}>* </span>Software
                            Knowledge :
                          </label>
                          <textarea
                            required
                            name="equipments"
                            id="equipments"
                            cols="30"
                            rows="10"
                            onChange={(event) =>
                              this.handleTextChange(event, 2)
                            }
                            onKeyDown={this.handleEnterKeyPress}
                            className={styles.textarea}
                            placeholder="Write software name which you used..."
                            value={this.state?.equipments}
                          ></textarea>
                        </div>
                      )}
                    {!this.state.form &&
                      this.state.currentPage === 11 &&
                      this.state.profession === "web_developer" && (
                        <div
                          className={styles.inputField}
                          id={styles.equipment}
                        >
                          <label
                            htmlFor="fimiliarSoft"
                            className={styles.label}
                          >
                            <span style={{ color: "white" }}>* </span>Fimiliar
                            Language :
                          </label>
                          <textarea
                            required
                            name="equipments"
                            id="equipments"
                            cols="30"
                            rows="10"
                            onChange={(event) =>
                              this.handleTextChange(event, 2)
                            }
                            onKeyDown={this.handleEnterKeyPress}
                            className={styles.textarea}
                            placeholder="Write languages which you fimiliar with..."
                            value={this.state?.equipments}
                          ></textarea>
                        </div>
                      )}
                    {!this.state.form && (
                      <div className={styles.btns}>
                        {this.state.currentPage !== 1 && (
                          <button
                            className={styles.backBtn}
                            type="button"
                            onClick={() => this.decreProgress(11)}
                          >
                            Back
                          </button>
                        )}
                        {this.state.currentPage !== 2 &&
                          this.state.currentPage !== 3 &&
                          this.state.currentPage !== 6 &&
                          this.state.currentPage !== 11 && (
                            <button
                              className={styles.NextBtn}
                              type="button"
                              onClick={() => this.increProgress(11)}
                            >
                              {this.state.btn}
                            </button>
                          )}
                        {this.state.currentPage === 6 && (
                          <button
                            className={styles.NextBtn}
                            type="button"
                            onClick={() => this.checkEmail()}
                          >
                            {this.state.btn}
                          </button>
                        )}
                        {this.state.currentPage === 11 && (
                          <button className={styles.NextBtn} type="submit">
                            Submit
                          </button>
                        )}
                        {this.state.currentPage === 2 && (
                          <button
                            className={styles.NextBtn}
                            type="button"
                            onClick={this.getOtp}
                          >
                            Next
                          </button>
                        )}
                        {this.state.currentPage === 3 && (
                          <button
                            className={styles.NextBtn}
                            type="button"
                            onClick={this.handleOtp}
                          >
                            Verify
                          </button>
                        )}
                        {this.state.resendOtp &&
                          this.state.currentPage === 3 && (
                            <button
                              className={
                                styles.NextBtn + " flex items-center gap-1"
                              }
                              type="button"
                              onClick={this.getOtp}
                            >
                              <IoReloadOutline /> Resend
                            </button>
                          )}
                      </div>
                    )}
                    {this.state.currentPage === 3 && this.state.count > 0 && (
                      <p className={styles.resendOtp}>
                        Resend OTP in {this.state.count}s?
                      </p>
                    )}
                    {this.state.form && (
                      <Verification
                        getVerificationDetails={this.getVerificationDetails}
                        checkWorks={this.checkWorks}
                        worksError={this.state.worksError}
                        addharError={this.state.addharError}
                        panError={this.state.panError}
                        setPicError={this.setPicError}
                        coverPicError={this.state.coverPicError}
                        profilePicError={this.state.profilePicError}
                        warns={this.state.warns}
                        setWarns={this.setWarns}
                        user={this.props.user}
                        setUser={this.props.setUser}
                        company={this.props.company}
                        setCompany={this.props.setCompany}
                        profession={this.state.profession}
                      />
                    )}
                  </form>
                  {this.state.currentPage === 1 && (
                    <GoogleFacebookLogin get={this.handelGoogleFbResponse} />
                  )}
                  {this.state.currentPage === 1 ||
                  this.state.currentPage === 2 ||
                  this.state.currentPage === 3 ? (
                    <div className="mt-8">
                      Already have an account?{" "}
                      <Link className="text-cyan-500 capitalize" href="/login">
                        log in!
                      </Link>
                    </div>
                  ) : (
                    <div
                      className={`capitalize mt-8 ${
                        this.state.form ? " text-center" : " "
                      }`}
                    >
                      facing issues?{" "}
                      <ReactWhatsapp
                        number="+919038578787"
                        message="Hello Fipezo"
                        className="text-cyan-500 capitalize"
                      >
                        contact us!
                      </ReactWhatsapp>
                    </div>
                  )}
                </div>
                {!this.state.form && this.state.currentPage !== 9 && (
                  <div className={styles.right}>
                    <div className={styles.title}>
                      <h1 className={styles.heading}>
                        Take Control of Your Career.
                      </h1>
                      <p className={styles.subHeading}>
                        Join our Platform and Start Earning on Your Own Terms!
                      </p>
                      <hr className={styles.divider} />
                    </div>
                    <div className={styles.features}>
                      <div className={styles.freelancer}>
                        <h1 className={styles.minHeading}>For Freelancers</h1>
                        <div className={styles.feature}>
                          &#x2713;<p>Helps You get more reach</p>
                        </div>
                        <div className={styles.feature}>
                          &#x2713;<p>All Verified Companies</p>
                        </div>
                        <div className={styles.feature}>
                          &#x2713;<p>Maintains Privacy and Fully Transparent</p>
                        </div>
                      </div>
                      <Image
                        src="/freeX.png"
                        alt="registration-image"
                        width="260"
                        height="200"
                        className={styles.img}
                      />
                    </div>
                    <hr className={styles.divider} />
                  </div>
                )}
              </div>
              {!this.state.form && (
                <div className={styles.bar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${this.state.progress}%` }}
                  ></div>
                </div>
              )}
              <Footer user={this.props.user} company={this.props.company} />
            </div>
          )}
        </>
      );
    }
  }
);

export const GoogleFacebookLogin = (props) => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
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
          props.get(data.given_name, 1);
          props.get(data.family_name, 2);
          props.get(data.email, 3);
        });
    },
    onError: (error) => console.log(error),
  });

  const responseFacebook = async (response) => {
    console.log(response);
    if (response.status === "unknown") {
      return;
    }
    props.get(response.name.split(" ")[0], 1);
    props.get(response.name.split(" ")[1], 2);
    props.get(response.email, 3);
  };
  return (
    <>
      <p className="flex w-full items-center gap-2 mt-3">
        <hr className="w-full border-neutral-500" />
        OR <hr className="w-full border-neutral-500" />
      </p>
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-lg">Auto fill up by social</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={login}
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
    </>
  );
};
