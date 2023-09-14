import styles from '@/styles/Terms_And_Conditions.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

function Privacy_And_Policy(props) {
  return (
    <div className={styles.termsNConditions}>
      <Head>
        <title>Fipezo | Privacy Policy</title>
      </Head>
      <Navbar user={props.user} company={props.company} setCompany={props.setCompany} setUser={props.setUser} />
      <div className={styles.main}>
        <div className={styles.body}>
          <div className={styles.termsNConditions_form} style={{ height: '88.3vh' }}>
          <Link className='block flex justify-end' href='/'><Image src='/cross.png' height={28} width={28} alt='cross' ></Image></Link>
            <h1 className={styles.heading}>Privacy Policy of Fipezo Website</h1>
            <p className={styles.para}>Welcome to Fipezo! This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website (www.fipezo.com) and the services offered through it. We are committed to protecting your privacy and ensuring that your personal information is handled responsibly and in accordance with applicable data protection laws. By accessing and using our website, you consent to the practices described in this Privacy Policy.

              <span className={styles.title}>Information We Collect:</span>
              a. Personal Information:

              When you register an account on Fipezo, we may collect information such as your name, email address, and other contact details.<br /><br />

              b. Non-Personal Information:

              We may automatically collect non-personal information, such as your IP address, browser type, device information, and usage data, to enhance your experience on our website.
              <span className={styles.title}>How We Use Your Information:</span>
              a. Personal Information:

              We may use your personal information to create and manage your account, provide customer support, and send you important updates and notifications.<br /><br />

              b. Non-Personal Information:

              Non-personal information is used to analyze trends, improve our website&apos;s performance, and enhance user experience.
              Cookies and Similar Technologies:
              We may use cookies and similar technologies (e.g., web beacons, pixels) to collect information about your interactions with our website. Cookies are small data files stored on your device that help us remember your preferences and understand how you use our website. You can manage your cookie preferences through your browser settings.
              <span className={styles.title}>Data Security:</span>
              We take reasonable measures to safeguard your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.

              <span className={styles.title}>Children&apos;s Privacy:</span>
              Fipezo is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will promptly delete such data.

              <span className={styles.title}>Changes to this Privacy Policy:</span>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make significant changes, we will provide notice by posting a prominent notice on our website.

              <span className={styles.title}>Contact Us:</span>
              If you have any questions or concerns about this Privacy Policy or your personal information, please contact us at <Link href='mailto:help@fipezo.com'>help@fipezo.com</Link>.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Privacy_And_Policy;