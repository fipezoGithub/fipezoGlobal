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
        services: [],
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
      if (
        prevState.count === 0 &&
        prevState.currentPage === 3 &&
        this.state.timerId !== null
      ) {
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
        this.setState({ count: 30 });
        this.startCountdown();
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

    handelServices = (e, val) => {
      if (e.target.checked) {
        const newService = [...this.state.services];
        newService.push(val);
        this.setState({ services: newService });
      } else {
        const newService = [...this.state.services];
        if (newService.includes(val)) {
          let index = newService.indexOf(val);

          this.setState((prevState) => ({
            services: [
              ...prevState.services.slice(0, index),
              ...prevState.services.slice(index + 1, prevState.services.length),
            ],
          }));
        }
      }
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
          this.state.services.forEach((element) => {
            data.append("services[]", element);
          });
          data.append("email", this.state.email);
          data.append("password", this.state.password);
          data.append("rate", this.state.rate);
          data.append("bio", this.state.bio);
          data.append("equipments", this.state.equipments);
          data.append("followers", null);
          data.append("following", null);
          data.append("profilePicture", this.state.profilePicture);
          data.append("coverPicture", this.state.coverPicture);
          data.append(
            "pictureStyle",
            JSON.stringify({ coverPicture: "center", profilePicture: "center" })
          );
          data.append("usedReferalId", this.state.usedReferalId);
          data.append("verified", false);
          const response = await fetch(
            `${process.env.SERVER_URL}/register/freelancer`,
            {
              method: "POST",
              headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
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
                    {this.state.currentPage === 5 &&
                      this.state.profession !== "babysitter" &&
                      this.state.profession !== "album_designer" &&
                      this.state.profession !== "photo_editor" &&
                      this.state.profession !== "video_editor" &&
                      this.state.profession !== "interior_designer" &&
                      this.state.profession !== "lyricist" &&
                      this.state.profession !== "mehendi_artist" && (
                        <div
                          className={styles.inputField}
                          id={styles.profession}
                        >
                          <label className={styles.label}>
                            <span style={{ color: "white" }}>* </span>What types
                            of services you provide?
                          </label>
                          {(this.state.profession === "actor" ||
                            this.state.profession === "actress") && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  className="w-6 h-6"
                                  type="checkbox"
                                  name=""
                                  onChange={(e) =>
                                    this.handelServices(e, "photoshoot")
                                  }
                                  id="photoshoot"
                                />
                                <label
                                  htmlFor="photoshoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Photoshoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="stageshow"
                                  onChange={(e) =>
                                    this.handelServices(e, "stageshow")
                                  }
                                />
                                <label
                                  htmlFor="stageshow"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Stage show
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="inauguration"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "inauguration_ceremony"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="inauguration"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Inauguration ceremony
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="social_promotion"
                                  onChange={(e) =>
                                    this.handelServices(e, "social_promotion")
                                  }
                                />
                                <label
                                  htmlFor="social_promotion"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Social promotion
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="tvc_ad"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "television_commercial_ads"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="tvc_ad"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Television Commercial Ads
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  name=""
                                  id="hoading"
                                  className="w-6 h-6"
                                  onChange={(e) =>
                                    this.handelServices(e, "hoading_shoots")
                                  }
                                />
                                <label
                                  htmlFor="hoading"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Hoading shoots
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="brand_endorsement"
                                  onChange={(e) =>
                                    this.handelServices(e, "brand_endorsement")
                                  }
                                />
                                <label
                                  htmlFor="brand_endorsement"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Brand endorsement
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "anchor" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="stageshow"
                                  onChange={(e) =>
                                    this.handelServices(e, "stageshow")
                                  }
                                />
                                <label
                                  htmlFor="stageshow"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Stage show
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="weeding"
                                  onChange={(e) =>
                                    this.handelServices(e, "weeding_ceremony")
                                  }
                                />
                                <label
                                  htmlFor="weeding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  weeding ceremony
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="corporate"
                                  onChange={(e) =>
                                    this.handelServices(e, "corporate_events")
                                  }
                                />
                                <label
                                  htmlFor="corporate"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  corporate parties
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="personal_parties"
                                  onChange={(e) =>
                                    this.handelServices(e, "personal_parties")
                                  }
                                />
                                <label
                                  htmlFor="personal_parties"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  personal parties
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "cinematographer" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="weeding"
                                  onChange={(e) =>
                                    this.handelServices(e, "weeding_ceremony")
                                  }
                                />
                                <label
                                  htmlFor="weeding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  weeding ceremony
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="pre-weeding"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "pre_weeding_ceremony"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="pre-weeding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  pre weeding ceremony
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="corporate"
                                  onChange={(e) =>
                                    this.handelServices(e, "corporate_events")
                                  }
                                />
                                <label
                                  htmlFor="corporate"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  corporate events
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="personal_parties"
                                  onChange={(e) =>
                                    this.handelServices(e, "personal_parties")
                                  }
                                />
                                <label
                                  htmlFor="personal_parties"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  personal parties
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="fashion_portfolio"
                                  onChange={(e) =>
                                    this.handelServices(e, "fashion_portfolio")
                                  }
                                />
                                <label
                                  htmlFor="fashion_portfolio"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  fashion portfolio
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="food_industry"
                                  onChange={(e) =>
                                    this.handelServices(e, "food_industry")
                                  }
                                />
                                <label
                                  htmlFor="food_industry"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  food industry
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="automobile_industry"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "automobile_industry"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="automobile_industry"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  automobile industry
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="architecture"
                                  onChange={(e) =>
                                    this.handelServices(e, "architecture_shoot")
                                  }
                                />
                                <label
                                  htmlFor="architecture"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  architecture design
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="tvc_ad"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "television_commercial_ads"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="tvc_ad"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Television Commercial Ads
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="short_film"
                                  onChange={(e) =>
                                    this.handelServices(e, "short_film")
                                  }
                                />
                                <label
                                  htmlFor="short_film"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  short film
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="music_video"
                                  onChange={(e) =>
                                    this.handelServices(e, "music_video")
                                  }
                                />
                                <label
                                  htmlFor="music_video"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  music video
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "dancer" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="stageshow"
                                  onChange={(e) =>
                                    this.handelServices(e, "stageshow")
                                  }
                                />
                                <label
                                  htmlFor="stageshow"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Stage show
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="backleading_dancer"
                                  onChange={(e) =>
                                    this.handelServices(e, "backleading_dancer")
                                  }
                                />
                                <label
                                  htmlFor="backleading_dancer"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  backleading dancer
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="weeding_party"
                                  onChange={(e) =>
                                    this.handelServices(e, "weeding_party")
                                  }
                                />
                                <label
                                  htmlFor="weeding_party"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  weeding parties
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="personal_parties"
                                  onChange={(e) =>
                                    this.handelServices(e, "personal_parties")
                                  }
                                />
                                <label
                                  htmlFor="personal_parties"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  personal parties
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="music_video"
                                  onChange={(e) =>
                                    this.handelServices(e, "music_video")
                                  }
                                />
                                <label
                                  htmlFor="music_video"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  music video
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "dance_teacher" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="modern_dance"
                                  onChange={(e) =>
                                    this.handelServices(e, "modern_dance")
                                  }
                                />
                                <label
                                  htmlFor="modern_dance"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Modern dance
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="ballet"
                                  onChange={(e) =>
                                    this.handelServices(e, "ballet")
                                  }
                                />
                                <label
                                  htmlFor="ballet"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Ballet
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="swing"
                                  onChange={(e) =>
                                    this.handelServices(e, "swing")
                                  }
                                />
                                <label
                                  htmlFor="swing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Swing
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="tap_dance"
                                  onChange={(e) =>
                                    this.handelServices(e, "tap_dance")
                                  }
                                />
                                <label
                                  htmlFor="tap_dance"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Tap dance
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="hip_hop"
                                  onChange={(e) =>
                                    this.handelServices(e, "hip_hop")
                                  }
                                />
                                <label
                                  htmlFor="hip_hop"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Hip hop
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="folk_dance"
                                  onChange={(e) =>
                                    this.handelServices(e, "folk_dance")
                                  }
                                />
                                <label
                                  htmlFor="folk_dance"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Folk dance
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="irish_dance"
                                  onChange={(e) =>
                                    this.handelServices(e, "irish_dance")
                                  }
                                />
                                <label
                                  htmlFor="irish_dance"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Irish Dance
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="bharatanatyam"
                                  onChange={(e) =>
                                    this.handelServices(e, "bharatanatyam")
                                  }
                                />
                                <label
                                  htmlFor="bharatanatyam"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Bharatanatyam
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="contemporary"
                                  onChange={(e) =>
                                    this.handelServices(e, "contemporary")
                                  }
                                />
                                <label
                                  htmlFor="contemporary"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Contemporary
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="line_dancing"
                                  onChange={(e) =>
                                    this.handelServices(e, "line_dancing")
                                  }
                                />
                                <label
                                  htmlFor="line_dancing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Line dancing
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="samba"
                                  onChange={(e) =>
                                    this.handelServices(e, "samba")
                                  }
                                />
                                <label
                                  htmlFor="samba"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Samba
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="tango"
                                  onChange={(e) =>
                                    this.handelServices(e, "tango")
                                  }
                                />
                                <label
                                  htmlFor="tango"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Tango
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="ballroom"
                                  onChange={(e) =>
                                    this.handelServices(e, "ballroom")
                                  }
                                />
                                <label
                                  htmlFor="ballroom"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Ballroom
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="belly_dance"
                                  onChange={(e) =>
                                    this.handelServices(e, "bally_dance")
                                  }
                                />
                                <label
                                  htmlFor="belly_dance"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Belly dance
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="jazz"
                                  onChange={(e) =>
                                    this.handelServices(e, "jazz")
                                  }
                                />
                                <label
                                  htmlFor="jazz"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Jazz
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="jive"
                                  onChange={(e) =>
                                    this.handelServices(e, "jive")
                                  }
                                />
                                <label
                                  htmlFor="jive"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Jive
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="breakdance"
                                  onChange={(e) =>
                                    this.handelServices(e, "break_dance")
                                  }
                                />
                                <label
                                  htmlFor="breakdance"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Break dance
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="capoeira"
                                  onChange={(e) =>
                                    this.handelServices(e, "capoeira")
                                  }
                                />
                                <label
                                  htmlFor="capoeira"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Capoeira
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="cha_cha"
                                  onChange={(e) =>
                                    this.handelServices(e, "cha_cha")
                                  }
                                />
                                <label
                                  htmlFor="cha_cha"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Cha Cha
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="kathak"
                                  onChange={(e) =>
                                    this.handelServices(e, "kathak")
                                  }
                                />
                                <label
                                  htmlFor="kathak"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Kathak
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="mambo"
                                  onChange={(e) =>
                                    this.handelServices(e, "mambo")
                                  }
                                />
                                <label
                                  htmlFor="mambo"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Mambo
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="rumba"
                                  onChange={(e) =>
                                    this.handelServices(e, "rumba")
                                  }
                                />
                                <label
                                  htmlFor="rumba"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Rumba
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="salsa"
                                  onChange={(e) =>
                                    this.handelServices(e, "salsa")
                                  }
                                />
                                <label
                                  htmlFor="salsa"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Salsa
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="bolero"
                                  onChange={(e) =>
                                    this.handelServices(e, "bolero")
                                  }
                                />
                                <label
                                  htmlFor="bolero"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Bolero
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "dj" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="weeding_party"
                                  onChange={(e) =>
                                    this.handelServices(e, "weeding_party")
                                  }
                                />
                                <label
                                  htmlFor="weeding_party"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  weeding parties
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="personal_parties"
                                  onChange={(e) =>
                                    this.handelServices(e, "personal_parties")
                                  }
                                />
                                <label
                                  htmlFor="personal_parties"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  personal parties
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="club"
                                  onChange={(e) =>
                                    this.handelServices(e, "club_party")
                                  }
                                />
                                <label
                                  htmlFor="club"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  club party
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "drawing_teacher" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="pencil_drawing"
                                  onChange={(e) =>
                                    this.handelServices(e, "pencil_drawing")
                                  }
                                />
                                <label
                                  htmlFor="pencil_drawing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  pencil drawing
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="ink_drawing"
                                  onChange={(e) =>
                                    this.handelServices(e, "ink_drawing")
                                  }
                                />
                                <label
                                  htmlFor="ink_drawing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  ink drawing
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="pen_drawing"
                                  onChange={(e) =>
                                    this.handelServices(e, "pen_drawing")
                                  }
                                />
                                <label
                                  htmlFor="pen_drawing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Pen drawing
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="chalk_drawing"
                                  onChange={(e) =>
                                    this.handelServices(e, "chalk_drawing")
                                  }
                                />
                                <label
                                  htmlFor="chalk_drawing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Chalk drawing
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="crayon_drawing"
                                  onChange={(e) =>
                                    this.handelServices(e, "crayon_drawing")
                                  }
                                />
                                <label
                                  htmlFor="crayon_drawing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Crayon drawing
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="charcoal_drawing"
                                  onChange={(e) =>
                                    this.handelServices(e, "charcoal_drawing")
                                  }
                                />
                                <label
                                  htmlFor="charcoal_drawing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Charcoal drawing
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "drone_operator" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="weeding"
                                  onChange={(e) =>
                                    this.handelServices(e, "weeding_ceremony")
                                  }
                                />
                                <label
                                  htmlFor="weeding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  weeding ceremony
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="pre-weeding"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "pre_weeding_ceremony"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="pre-weeding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  pre weeding ceremony
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="corporate"
                                  onChange={(e) =>
                                    this.handelServices(e, "commercial_project")
                                  }
                                />
                                <label
                                  htmlFor="corporate"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  commercial project
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="industrial"
                                  onChange={(e) =>
                                    this.handelServices(e, "industrial_project")
                                  }
                                />
                                <label
                                  htmlFor="industrial"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  industrial project
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="personal_parties"
                                  onChange={(e) =>
                                    this.handelServices(e, "personal_parties")
                                  }
                                />
                                <label
                                  htmlFor="personal_parties"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  personal parties
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="political_rally"
                                  onChange={(e) =>
                                    this.handelServices(e, "political_rally")
                                  }
                                />
                                <label
                                  htmlFor="political_rally"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  political rally
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="tvc_ad"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "television_commercial_ads"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="tvc_ad"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Television Commercial Ads
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "fashion_designer" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="western"
                                  onChange={(e) =>
                                    this.handelServices(e, "western")
                                  }
                                />
                                <label
                                  htmlFor="western"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  western
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="athentic"
                                  onChange={(e) =>
                                    this.handelServices(e, "athentic")
                                  }
                                />
                                <label
                                  htmlFor="athentic"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  athentic
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="traditional"
                                  onChange={(e) =>
                                    this.handelServices(e, "traditional")
                                  }
                                />
                                <label
                                  htmlFor="traditional"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  traditional
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="weeding"
                                  onChange={(e) =>
                                    this.handelServices(e, "weeding_ceremony")
                                  }
                                />
                                <label
                                  htmlFor="weeding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  weeding
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="pre_weeding"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "pre_weeding_ceremony"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="pre_weeding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  pre weeding
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="babyshoot"
                                  onChange={(e) =>
                                    this.handelServices(e, "babyshoot")
                                  }
                                />
                                <label
                                  htmlFor="babyshoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  babyshoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="maternity"
                                  onChange={(e) =>
                                    this.handelServices(e, "maternity_shoot")
                                  }
                                />
                                <label
                                  htmlFor="maternity"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  maternity
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="bridal"
                                  onChange={(e) =>
                                    this.handelServices(e, "bridal_shoot")
                                  }
                                />
                                <label
                                  htmlFor="bridal"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  bridal shoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="tvc_ad"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "television_commercial_ads"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="tvc_ad"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Television Commercial Ads
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="tvserial"
                                  onChange={(e) =>
                                    this.handelServices(e, "television_serial")
                                  }
                                />
                                <label
                                  htmlFor="tvserial"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Television Serial
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="fashion_show"
                                  onChange={(e) =>
                                    this.handelServices(e, "fashion_show")
                                  }
                                />
                                <label
                                  htmlFor="fashion_show"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  fashion show
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="music_video"
                                  onChange={(e) =>
                                    this.handelServices(e, "music_video")
                                  }
                                />
                                <label
                                  htmlFor="music_video"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  music video
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="film"
                                  onChange={(e) =>
                                    this.handelServices(e, "film")
                                  }
                                />
                                <label
                                  htmlFor="film"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  film
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="short_film"
                                  onChange={(e) =>
                                    this.handelServices(e, "short_film")
                                  }
                                />
                                <label
                                  htmlFor="short_film"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  short film
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "graphics_designer" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="brochure"
                                  onChange={(e) =>
                                    this.handelServices(e, "brochure_design")
                                  }
                                />
                                <label
                                  htmlFor="brochure"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  brochure design
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="magazine"
                                  onChange={(e) =>
                                    this.handelServices(e, "magazine_design")
                                  }
                                />
                                <label
                                  htmlFor="magazine"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  magazine design
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="website"
                                  onChange={(e) =>
                                    this.handelServices(e, "website_design")
                                  }
                                />
                                <label
                                  htmlFor="website"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  website design
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="logo"
                                  onChange={(e) =>
                                    this.handelServices(e, "logo_design")
                                  }
                                />
                                <label
                                  htmlFor="logo"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  logo design
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="poster"
                                  onChange={(e) =>
                                    this.handelServices(e, "poster_design")
                                  }
                                />
                                <label
                                  htmlFor="poster"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  poster
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="hodding"
                                  onChange={(e) =>
                                    this.handelServices(e, "hodding_design")
                                  }
                                />
                                <label
                                  htmlFor="hodding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  hodding design
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "influencer" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="reels"
                                  onChange={(e) =>
                                    this.handelServices(e, "reels")
                                  }
                                />
                                <label
                                  htmlFor="reels"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  reels
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="post"
                                  onChange={(e) =>
                                    this.handelServices(e, "posts")
                                  }
                                />
                                <label
                                  htmlFor="post"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  post
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="stories"
                                  onChange={(e) =>
                                    this.handelServices(e, "stories")
                                  }
                                />
                                <label
                                  htmlFor="stories"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  stories
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="youtube_videoes"
                                  onChange={(e) =>
                                    this.handelServices(e, "youtube_videoes")
                                  }
                                />
                                <label
                                  htmlFor="youtube_videoes"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  youtube videoes
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "maid" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="cooking"
                                  onChange={(e) =>
                                    this.handelServices(e, "cooking")
                                  }
                                />
                                <label
                                  htmlFor="cooking"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  cooking
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="moping"
                                  onChange={(e) =>
                                    this.handelServices(e, "moping")
                                  }
                                />
                                <label
                                  htmlFor="moping"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  moping
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="cloth_washing"
                                  onChange={(e) =>
                                    this.handelServices(e, "cloth_washing")
                                  }
                                />
                                <label
                                  htmlFor="cloth_washing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  cloth washing
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="dish_washing"
                                  onChange={(e) =>
                                    this.handelServices(e, "dish_washing")
                                  }
                                />
                                <label
                                  htmlFor="dish_washing"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  dish washing
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "makeup_artist" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="bridal"
                                  onChange={(e) =>
                                    this.handelServices(e, "bridal_makeup")
                                  }
                                />
                                <label
                                  htmlFor="bridal"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  bridal
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="fashion_shoot"
                                  onChange={(e) =>
                                    this.handelServices(e, "fashion_shoot")
                                  }
                                />
                                <label
                                  htmlFor="fashion_shoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  fashion shoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="fashion_show"
                                  onChange={(e) =>
                                    this.handelServices(e, "fashion_show")
                                  }
                                />
                                <label
                                  htmlFor="fashion_show"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  fashion show
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="party_makeup"
                                  onChange={(e) =>
                                    this.handelServices(e, "party_makeup")
                                  }
                                />
                                <label
                                  htmlFor="party_makeup"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  party makeup
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "model" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="fashion_show"
                                  onChange={(e) =>
                                    this.handelServices(e, "fashion_show")
                                  }
                                />
                                <label
                                  htmlFor="fashion_show"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  fashion show
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="bridal"
                                  onChange={(e) =>
                                    this.handelServices(e, "bridal_shoot")
                                  }
                                />
                                <label
                                  htmlFor="bridal"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  bridal
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="ramp_show"
                                  onChange={(e) =>
                                    this.handelServices(e, "ramp_show")
                                  }
                                />
                                <label
                                  htmlFor="ramp_show"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  ramp show
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="music_video"
                                  onChange={(e) =>
                                    this.handelServices(e, "music_video")
                                  }
                                />
                                <label
                                  htmlFor="music_video"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  music video
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="tvc_ad"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "television_commercial_ads"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="tvc_ad"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Television Commercial Ads
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="short_film"
                                  onChange={(e) =>
                                    this.handelServices(e, "short_film")
                                  }
                                />
                                <label
                                  htmlFor="short_film"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  short film
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="hodding_shoot"
                                  onChange={(e) =>
                                    this.handelServices(e, "hodding_shoot")
                                  }
                                />
                                <label
                                  htmlFor="hodding_shoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  hodding shoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="bikini_shoot"
                                  onChange={(e) =>
                                    this.handelServices(e, "bikini_shoot")
                                  }
                                />
                                <label
                                  htmlFor="bikini_shoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  bikini shoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="monokini_shoot"
                                  onChange={(e) =>
                                    this.handelServices(e, "monokini_shoot")
                                  }
                                />
                                <label
                                  htmlFor="monokini_shoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  monokini shoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="semi_nude_shoot"
                                  onChange={(e) =>
                                    this.handelServices(e, "semi_nude_shoot")
                                  }
                                />
                                <label
                                  htmlFor="semi_nude_shoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  semi nude shoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="bold_shoot"
                                  onChange={(e) =>
                                    this.handelServices(e, "bold_shoot")
                                  }
                                />
                                <label
                                  htmlFor="bold_shoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  bold shoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="nude_shoot"
                                  onChange={(e) =>
                                    this.handelServices(e, "nude_shoot")
                                  }
                                />
                                <label
                                  htmlFor="nude_shoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  nude shoot
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "musician" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="pianist"
                                  onChange={(e) =>
                                    this.handelServices(e, "pianist")
                                  }
                                />
                                <label
                                  htmlFor="pianist"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Pianist
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="guitarist"
                                  onChange={(e) =>
                                    this.handelServices(e, "guitarist")
                                  }
                                />
                                <label
                                  htmlFor="guitarist"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  guitarist
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="violinist"
                                  onChange={(e) =>
                                    this.handelServices(e, "violinist")
                                  }
                                />
                                <label
                                  htmlFor="violinist"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  violinist
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="Cellist"
                                  onChange={(e) =>
                                    this.handelServices(e, "cellist")
                                  }
                                />
                                <label
                                  htmlFor="Cellist"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Cellist
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="flutist"
                                  onChange={(e) =>
                                    this.handelServices(e, "flutist")
                                  }
                                />
                                <label
                                  htmlFor="flutist"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Flutist
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="trumpeter"
                                  onChange={(e) =>
                                    this.handelServices(e, "trumpeter")
                                  }
                                />
                                <label
                                  htmlFor="trumpeter"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Trumpeter
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="saxophonist"
                                  onChange={(e) =>
                                    this.handelServices(e, "saxophonist")
                                  }
                                />
                                <label
                                  htmlFor="saxophonist"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Saxophonist
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="drummer"
                                  onChange={(e) =>
                                    this.handelServices(e, "drummer")
                                  }
                                />
                                <label
                                  htmlFor="drummer"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Drummer
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="bassist"
                                  onChange={(e) =>
                                    this.handelServices(e, "bassist")
                                  }
                                />
                                <label
                                  htmlFor="bassist"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Bassist
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="harpist"
                                  onChange={(e) =>
                                    this.handelServices(e, "harpist")
                                  }
                                />
                                <label
                                  htmlFor="harpist"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Harpist
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="percussionist"
                                  onChange={(e) =>
                                    this.handelServices(e, "percussionist")
                                  }
                                />
                                <label
                                  htmlFor="percussionist"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Percussionist
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "music_teacher" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="classical_music"
                                  onChange={(e) =>
                                    this.handelServices(e, "classical_music")
                                  }
                                />
                                <label
                                  htmlFor="classical_music"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  classical music
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="rock"
                                  onChange={(e) =>
                                    this.handelServices(e, "rock_music")
                                  }
                                />
                                <label
                                  htmlFor="rock"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Rock
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="pop"
                                  onChange={(e) =>
                                    this.handelServices(e, "pop_music")
                                  }
                                />
                                <label
                                  htmlFor="pop"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Pop
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="blues"
                                  onChange={(e) =>
                                    this.handelServices(e, "blues")
                                  }
                                />
                                <label
                                  htmlFor="blues"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Blues
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="country"
                                  onChange={(e) =>
                                    this.handelServices(e, "country_music")
                                  }
                                />
                                <label
                                  htmlFor="country"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Country
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="folk"
                                  onChange={(e) =>
                                    this.handelServices(e, "folk_music")
                                  }
                                />
                                <label
                                  htmlFor="folk"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Folk
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="world_music"
                                  onChange={(e) =>
                                    this.handelServices(e, "world_music")
                                  }
                                />
                                <label
                                  htmlFor="world_music"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  World Music
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="digital_music"
                                  onChange={(e) =>
                                    this.handelServices(e, "digital_music")
                                  }
                                />
                                <label
                                  htmlFor="digital_music"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Digital Music
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="hip-hop"
                                  onChange={(e) =>
                                    this.handelServices(e, "hip_hop")
                                  }
                                />
                                <label
                                  htmlFor="hip-hop"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Hip-Hop
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="rhythm_and_blues"
                                  onChange={(e) =>
                                    this.handelServices(e, "rhythm_and_blues")
                                  }
                                />
                                <label
                                  htmlFor="rhythm_and_blues"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Rhythm and Blues
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="gospel"
                                  onChange={(e) =>
                                    this.handelServices(e, "gospel")
                                  }
                                />
                                <label
                                  htmlFor="gospel"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Gospel
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="reggae"
                                  onChange={(e) =>
                                    this.handelServices(e, "reggae")
                                  }
                                />
                                <label
                                  htmlFor="reggae"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Reggae
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="metal"
                                  onChange={(e) =>
                                    this.handelServices(e, "metal")
                                  }
                                />
                                <label
                                  htmlFor="metal"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Metal
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="indie"
                                  onChange={(e) =>
                                    this.handelServices(e, "indie")
                                  }
                                />
                                <label
                                  htmlFor="indie"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Indie
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "painter" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="portrait"
                                  onChange={(e) =>
                                    this.handelServices(e, "portrait")
                                  }
                                />
                                <label
                                  htmlFor="portrait"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  portrait
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="wall_painting"
                                  onChange={(e) =>
                                    this.handelServices(e, "wall_painting")
                                  }
                                />
                                <label
                                  htmlFor="wall_painting"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  wall painting
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="family_portrait"
                                  onChange={(e) =>
                                    this.handelServices(e, "family_portrait")
                                  }
                                />
                                <label
                                  htmlFor="family_portrait"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  family portrait
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "photographer" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="weeding"
                                  onChange={(e) =>
                                    this.handelServices(e, "weeding_ceremony")
                                  }
                                />
                                <label
                                  htmlFor="weeding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  weeding ceremony
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="pre-weeding"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "pre_weeding_ceremony"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="pre-weeding"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  pre weeding ceremony
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="corporate"
                                  onChange={(e) =>
                                    this.handelServices(e, "corporate_events")
                                  }
                                />
                                <label
                                  htmlFor="corporate"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  corporate events
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="personal_parties"
                                  onChange={(e) =>
                                    this.handelServices(e, "personal_parties")
                                  }
                                />
                                <label
                                  htmlFor="personal_parties"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  personal parties
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="portfolio"
                                  onChange={(e) =>
                                    this.handelServices(e, "portfolio_shoot")
                                  }
                                />
                                <label
                                  htmlFor="portfolio"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  portfolio
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="new_born_baby_shoot"
                                  onChange={(e) =>
                                    this.handelServices(
                                      e,
                                      "new_born_baby_shoot"
                                    )
                                  }
                                />
                                <label
                                  htmlFor="new_born_baby_shoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  new born baby shoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="baby_shoot"
                                  onChange={(e) =>
                                    this.handelServices(e, "baby_shoot")
                                  }
                                />
                                <label
                                  htmlFor="baby_shoot"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  baby shoot
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="mundan"
                                  onChange={(e) =>
                                    this.handelServices(e, "mundan")
                                  }
                                />
                                <label
                                  htmlFor="mundan"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  mundan
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="upanayan"
                                  onChange={(e) =>
                                    this.handelServices(e, "upanayan")
                                  }
                                />
                                <label
                                  htmlFor="upanayan"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  upanayan
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="rice_ceremony"
                                  onChange={(e) =>
                                    this.handelServices(e, "rice_ceremony")
                                  }
                                />
                                <label
                                  htmlFor="rice_ceremony"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  rice ceremony
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="birthday_party"
                                  onChange={(e) =>
                                    this.handelServices(e, "birthday_party")
                                  }
                                />
                                <label
                                  htmlFor="birthday_party"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  birthday party
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "private_tutor" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="arts"
                                  onChange={(e) =>
                                    this.handelServices(e, "arts")
                                  }
                                />
                                <label
                                  htmlFor="arts"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Arts
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="commerce"
                                  onChange={(e) =>
                                    this.handelServices(e, "commerce")
                                  }
                                />
                                <label
                                  htmlFor="commerce"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Commerce
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="science"
                                  onChange={(e) =>
                                    this.handelServices(e, "science")
                                  }
                                />
                                <label
                                  htmlFor="science"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Science
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "vocalist" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="soprano"
                                  onChange={(e) =>
                                    this.handelServices(e, "soprano")
                                  }
                                />
                                <label
                                  htmlFor="soprano"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Soprano
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="alto"
                                  onChange={(e) =>
                                    this.handelServices(e, "alto")
                                  }
                                />
                                <label
                                  htmlFor="alto"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Alto
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="tenor"
                                  onChange={(e) =>
                                    this.handelServices(e, "tenor")
                                  }
                                />
                                <label
                                  htmlFor="tenor"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Tenor
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="bass"
                                  onChange={(e) =>
                                    this.handelServices(e, "bass")
                                  }
                                />
                                <label
                                  htmlFor="bass"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Bass
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="baritone"
                                  onChange={(e) =>
                                    this.handelServices(e, "baritone")
                                  }
                                />
                                <label
                                  htmlFor="baritone"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Baritone
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="mezzo-soprano"
                                  onChange={(e) =>
                                    this.handelServices(e, "mezzo-soprano")
                                  }
                                />
                                <label
                                  htmlFor="mezzo-soprano"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Mezzo-soprano
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="countertenor"
                                  onChange={(e) =>
                                    this.handelServices(e, "countertenor")
                                  }
                                />
                                <label
                                  htmlFor="countertenor"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Countertenor
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "voice_over_artist" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="short_film"
                                  onChange={(e) =>
                                    this.handelServices(e, "short_film")
                                  }
                                />
                                <label
                                  htmlFor="short_film"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Short film
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="audio_podcast"
                                  onChange={(e) =>
                                    this.handelServices(e, "audio_podcast")
                                  }
                                />
                                <label
                                  htmlFor="audio_podcast"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Audio podcast
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="film"
                                  onChange={(e) =>
                                    this.handelServices(e, "film")
                                  }
                                />
                                <label
                                  htmlFor="film"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  film
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="animation_film"
                                  onChange={(e) =>
                                    this.handelServices(e, "animation_film")
                                  }
                                />
                                <label
                                  htmlFor="animation_film"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  animation film
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="advertising"
                                  onChange={(e) =>
                                    this.handelServices(e, "advertisement")
                                  }
                                />
                                <label
                                  htmlFor="advertising"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  advertising
                                </label>
                              </div>
                            </div>
                          )}
                          {this.state.profession === "web_developer" && (
                            <div className="flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="wordpress"
                                  onChange={(e) =>
                                    this.handelServices(e, "wordpress")
                                  }
                                />
                                <label
                                  htmlFor="wordpress"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  wordpress
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="wix"
                                  onChange={(e) =>
                                    this.handelServices(e, "wix")
                                  }
                                />
                                <label
                                  htmlFor="wix"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Wix
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="squarespace"
                                  onChange={(e) =>
                                    this.handelServices(e, "squarespace")
                                  }
                                />
                                <label
                                  htmlFor="squarespace"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Squarespace
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="weebly"
                                  onChange={(e) =>
                                    this.handelServices(e, "weebly")
                                  }
                                />
                                <label
                                  htmlFor="weebly"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Weebly
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="shopify"
                                  onChange={(e) =>
                                    this.handelServices(e, "shopify")
                                  }
                                />
                                <label
                                  htmlFor="shopify"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Shopify
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="webflow"
                                  onChange={(e) =>
                                    this.handelServices(e, "webflow")
                                  }
                                />
                                <label
                                  htmlFor="webflow"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Webflow
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="elementor"
                                  onChange={(e) =>
                                    this.handelServices(e, "elementor")
                                  }
                                />
                                <label
                                  htmlFor="elementor"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Elementor
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="jimdo"
                                  onChange={(e) =>
                                    this.handelServices(e, "jimdo")
                                  }
                                />
                                <label
                                  htmlFor="jimdo"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  Jimdo
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="mean"
                                  onChange={(e) =>
                                    this.handelServices(e, "mean")
                                  }
                                />
                                <label
                                  htmlFor="mean"
                                  className="text-lg cursor-pointer"
                                >
                                  MEAN
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="mern"
                                  onChange={(e) =>
                                    this.handelServices(e, "mern")
                                  }
                                />
                                <label
                                  htmlFor="mern"
                                  className="text-lg cursor-pointer"
                                >
                                  MERN
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="mevn"
                                  onChange={(e) =>
                                    this.handelServices(e, "mevn")
                                  }
                                />
                                <label
                                  htmlFor="mevn"
                                  className="text-lg cursor-pointer"
                                >
                                  MEVN
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="w-6 h-6"
                                  name=""
                                  id="static"
                                  onChange={(e) =>
                                    this.handelServices(e, "static")
                                  }
                                />
                                <label
                                  htmlFor="static"
                                  className="text-lg capitalize cursor-pointer"
                                >
                                  static
                                </label>
                              </div>
                            </div>
                          )}
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
                          fees per{" "}
                          {(this.state.profession === "actor" ||
                            this.state.profession === "actress" ||
                            this.state.profession === "model") &&
                            "Shoot"}
                          {this.state.profession === "influencer" && "Post"}
                          {this.state.profession === "fashion_designer" &&
                            "Dress"}
                          {(this.state.profession === "babysitter" ||
                            this.state.profession === "maid" ||
                            this.state.profession === "dance_teacher" ||
                            this.state.profession === "drawing_teacher" ||
                            this.state.profession === "music_teacher" ||
                            this.state.profession == "private_tutor") &&
                            "Month"}
                          {(this.state.profession === "dj" ||
                            this.state.profession == "musician" ||
                            this.state.profession === "drone_operator") &&
                            "Hour"}
                          {(this.state.profession === "album_designer" ||
                            this.state.profession === "dancer" ||
                            this.state.profession === "graphics_designer" ||
                            this.state.profession === "interior_designer" ||
                            this.state.profession === "mehendi_artist" ||
                            this.state.profession === "painter" ||
                            this.state.profession === "photo_editor" ||
                            this.state.profession === "video_editor" ||
                            this.state.profession === "voice_over_artist" ||
                            this.state.profession === "anchor" ||
                            this.state.profession === "lyricist" ||
                            this.state.profession === "makeup_artist" ||
                            this.state.profession === "vocalist" ||
                            this.state.profession === "web_developer") &&
                            "Project"}
                          {(this.state.profession === "cinematographer" ||
                            this.state.profession === "photographer") &&
                            "Day"}{" "}
                          ?
                        </label>
                        {this.state.rate && (
                          <p className={styles.rate}>
                            Rs. {this.state.rate} /{" "}
                            {(this.state.profession === "actor" ||
                              this.state.profession === "actress" ||
                              this.state.profession === "model") &&
                              "Project"}
                            {this.state.profession === "influencer" && "Post"}
                            {this.state.profession === "fashion_designer" &&
                              "Dress"}
                            {(this.state.profession === "babysitter" ||
                              this.state.profession === "maid" ||
                              this.state.profession === "dance_teacher" ||
                              this.state.profession === "drawing_teacher" ||
                              this.state.profession === "music_teacher" ||
                              this.state.profession == "private_tutor") &&
                              "Month"}
                            {(this.state.profession === "dj" ||
                              this.state.profession == "musician" ||
                              this.state.profession === "cinematographer" ||
                              this.state.profession === "photographer" ||
                              this.state.profession === "drone_operator") &&
                              "Hour"}
                            {(this.state.profession === "album_designer" ||
                              this.state.profession === "dancer" ||
                              this.state.profession === "graphics_designer" ||
                              this.state.profession === "interior_designer" ||
                              this.state.profession === "mehendi_artist" ||
                              this.state.profession === "painter" ||
                              this.state.profession === "photo_editor" ||
                              this.state.profession === "video_editor" ||
                              this.state.profession === "voice_over_artist" ||
                              this.state.profession === "anchor" ||
                              this.state.profession === "lyricist" ||
                              this.state.profession === "makeup_artist" ||
                              this.state.profession === "vocalist" ||
                              this.state.profession === "web_developer") &&
                              "Project"}
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
                        Resend OTP in {this.state.count}s
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
              <Footer premium={this.props.user?.premium} />
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
          props.get(data.given_name, 1);
          props.get(data.family_name, 2);
          props.get(data.email, 3);
        });
    },
    onError: (error) => console.log(error),
  });

  const responseFacebook = async (response) => {
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
