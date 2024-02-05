import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import WishlistCard from "@/components/WishlistCard";

export default function MyWishlist(props) {
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    async function getWishList() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/freelancer/wishlist/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const respData = await res.json();
        setWishList(respData);
      } catch (error) {
        console.log(error);
      }
    }
    getWishList();
  }, [wishList]);

  return (
    <>
      <Head>
        <title>My Wishlist</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      <div className='mt-16 mb-8 flex items-center justify-center flex-col gap-8'>
        <h1 className='capitalize font-bold text-4xl md:text-5xl'>my wishlist</h1>
        {wishList.length <= 0 ? (
          <div className='flex flex-col items-center justify-center gap-6'>
            <Image
              src='/no-wishlist.png'
              width={550}
              height={300}
              className=''
              alt='no wishlist found'
            />
            <p className='text-2xl font-medium'>
              No wishlisted freelancer found.
            </p>
            <Link
              href='/explore/freelancers'
              className='px-4 py-2 text-lg bg-[#1785f2] hover:bg-blue-700 text-white capitalize font-medium rounded-lg'
            >
              start exploring
            </Link>
          </div>
        ) : (
          <div className='flex items-center justify-center gap-6 flex-wrap'>
            {wishList.map((user, i) => (
              <WishlistCard key={i} user={user} setWishList={setWishList} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
