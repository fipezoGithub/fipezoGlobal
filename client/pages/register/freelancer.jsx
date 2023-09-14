import Navbar from "@/components/Navbar";
import React from "react";
import styles from "../../styles/Freelancer.module.css";
import Image from "next/image";
import Footer from "@/components/Footer";
import Verification from "@/components/Verification";
import { IoReloadOutline } from "react-icons/io5";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import ReactWhatsapp from "react-whatsapp/dist";
import Loading from "@/components/Loading";

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
      links: { instagram: "", facebook: "", twitter: "", youtube: "" },
      termsAndConditions: true,
      error: false,
      form: false,
      phoneError: false,
      worksError: false,
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
      count: 120,
      resendOtp: false,
      timerId: null,
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count === 0 && prevState.currentPage <= 3) {
      clearInterval(this.state.timerId);
      this.setState({ resendOtp: true });
    }
  }

  startCountdown = () => {
    this.setState({ resendOtp: false });
    this.setState({
      count: 120,
      timerId: setInterval(() => {
        this.setState((prevState) => ({
          count: prevState.count - 1,
        }));
      }, 1000),
    });
  };

  increProgress = (val) => {
    if (this.state.progress + val > 125) {
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
      this.getOtp();
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

    if (this.state.location === "" && this.state.currentPage === 4) {
      this.setState({ error: true });
      return;
    }

    if (this.state.profession === "" && this.state.currentPage === 5) {
      this.setState({ error: true });
      return;
    }

    if (this.state.rate === "" && this.state.currentPage === 6) {
      this.setState({ error: true });
      return;
    }

    if (
      (this.state.bio.length > 300 || this.state.bio.length < 50) &&
      this.state.currentPage === 7
    ) {
      this.setState({ textareaError: true });
      return;
    }

    if (this.state.bio === "" && this.state.currentPage === 7) {
      this.setState({ error: true });
      return;
    }

    if (
      (this.state?.equipments?.length > 300 ||
        this.state.equipments.length < 50) &&
      this.state.currentPage === 8
    ) {
      this.setState({ textareaError: true });
      return;
    }

    if (this.state.equipments === "" && this.state.currentPage === 8) {
      this.setState({ error: true });
      return;
    }

    if (this.state.currentPage === 8) {
      this.setState({ error: false });
      this.setState({ form: true });
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
    if (this.state.currentPage === 8) {
      return;
    }

    if (this.state.currentPage === 7) {
      this.setState({ btn: "Submit" });
    }

    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  decrePage = () => {
    if (this.state.currentPage === 1) return;

    if (this.state.currentPage === 8) {
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
    if (this.state.works.length < 8) {
      this.setState({ worksError: true });
      c++;
    }
    if (this.state.profilePicture === null) {
      this.setState({ profilePicError: true });
      this.setState({ warns: [false, ...this.state.warns.slice(1)] });
      return;
    }
    if (this.state.coverPicture === null) {
      this.setState({ coverPicError: true });
      this.setState({
        warns: [
          ...this.state.warns.slice(0, 1),
          false,
          ...this.state.warns.slice(2),
        ],
      });
      return;
    }
    if (this.state.aadhaarCard === null) {
      this.setState({ addharError: true });
      this.setState({
        warns: [
          ...this.state.warns.slice(0, 2),
          false,
          ...this.state.warns.slice(3),
        ],
      });
      return;
    }
    if (this.state.panCard === null) {
      this.setState({ panError: true });
      this.setState({
        warns: [
          ...this.state.warns.slice(0, 3),
          false,
          ...this.state.warns.slice(4),
        ],
      });
      return;
    }
    if (c > 0) return;
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
        data.append("rate", this.state.rate);
        data.append("bio", this.state.bio);
        data.append("equipments", this.state.equipments);
        data.append("followers", null);
        data.append("following", null);
        data.append("profilePicture", this.state.profilePicture);
        data.append("coverPicture", this.state.coverPicture);
        data.append("aadhaarCard", this.state.aadhaarCard);
        data.append("panCard", this.state.panCard);
        data.append("works[]", this.state.works[0]);
        data.append("works[]", this.state.works[1]);
        data.append("works[]", this.state.works[2]);
        data.append("works[]", this.state.works[3]);
        data.append("works[]", this.state.works[4]);
        data.append("works[]", this.state.works[5]);
        data.append("works[]", this.state.works[6]);
        data.append("works[]", this.state.works[7]);
        data.append("links", JSON.stringify(this.state.links));
        data.append("termsAndConditions", this.state.termsAndConditions);
        data.append("verified", false);
        console.log(data);
        const response = await fetch(
          `${process.env.SERVER_URL}/register/freelancer`,
          {
            method: "POST",
            headers: {
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
        this.increProgress(14.25);
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
        await fetch(`${process.env.SERVER_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: this.state.phone,
            type: "freelancer",
          }),
        });
      } catch (error) {
        console.error(error);
      }
    };

    postData();
    this.startCountdown();
    this.setState({ invalidOtp: false });
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

  handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.increProgress(14.25);
    }
  };

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
                className={`${this.state.form ? styles.newLeft : styles.left}`}
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
                        <option className={styles.option} value="New Delhi">
                          New Delhi
                        </option>
                        <option className={styles.option} value="Navi Mumbai">
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
                        <option className={styles.option} value="Visakhapatnam">
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
                        <option
                          className={styles.option}
                          value="album_designer"
                        >
                          Album Designer
                        </option>
                        <option className={styles.option} value="anchor">
                          Anchor
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
                        <option className={styles.option} value="dj">
                          DJ
                        </option>
                        <option
                          className={styles.option}
                          value="drone_operator"
                        >
                          Drone Operator
                        </option>
                        <option className={styles.option} value="influencer">
                          Influencer
                        </option>
                        <option className={styles.option} value="makeup_artist">
                          Makeup Artist
                        </option>
                        <option className={styles.option} value="model">
                          Model
                        </option>
                        <option className={styles.option} value="photographer">
                          Photographer
                        </option>
                        <option className={styles.option} value="photo_editor">
                          Photo Editor
                        </option>
                        <option className={styles.option} value="video_editor">
                          Video Editor
                        </option>
                        <option className={styles.option} value="web_developer">
                          Web Developer
                        </option>
                      </select>
                    </div>
                  )}
                  {this.state.currentPage === 6 && (
                    <div className={styles.inputField} id={styles.rate}>
                      <label htmlFor="rate" className={styles.label}>
                        <span style={{ color: "white" }}>* </span>What is your
                        remuneration per day?
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
                  {this.state.textareaError && (
                    <p className={styles.error}>
                      Please provide less than 300 characters and atleast 50
                      characters.
                    </p>
                  )}
                  {this.state.currentPage === 7 &&
                    this.state.bio.length < 50 &&
                    !this.state.textareaError && (
                      <p>No of characters left: {50 - this.state.bio.length}</p>
                    )}
                  {this.state.currentPage === 7 &&
                    this.state.bio.length > 300 &&
                    !this.state.textareaError && (
                      <p>
                        No of characters excceded: {this.state.bio.length - 300}
                      </p>
                    )}
                  {this.state.currentPage === 7 && (
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
                  {this.state.currentPage === 8 &&
                    this.state?.equipments?.length < 50 &&
                    !this.state.textareaError && (
                      <p>
                        No of characters left:{" "}
                        {50 - this.state?.equipments?.length}
                      </p>
                    )}
                  {this.state.currentPage === 8 &&
                    this.state?.equipments?.length > 300 &&
                    !this.state.textareaError && (
                      <p>
                        No of characters excceded:{" "}
                        {this.state?.equipments?.length - 300}
                      </p>
                    )}
                  {!this.state.form &&
                    this.state.currentPage === 8 &&
                    (this.state.profession === "photographer" ||
                      this.state.profession === "cinematographer" ||
                      this.state.profession === "drone_operator" ||
                      this.state.profession === "cinematographer") && (
                      <div className={styles.inputField} id={styles.equipment}>
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
                          onChange={(event) => this.handleTextChange(event, 2)}
                          onKeyDown={this.handleEnterKeyPress}
                          className={styles.textarea}
                          placeholder="Write Your equipments here..."
                          value={this.state?.equipments}
                        ></textarea>
                      </div>
                    )}
                  {!this.state.form &&
                    this.state.currentPage === 8 &&
                    this.state.profession === "makeup_artist" && (
                      <div className={styles.inputField} id={styles.equipment}>
                        <label htmlFor="products" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Products Use
                          :
                        </label>
                        <textarea
                          required
                          name="equipments"
                          id="products"
                          cols="30"
                          rows="10"
                          onChange={(event) => this.handleTextChange(event, 2)}
                          onKeyDown={this.handleEnterKeyPress}
                          className={styles.textarea}
                          placeholder="Write Your products here..."
                          value={this.state?.equipments}
                        ></textarea>
                      </div>
                    )}
                  {!this.state.form &&
                    this.state.currentPage === 8 &&
                    (this.state.profession === "model" ||
                      this.state.profession === "anchor" ||
                      this.state.profession === "dj" ||
                      this.state.profession === "dancer" ||
                      this.state.profession === "influencer") && (
                      <div className={styles.inputField} id={styles.equipment}>
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
                          onChange={(event) => this.handleTextChange(event, 2)}
                          onKeyDown={this.handleEnterKeyPress}
                          className={styles.textarea}
                          placeholder="Write about Your working experience here..."
                          value={this.state?.equipments}
                        ></textarea>
                      </div>
                    )}
                  {!this.state.form &&
                    this.state.currentPage === 8 &&
                    (this.state.profession === "photo_editor" ||
                      this.state.profession === "video_editor" ||
                      this.state.profession === "album_designer" ||
                      this.state.profession === "video_editor" ||
                      this.state.profession === "album_designer") && (
                      <div className={styles.inputField} id={styles.equipment}>
                        <label htmlFor="fimiliarSoft" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Software
                          Knowledge :
                        </label>
                        <textarea
                          required
                          name="equipments"
                          id="equipments"
                          cols="30"
                          rows="10"
                          onChange={(event) => this.handleTextChange(event, 2)}
                          onKeyDown={this.handleEnterKeyPress}
                          className={styles.textarea}
                          placeholder="Write software name which you used..."
                          value={this.state?.equipments}
                        ></textarea>
                      </div>
                    )}
                  {!this.state.form &&
                    this.state.currentPage === 8 &&
                    this.state.profession === "web_developer" && (
                      <div className={styles.inputField} id={styles.equipment}>
                        <label htmlFor="fimiliarSoft" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Fimiliar
                          Language :
                        </label>
                        <textarea
                          required
                          name="equipments"
                          id="equipments"
                          cols="30"
                          rows="10"
                          onChange={(event) => this.handleTextChange(event, 2)}
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
                          onClick={() => this.decreProgress(14.25)}
                        >
                          Back
                        </button>
                      )}
                      {this.state.currentPage !== 3 && (
                        <button
                          className={styles.NextBtn}
                          type="button"
                          onClick={() => this.increProgress(14.25)}
                        >
                          {this.state.btn}
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
                      {this.state.resendOtp && this.state.currentPage === 3 && (
                        <button
                          className={styles.NextBtn}
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
              {!this.state.form && (
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
            <Footer />
          </div>
        )}
      </>
    );
  }
}

export default Freelancer;
