import styles from '@/styles/Terms_And_Conditions.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

function Data_Protection(props) {
  return (
    <div className={styles.termsNConditions}>
      <Head>
        <title>Fipezo | Data Protection at Fipezo</title>
      </Head>
      <Navbar user={props.user} company={props.company} setCompany={props.setCompany} setUser={props.setUser} />
      <div className={styles.main}>
        <div className={styles.body}>
          <div className={styles.termsNConditions_form} style={{ height: '88.3vh' }}>
            <Link className='block flex justify-end' href='/'><Image src='/cross.png' height={28} width={28} alt='cross' ></Image></Link>
            <h1 className={styles.heading}>User Data Safe Commitment by FIPEZO Website</h1>
            <p className={styles.para}>At FIPEZO, we prioritize the security and privacy of our users&apos; data. We are committed to maintaining the highest standards of data protection to ensure that your personal information remains safe and secure. Our commitment to safeguarding your data is reflected in the following principles:

              <span className={styles.title}>Data Encryption:</span>
              We employ industry-standard encryption protocols to protect the transmission and storage of your data. This ensures that any data you share with us remains confidential and cannot be accessed by unauthorized parties.

              <span className={styles.title}>Secure Data Storage:</span>
              All user data is stored in highly secure data centres with strict access controls. We regularly review and update our security measures to stay ahead of potential threats.

              <span className={styles.title}>Limited Access:</span>
              Only authorized personnel with a genuine need to access your data, such as for customer support or technical assistance, will be allowed to do so. All our employees undergo extensive training on data protection and privacy.

              <span className={styles.title}>No Third-Party Sharing:</span>
              We do not sell, trade, or rent your personal information to third parties. Your data is used solely to provide you with the services you have requested from us.

              <span className={styles.title}>Anonymized Analytics:</span>
              We may use anonymized data for analytical purposes to improve our services and user experience. However, this data will never contain any personally identifiable information.

              <span className={styles.title}>Consent-Based Communication:</span>
              We will always seek your explicit consent before sending you any marketing or promotional materials. You have full control over the communication preferences and can opt out at any time.

              <span className={styles.title}>Compliance with Laws:</span>
              We strictly adhere to all applicable data protection and privacy laws to ensure that your rights are protected.

              <span className={styles.title}>Regular Security Audits:</span>
              We conduct regular security audits and vulnerability assessments to identify and address potential weaknesses in our systems.

              <span className={styles.title}>User Account Security:</span>
              We encourage users to create strong and unique passwords for their accounts. Additionally, we offer optional two-factor authentication for an added layer of security.

              <span className={styles.title}>Transparency and Communication:</span>
              In the event of any data breach or security incident, we will promptly notify affected users and take necessary measures to rectify the situation.

              <span className='block mt-4'>Your trust is of utmost importance to us. We are continuously working to enhance our data security practices and welcome feedback from our users to further improve our measures.</span>

              <span className='block mt-4'>Thank you for choosing FIPEZO. We remain committed to protecting your data and providing you with a safe and secure online experience.</span></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Data_Protection;