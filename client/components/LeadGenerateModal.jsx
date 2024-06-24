import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const LeadGenerateModal = ({ setShowLeadModal }) => {
  const [isRequestedOTP, setIsRequestedOTP] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [allreadyExist, setAllreadyExist] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpError, setOTPError] = useState(false);

  const requestOTP = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fullName.length < 0) {
      setFullNameError(true);
      return;
    }

    if (phone.length !== 10) {
      setPhoneError(true);
      return;
    }

    try {
      const res = await fetch(`${process.env.SERVER_URL}/lead/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone }),
      });
      if (res.status === 403) {
        setAllreadyExist(true);
        return;
      }
      const data = await res.json();
      setIsRequestedOTP(true);
    } catch (error) {
      console.log(error);
    }
  };

  const submitOTPDetails = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch(`${process.env.SERVER_URL}/lead/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullName,
          phone: phone,
          otp: otp,
          type: "lead",
        }),
      });
      if (res.status === 404) {
        setOTPError(true);
        return;
      }
      const data = await res.json();
      setShowLeadModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full z-[1100] flex items-center justify-center bg-[#0000001e]'>
      {!isRequestedOTP ? (
        <form
          className='bg-white relative flex flex-col items-center gap-4 p-4 mx-2 lg:mx-0 lg:p-8 rounded-md backdrop-blur md:min-w-[30vmax]'
          onSubmit={requestOTP}
        >
          <div className='absolute top-0 right-0'>
            <button
              type='button'
              onClick={() => setShowLeadModal(false)}
              className='p-2 bg-blue-500 text-white rounded-bl-lg'
            >
              <IoClose />
            </button>
          </div>
          <h1 className='text-xl lg:text-3xl font-bold'>
            Please fill the details below
          </h1>
          <div className='flex flex-col w-full gap-2'>
            <label htmlFor='title' className='lg:text-xl cursor-pointer'>
              Full Name
            </label>
            <input
              type='text'
              id='title'
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setFullNameError(false);
              }}
              placeholder='Full Name'
              className='capitalize px-2 text-sm lg:text-base lg:px-4 py-2 focus:outline-none border w-full'
            />
            {fullNameError && (
              <p className='text-red-600 font-medium'>Full name is required</p>
            )}
          </div>
          <div className='flex flex-col w-full gap-2'>
            <label htmlFor='phone' className='lg:text-xl cursor-pointer'>
              Phone Number
            </label>
            <input
              type='tel'
              id='phone'
              placeholder='Phone Number'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError(false);
                setAllreadyExist(false);
              }}
              className='capitalize px-2 text-sm lg:text-base lg:px-4 py-2 focus:outline-none border w-full'
            />
            {phoneError && (
              <p className='text-red-600 font-medium'>
                Phone number is not valid
              </p>
            )}
          </div>
          <div>
            <button
              className='px-4 py-2 rounded-lg font-semibold uppercase bg-blue-500 text-white'
              type='submit'
            >
              get otp
            </button>
          </div>
          {allreadyExist && (
            <p className='text-red-600 font-medium text-center'>
              Phone number already Exist. Log in now.
            </p>
          )}
        </form>
      ) : (
        <form
          className='bg-white relative flex flex-col items-center gap-4 p-4 mx-2 lg:mx-0 lg:p-8 rounded-md backdrop-blur md:min-w-[30vmax]'
          onSubmit={submitOTPDetails}
        >
          <div className='absolute top-0 right-0'>
            <button
              type='button'
              onClick={() => setShowLeadModal(false)}
              className='p-2 bg-blue-500 text-white rounded-bl-lg'
            >
              <IoClose />
            </button>
          </div>
          <h1 className='text-xl lg:text-3xl font-bold'>Submit OTP</h1>
          <div className='flex flex-col w-full gap-2'>
            <label htmlFor='title' className='lg:text-xl cursor-pointer'>
              OTP
            </label>
            <input
              type='text'
              id='title'
              value={otp}
              onChange={(e) => {
                setOTP(e.target.value);
                setOTPError(false);
              }}
              placeholder='Enter OTP'
              className='capitalize px-2 text-sm lg:text-base lg:px-4 py-2 focus:outline-none border w-full'
            />
          </div>
          <div>
            <button
              className='px-4 py-2 rounded-lg font-semibold capitalize bg-blue-500 text-white'
              type='submit'
            >
              submit
            </button>
          </div>
          {otpError && (
            <p className='text-red-600 font-medium'>OTP is incorrect</p>
          )}
        </form>
      )}
    </div>
  );
};

export default LeadGenerateModal;
