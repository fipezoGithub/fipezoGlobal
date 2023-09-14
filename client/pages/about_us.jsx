import styles from '@/styles/Terms_And_Conditions.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head';

function About_Us(props) {
  return (
    <div className={styles.termsNConditions}>
      <Head>
        <title>Fipezo | About Fipezo</title>
      </Head>
      <Navbar user={props.user} company={props.company} setCompany={props.setCompany} setUser={props.setUser} />
      <div className={styles.main}>
        <div className={styles.body}>
          <div className={styles.termsNConditions_form} style={{ height: '88.3vh' }}>
          <Link className='block flex justify-end' href='/'><Image src='/cross.png' height={28} width={28} alt='cross' ></Image></Link>
            <h1 className={styles.heading}>Welcome to Fipezo - Empowering Freelancers Worldwide!</h1>
            <Image src='/aboutUs.webp' width='500' height='500' alt='about_us' />
            <p className={`mt-8 ${styles.para}`}>At Fipezo, we believe that freelancers are the backbone of a dynamic and innovative economy. Our platform is designed to provide a seamless and empowering experience for talented freelancers like you, connecting you with exciting opportunities and helping you thrive in the gig economy.

              <span className={styles.title}>Who We Are:</span>
              Fipezo is a revolutionary online marketplace for freelancers, created by a team of passionate professionals who understand the challenges and aspirations of independent workers. Our mission is to be the go-to platform where freelancers can find meaningful projects, gain recognition for their expertise, and build lasting relationships with clients across the globe.

              <span className={styles.title}>Our Vision:</span>
              We envision a world where freelancers can unleash their true potential, pursuing their passions and shaping their own destinies. We strive to create a community that fosters collaboration, encourages creativity, and empowers freelancers to take control of their careers.

              <span className={styles.title}>What Sets Us Apart:</span>
              Diverse Range of Talents: Fipezo boasts a diverse pool of talents, covering a wide array of industries and expertise. Whether you&apos;re a creative artist, a tech guru, a marketing mastermind, or a skilled professional in any field, Fipezo is the platform to showcase your skills and find projects that align with your strengths.<br /><br />

              User-Friendly Interface: Our user-friendly platform is designed to make your freelancing journey smooth and hassle-free. With an intuitive interface and comprehensive features, you can easily create a professional profile, search for relevant projects, communicate with clients, and get paid securely.<br /><br />

              Fair and Transparent: At Fipezo, we prioritize fairness and transparency. We believe in providing equal opportunities for freelancers, ensuring that everyone has an equal chance to shine based on their skills and dedication.<br /><br />

              Supportive Community: Joining Fipezo means becoming part of a supportive and inspiring community of freelancers. Share experiences, exchange knowledge, and collaborate with fellow freelancers, empowering each other to grow and excel in your respective fields.

              <span className={styles.title}>Join Us Today:</span>
              Are you ready to take your freelancing career to new heights? Whether you&apos;re just starting or a seasoned pro, Fipezo welcomes you with open arms. Join our platform today and embark on an exciting journey filled with endless opportunities and the freedom to be your own boss.</p><br /><br />

            <span className={styles.para} >Join Fipezo and discover the world of limitless possibilities for freelancers like you! </span>
          </div>
        </div>
      </div >
      <Footer />
    </div >
  )
}

export default About_Us;