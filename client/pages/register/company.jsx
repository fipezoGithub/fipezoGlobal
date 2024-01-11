import Navbar from "@/components/Navbar";
import React from "react";
import styles from "../../styles/Freelancer.module.css";
import Image from "next/image";
import Footer from "@/components/Footer";
import CompanyVerification from "@/components/CompanyVerification";
import { IoReloadOutline } from "react-icons/io5";
import Router, { withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Loading from "@/components/Loading";
import ReactWhatsapp from "react-whatsapp";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default withRouter(
  class Company extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        progress: 0,
        currentPage: 1,
        btn: "Next",
        companyname: "",
        companyphone: "",
        companyemail: "",
        password: "",
        otp: "",
        companytype: "photography",
        companyaddress: {
          address: "",
          city: "Agra",
          state: "Andhra Pradesh",
          pincode: "",
          landmark: "",
        },
        position: "",
        bio: "",
        profilePicture: null,
        coverPicture: null,
        panCard: null,
        incorporationCertificate: null,
        msmeCertificate: null,
        tradeLiecence: null,
        links: { instagram: "", facebook: "", twitter: "", youtube: "" },
        works: [],
        termsAndConditions: true,
        passowordInputType: "password",
        passwordError: false,
        pincodeError: false,
        error: false,
        exist: false,
        form: false,
        phoneError: false,
        panError: false,
        exist: false,
        incorporationCertificateError: false,
        msmeCertificateError: false,
        tradeLiecenceError: false,
        profilePicError: false,
        coverPicError: false,
        worksError: false,
        textareaError: false,
        invalidOtp: false,
        registerFailed: false,
        warns: [false],
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

    increProgress = (val) => {
      if (this.state.progress + val > 125) {
        return;
      }

      if (this.state.companyname === "" && this.state.currentPage === 1) {
        this.setState({ error: true });
        return;
      }

      if (this.state.companyphone === "" && this.state.currentPage === 2) {
        this.setState({ error: true });
        return;
      }

      if (
        this.state.companyphone.length !== 10 &&
        this.state.currentPage === 2
      ) {
        this.setState({ phoneError: true });
        return;
      }

      if (this.state.currentPage === 2) {
        if (this.state.exist) {
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

      if (this.state.companytype === "" && this.state.currentPage === 4) {
        this.setState({ error: true });
        return;
      }

      if (
        (this.state.companyaddress.address === "" ||
          this.state.companyaddress.pincode === "") &&
        this.state.currentPage === 5
      ) {
        this.setState({ error: true });
        return;
      }
      if (
        (this.state.companyaddress.pincode.length > 6 ||
          this.state.companyaddress.pincode.length < 6) &&
        this.state.currentPage === 5
      ) {
        this.setState({ pincodeError: true });
        return;
      }
      if (
        (this.state.companyemail === "" || this.state.password === "") &&
        this.state.currentPage === 6
      ) {
        this.setState({ error: true });
        return;
      }
      if (
        (this.state.password === "" ||
          this.state.password.length > 15 ||
          this.state.password.length < 8) &&
        this.state.currentPage === 6
      ) {
        this.setState({ passwordError: true });
        return;
      }
      if (this.state.position === "" && this.state.currentPage === 7) {
        this.setState({ error: true });
        return;
      }

      if (
        (this.state.bio.length > 300 || this.state.bio.length < 50) &&
        this.state.currentPage === 8
      ) {
        this.setState({ textareaError: true });
        return;
      }

      if (this.state.bio === "" && this.state.currentPage === 8) {
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
      this.setState({ invalidOtp: false });
      if (this.state.currentPage === 3) {
        this.setState({ resendOtp: false });
        this.setState({ count: 120 });
      }
      this.setState({ registerFailed: false });
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

    checkEmail = async () => {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/verify/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyemail: this.state.companyemail }),
        });
        if (res.status === 404) {
          this.setState({ exist: true });
          return;
        }
        this.increProgress(11);
      } catch (error) {
        console.log(error);
      }
    };

    getVerificationDetails = (val, index) => {
      if (index === 4) this.setState({ profilePicture: val });
      if (index === 5) this.setState({ coverPicture: val });
      if (index === 6) this.setState({ panCard: val });
      if (index === 7) this.setState({ incorporationCertificate: val });
      if (index === 8) this.setState({ msmeCertificate: val });
      if (index === 9) this.setState({ tradeLiecence: val });
      if (index === 10) {
        this.setState({ links: { ...this.state.links, instagram: val } });
      }
      if (index === 11) {
        this.setState({ links: { ...this.state.links, facebook: val } });
      }
      if (index === 12) {
        this.setState({ links: { ...this.state.links, twitter: val } });
      }
      if (index === 13) {
        this.setState({ links: { ...this.state.links, youtube: val } });
      }
      if (index === 14) {
        this.setState({ termsAndConditions: val });
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
        this.setState((prevState) => ({
          works: [...prevState.works, val],
        }));
      }
    };

    handleTextChange = (event, val) => {
      if (val === 1) {
        this.setState({ bio: event.target.value });
        if (this.state.bio.length > 300) this.setState({ textareaError: true });
        else this.setState({ textareaError: false });
      }
    };

    handleSubmit = (event) => {
      event.preventDefault();
      let c = 0;
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
      // if (this.state.panCard === null) {
      //   this.setState({ panError: true });
      //   this.setState({
      //     warns: [
      //       ...this.state.warns.slice(0, 2),
      //       false,
      //       ...this.state.warns.slice(3),
      //     ],
      //   });
      //   return;
      // }
      // if (this.state.incorporationCertificate === null) {
      //   this.setState({ incorporationCertificateError: true });
      //   this.setState({
      //     warns: [
      //       ...this.state.warns.slice(0, 3),
      //       false,
      //       ...this.state.warns.slice(4),
      //     ],
      //   });
      //   return;
      // }
      // if (this.state.msmeCertificate === null) {
      //   this.setState({ msmeCertificateError: true });
      //   this.setState({
      //     warns: [
      //       ...this.state.warns.slice(0, 4),
      //       false,
      //       ...this.state.warns.slice(5),
      //     ],
      //   });
      //   return;
      // }
      // if (this.state.tradeLiecence === null) {
      //   this.setState({ tradeLiecenceError: true });
      //   this.setState({
      //     warns: [
      //       ...this.state.warns.slice(0, 5),
      //       false,
      //       ...this.state.warns.slice(6),
      //     ],
      //   });
      //   return;
      // }
      if (this.state.works.length < 4) {
        this.setState({ worksError: true });
        c++;
      }
      if (c > 0) return;
      this.setState({ isLoading: true });
      const postData = async () => {
        const token = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null;
        try {
          const data = new FormData();
          data.append(
            "uid",
            this.state.companyname.toLowerCase().replace(" ", ".") +
              "_" +
              parseInt(this.state.companyphone).toString(16)
          );
          data.append("companyname", this.state.companyname);
          data.append("companyphone", this.state.companyphone);
          data.append("companyemail", this.state.companyemail);
          data.append("password", this.state.password);
          data.append("companytype", this.state.companytype);
          data.append(
            "companyaddress",
            JSON.stringify(this.state.companyaddress)
          );
          data.append("position", this.state.position);
          data.append("bio", this.state.bio);
          data.append("profilePicture", this.state.profilePicture);
          data.append("coverPicture", this.state.coverPicture);
          data.append("panCard", this.state.panCard);
          data.append(
            "incorporationCertificate",
            this.state.incorporationCertificate
          );
          data.append("msmeCertificate", this.state.msmeCertificate);
          data.append("tradeLiecence", this.state.tradeLiecence);
          data.append("links", JSON.stringify(this.state.links));
          this.state.works.forEach((element) => {
            data.append("works[]", element);
          });
          data.append("termsAndConditions", this.state.termsAndConditions);
          data.append("verified", false);
          const response = await fetch(
            `${process.env.SERVER_URL}/register/company`,
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
            `${process.env.SERVER_URL}/verify/company/phone`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                otp: this.state.otp,
                phone: this.state.companyphone,
                type: "company",
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
          const res = await fetch(`${process.env.SERVER_URL}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: this.state.companyphone,
              type: "company",
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

    setPicError = (val, i) => {
      if (i === 1) this.setState({ profilePicError: val });
      if (i === 2) this.setState({ coverPicError: val });
      if (i === 3) this.setState({ panError: val });
      if (i === 4) this.setState({ incorporationError: val });
    };

    setWarns = (val, i) => {
      if (i === -1) {
        const temp = Array(1).fill(val);
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
            <title>Fipezo | Register as a Company</title>
            <meta
              name="description"
              content="Join our community and unlock a world of possibilities by creating your account! as Company Our registration page is your gateway to access a wide range of features and services tailored just for you."
            />
          </Head>
          {this.state.isLoading && (
            <Loading message={"Sending Your Profile Details..."} />
          )}
          {!this.state.isLoading && (
            <div className={styles.main}>
              <Navbar
                user={this.props.user}
                company={this.props.company}
                setCompany={this.props.setCompany}
                setUser={this.props.setUser}
              />
              <div
                className={`${this.state.form ? styles.newbody : styles.body}`}
              >
                <div
                  className={`${
                    this.state.form ? styles.newLeft : styles.left
                  }`}
                >
                  {!this.state.form && (
                    <h1 className={styles.heading}>
                      Fill Up The Registration Form.
                    </h1>
                  )}
                  {!this.state.form && (
                    <p className={styles.subHeading}>
                      We only allow verified Companies on our website.
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
                    {this.state.currentPage === 1 && (
                      <div className={styles.inputField} id={styles.firstname}>
                        <label htmlFor="companyname" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Company Name
                          :
                        </label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Enter Your Company name"
                          onKeyDown={this.handleEnterKeyPress}
                          name="companyname"
                          id="companyname"
                          required
                          onChange={(event) =>
                            this.setState({ companyname: event.target.value })
                          }
                          value={
                            this.state.companyname !== ""
                              ? this.state.companyname
                              : ""
                          }
                          maxLength={30}
                        />
                      </div>
                    )}
                    {this.state.currentPage === 2 && (
                      <div className={styles.inputField} id={styles.phone}>
                        <label htmlFor="companyphone" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Company
                          Phone :
                        </label>
                        <input
                          type="tel"
                          id={styles.number}
                          className={styles.input}
                          placeholder="Enter Company Phone no."
                          onKeyDown={this.handleEnterKeyPress}
                          name="companyphone"
                          maxLength={10}
                          required
                          onChange={(event) =>
                            this.setState({
                              companyphone: event.target.value,
                              exist: false,
                            })
                          }
                          value={
                            this.state.companyphone !== "photographer"
                              ? this.state.companyphone
                              : "photographer"
                          }
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
                      <div className={styles.inputField} id={styles.profession}>
                        <label htmlFor="companytype" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>What is your
                          company type?
                        </label>
                        <select
                          required
                          className={styles.options}
                          name="companytype"
                          onChange={(event) =>
                            this.setState({ companytype: event.target.value })
                          }
                          onKeyDown={this.handleEnterKeyPress}
                          id="companytype"
                          value={
                            this.state.companytype !== ""
                              ? this.state.companytype
                              : ""
                          }
                        >
                          <option className={styles.option} value="photography">
                            Photography Company
                          </option>
                          <option className={styles.option} value="eCommerce">
                            eCommerce Company
                          </option>
                          <option
                            className={styles.option}
                            value="production_house"
                          >
                            Production House
                          </option>
                          <option
                            className={styles.option}
                            value="photography_institute"
                          >
                            Photography Institute
                          </option>
                          <option
                            className={styles.option}
                            value="advertising_agency"
                          >
                            Advertising agency
                          </option>
                          <option className={styles.option} value="other">
                            Other
                          </option>
                        </select>
                      </div>
                    )}
                    {this.state.currentPage === 5 && (
                      <div className={styles.inputField} id={styles.address}>
                        <label
                          htmlFor="companyaddress"
                          className={styles.label}
                        >
                          <span style={{ color: "white" }}>* </span>Company
                          Address :
                        </label>
                        <div
                          id="companyaddress"
                          className="flex flex-col gap-4"
                        >
                          <input
                            type="text"
                            placeholder="Enter street number and area"
                            className={styles.input}
                            onKeyDown={this.handleEnterKeyPress}
                            onChange={(event) =>
                              this.setState({
                                companyaddress: {
                                  ...this.state.companyaddress,
                                  address: event.target.value,
                                },
                              })
                            }
                            value={this.state.companyaddress.address}
                          />
                          <div className="flex items-center justify-between">
                            <div className={styles.inputField}>
                              <label
                                htmlFor="location"
                                className={styles.label}
                              >
                                <span style={{ color: "white" }}>* </span>City
                              </label>
                              <select
                                required
                                className={styles.options}
                                name="location"
                                onChange={(event) =>
                                  this.setState({
                                    companyaddress: {
                                      ...this.state.companyaddress,
                                      city: event.target.value,
                                    },
                                  })
                                }
                                id="location"
                                value={this.state.companyaddress.city}
                                onKeyDown={this.handleEnterKeyPress}
                              >
                                <option className={styles.option} value="Agra">
                                  Agra
                                </option>
                                <option
                                  className={styles.option}
                                  value="Ahmedabad"
                                >
                                  Ahmedabad
                                </option>
                                <option
                                  className={styles.option}
                                  value="Amritsar"
                                >
                                  Amritsar
                                </option>
                                <option
                                  className={styles.option}
                                  value="Aurangabad"
                                >
                                  Aurangabad
                                </option>
                                <option
                                  className={styles.option}
                                  value="Bengaluru"
                                >
                                  Bengaluru
                                </option>
                                <option
                                  className={styles.option}
                                  value="Bhopal"
                                >
                                  Bhopal
                                </option>
                                <option
                                  className={styles.option}
                                  value="Bhubaneswar"
                                >
                                  Bhubaneswar
                                </option>
                                <option
                                  className={styles.option}
                                  value="Chandigarh"
                                >
                                  Chandigarh
                                </option>
                                <option
                                  className={styles.option}
                                  value="Chennai"
                                >
                                  Chennai
                                </option>
                                <option
                                  className={styles.option}
                                  value="Coimbatore"
                                >
                                  Coimbatore
                                </option>
                                <option
                                  className={styles.option}
                                  value="Dehradun"
                                >
                                  Dehradun
                                </option>
                                <option className={styles.option} value="Delhi">
                                  Delhi
                                </option>
                                <option
                                  className={styles.option}
                                  value="Dhanbad"
                                >
                                  Dhanbad
                                </option>
                                <option
                                  className={styles.option}
                                  value="Faridabad"
                                >
                                  Faridabad
                                </option>
                                <option
                                  className={styles.option}
                                  value="Ghaziabad"
                                >
                                  Ghaziabad
                                </option>
                                <option
                                  className={styles.option}
                                  value="Guwahati"
                                >
                                  Guwahati
                                </option>
                                <option
                                  className={styles.option}
                                  value="Gwalior"
                                >
                                  Gwalior
                                </option>
                                <option
                                  className={styles.option}
                                  value="Hyderabad"
                                >
                                  Hyderabad
                                </option>
                                <option
                                  className={styles.option}
                                  value="Indore"
                                >
                                  Indore
                                </option>
                                <option
                                  className={styles.option}
                                  value="Jaipur"
                                >
                                  Jaipur
                                </option>
                                <option
                                  className={styles.option}
                                  value="Jamshedpur"
                                >
                                  Jamshedpur
                                </option>
                                <option
                                  className={styles.option}
                                  value="Jodhpur"
                                >
                                  Jodhpur
                                </option>
                                <option
                                  className={styles.option}
                                  value="Kanpur"
                                >
                                  Kanpur
                                </option>
                                <option className={styles.option} value="Kochi">
                                  Kochi
                                </option>
                                <option
                                  className={styles.option}
                                  value="Kolkata"
                                >
                                  Kolkata
                                </option>
                                <option
                                  className={styles.option}
                                  value="Lucknow"
                                >
                                  Lucknow
                                </option>
                                <option
                                  className={styles.option}
                                  value="Ludhiana"
                                >
                                  Ludhiana
                                </option>
                                <option
                                  className={styles.option}
                                  value="Madurai"
                                >
                                  Madurai
                                </option>
                                <option
                                  className={styles.option}
                                  value="Mangaluru"
                                >
                                  Mangaluru
                                </option>
                                <option
                                  className={styles.option}
                                  value="Meerut"
                                >
                                  Meerut
                                </option>
                                <option
                                  className={styles.option}
                                  value="Mumbai"
                                >
                                  Mumbai
                                </option>
                                <option
                                  className={styles.option}
                                  value="Mysuru"
                                >
                                  Mysuru
                                </option>
                                <option
                                  className={styles.option}
                                  value="Nagpur"
                                >
                                  Nagpur
                                </option>
                                <option
                                  className={styles.option}
                                  value="Nashik"
                                >
                                  Nashik
                                </option>
                                <option
                                  className={styles.option}
                                  value="New Delhi"
                                >
                                  New_Delhi
                                </option>
                                <option
                                  className={styles.option}
                                  value="Navi_Mumbai"
                                >
                                  Navi Mumbai
                                </option>
                                <option className={styles.option} value="Patna">
                                  Patna
                                </option>
                                <option
                                  className={styles.option}
                                  value="Prayagraj"
                                >
                                  Prayagraj
                                </option>
                                <option
                                  className={styles.option}
                                  value="Puducherry"
                                >
                                  Puducherry
                                </option>
                                <option className={styles.option} value="Pune">
                                  Pune
                                </option>
                                <option
                                  className={styles.option}
                                  value="Raipur"
                                >
                                  Raipur
                                </option>
                                <option
                                  className={styles.option}
                                  value="Rajkot"
                                >
                                  Rajkot
                                </option>
                                <option
                                  className={styles.option}
                                  value="Ranchi"
                                >
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
                                <option
                                  className={styles.option}
                                  value="Udaipur"
                                >
                                  Udaipur
                                </option>
                                <option
                                  className={styles.option}
                                  value="Vadodara"
                                >
                                  Vadodara
                                </option>
                                <option
                                  className={styles.option}
                                  value="Varanasi"
                                >
                                  Varanasi
                                </option>
                                <option
                                  className={styles.option}
                                  value="Vijayawada"
                                >
                                  Vijayawada
                                </option>
                                <option
                                  className={styles.option}
                                  value="Visakhapatnam"
                                >
                                  Visakhapatnam
                                </option>
                                <option
                                  className={styles.option}
                                  value="Warangal"
                                >
                                  Warangal
                                </option>
                              </select>
                            </div>
                            <div className={styles.inputField}>
                              <label
                                htmlFor="location"
                                className={styles.label}
                              >
                                <span style={{ color: "white" }}>* </span>State
                              </label>
                              <select
                                required
                                className={styles.options}
                                name="location"
                                onChange={(event) =>
                                  this.setState({
                                    companyaddress: {
                                      ...this.state.companyaddress,
                                      state: event.target.value,
                                    },
                                  })
                                }
                                id="location"
                                value={this.state.companyaddress.state}
                                onKeyDown={this.handleEnterKeyPress}
                              >
                                <option
                                  className={styles.option}
                                  value="Andhra Pradesh"
                                >
                                  Andhra Pradesh
                                </option>
                                <option
                                  className={styles.option}
                                  value="Andaman and Nicobar Island"
                                >
                                  Andaman and Nicobar Island
                                </option>
                                <option
                                  className={styles.option}
                                  value="Arunachal Pradesh"
                                >
                                  Arunachal Pradesh
                                </option>
                                <option className={styles.option} value="Assam">
                                  Assam
                                </option>
                                <option className={styles.option} value="Bihar">
                                  Bihar
                                </option>
                                <option
                                  className={styles.option}
                                  value="Chandigarh"
                                >
                                  Chandigarh
                                </option>
                                <option
                                  className={styles.option}
                                  value="Chhattisgarh"
                                >
                                  Chhattisgarh
                                </option>
                                <option
                                  className={styles.option}
                                  value="Dadra and Nagar Haveli and Daman and Diu"
                                >
                                  Dadra and Nagar Haveli and Daman and Diu
                                </option>
                                <option className={styles.option} value="Delhi">
                                  Delhi
                                </option>
                                <option className={styles.option} value="Goa">
                                  Goa
                                </option>
                                <option
                                  className={styles.option}
                                  value="Gujarat"
                                >
                                  Gujarat
                                </option>
                                <option
                                  className={styles.option}
                                  value="Haryana"
                                >
                                  Haryana
                                </option>
                                <option
                                  className={styles.option}
                                  value="Himachal Pradesh"
                                >
                                  Himachal Pradesh
                                </option>
                                <option
                                  className={styles.option}
                                  value="Jammu and Kashmir"
                                >
                                  Jammu and Kashmir
                                </option>
                                <option
                                  className={styles.option}
                                  value="Jharkhand"
                                >
                                  Jharkhand
                                </option>
                                <option
                                  className={styles.option}
                                  value="Karnataka"
                                >
                                  Karnataka
                                </option>
                                <option
                                  className={styles.option}
                                  value="Kerala"
                                >
                                  Kerala
                                </option>
                                <option
                                  className={styles.option}
                                  value="Ladakh"
                                >
                                  Ladakh
                                </option>
                                <option
                                  className={styles.option}
                                  value="Lakshadweep"
                                >
                                  Lakshadweep
                                </option>
                                <option
                                  className={styles.option}
                                  value="Madhya Pradesh"
                                >
                                  Madhya Pradesh
                                </option>
                                <option
                                  className={styles.option}
                                  value="Maharashtra"
                                >
                                  Maharashtra
                                </option>
                                <option
                                  className={styles.option}
                                  value="Manipur"
                                >
                                  Manipur
                                </option>
                                <option
                                  className={styles.option}
                                  value="Meghalaya"
                                >
                                  Meghalaya
                                </option>
                                <option
                                  className={styles.option}
                                  value="Mizoram"
                                >
                                  Mizoram
                                </option>
                                <option
                                  className={styles.option}
                                  value="Nagaland"
                                >
                                  Nagaland
                                </option>
                                <option
                                  className={styles.option}
                                  value="Odisha"
                                >
                                  Odisha
                                </option>
                                <option
                                  className={styles.option}
                                  value="Puducherry"
                                >
                                  Puducherry
                                </option>
                                <option
                                  className={styles.option}
                                  value="Punjab"
                                >
                                  Punjab
                                </option>
                                <option
                                  className={styles.option}
                                  value="Rajasthan"
                                >
                                  Rajasthan
                                </option>
                                <option
                                  className={styles.option}
                                  value="Sikkim"
                                >
                                  Sikkim
                                </option>
                                <option
                                  className={styles.option}
                                  value="Tamil Nadu"
                                >
                                  Tamil Nadu
                                </option>
                                <option
                                  className={styles.option}
                                  value="Telangana"
                                >
                                  Telangana
                                </option>
                                <option
                                  className={styles.option}
                                  value="Tripura"
                                >
                                  Tripura
                                </option>
                                <option
                                  className={styles.option}
                                  value="Uttar Pradesh"
                                >
                                  Uttar Pradesh
                                </option>
                                <option
                                  className={styles.option}
                                  value="Uttarakhand"
                                >
                                  Uttarakhand
                                </option>
                                <option
                                  className={styles.option}
                                  value="West Bengal"
                                >
                                  West Bengal
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <input
                                type="number"
                                placeholder="Enter pincode"
                                className={styles.input}
                                onKeyDown={this.handleEnterKeyPress}
                                onChange={(event) =>
                                  this.setState({
                                    companyaddress: {
                                      ...this.state.companyaddress,
                                      pincode: event.target.value,
                                    },
                                  })
                                }
                                value={this.state.companyaddress.pincode}
                              />
                              {this.state.pincodeError && (
                                <p className={styles.error}>
                                  Pincode must be 6 numeric characters
                                </p>
                              )}
                            </div>
                            <input
                              type="text"
                              placeholder="Enter Landmark (Optional)"
                              className={styles.input}
                              onKeyDown={this.handleEnterKeyPress}
                              onChange={(event) =>
                                this.setState({
                                  companyaddress: {
                                    ...this.state.companyaddress,
                                    landmark: event.target.value,
                                  },
                                })
                              }
                              value={this.state.companyaddress.landmark}
                            />
                          </div>
                        </div>
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
                            placeholder="Enter Company's email address"
                            name="email"
                            required
                            onKeyDown={this.handleEnterKeyPress}
                            onChange={(event) =>
                              this.setState({
                                companyemail: event.target.value,
                                error: false,
                                exist: false,
                              })
                            }
                            value={this.state.companyemail}
                          />
                        </div>
                        <div className={styles.inputField} id={styles.otp}>
                          <label htmlFor="password" className={styles.label}>
                            <span style={{ color: "white" }}>* </span>Password :
                          </label>
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
                                  this.setState({ passowordInputType: "text" });
                                } else {
                                  this.passwordRef.current.type = "password";
                                  this.setState({
                                    passowordInputType: "password",
                                  });
                                }
                              }}
                            >
                              {this.state.passowordInputType === "password" ? (
                                <AiFillEye />
                              ) : (
                                <AiFillEyeInvisible />
                              )}
                            </button>
                          </div>
                          {this.state.passwordError && (
                            <p className={styles.error}>
                              Password should not be empty and password must be
                              contains minimum 8 characters
                            </p>
                          )}
                        </div>
                      </>
                    )}
                    {this.state.currentPage === 7 && (
                      <div className={styles.inputField} id={styles.otp}>
                        <label htmlFor="position" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>Designation
                          :
                        </label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Enter Your Designation in the Company"
                          name="position"
                          required
                          onKeyDown={this.handleEnterKeyPress}
                          onChange={(event) =>
                            this.setState({
                              position: event.target.value,
                              error: false,
                            })
                          }
                          value={this.state.position}
                          maxLength={40}
                        />
                      </div>
                    )}
                    {this.state.textareaError && (
                      <p className={styles.error}>
                        Please provide less than 300 characters and atleast 50
                        characters.
                      </p>
                    )}
                    {this.state.currentPage === 8 &&
                      this.state.bio.length < 50 &&
                      !this.state.textareaError && (
                        <p>
                          No of characters left: {50 - this.state.bio.length}
                        </p>
                      )}
                    {this.state.currentPage === 8 &&
                      this.state.bio.length > 300 &&
                      !this.state.textareaError && (
                        <p>
                          No of characters excceded:{" "}
                          {this.state.bio.length - 300}
                        </p>
                      )}
                    {!this.state.form && this.state.currentPage === 8 && (
                      <div className={styles.inputField} id={styles.bio}>
                        <label htmlFor="bio" className={styles.label}>
                          <span style={{ color: "white" }}>* </span>About :
                        </label>
                        <textarea
                          required
                          name="bio"
                          id="bio"
                          cols="30"
                          rows="10"
                          onChange={(event) => {
                            this.setState({ bio: event.target.value });
                            this.setState({ textareaError: false });
                          }}
                          onKeyDown={this.handleEnterKeyPress}
                          className={styles.textarea}
                          placeholder="Write Your Company here..."
                          value={this.state.bio !== "" ? this.state.bio : ""}
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
                        {this.state.currentPage !== 2 &&
                          this.state.currentPage !== 3 &&
                          this.state.currentPage !== 6 && (
                            <button
                              className={styles.NextBtn}
                              type="button"
                              onClick={() => this.increProgress(14.25)}
                            >
                              {this.state.btn}
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
                        {this.state.currentPage === 6 && (
                          <button
                            className={styles.NextBtn}
                            type="button"
                            onClick={this.checkEmail}
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
                                styles.NextBtn + " flex items-center gap-2"
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
                      <CompanyVerification
                        getVerificationDetails={this.getVerificationDetails}
                        panError={this.state.panError}
                        setPanError={this.setPanError}
                        incorporationCertificateError={
                          this.state.incorporationCertificateError
                        }
                        msmeCertificateError={this.state.msmeCertificateError}
                        tradeLiecenceError={this.state.tradeLiecenceError}
                        setPicError={this.setPicError}
                        coverPicError={this.state.coverPicError}
                        profilePicError={this.state.profilePicError}
                        worksError={this.state.worksError}
                        warns={this.state.warns}
                        setWarns={this.setWarns}
                        user={this.props.user}
                        setUser={this.props.setUser}
                        company={this.props.company}
                        setCompany={this.props.setCompany}
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
                        Take Control of Your Project
                      </h1>
                      <p className={styles.subHeading}>
                        Join our Platform and Start your Next Project!
                      </p>
                      <hr className={styles.divider} />
                    </div>
                    <div className={styles.features}>
                      <div className={styles.freelancer}>
                        <h1 className={styles.minHeading}>For Companies</h1>
                        <div className={styles.feature}>
                          &#x2713;
                          <p>Helps You get The right Talent for your Project</p>
                        </div>
                        <div className={styles.feature}>
                          &#x2713;<p>All Verified Freelancers</p>
                        </div>
                        <div className={styles.feature}>
                          &#x2713;<p>Maintains Privacy and Fully Transparent</p>
                        </div>
                      </div>
                      <Image
                        className={styles.img}
                        src="/ComX.png"
                        alt="registration-image"
                        width={250}
                        height={250}
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
