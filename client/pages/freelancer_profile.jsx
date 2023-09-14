import Navbar from '@/components/Navbar';
import Cover from '@/components/Cover';
import ProfileBioCard from '@/components/ProfileBioCard';
import Details from '@/components/Details';
import React from 'react';
import styles from '@/styles/Profile.module.css';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import Link from 'next/link';
import Head from 'next/head';

function Freelancer_Profile(props) {
  const router = useRouter();
  const [freelancer, setFreelancer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFreelancerLoaded, setIsFreelancerLoaded] = useState(false);
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` + item);
  };

  const handelRotationRight = () => {
    const totalLength = freelancer.works.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` + freelancer.works[0];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = freelancer.works.filter((item) => {
      return freelancer.works.indexOf(item) === newIndex;
    });
    const newItem = `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` + newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    const totalLength = freelancer.works.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` + freelancer.works[totalLength - 1];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = freelancer.works.filter((item) => {
      return freelancer.works.indexOf(item) === newIndex;
    });
    const newItem = `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/` + newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        cache:"no-store"
      })
        .then(res => res.json())
        .then(data => {
          setFreelancer(data);
          setIsFreelancerLoaded(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/reviews/${freelancer._id}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (isFreelancerLoaded) {
      fetchReviews();
    }
  }, [freelancer, isFreelancerLoaded]);

  const checkLoggedIn = (val) => {
    setLoggedIn(val);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  }

  return (
    <div className={styles.profile}>
      <Head>
        <title>Fipezo | My Profile</title>
      </Head>
      <Navbar color='white' checkLoggedIn={checkLoggedIn} user={props.user} company={props.company} setCompany={props.setCompany} setUser={props.setUser} />
      <Cover coverPicture={freelancer.coverPicture} />
      {/* <div className='w-full'><Link className={styles.btn} style={{width: '100%'}} id={styles.hire} href='/my_requests'>My Requests</Link></div> */}
      <div className={styles.profile_details}>
        {freelancer.links && <ProfileBioCard freelancer={freelancer} handleClick={handleClick} />}
        {isFreelancerLoaded && <Details profession={freelancer.profession} works={freelancer.works} reviews={reviews} handleClick={handleClick} />}
        <div className={styles.btnBox}>
          <Link className={styles.btn} style={{width: '100%'}} id={styles.hire} href='/my_requests'>My Requests</Link>
          {/* <div className={styles.btn} id={styles.logout} onClick={handleLogout}>
            Log Out
          </div> */}
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      <div>
        {clickedImg && (
          <Modal
            clickedImg={clickedImg}
            handelRotationRight={handelRotationRight}
            setClickedImg={setClickedImg}
            handelRotationLeft={handelRotationLeft}
          />
        )}
      </div>
    </div>
  );
}

export default Freelancer_Profile;