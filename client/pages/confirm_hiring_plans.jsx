import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ConfirmHiringPlans = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | Confirm Hiring Plan</title>
      </Head>
      <Navbar
        color='black'
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      <div
        className='mt-16 bg-gradient-to-l from-sky-600 to-indigo-600 text-white py-8'
        id='price'
      >
        <h1 className='text-center text-lg lg:text-3xl font-bold mt-4'>
          Now increase your Hiring process by 10X
        </h1>
        <h3 className='text-center text-2xl lg:text-5xl font-bold mt-8'>
          Hire your required freelancer more easily and swiftly
        </h3>
        <div className='flex flex-col lg:flex-row items-center justify-center mt-12 gap-8'>
          <div className='flex flex-col items-start gap-4 px-4 py-2 bg-white text-black rounded-xl w-72 h-72'>
            <h3 className='lg:text-xl text-neutral-500 font-bold'>
              1 time plan
            </h3>
            <hr className='w-full h-px' />
            <p className='font-bold text-6xl lg:text-5xl'>₹49</p>
            <div className='flex items-center gap-4'>
              <p className='line-through text-base lg:text-xl text-neutral-500'>
                ₹68
              </p>
              <p className='px-2 py-1 bg-yellow-500 rounded-2xl text-white'>
                Save 40%
              </p>
            </div>
            <div className='h-1/3'></div>
            <Link
              href='/explore/freelancers'
              className='bg-orange-500 text-white px-4 py-2 w-full font-semibold rounded-lg text-center'
            >
              Explore Freelancer and Hire
            </Link>
          </div>
        </div>
        <p className='text-center mb-8 mt-12 text-lg'>
          Reach out to us on <a href='tel:9038578787'>+91 90385 78787</a> or
          <a href='mailto:help@fipezo.com'> help@fipezo.com</a> for more
          details.
        </p>
      </div>
      <div className='flex flex-col items-center justify-center my-8 mb-16'>
        <h2 className='text-xl lg:text-4xl mt-16 mb-12 font-semibold text-center mx-2 lg:mx-0'>
          Now enjoy premium benefits for your hiring process
        </h2>
        <div className='flex items-center justify-center'>
          <table className='text-lg lg:text-2xl text-left border mx-4 lg:mx-0'>
            <thead className='text-base'>
              <tr className='border-b'>
                <th scope='col' className='uppercase px-4 lg:px-8 py-6'>
                  benefits
                </th>
                <th scope='col' className='uppercase lg:px-10 py-6'>
                  hire
                </th>
                <th scope='col' className='uppercase lg:px-8 py-6 text-center'>
                  confirm hire
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-white border-b'>
                <th
                  scope='row'
                  className='px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto'
                >
                  Hire Freelancers
                </th>
                <td className='px-6 lg:px-12 py-6'>
                  <FaCheck color='#12c96b' />
                </td>
                <td className='px-8 lg:px-16 py-4'>
                  <FaCheck color='#12c96b' />
                </td>
              </tr>
              <tr className='bg-white border-b'>
                <th
                  scope='row'
                  className='px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto'
                >
                  No Delay in Hiring process
                </th>
                <td className='px-5 lg:px-10 py-6'>
                  <IoClose color='#FF004D' size={"1.4em"} />
                </td>
                <td className='px-8 lg:px-16 py-4'>
                  <FaCheck color='#12c96b' />
                </td>
              </tr>
              <tr className='bg-white border-b'>
                <th
                  scope='row'
                  className='px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg break-words w-1/2 lg:w-auto'
                >
                  Dedicated Relationship Manager Based on Your project
                  requirement
                </th>
                <td className='px-5 lg:px-10 py-6'>
                  <IoClose color='#FF004D' size={"1.4em"} />
                </td>
                <td className='px-8 lg:px-16 py-4 capitalize'>
                  <FaCheck color='#12c96b' />
                </td>
              </tr>
              <tr className='bg-white border-b'>
                <th
                  scope='row'
                  className='px-4 lg:px-8 py-6 font-normal lg:whitespace-nowrap text-sm lg:text-lg w-1/2 lg:w-auto'
                >
                  Fipezo{" "}
                  <span className='text-orange-600 font-bold capitalize'>
                    assurence
                  </span>
                </th>
                <td className='px-5 lg:px-10 py-6'>
                  <IoClose color='#FF004D' size={"1.4em"} />
                </td>
                <td className='px-8 lg:px-16 py-4 capitalize'>
                  <FaCheck color='#12c96b' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmHiringPlans;
