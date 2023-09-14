import Navbar from '@/components/Navbar';
import styles from '../styles/Mobile.module.css'
import Image from 'next/image';
import Footer from '@/components/Footer';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import Head from 'next/head';

function Mobile(props) {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState('');

  const handleNotify = async (e) => {
    e.preventDefault();
    if (!email) return alert('Please enter your email');
    try {
      const res = await fetch(`${process.env.SERVER_URL}/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, device: 'iPhone' })
      });
      const data = await res.json();
      console.log(data);
      if (data.message === 'Email already exists') {
        alert('Email already registered');
        return;
      }
      setClicked(true);
    } catch (err) {
      console.log(err);
      setClicked(false);
    }
  }

  return (
    <div className={styles.mobile}>
      <Head>
        <title>Fipezo | Comming soon on iPhone Devices</title>
      </Head>
      <Navbar user={props.user} company={props.company} setCompany={props.setCompany} setUser={props.setUser} />
      <div className={styles.body}>
        <Image className={styles.img} src='/iphone.png' alt='iphone' width={400} height={400}></Image>
        <h1 className={styles.heading}>
          Comming soon on iPhone Devices <br />
          <form className='flex flex-col gap-4 items-center w-5/6' onSubmit={(e) => handleNotify(e)}>
            <input
              className='text-xs p-2 border-2 border-black sm:text-lg sm:p-3 w-5/6'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => { setEmail(e.target.value); setClicked(false) }}
            />
            <button type='submit' className={styles.btn}>Get Notified</button>
            {clicked && (
              <p className='text-xs flex items-center sm:text-lg p-2 sm:p-3 flex'>
                <BsCheckCircleFill className='text-green-500' /> &nbsp;
                We will notify you when we launch our app
              </p>
            )}
          </form>
        </h1>
      </div>
      <Footer />
    </div>
  )
}

export default Mobile;