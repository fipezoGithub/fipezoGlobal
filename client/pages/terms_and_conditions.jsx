import styles from "@/styles/Terms_And_Conditions.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

function Terms_And_Conditions(props) {
  return (
    <div className={styles.termsNConditions}>
      <Head>
        <title>Fipezo | Terms & Conditions</title>
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
            <h1 className={styles.heading}>
              Terms & Conditions for Fipezo - Freelance Platform
            </h1>
            <p className={styles.para}>
              Introducing Fipezo, a freelancing platform that establishes
              connections between proficient freelancers and clients seeking
              their services. These Terms & Conditions meticulously regulate
              your utilization of the Fipezo website and all associated
              services, all of which are provided by Fipezo—a subsidiary owned
              and managed by{" "}
              <span className="font-bold text-black">NOZZE ARTE PRIVATE LIMITED</span>, the
              parent company of Fipezo. By accessing or utilizing our Website
              and Services, you hereby consent to be bound by these Terms.
              <span className={styles.title}>Contact Information:</span>
              For any inquiries or concerns regarding our Terms and Conditions,
              please contact us at:{" "}
              <Link href="mailto:help@fipezo.com">help@fipezo.com</Link>
              <br />
              <br />
              <span className={styles.title}>Effective Date</span> These Terms
              and Conditions are effective as of the date mentioned above and
              apply to all users of the Fipezo platform.
              <br />
              <br />
              <span className={styles.title}>Limitation of Liability</span>{" "}
              Fipezo strives to provide a reliable and secure platform, but we
              cannot guarantee uninterrupted or error-free service. By using our
              platform, you agree that Fipezo and its affiliates shall not be
              liable for any direct, indirect, incidental, consequential, or
              exemplary damages, including but not limited to, damages for loss
              of profits, goodwill, use, data, or other intangible losses.
              <br />
              <br />
              <span className={styles.title}>Disclaimer of Warranties:</span>
              Fipezo provides its services on an &quot;as is&quot; and &quot;as
              available&quot; basis. We do not make any warranties, expressed or
              implied, regarding the quality, accuracy, or reliability of our
              platform. Fipezo disclaims all warranties of any kind, whether
              express or implied, including but not limited to the implied
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement.
              <br />
              <br />
              <span className={styles.title}>Rules of Conduct:</span>
              Users of Fipezo are expected to adhere to the following rules of
              conduct:
              <br />
              <br />
              <span className={styles.title}>Professionalism:</span> Treat all
              users with respect and maintain a professional demeanor in all
              communications.
              <br />
              <br />
              <span className={styles.title}>Accuracy:</span> Provide accurate
              and truthful information in your profile, pitches, and
              communications.
              <br />
              <br />
              <span className={styles.title}>Compliance:</span> Abide by all
              applicable laws and regulations while using the Fipezo platform.
              <br />
              <br />
              <span className={styles.title}>Non-Discrimination:</span> Do not
              engage in any discriminatory practices based on race, gender,
              religion, or any other protected characteristic.
              <br />
              <br />
              <span className={styles.title}>User Restrictions:</span>
              To ensure a positive and secure environment, Fipezo imposes the
              following user restrictions:
              <br />
              <br />
              <span className={styles.title}>Age Limit:</span> Users must be at
              least 18 years old to create an account on Fipezo.
              <br />
              <br />
              <span className={styles.title}>Account Responsibility:</span>{" "}
              Users are responsible for maintaining the confidentiality of their
              account credentials and are liable for any activities conducted
              through their accounts.
              <span className={styles.title}>Prohibited Activities:</span>
              Users must not engage in any activities that violate the law,
              infringe on the rights of others, or violate these Terms and
              Conditions.
              <br />
              <br />
              By using the Fipezo platform, you acknowledge that you have read,
              understood, and agree to these Terms & Conditions. If you have any
              questions or concerns, please contact us at{" "}
              <Link href="mailto:help@fipezo.com">help@fipezo.com</Link>.
            </p>
          </div>
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </div>
  );
}

export default Terms_And_Conditions;
