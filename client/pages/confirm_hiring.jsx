import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import freelancer from "./register/freelancer";

export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/profile/freelancer/${ctx.query.freelancer}`
  );
  const pageData = await response.json();
  return { props: { pageData } };
};

const Urgenthiring = (props) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [budget, setBudget] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState(false);
  const router = useRouter();

  const { data } = useContext(AuthContext);

  useEffect(() => {
    setFullName(data.userDetails.firstname + " " + data.userDetails.lastname);
    setPhone(data.userDetails.phone);
  }, [data]);

  const initializeRazorpaySDK = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true); //handle load success event here
      };

      script.onerror = () => {
        resolve(false); //handle load error event
      };

      document.body.appendChild(script);
    });
  };

  const openPaymentWindow = async (e, price) => {
    e.preventDefault();
    if (
      fullName.length < 1 ||
      address.length < 1 ||
      phone.length < 1 ||
      requiredDate.length < 1 ||
      budget.length < 1 ||
      description.length < 1
    ) {
      setFormError(true);
      return;
    }
    const res = await initializeRazorpaySDK(); //here we are calling function we just written before
    if (!res) {
      alert("Razorpay SDK Failed to load"); //you can also call any ui to show this error.
      return; //this return stops this function from loading if SDK is not loaded
    }
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    const d = new Date();
    const date = d.setDate(d.getDate() + 30);
    // Make API call to the serverless API
    const paymentData = await fetch(`${process.env.SERVER_URL}/pay/razorpay`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: price,
      }),
    })
      .then((res) =>
        res.json((response) => {
          console.log(response);
        })
      )
      .catch((error) => {
        console.log(error);
      });

    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "Fipezo",
      currency: paymentData.currency,
      amount: paymentData.amount,
      order_id: paymentData.id,
      description: "Payment for Fipezo premium",
      image: "/favi.png", //put secure url of the logo you wish to display
      handler: async function (response) {
        // Validate payment at server - using webhooks is a better idea.
        let bodyData = {};
        if (data.userType === "company") {
          bodyData = {
            company: data.userDetails._id,
            fullName: fullName,
            hired_freelancer: props.pageData._id,
            address: address,
            phone: phone,
            reuireDate: requiredDate,
            budget: budget,
            startTime: startTime,
            endTime: endTime,
            description: description,
            transactionId: response.razorpay_payment_id,
          };
        } else if (data.userType === "user") {
          bodyData = {
            user: data.userDetails._id,
            fullName: fullName,
            hired_freelancer: props.pageData._id,
            address: address,
            phone: phone,
            reuireDate: requiredDate,
            budget: budget,
            startTime: startTime,
            endTime: endTime,
            description: description,
            transactionId: response.razorpay_payment_id,
          };
        } else {
          bodyData = {
            freelancer: data.userDetails._id,
            fullName: fullName,
            hired_freelancer: props.pageData._id,
            address: address,
            phone: phone,
            reuireDate: requiredDate,
            budget: budget,
            startTime: startTime,
            endTime: endTime,
            description: description,
            transactionId: response.razorpay_payment_id,
          };
        }

        const res = await fetch(`${process.env.SERVER_URL}/hire/premium`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        });
        const message = await res.json();
        router.push("/my_hires");
      },
      ondismiss: () => {
        /*handle payment window close or dismiss here */
      },

      prefill: {
        name: data.userDetails.firstname + " " + data.userDetails.lastname, //you can prefill Name of the Customer
        contact: data.userDetails.phone, //Mobile Number can also be prefilled to fetch available payment accounts.
      },
      readonly: {
        contact: true, //edit this to allow editing of info
        name: true, //edit this to allow editing of info
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Head>
        <title>
          Fipezo | Confirm Hire{" "}
          {props.pageData.firstname + " " + props.pageData.lastname}
        </title>
      </Head>
      <Navbar
        color='black'
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      <div className='mt-16 mb-8 bg-[url("/bgR2.jpg")] bg-no-repeat bg-cover flex flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-bold'>Confirm Hiring</h1>
        <form className='flex flex-col items-center justify-center border rounded-lg p-2 shadow-md gap-2 md:gap-4'>
          {formError && (
            <div>
              <p className='text-red-600 font-medium text-lg'>
                Required fields can&apos;t be empty
              </p>
            </div>
          )}
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full'>
            <div className='flex flex-col items-start gap-2'>
              <label htmlFor='fullName' className='text-lg capitalize'>
                full name
              </label>
              <input
                type='text'
                id='fullName'
                disabled
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFormError(false);
                }}
                placeholder='Enter your full name'
                className='focus:outline-none border-b px-2 py-1 drop-shadow-md'
              />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <label htmlFor='freelancer' className='text-lg capitalize'>
                freelancer name
              </label>
              <input
                type='text'
                id='freelancer'
                className='focus:outline-none border-b px-2 py-1 drop-shadow-md cursor-not-allowed'
                value={props.pageData.firstname + " " + props.pageData.lastname}
                disabled
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full'>
            <div className='flex flex-col items-start gap-2'>
              <label htmlFor='phone' className='text-lg capitalize'>
                phone number
              </label>
              <input
                type='tel'
                id='phone'
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setFormError(false);
                }}
                disabled
                className='focus:outline-none border-b px-2 py-1 drop-shadow-md'
                placeholder='Enter your phone number'
              />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <label htmlFor='address' className='text-lg capitalize'>
                address
              </label>
              <input
                type='text'
                id='address'
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setFormError(false);
                }}
                className='focus:outline-none border-b px-2 py-1 drop-shadow-md'
                placeholder='Enter your address'
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full'>
            <div className='flex flex-col items-start gap-2'>
              <label htmlFor='date' className='text-lg capitalize'>
                required date
              </label>
              <input
                type='date'
                id='date'
                value={requiredDate}
                onChange={(e) => {
                  setRequiredDate(e.target.value);
                  setFormError(false);
                }}
                className='focus:outline-none border-b px-2 py-1 drop-shadow-md'
                placeholder='Enter your address'
              />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <label htmlFor='budget' className='text-lg capitalize'>
                total budget
              </label>
              <input
                type='number'
                id='budget'
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value);
                  setFormError(false);
                }}
                className='focus:outline-none border-b px-2 py-1 drop-shadow-md'
                placeholder='Enter your budget amount'
              />
            </div>
          </div>
          <div className='flex items-center justify-between gap-4 w-full'>
            <div className='flex flex-col items-start gap-2'>
              <label htmlFor='startTime' className='text-lg capitalize'>
                start time
              </label>
              <input
                type='time'
                id='startTime'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className='focus:outline-none border-b px-2 py-1 drop-shadow-md'
                placeholder='Enter your budget amount'
              />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <label htmlFor='endTime' className='text-lg capitalize'>
                end time
              </label>
              <input
                type='time'
                id='endTime'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className='focus:outline-none border-b px-2 py-1 drop-shadow-md'
                placeholder='Enter your budget amount'
              />
            </div>
          </div>
          <div className='flex flex-col items-start gap-2 self-start w-full'>
            <label htmlFor='taskDescription' className='text-lg capitalize'>
              task description
            </label>
            <textarea
              id='taskDescription'
              rows='6'
              placeholder='Enter task description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='resize-none w-full focus:outline-none border-b px-2 py-1 drop-shadow-md'
            ></textarea>
          </div>
          <div>
            <button
              type='submit'
              onClick={(e) => openPaymentWindow(e, 49)}
              className='px-4 py-2 text-lg bg-blue-500 text-white rounded-md font-medium capitalize'
            >
              submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Urgenthiring;
