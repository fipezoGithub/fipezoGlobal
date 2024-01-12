import Navbar from "@/components/Navbar";
import styles from "../styles/Faqs.module.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Link from "next/link";
import React from "react";
import Footer from "@/components/Footer";
import Head from "next/head";

class Faqs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "general",
      currentAnswer: "",
    };
  }

  freelanceraccount = () => {
    this.setState({ currentTab: "freelanceraccount" });
  };

  companyaccount = () => {
    this.setState({ currentTab: "companyaccount" });
  };

  generalShow = () => {
    this.setState({ currentTab: "general" });
  };

  accountverification = () => {
    this.setState({ currentTab: "accountverification" });
  };

  referandearn = () => {
    this.setState({ currentTab: "referandearn" });
  };

  privacyShow = () => {
    this.setState({ currentTab: "privacy" });
  };

  legal = () => {
    this.setState({ currentTab: "legal" });
  };

  servicesShow = () => {
    this.setState({ currentTab: "services" });
  };

  showAnswer = (val) => {
    if (val === this.state.currentAnswer) {
      this.setState({ currentAnswer: "" });
      return;
    }

    this.setState({ currentAnswer: val });
  };

  setTopic = (val) => {
    switch (val) {
      case "general":
        this.generalShow();
        break;

      case "freelanceraccount":
        this.freelanceraccount();
        break;

      case "companyaccount":
        this.companyaccount();
        break;

      case "accountverification":
        this.accountverification();
        break;

      case "referandearn":
        this.referandearn();
        break;

      case "privacy":
        this.privacyShow();
        break;

      case "legal":
        this.legal();
        break;

      case "services":
        this.servicesShow();
        break;

      default:
        this.generalShow();
        break;
    }
  };

  render() {
    return (
      <div className={styles.faqs}>
        <Head>
          <title>Fipezo | Frequently Asked Questions</title>
        </Head>
        <Navbar
          user={this.props.user}
          company={this.props.company}
          setCompany={this.props.setCompany}
          setUser={this.props.setUser}
        />
        <div className={styles.body}>
          <h1 className={styles.heading}>
            Need any Help? We&apos;ve got to you.
          </h1>
          <hr className={styles.divider} />
          <div className={styles.content}>
            <div className={styles.categories}>
              <h1 className={styles.top}>Table of Content</h1>
              <ul className={styles.lists + " no-scrollbar"}>
                <li
                  className={`${styles.list} ${
                    this.state.currentTab === "general" ? styles.active : ""
                  }`}
                  onClick={this.generalShow}
                  id={styles.generalTab}
                >
                  Getting Started
                </li>
                <li
                  className={`${styles.list} ${
                    this.state.currentTab === "freelanceraccount"
                      ? styles.active
                      : ""
                  }`}
                  onClick={this.freelanceraccount}
                  id={styles.freelanceraccount}
                >
                  Freelancer Account
                </li>
                <li
                  className={`${styles.list} ${
                    this.state.currentTab === "companyaccount"
                      ? styles.active
                      : ""
                  }`}
                  onClick={this.companyaccount}
                  id={styles.companyaccount}
                >
                  Company Account
                </li>
                <li
                  className={`${styles.list} ${
                    this.state.currentTab === "accountverification"
                      ? styles.active
                      : ""
                  }`}
                  onClick={this.accountverification}
                  id={styles.accountverification}
                >
                  Account Verification
                </li>
                <li
                  className={`${styles.list} ${
                    this.state.currentTab === "referandearn"
                      ? styles.active
                      : ""
                  }`}
                  onClick={this.referandearn}
                  id={styles.referandearn}
                >
                  Refer and Earn Program
                </li>
                <li
                  className={`${styles.list} ${
                    this.state.currentTab === "privacy" ? styles.active : ""
                  }`}
                  onClick={this.privacyShow}
                  id={styles.privacyTab}
                >
                  Privacy and Security
                </li>
                <li
                  className={`${styles.list} ${
                    this.state.currentTab === "legal" ? styles.active : ""
                  }`}
                  onClick={this.legal}
                  id={styles.legal}
                >
                  Legal and Terms
                </li>
                <li
                  className={`${styles.list} ${
                    this.state.currentTab === "services" ? styles.active : ""
                  }`}
                  onClick={this.servicesShow}
                  id={styles.servicesTab}
                >
                  Help and Support
                </li>
              </ul>
              <div className="sm:hidden my-4 flex items-center justify-center">
                <select
                  name=""
                  id=""
                  className="focus:outline-none text-xs border p-2"
                  onChange={(e) => this.setTopic(e.target.value)}
                >
                  <option value="general">Getting Started</option>
                  <option value="freelanceraccount">Freelancer Account</option>
                  <option value="companyaccount">Company Account</option>
                  <option value="accountverification">
                    Account Verification
                  </option>
                  <option value="referandearn">Refer and Earn Program</option>
                  <option value="privacy">Privacy and Security</option>
                  <option value="legal">Legal and Terms</option>
                  <option value="services">Help and Support</option>
                </select>
              </div>
            </div>
            {this.state.currentTab === "general" && (
              <ul className={styles.qnas} id={styles.general}>
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("first")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "first" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>What is Fipezo?</h1>
                  {this.state.currentAnswer === "first" && (
                    <p className={styles.details}>
                      Fipezo is an online freelance platform that connects
                      freelancers with clients or companies seeking various
                      services.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("second")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "second" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How do I sign up on Fipezo?
                  </h1>
                  {this.state.currentAnswer === "second" && (
                    <p className={styles.details}>
                      <span className="font-bold">Step 1:</span> Click{" "}
                      <span className="font-bold">&quot;Get Started&quot;</span>{" "}
                      Go to the Fipezo homepage and click the{" "}
                      <span className="font-bold">&quot;Get Started&quot;</span>{" "}
                      button. <br />
                      <span className="font-bold">Step 2:</span> Select Your
                      User Type - Choose whether you are a freelancer or a
                      client. <br />
                      <span className="font-bold">Step 3:</span> Provide Your
                      Information - Fill in your details to create a profile,
                      showcasing your skills and expertise
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("third")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "third" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How can I search for freelance jobs?
                  </h1>
                  {this.state.currentAnswer === "third" && (
                    <p className={styles.details}>
                      Users can find freelance jobs on Fipezo by visiting the{" "}
                      <span className="font-bold">&quot;Browse Jobs&quot;</span>{" "}
                      section, where they can explore job listings in different
                      categories.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("fourth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "fourth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    Can companies use Fipezo to find freelancers for their
                    projects?
                  </h1>
                  {this.state.currentAnswer === "fourth" && (
                    <p className={styles.details}>
                      Yes, companies can join Fipezo to discover and hire
                      freelancers for their projects and collaborate on various
                      tasks.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("fifth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "fifth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What are the benefits of using Fipezo?
                  </h1>
                  {this.state.currentAnswer === "fifth" && (
                    <p className={styles.details}>
                      Fipezo provides a wealth of advantages, such as freelance
                      job access, flexible work options, networking with clients
                      and freelancers, secure payments, reputation building
                      through reviews, diverse services, reliable support,
                      global reach, efficient project management, and a
                      supportive community.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("sixth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "sixth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    Is it free to use Fipezo as a freelancer or Company ?
                  </h1>
                  {this.state.currentAnswer === "sixth" && (
                    <p className={styles.details}>
                      You can join Fipezo and set up your profile without any
                      charges. It&apos;s worth mentioning that the fundamental
                      usage of the platform is completely free of cost
                    </p>
                  )}
                </li>
              </ul>
            )}
            {this.state.currentTab === "freelanceraccount" && (
              <ul className={styles.qnas} id={styles.general}>
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("first")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "first" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How do I sign up on Fipezo as a freelancer?
                  </h1>
                  {this.state.currentAnswer === "first" && (
                    <p className={styles.details}>
                      To sign up as a freelancer on Fipezo, click the{" "}
                      <span className="font-bold">
                        &quot;Getting Started&quot;
                      </span>{" "}
                      button on the homepage, provide your information, and
                      create a profile showcasing your skills and expertise.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("second")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "second" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How do I create a Perfect freelancer profile?
                  </h1>
                  {this.state.currentAnswer === "second" && (
                    <p className={styles.details}>
                      <span className="font-bold">Profile Picture:</span> Start
                      with a clear and friendly profile picture. A professional
                      headshot or a high-quality image of yourself works well.
                      <br />
                      <span className="font-bold">Introduction:</span> Write a
                      brief and engaging introduction about yourself. Mention
                      your skills, experience, and what makes you unique. <br />
                      <span className="font-bold">Portfolio:</span> Showcase
                      your work through a portfolio. Add samples, projects, or
                      links to your previous projects to demonstrate your
                      capabilities. <br />
                      <span className="font-bold">
                        Skills and Expertise:
                      </span>{" "}
                      List your skills and areas of expertise. Be specific about
                      what you can offer. <br />
                      <span className="font-bold">
                        Rates and Availability:
                      </span>{" "}
                      Specify your per day or project rates, and let clients
                      know when you&apos;re available to work. <br />
                      <span className="font-bold">Reviews and Ratings:</span> As
                      you complete projects, encourage clients to leave reviews
                      and ratings, which can enhance your credibility. <br />
                      <span className="font-bold">Professionalism:</span>{" "}
                      Maintain professionalism in your communication and
                      interactions with clients on the platform. <br />
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("third")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "third" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    Can I offer any type of freelance service ?
                  </h1>
                  {this.state.currentAnswer === "third" && (
                    <p className={styles.details}>
                      On Fipezo, freelancers can provide a range of services
                      like design, writing, photography, and modeling. While the
                      platform offers some predefined services, freelancers can
                      also request to add their own services to their profile.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("fourth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "fourth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How do I set my rates and payment preferences?
                  </h1>
                  {this.state.currentAnswer === "fourth" && (
                    <p className={styles.details}>
                      Freelancers have the flexibility to determine their rates
                      on Fipezo based on the quality of their work, the cost of
                      equipment used for projects, and other factors that
                      influence their pricing. It&apos;s important to note that
                      rates can differ between per-day and per-project
                      arrangements, allowing freelancers to adapt their pricing
                      to the specific needs of each project and client. This
                      flexibility ensures that freelancers can align their rates
                      with the scope and requirements of the work they
                      undertake.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("fifth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "fifth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How do I get paid for freelance work ?
                  </h1>
                  {this.state.currentAnswer === "fifth" && (
                    <p className={styles.details}>
                      Payment details and methods vary by project and are
                      typically agreed upon between the freelancer and the
                      client. Fipezo does not process payments directly.
                    </p>
                  )}
                </li>
              </ul>
            )}
            {this.state.currentTab === "companyaccount" && (
              <ul className={styles.qnas} id={styles.general}>
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("first")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "first" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How to signup as a company on Fipezo ?
                  </h1>
                  {this.state.currentAnswer === "first" && (
                    <p className={styles.details}>
                      <span className="font-bold">Step 1:</span> Go to homepage
                      and click on{" "}
                      <span className="font-bold">&quot;Get Started&quot;</span>{" "}
                      button and choose your category as company. <br />{" "}
                      <span className="font-bold">Step 2:</span> Provide company
                      name and number and verify your OTP. <br />{" "}
                      <span className="font-bold">Step 3:</span> After
                      verification, complete your company profile by adding
                      information about your services, team, and any other
                      relevant details.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("second")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "second" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How do I post a job as a client ?
                  </h1>
                  {this.state.currentAnswer === "second" && (
                    <p className={styles.details}>
                      Certainly, here&apos;s the step-by-step guide with the
                      information incorporated: <br />
                      <span className="font-bold">Step 1:</span> Log in to your
                      Fipezo company account.
                      <br />
                      <span className="font-bold">Step 2:</span> Access your
                      dashboard. <br />
                      <span className="font-bold">Step 3:</span> Click
                      <span className="font-bold">
                        &quot;Post a Job.&quot;
                      </span>{" "}
                      <br />
                      <span className="font-bold">Step 4:</span> Provide job
                      details, budget, location and timeline. <br />
                      <span className="font-bold">Step 5:</span> Review and
                      confirm the job posting. <br />
                      <span className="font-bold">Step 6:</span> Wait for
                      freelancer proposals.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("third")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "third" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How can I search for freelancers ?
                  </h1>
                  {this.state.currentAnswer === "third" && (
                    <p className={styles.details}>
                      You can search for freelancers on Fipezo by using the
                      platform&apos;s search bar and applying filters to refine
                      your search results. This allows you to find freelancers
                      with specific skills and expertise that match your project
                      requirements.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("fourth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "fourth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What information should I include in a job listing?
                  </h1>
                  {this.state.currentAnswer === "fourth" && (
                    <p className={styles.details}>
                      When creating a job listing on Fipezo, it&apos;s essential
                      to include key information to attract the right
                      freelancers. Include details such as: <br /> <br />
                      <span className="font-bold">Job Title:</span> A clear and
                      descriptive title for your project. <br />{" "}
                      <span className="font-bold">Job Description:</span>A
                      thorough description of the project, its goals, and any
                      specific requirements. <br />{" "}
                      <span className="font-bold">Skills Needed:</span>List the
                      skills or expertise required for the job. <br />
                      <span className="font-bold">Budget:</span>Specify the
                      budget for the project, whether it&apos;s a fixed amount
                      or a range. <br />
                      <span className="font-bold">Timeline:</span> Mention the
                      project&apos;s expected start and completion dates. <br />
                      <span className="font-bold">Location:</span> Indicate if
                      the project is location-specific or remote. <br /> <br />
                      By providing this information, you&apos;ll help
                      freelancers understand the scope of the job and apply with
                      relevant proposals.
                      <br />
                    </p>
                  )}
                </li>
              </ul>
            )}
            {this.state.currentTab === "privacy" && (
              <ul className={styles.qnas} id={styles.privacy}>
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("fifth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "fifth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How is my personal information protected on Fipezo?
                  </h1>
                  {this.state.currentAnswer === "fifth" && (
                    <p className={styles.details}>
                      Fipezo takes your personal information protection
                      seriously. Your data is safeguarded through strong
                      security measures and encryption to ensure your privacy
                      and safety on the platform.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("sixth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "sixth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What security measures are in place for transactions?
                  </h1>
                  {this.state.currentAnswer === "sixth" && (
                    <p className={styles.details}>
                      Fipezo prioritizes your transaction security. As of now,
                      Fipezo does not handle or enter transactions made on the
                      platform. Rates are determined by freelancers, and clients
                      decide what they&apos;re willing to pay. Your financial
                      dealings are between you and the other party, and your
                      data is kept safe with robust security measures.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("seventh")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "seventh" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How can I report any security concerns or fraudulent
                    activity?
                  </h1>
                  {this.state.currentAnswer === "seventh" && (
                    <p className={styles.details}>
                      If you come across security concerns or suspect fraudulent
                      activity on Fipezo, we encourage you to report them
                      immediately. You can use our reporting tools, typically
                      found on the platform, to alert our team to any issues.
                      Your report helps us maintain a secure environment for all
                      users. Your privacy and security are our top priorities.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("eighth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "eighth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    Can Freelancers use their contact number on Fipezo?
                  </h1>
                  {this.state.currentAnswer === "eighth" && (
                    <p className={styles.details}>
                      Freelancers on Fipezo cannot display their contact number
                      on the platform, but their contact information is stored
                      securely in our database for communication and transaction
                      purposes. Your privacy and security are important to us.
                    </p>
                  )}
                </li>
              </ul>
            )}
            {this.state.currentTab === "services" && (
              <ul className={styles.qnas} id={styles.services}>
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("ninth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "ninth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How can I edit or update my profile information?
                  </h1>
                  {this.state.currentAnswer === "ninth" && (
                    <p className={styles.details}>
                      To edit or update your profile information on Fipezo, you
                      can typically access your account settings or profile
                      settings. There, you&apos;ll find options to make changes
                      to your details, skills, and other profile information.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("tenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "tenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    Can I change my username or email address?
                  </h1>
                  {this.state.currentAnswer === "tenth" && (
                    <p className={styles.details}>
                      Changing your username or email address may be possible in
                      your account settings. Review the platform&apos;s specific
                      guidelines for making such changes, as they can vary.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("eleventh")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "eleventh" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What should I do if I forget my password or can&apos;t log
                    in?
                  </h1>
                  {this.state.currentAnswer === "eleventh" && (
                    <p className={styles.details}>
                      If you forget your password or have trouble logging in,
                      Fipezo often provides a{" "}
                      <span className="font-bold">
                        &quot;Forgot Password&quot;
                      </span>{" "}
                      or
                      <span className="font-bold">
                        &quot;Trouble Logging In&quot;
                      </span>{" "}
                      feature. Use this to reset your password or regain access
                      to your account.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("twelveth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "twelveth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How can I contact Fipezo&apos;s support team for assistance?
                  </h1>
                  {this.state.currentAnswer === "twelveth" && (
                    <p className={styles.details}>
                      To contact Fipezo&apos;s support team for assistance, you
                      can typically use the contact options available on the
                      platform, such as the Help or Support section. <br />{" "}
                      <p className="text-black font-bold">
                        Email us on :{" "}
                        <a href="mailto:help@fipezo.com">help@fipezo.com</a>
                      </p>
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("thirteenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "thirteenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How do I report issues or violations of Fipezo&apos;s
                    policies?
                  </h1>
                  {this.state.currentAnswer === "thirteenth" && (
                    <p className={styles.details}>
                      If you come across any problems or spot policy violations
                      on Fipezo, you can go to the help or support team to
                      report them. This helps in keeping the platform safe and
                      secure for all users, and your concerns and questions will
                      be promptly addressed.
                    </p>
                  )}
                </li>
              </ul>
            )}
            {this.state.currentTab === "accountverification" && (
              <ul className={styles.qnas} id={styles.services}>
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("ninth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "ninth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    Is account verification required on Fipezo?
                  </h1>
                  {this.state.currentAnswer === "ninth" && (
                    <p className={styles.details}>
                      Account verification on Fipezo isn&apos;t mandatory for
                      browsing the platform. You can explore the website without
                      it. However, when you want to post a job or hire a
                      freelancer, it&apos;s advisable to complete the
                      verification process first. This extra step fosters trust
                      and security in your freelance interactions.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("tenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "tenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What documents or information may be needed for
                    verification?
                  </h1>
                  {this.state.currentAnswer === "tenth" && (
                    <p className={styles.details}>
                      As of now, Fipezo&apos;s verification process doesn&apos;t
                      require legal identification documents. Users are asked to
                      provide their basic details to complete the verification,
                      ensuring a straightforward and accessible experience on
                      the platform. Your privacy and security are important to
                      us, and we strive to make the process as simple as
                      possible.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("eleventh")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "eleventh" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How long does the verification process typically take?
                  </h1>
                  {this.state.currentAnswer === "eleventh" && (
                    <p className={styles.details}>
                      Fipezo&apos;s verification process usually takes around 24
                      hours, ensuring a speedy experience for users.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("twelveth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "twelveth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What are the benefits of having a verified account?
                  </h1>
                  {this.state.currentAnswer === "twelveth" && (
                    <p className={styles.details}>
                      The advantages of having a verified account on Fipezo
                      include enhanced trust and credibility, which can make it
                      easier to attract clients or freelancers and engage in
                      secure transactions. Verified accounts enjoy a higher
                      level of trust within the community, ultimately improving
                      the overall freelancing experience. Your satisfaction and
                      peace of mind are key.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("thirteenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "thirteenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What are the benefits of having a verified account?
                  </h1>
                  {this.state.currentAnswer === "thirteenth" && (
                    <p className={styles.details}>
                      The advantages of having a verified account on Fipezo
                      include enhanced trust and credibility, which can make it
                      easier to attract clients or freelancers and engage in
                      secure transactions. Verified accounts enjoy a higher
                      level of trust within the community, ultimately improving
                      the overall freelancing experience. Your satisfaction and
                      peace of mind are key.
                    </p>
                  )}
                </li>
              </ul>
            )}
            {this.state.currentTab === "referandearn" && (
              <ul className={styles.qnas} id={styles.services}>
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("ninth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "ninth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What is the Fipezo Refer and Earn program?
                  </h1>
                  {this.state.currentAnswer === "ninth" && (
                    <p className={styles.details}>
                      The Fipezo Refer and Earn program is a referral program
                      that allows you to invite your freelancer friends,
                      colleagues, or other contacts to join Fipezo. When they
                      sign up and create their freelance profile on the
                      platform, you can earn rewards.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("tenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "tenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How can I participate in the Refer and Earn program?
                  </h1>
                  {this.state.currentAnswer === "tenth" && (
                    <p className={styles.details}>
                      To participate, you need to be a registered user on
                      Fipezo. You can find your unique referral code in your
                      refer and earn page, which you can share with others
                      freelancers.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("eleventh")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "eleventh" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What rewards can I earn through the program?
                  </h1>
                  {this.state.currentAnswer === "eleventh" && (
                    <p className={styles.details}>
                      By referring someone to create a freelance profile on
                      Fipezo, you can earn 50 rupees as a reward. It&apos;s a
                      straightforward way to benefit from your referrals&apos;
                      involvement in the platform.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("twelveth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "twelveth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What are the benefits of having a verified account?
                  </h1>
                  {this.state.currentAnswer === "twelveth" && (
                    <p className={styles.details}>
                      By referring someone to create a freelance profile on
                      Fipezo, you can earn 50 rupees as a reward. It&apos;s a
                      straightforward way to benefit from your referrals&apos;
                      involvement in the platform.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("thirteenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "thirteenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    Is there a limit to how many people I can refer?
                  </h1>
                  {this.state.currentAnswer === "thirteenth" && (
                    <p className={styles.details}>
                      There is often no limit to the number of people you can
                      refer. You can refer as many people as you like, and for
                      each successful referral, you can earn rewards.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("fourteenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "fourteenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    When do I receive my referral rewards?
                  </h1>
                  {this.state.currentAnswer === "fourteenth" && (
                    <p className={styles.details}>
                      You&apos;ll receive your referral rewards after getting 6
                      successful referrals. That&apos;s when you can withdraw
                      your rewards.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("fifteenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "fifteenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How can I track my referrals and rewards?
                  </h1>
                  {this.state.currentAnswer === "fifteenth" && (
                    <p className={styles.details}>
                      You can often track your referrals and rewards through
                      your Fipezo account. The platform typically provides a
                      dashboard where you can see the status of your referrals
                      and the rewards you&apos;ve earned.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("sixteenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "sixteenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    Are there any restrictions on who I can refer?
                  </h1>
                  {this.state.currentAnswer === "sixteenth" && (
                    <p className={styles.details}>
                      There are limitations on who you can refer. The referral
                      program is solely for freelancers who create new accounts
                      using the referral code. No rewards are provided for
                      clients or companies creating accounts.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("seventeenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "seventeenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How I can withdraw my referral reward?
                  </h1>
                  {this.state.currentAnswer === "seventeenth" && (
                    <p className={styles.details}>
                      To withdraw your referral reward, use UPI as the payment
                      method. After meeting the required number of successful
                      referrals, you can easily request your payout.
                    </p>
                  )}
                </li>
              </ul>
            )}
            {this.state.currentTab === "legal" && (
              <ul className={styles.qnas} id={styles.services}>
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("ninth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "ninth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What are the terms of service and user agreements?
                  </h1>
                  {this.state.currentAnswer === "ninth" && (
                    <p className={styles.details}>
                      The terms of service and user agreements on Fipezo outline
                      the guidelines and rules for using our platform. By
                      agreeing to these terms, you commit to following our
                      community&apos;s standards and practices, ensuring a safe
                      and trusted environment for all users. It&apos;s important
                      to review and understand these terms to maintain a
                      positive experience on Fipezo. Your satisfaction and
                      security are of utmost importance to us.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("tenth")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "tenth" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    What are the legal obligations for freelancers and clients?
                  </h1>
                  {this.state.currentAnswer === "tenth" && (
                    <p className={styles.details}>
                      Fipezo sets clear rules for freelancers and clients to
                      follow. By using the platform, you agree to these rules,
                      which ensure fairness and honesty in your freelance
                      interactions. Complying with these rules is important for
                      a straightforward and reliable experience on Fipezo,
                      making the platform a safe place for everyone.
                    </p>
                  )}
                </li>
                <hr className={styles.divider} />
                <li
                  className={styles.points}
                  onClick={() => this.showAnswer("eleventh")}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.currentAnswer === "eleventh" ? (
                    <AiOutlineMinus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  ) : (
                    <AiOutlinePlus
                      className={styles.icon}
                      style={{ color: "#00aaff", display: "inline" }}
                    />
                  )}
                  &nbsp; &nbsp;{" "}
                  <h1 className={styles.summary}>
                    How are disputes and conflicts handled in accordance with
                    Fipezo&apos;s policies?
                  </h1>
                  {this.state.currentAnswer === "eleventh" && (
                    <p className={styles.details}>
                      Fipezo has a process in place for managing disputes and
                      conflicts based on our policies. When issues arise, both
                      freelancers and clients can follow the prescribed steps to
                      reach a resolution. This process is designed to be fair
                      and impartial, promoting a peaceful and productive
                      freelance environment for all users. Your satisfaction and
                      trust are paramount.
                    </p>
                  )}
                </li>
              </ul>
            )}
          </div>
          <div className={styles.container + " mt-16"}>
            <p
              className={
                styles.subHeading + " flex flex-col items-center gap-4"
              }
              href="mailto:help@fipezo.com"
            >
              Still Can&apos;t Find Your Answer ?{" "}
              <Link
                href="/contact_us"
                className="capitalize text-base px-4 py-2 bg-blue-600 text-white rounded"
              >
                drop your query
              </Link>
            </p>
          </div>
        </div>
        <Footer premium={this.props.user?.premium} />
      </div>
    );
  }
}

export default Faqs;
