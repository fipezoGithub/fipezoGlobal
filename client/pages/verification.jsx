import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../styles/VerificationPanel.module.css'
import VerificationCard from '@/components/VerificationCard';
import { useEffect, useState } from 'react';
import Head from 'next/head';
function VerificationPanel(props) {
  const [freelancers, setFreelancers] = useState([]);
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    async function fetchFreelancer() {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      try {
        if (token) {
          const response = await fetch(`${process.env.SERVER_URL}/profiles/unverified/freelancer`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          setFreelancers(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchFreelancer();
  }, []);

  useEffect(() => {
    async function fetchCompany() {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      try {
        if (token) {
          const response = await fetch(`${process.env.SERVER_URL}/profiles/unverified/company`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          setCompanies(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCompany();
  }, []);

  const updateFreelancers = (id) => {
    const newFreelancers = freelancers.filter((freelancer) => {
      return freelancer._id !== id;
    });
    setFreelancers(newFreelancers);
  }

  const updateCompanies = (id) => {
    const newCompanies = companies.filter((company) => {
      return company._id !== id;
    });
    setCompanies(newCompanies);
  }

  return (
    <div className={styles.verification}>
      <Head>
        <title>Fipezo | Verification Panel</title>
      </Head>
      <Navbar user={props.user} company={props.company} setCompany={props.setCompany} setUser={props.setUser} />
      <div className={styles.body}>
        <h1 className={styles.heading}>Verification Panel</h1>
        <div className={styles.cards}>
          {freelancers.map((freelancer, index) => {
            return (
              <VerificationCard key={index} profile={freelancer} updateFreelancers={updateFreelancers} />
            )
          })}
          {companies.map((company, index) => {
            return (
              <VerificationCard key={index} profile={company} updateCompanies={updateCompanies} />
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default VerificationPanel;