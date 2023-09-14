import Navbar from '@/components/Navbar'
import styles from '../styles/Faqs.module.css'
import { AiOutlinePlus , AiOutlineMinus } from 'react-icons/ai';
import Link from 'next/link';
import React from 'react';
import Footer from '@/components/Footer';
import Head from 'next/head';

class Faqs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'general',
      currentAnswer: ''
    }
  }

  generalShow = () => {
    this.setState({ currentTab: 'general' });
  }

  privacyShow = () => {
    this.setState({ currentTab: 'privacy' });
  }

  servicesShow = () => {
    this.setState({ currentTab: 'services' });
  }

  showAnswer = (val) => {
    if (val === this.state.currentAnswer) {
      this.setState({ currentAnswer: '' });
      return;
    }

    this.setState({ currentAnswer: val });
  }

  render() {
    return (
      <div className={styles.faqs}>
        <Head>
          <title>Fipezo | Frequently Asked Questions</title>
        </Head>
        <Navbar user={this.props.user} company={this.props.company} setCompany={this.props.setCompany} setUser={this.props.setUser} />
        <div className={styles.body}>
          <h1 className={styles.heading}>Questions? Look here.</h1>
          <div className={styles.container}>
            <Link className={styles.subHeading} href='mailto:help@fipezo.com'>Can&apos;t find an Answer contact us on help@fipezo.com</Link>
            <hr className={styles.divider} />
          </div>
          <div className={styles.content}>
            <div className={styles.categories}>
              <h1 className={styles.top}>Table of Content</h1>
              <ul className={styles.lists}>
                <li className={`${styles.list} ${this.state.currentTab === 'general' ? styles.active : ''}`}
                  onClick={this.generalShow} id={styles.generalTab}>General
                </li>
                <li className={`${styles.list} ${this.state.currentTab === 'services' ? styles.active : ''}`}
                  onClick={this.servicesShow} id={styles.servicesTab}>Services
                </li>
                <li className={`${styles.list} ${this.state.currentTab === 'privacy' ? styles.active : ''}`}
                  onClick={this.privacyShow} id={styles.privacyTab}>Safety and Privacy
                </li>
              </ul>
            </div>
            {this.state.currentTab === 'general' && <ul className={styles.qnas} id={styles.general}>
              <li className={styles.points} onClick={() => this.showAnswer('first')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'first' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff" , display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>What is Fipezo?</h1>
                {this.state.currentAnswer === 'first' && <p className={styles.details}>
                Welcome to Fipezo, the freelancer&apos;s dream platform! Connect, Collaborate, and Conquer with Fipezo - Where Boundless Opportunities Meet Exceptional Talent. Get ready to upscale to new heights in your freelance career with our seamless interface, unique project diversity, and secure payment system. Say goodbye to freelancing frustrations and hello to a world of endless possibilities. Join Fipezo today and unleash the full potential of your freelancing journey!
                </p>}
              </li>
              <hr className={styles.divider} />
              <li className={styles.points} onClick={() => this.showAnswer('second')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'second' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>Why Freelancing?</h1>
                {this.state.currentAnswer === 'second' && <p className={styles.details}>
                Without having to commit to a long-term job, freelancers can provide their talents and services to a variety of clients or businesses on a project-by-project basis.
                </p>}
              </li>
              <hr className={styles.divider} />
              <li className={styles.points} onClick={() => this.showAnswer('third')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'third' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>How to Register as an Freelancer?</h1>
                {this.state.currentAnswer === 'third' && <p className={styles.details}>
                  To register as an Freelancer, you need to click on the Register button &gt; Resgister as a Freelancer on the top right corner of the page and fill in the details.
                </p>}
              </li>
              <hr className={styles.divider} />
              <li className={styles.points} onClick={() => this.showAnswer('fourth')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'fourth' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>How to Register as an Company?</h1>
                {this.state.currentAnswer === 'fourth' && <p className={styles.details}>
                  To register as an Company, you need to click on the Register button &gt; Resgister as a Company on the top right corner of the page and fill in the details.
                </p>}
              </li>
            </ul>}
            {this.state.currentTab === 'privacy' && <ul className={styles.qnas} id={styles.privacy}>
              <li className={styles.points} onClick={() => this.showAnswer('fifth')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'fifth' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>How is my Privacy of my data safe?</h1>
                {this.state.currentAnswer === 'fifth' && <p className={styles.details}>
                  Fipezo is committed to protecting the privacy of its users. Rest assured, we employ cutting-edge encryption measures and stringent data protection protocols to safeguard all user information. Your privacy is our utmost commitment.
                </p>}
              </li>
              <hr className={styles.divider} />
              <li className={styles.points} onClick={() => this.showAnswer('sixth')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'sixth' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>What sensitive information does Fipezo collect?</h1>
                {this.state.currentAnswer === 'sixth' && <p className={styles.details}>
                  Fipezo collects the following sensitive information:
                </p>}
              </li>
              <hr className={styles.divider} />
              <li className={styles.points} onClick={() => this.showAnswer('seventh')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'seventh' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>To whom is the data disclosed?</h1>
                {this.state.currentAnswer === 'seventh' && <p className={styles.details}>
                  We take reasonable measures to safeguard your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.
                </p>}
              </li>
              <hr className={styles.divider} />
              <li className={styles.points} onClick={() => this.showAnswer('eighth')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'eighth' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>Whom is the data disclosed to?</h1>
                {this.state.currentAnswer === 'eighth' && <p className={styles.details}>
                  Fipezo does not disclose any information to third parties.
                </p>}
              </li>
            </ul>}
            {this.state.currentTab === 'services' && <ul className={styles.qnas} id={styles.services}>
              <li className={styles.points} onClick={() => this.showAnswer('ninth')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'ninth' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>What Service does Fipezo provide?</h1>
                {this.state.currentAnswer === 'ninth' && <p className={styles.details}>
                  Fipezo offers a comprehensive range of services for freelancers, including a user-friendly platform for showcasing portfolios, connecting with clients, and secure payment processing. Access valuable resources, project management tools, and a supportive community to enhance your freelance journey. Join Fipezo today and unlock your full potential.
                </p>}
              </li>
              <hr className={styles.divider} />
              <li className={styles.points} onClick={() => this.showAnswer('tenth')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'tenth' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>What are the fees associated with your services?</h1>
                {this.state.currentAnswer === 'tenth' && <p className={styles.details}>
                  Fipezo is currently free to use for Freelancers and Companies.
                </p>}
              </li>
              <hr className={styles.divider} />
              <li className={styles.points} onClick={() => this.showAnswer('eleventh')} style={{ cursor: 'pointer' }}>
                {this.state.currentAnswer === 'eleventh' ?
                  <AiOutlineMinus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} /> :
                  <AiOutlinePlus className={styles.icon} style={{ color: "#00aaff", display: 'inline' }} />
                }
                &nbsp; &nbsp; <h1 className={styles.summary}>What are the accepted payment methods?</h1>
                {this.state.currentAnswer === 'eleventh' && <p className={styles.details}>
                  Fipezo accepts all major credit cards and debit cards.
                </p>}
              </li>
            </ul>}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Faqs;