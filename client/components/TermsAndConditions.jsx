import styles from '@/styles/Terms_And_Conditions.module.css'

function TermsAndConditions(props) {
  return (
    <div className={styles.body}>
      <div className={styles.termsNConditions_form}>
        <h1 className={styles.heading}>Terms and Conditions</h1>
        <p className={styles.subHeading}>Your Agreement</p>
        <p className={styles.para}>Welcome to Fipezo, a freelancing platform connecting clients and freelancers. Before using our services, please carefully read the following Terms and Conditions (&quot;Terms&quot;) which govern your use of the Fipezo website and any associated services (collectively referred to as the &quot;Platform&quot;). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please refrain from using the Platform.

          <span className={styles.title}>General</span>
          1.1 Acceptance of Terms: By using the Fipezo Platform, you acknowledge that you have read, understood, and agreed to these Terms, as well as our Privacy Policy. These Terms constitute a legally binding agreement between you and Fipezo.

          1.2 Age Restriction: You must be at least 18 years old to use the Fipezo Platform. By using the Platform, you confirm that you meet this requirement.

          1.3 Modification of Terms: Fipezo reserves the right to modify, update, or change these Terms at any time, without prior notice. Any modifications will become effective immediately upon posting on the Fipezo website. It is your responsibility to review these Terms periodically. Continued use of the Platform after any modifications constitutes acceptance of the updated Terms.

          <span className={styles.title}>User Responsibilities</span>
          2.1 Account Creation: In order to access certain features of the Fipezo Platform, you must create a user account. You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account.

          2.2 User Conduct: You agree to use the Fipezo Platform in compliance with all applicable laws and regulations. You shall not engage in any illegal, harmful, or fraudulent activities, including but not limited to theft, infringement of intellectual property rights, or any other activity that may harm Fipezo, its users, or third parties.

          2.3 Content Accuracy: You are solely responsible for the accuracy and legality of any content you post, submit, or provide through the Fipezo Platform. Fipezo does not guarantee the accuracy, completeness, or reliability of any user-generated content.

          <span className={styles.title}>Fipezo&apos;s Role and Limitations</span>
          3.1 Platform Provider: Fipezo acts solely as a platform to facilitate connections between clients and freelancers. Fipezo does not participate in any contractual agreements or assume any responsibility for the services provided by freelancers.

          3.2 No Liability for Theft or Others: Fipezo shall not be responsible for any theft, loss, damage, or any other harm resulting from the use of the Platform, including any transactions or interactions between users. Users are solely responsible for their own actions and interactions.

          3.3 Third-Party Services: Fipezo may provide links or integrate with third-party websites, applications, or services. These third-party services are not under the control of Fipezo, and Fipezo assumes no responsibility for their content, accuracy, availability, or any damages incurred by using such services.

          <span className={styles.title}>Dispute Resolution</span>
          4.1 User Disputes: Fipezo is not responsible for disputes or disagreements that may arise between users of the Platform. Any resolution of such disputes must be conducted directly between the parties involved.

          4.2 Release of Claims: In the event of a dispute with another user or third party, you release Fipezo, its officers, directors, employees, agents, and affiliates from any and all claims, demands, and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with such disputes.

          <span className={styles.title}>Termination</span>
          5.1 Termination by Fipezo: Fipezo reserves the right, at its sole discretion, to suspend, terminate,</p>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={() => props.handleClick(true)}>I Agree</button>
        <button className={styles.btn} onClick={() => props.handleClick(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default TermsAndConditions;