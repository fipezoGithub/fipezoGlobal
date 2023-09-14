import styles from '@/styles/Terms_And_Conditions.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

function Terms_And_Conditions(props) {
  return (
    <div className={styles.termsNConditions}>
      <Head>
        <title>Fipezo | Terms & Conditions</title>
      </Head>
      <Navbar user={props.user} company={props.company} setCompany={props.setCompany} setUser={props.setUser} />
      <div className={styles.main}>
        <div className={styles.body}>
          <div className={styles.termsNConditions_form} style={{ height: '88.3vh' }}>
            <Link className='block flex justify-end' href='/'><Image src='/cross.png' height={28} width={28} alt='cross' ></Image></Link>
            <h1 className={styles.heading}>Terms & Conditions for Fipezo - Freelance Platform</h1>
            <p className={styles.para}>Welcome to Fipezo, a freelance platform connecting skilled freelancers with clients seeking their services. These Terms & Conditions govern your use of the Fipezo website and all related services provided by Fipezo. By accessing or using our Website and Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use the Website or our Services.

              <span className={styles.title}>Registration and Account:</span>
              1.1 To use the Fipezo platform, you must be at least 18 years of age or the legal age of majority in your jurisdiction.<br /><br />

              1.2 You agree to provide accurate, up-to-date, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and are solely responsible for all activities that occur under your account.<br /><br />

              1.3 You must not share your account details with others, and you are responsible for all activities that occur under your account, whether or not authorized by you. Notify us immediately of any unauthorized use or security breach of your account.<br /><br />

              <span className={styles.title}>User Content and Conduct:</span>
              2.1 Fipezo allows users to post, upload, or submit various content, including project descriptions, portfolio items, and messages. You are solely responsible for the content you share on the platform.<br /><br />

              2.2 You must not post any content that is illegal, offensive, defamatory, fraudulent, or violates the intellectual property rights of others.<br /><br />

              2.3 Fipezo reserves the right to remove or disable any content that violates these Terms or is deemed inappropriate or harmful to the community.

              <span className={styles.title}>Freelancer Services:</span>
              3.1 Freelancers on Fipezo may offer their services to clients through project proposals or direct communication.<br /><br />

              3.2 Freelancers are responsible for delivering services in a professional and timely manner, meeting the agreed-upon terms, and maintaining communication with clients.<br /><br />

              3.3 Fipezo is not a party to any contracts between freelancers and clients, and freelancers are solely responsible for fulfilling their contractual obligations.

              <span className={styles.title}>Client Responsibilities:</span>
              4.1 Clients must provide clear project descriptions and requirements when posting a project on Fipezo.<br /><br />

              4.2 Clients should evaluate and select freelancers based on their qualifications, portfolio, and reviews from other clients.<br /><br />

              4.3 Clients must make prompt and fair payments for completed projects.

              <span className={styles.title}>Payment:</span>
              Fipezo will not charge any fees for certain services or transactions, which will be clearly communicated to users.

              <span className={styles.title}>Changes to the Terms:</span>
              6.1 Fipezo may update these Terms from time to time. Users will be notified of significant changes.

              6.2 Continued use of the Website and Services after the changes will constitute acceptance of the revised Terms.

              <span className={styles.title}>Termination:</span>
              Fipezo will not charge any fees for certain services or transactions, which will be clearly communicated to users.

              <span className={styles.title}>Governing Law and Jurisdiction:</span>
              By using the Fipezo platform, you acknowledge that you have read, understood, and agree to these Terms & Conditions. If you have any questions or concerns, please contact us at <Link href='mailto:help@fipezo.com'>help@fipezo.com</Link>.</p>
          </div>
        </div>
      </div >
      <Footer />
    </div >
  )
}

export default Terms_And_Conditions;