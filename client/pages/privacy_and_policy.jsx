import styles from "@/styles/Terms_And_Conditions.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

function Privacy_And_Policy(props) {
  return (
    <div className={styles.termsNConditions}>
      <Head>
        <title>Fipezo | Privacy Policy</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className={styles.main}>
        <div className={styles.body}>
          <div
            className={styles.termsNConditions_form}
            style={{ height: "88.3vh" }}
          >
            <Link className="flex justify-end" href="/">
              <Image
                src="/cross.png"
                height={28}
                width={28}
                alt="cross"
              ></Image>
            </Link>
            <h1 className={styles.heading}>Privacy Policy of Fipezo Website</h1>
            <p className={styles.para}>
              Welcome to Fipezo! This Privacy Policy explains how we collect,
              use, disclose, and safeguard your personal information when you
              use our website (www.fipezo.com) and the services offered through
              it. We are committed to protecting your privacy and ensuring that
              your personal information is handled responsibly and in accordance
              with applicable data protection laws. By accessing and using our
              website, you consent to the practices described in this Privacy
              Policy.
              <span className={styles.title}>Information We Collect:</span>
              At Fipezo, we understand the importance of your privacy, and we
              strive to ensure the confidentiality and security of your personal
              information. When you use our platform, we may collect the
              following information:
              <br />
              <br />
              <span className="text-black font-semibold">
                User Information:
              </span>{" "}
              Basic details such as name, email address, and contact information
              to create and manage your account.
              <br />
              <br />
              <span className="text-black font-semibold">
                Pitch Information:
              </span>{" "}
              Descriptions and pitches provided by users to showcase their
              skills and expertise.
              <span className={styles.title}>How We Collect Information</span>
              We collect information through the following means:
              <br />
              <br />
              <span className="text-black font-semibold">User Input:</span>{" "}
              Information is provided directly by users during the account
              creation process and while creating pitches.
              <br />
              <br />
              <span className="text-black font-semibold">
                Automated Technologies:
              </span>{" "}
              We may use cookies and similar technologies to collect data about
              your interactions with our platform.
              <span className={styles.title}>
                How We Use Collected Information
              </span>
              The information we collect is used for the following purposes:
              <br />
              <br />
              <span className="text-black font-semibold">
                Account Management:
              </span>{" "}
              To create and manage your Fipezo account.
              <br />
              <br />
              <span className="text-black font-semibold">
                Matching Services:
              </span>{" "}
              To connect freelance artists with clients and companies seeking
              their services.
              <br />
              <br />
              Communication: To communicate with users about their accounts,
              projects, and platform updates.
              <span className={styles.title}>Keeping Information Safe:</span>
              Fipezo employs industry-standard security measures to safeguard
              your information. We use encryption, secure data storage, and
              access controls to protect against unauthorized access or
              disclosure.
              <span className={styles.title}>
                Information Sharing with Third Parties
              </span>
              Fipezo prioritizes your privacy, and we do not sell, trade, or
              otherwise transfer your personal information to third parties. We
              may share information with trusted partners solely to provide and
              improve our services.
              <span className={styles.title}>Trust and Safety:</span>
              Fipezo is committed to being a trustworthy and secure platform for
              freelance collaboration. We value the trust you place in us when
              sharing your information, and we continuously strive to maintain
              the highest standards of data protection.
              <span className={styles.title}>Contact Us:</span>
              For any concerns or inquiries regarding our Privacy Policy, please
              contact us at{" "}
              <Link href="mailto:help@fipezo.com">help@fipezo.com</Link>.
            </p>
          </div>
          <h2 className="text-3xl font-bold text-center my-4">Thank you for choosing Fipezo!</h2>
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </div>
  );
}

export default Privacy_And_Policy;
