import Navbar from '@/components/Navbar'
import styles from '@/styles/Contact_panel.module.css'
import Footer from '@/components/Footer'
import ContactCard from '@/components/ContactCard';
import { useState, useEffect } from 'react';
import Head from 'next/head';

function Contact_panel(props) {

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function fetchMessages() {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      try {
        if (token) {
          const response = await fetch(`${process.env.SERVER_URL}/contact/messages`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchMessages();
  }, []);

  return (
    <div className={styles.contactPanel}>
      <Head>
        <title>Fipezo | Contact Panel</title>
      </Head>
      <Navbar color='black' user={props.user} company={props.company} setCompany={props.setCompany} setUser={props.setUser} />
      <div className={styles.body}>
        <h1 className={styles.heading}>Contact Panel</h1>
        <div className={styles.contactCards}>
          {messages.map((message, index) => {
            return (
              <ContactCard key={index} message={message} />
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact_panel;