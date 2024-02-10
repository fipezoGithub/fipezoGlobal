import DialogBox from "@/components/DialogBox";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Popup from "@/components/Popup";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HireWithFipezo(props) {
  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [requiredFreelancer, setRequiredFreelancer] = useState(0);
  const [requiredFreelancerError, setRequiredFreelancerError] = useState(false);
  const [freelancerLocation, setFreelancerLocation] = useState("Agra");
  const [freelancerProfession, setFreelancerProfession] = useState("actor");
  const [minBudget, setMinBudget] = useState(0);
  const [minBudgetError, setMinBudgetError] = useState(false);
  const [maxBudget, setMaxBudget] = useState(0);
  const [maxBudgetError, setMaxBudgetError] = useState(false);
  const [requiredDate, setRequiredDate] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [multipleCategory, setMultipleCategory] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  function increaseProgress() {
    if (currentStage === 4) {
      return;
    } else {
      if (currentStage === 1 && fullName.length <= 6) {
        setNameError(true);
        return;
      }
      if (currentStage === 1 && phone.length !== 10) {
        setPhoneError(true);
        return;
      }
      if (
        currentStage === 1 &&
        (!email.includes("@") || !email.includes("."))
      ) {
        setEmailError(true);
        return;
      }
      if (currentStage === 1 && address.length <= 0) {
        setAddressError(true);
        return;
      }
      if (currentStage === 2 && requiredFreelancer.length <= 0) {
        setRequiredFreelancerError(true);
        return;
      }
      if (currentStage === 3 && minBudget.length <= 0) {
        setMinBudgetError(true);
        return;
      }
      if (currentStage === 3 && maxBudget.length <= 0) {
        setMaxBudgetError(true);
        return;
      }
      setCurrentStage(currentStage + 1);
    }
  }

  function decreaseProgress() {
    if (currentStage === 1) {
      return;
    } else {
      setCurrentStage(currentStage - 1);
    }
  }

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
    if (description.length < 50) {
      setDescriptionError(true);
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
      description: "Payment for Fipezo Hire",
      image: "/favi.png", //put secure url of the logo you wish to display
      handler: async function (response) {
        // Validate payment at server - using webhooks is a better idea.
        const res = await fetch(`${process.env.SERVER_URL}/hire/premium-249`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullname: fullName,
            phone: phone,
            email: email,
            address: address,
            freelancerCount: requiredFreelancer,
            freelancerLocation: freelancerLocation,
            freelancerCategory: freelancerProfession,
            minBudget: minBudget,
            maxBudget: maxBudget,
            requiredDate: requiredDate,
            description: description,
            transactionId: response.razorpay_payment_id,
            multipleCategory: multipleCategory,
          }),
        });
        const message = await res.json();
        if (res.ok && message) {
          setSuccess(true);
        }
      },
      ondismiss: () => {
        /*handle payment window close or dismiss here */
      },

      prefill: {
        name: fullName, //you can prefill Name of the Customer
        contact: phone, //Mobile Number can also be prefilled to fetch available payment accounts.
      },
      readonly: {
        contact: true, //edit this to allow editing of info
        name: true, //edit this to allow editing of info
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const successFallback = () => {
    setSuccess(false);
    setFullName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setRequiredFreelancer(0);
    setRequiredDate("");
    setMinBudget(0);
    setMaxBudget(0);
    setDescription("");
    setCurrentStage(1);
  };

  return (
    <>
      <Head>
        <title>Fipezo | Hire With Fipezo</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      <div className='pt-16 pb-8 flex flex-col items-center justify-center gap-4 md:gap-6 bg-[url("/bg15.jpg")] bg-no-repeat bg-cover'>
        <h1 className='text-xl md:text-3xl'>
          Hire freelancer with <span className='font-bold'>Fipezo</span>
        </h1>

        <form
          className='flex flex-col items-center gap-8 m-2'
          onSubmit={(e) => openPaymentWindow(e, 249)}
        >
          {currentStage === 1 && (
            <div className='flex flex-col items-center gap-4 border shadow-lg p-4 bg-white rounded-lg'>
              <h3 className='text-lg md:text-2xl font-semibold'>
                Contact Information
              </h3>
              <div className='flex flex-col items-center gap-4'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                  <div className='flex flex-col items-start border px-2 py-1 w-full md:w-auto'>
                    <label htmlFor='fullname' className='capitalize md:text-xl'>
                      full name
                    </label>
                    <input
                      type='text'
                      id='fullname'
                      value={fullName}
                      onChange={(e) => {
                        setNameError(false);
                        setFullName(e.target.value);
                      }}
                      className='md:px-4 py-2 md:text-xl focus:outline-0'
                      placeholder='Enter your full name'
                    />
                  </div>
                  <div className='flex flex-col items-start border px-2 py-1'>
                    <label htmlFor='phone' className='capitalize md:text-xl'>
                      phone number
                    </label>
                    <div className='flex items-center gap-1'>
                      <p className='flex items-center border border-black p-1 md:text-lg rounded-md'>
                        <Image
                          src='/india_flag.png'
                          width={30}
                          height={30}
                          alt='indian flag'
                          className='w-6 h-6 object-cover'
                        />
                        +91
                      </p>
                      <input
                        type='tel'
                        id='phone'
                        value={phone}
                        onChange={(e) => {
                          setPhoneError(false);
                          setPhone(e.target.value);
                        }}
                        className='md:px-4 py-2 md:text-xl focus:outline-0'
                        placeholder='Enter your phone number'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row items-center w-full gap-4'>
                  <div className='flex flex-col items-start border px-2 py-1 w-full md:w-auto'>
                    <label htmlFor='emailId' className='capitalize md:text-xl'>
                      email id
                    </label>
                    <input
                      type='email'
                      id='emailId'
                      value={email}
                      onChange={(e) => {
                        setEmailError(false);
                        setEmail(e.target.value);
                      }}
                      className='px-4 py-2 md:text-xl focus:outline-0'
                      placeholder='Enter your email id'
                    />
                  </div>
                  <div className='flex flex-col items-start w-full border px-2 py-1'>
                    <label htmlFor='address' className='capitalize md:text-xl'>
                      address
                    </label>
                    <input
                      type='text'
                      id='address'
                      value={address}
                      onChange={(e) => {
                        setAddressError(false);
                        setAddress(e.target.value);
                      }}
                      className='px-4 py-2 md:text-xl focus:outline-0'
                      placeholder='Enter your address'
                    />
                  </div>
                </div>
                <button
                  type='button'
                  onClick={increaseProgress}
                  className='px-2 md:px-4 py-1 md:py-2 bg-blue-500 rounded-md text-white capitalize md:text-lg font-semibold hover:bg-blue-800'
                >
                  next
                </button>
              </div>
            </div>
          )}

          {currentStage === 2 && (
            <div className='flex flex-col items-center gap-4 border shadow-lg p-4 bg-white rounded-lg'>
              <h3 className='text-lg md:text-2xl font-semibold capitalize'>
                requirement details
              </h3>
              <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='flex flex-col items-start border px-2 py-1'>
                  <label
                    htmlFor='requiredFreelancer'
                    className='capitalize md:text-xl'
                  >
                    required freelancers number
                  </label>
                  <input
                    type='number'
                    id='requiredFreelancer'
                    value={requiredFreelancer}
                    onChange={(e) => {
                      setRequiredFreelancerError(false);
                      setRequiredFreelancer(e.target.value);
                    }}
                    placeholder='Enter your required freelancers number'
                    className='px-4 py-2 md:text-xl focus:outline-0'
                  />
                </div>
                <div className='flex flex-col items-start border px-2 py-1 w-full'>
                  <label htmlFor='location' className='capitalize md:text-xl'>
                    freelancer location
                  </label>
                  <select
                    name='location'
                    id='location'
                    value={freelancerLocation}
                    onChange={(e) => setFreelancerLocation(e.target.value)}
                    className='px-4 py-2 md:text-xl focus:outline-0'
                  >
                    <option value='Agra'>Agra</option>
                    <option value='Ahmedabad'>Ahmedabad</option>
                    <option value='Amritsar'>Amritsar</option>
                    <option value='Aurangabad'>Aurangabad</option>
                    <option value='Bengaluru'>Bengaluru</option>
                    <option value='Bhopal'>Bhopal</option>
                    <option value='Bhubaneswar'>Bhubaneswar</option>
                    <option value='Burdwan'>Burdwan</option>
                    <option value='Chandigarh'>Chandigarh</option>
                    <option value='Chennai'>Chennai</option>
                    <option value='Coimbatore'>Coimbatore</option>
                    <option value='Dehradun'>Dehradun</option>
                    <option value='Delhi'>Delhi</option>
                    <option value='Dhanbad'>Dhanbad</option>
                    <option value='Durgapur'>Durgapur</option>
                    <option value='Faridabad'>Faridabad</option>
                    <option value='Ghaziabad'>Ghaziabad</option>
                    <option value='Guwahati'>Guwahati</option>
                    <option value='Gwalior'>Gwalior</option>
                    <option value='Hyderabad'>Hyderabad</option>
                    <option value='Indore'>Indore</option>
                    <option value='Jaipur'>Jaipur</option>
                    <option value='Jamshedpur'>Jamshedpur</option>
                    <option value='Jodhpur'>Jodhpur</option>
                    <option value='Kanpur'>Kanpur</option>
                    <option value='Kochi'>Kochi</option>
                    <option value='Kolkata'>Kolkata</option>
                    <option value='Lucknow'>Lucknow</option>
                    <option value='Ludhiana'>Ludhiana</option>
                    <option value='Madurai'>Madurai</option>
                    <option value='Mangaluru'>Mangaluru</option>
                    <option value='Meerut'>Meerut</option>
                    <option value='Mumbai'>Mumbai</option>
                    <option value='Mysuru'>Mysuru</option>
                    <option value='Nagpur'>Nagpur</option>
                    <option value='Nashik'>Nashik</option>
                    <option value='New_Delhi'>New Delhi</option>
                    <option value='Navi_Mumbai'>Navi Mumbai</option>
                    <option value='Patna'>Patna</option>
                    <option value='Prayagraj'>Prayagraj</option>
                    <option value='Puducherry'>Puducherry</option>
                    <option value='Pune'>Pune</option>
                    <option value='Raipur'>Raipur</option>
                    <option value='Rajkot'>Rajkot</option>
                    <option value='Ranchi'>Ranchi</option>
                    <option value='Siliguri'>Siliguri</option>
                    <option value='Surat'>Surat</option>
                    <option value='Thane'>Thane</option>
                    <option value='Thiruvananthapuram'>
                      Thiruvananthapuram
                    </option>
                    <option value='Udaipur'>Udaipur</option>
                    <option value='Vadodara'>Vadodara</option>
                    <option value='Varanasi'>Varanasi</option>
                    <option value='Vijayawada'>Vijayawada</option>
                    <option value='Visakhapatnam'>Visakhapatnam</option>
                    <option value='Warangal'>Warangal</option>
                  </select>
                </div>
                <div className='flex flex-col items-start border px-2 py-1 w-full'>
                  <label
                    htmlFor='freelancerProfession'
                    className='capitalize md:text-xl'
                  >
                    freelancer category
                  </label>
                  <select
                    name='profession'
                    id='profession'
                    value={freelancerProfession}
                    onChange={(e) => setFreelancerProfession(e.target.value)}
                    className='px-4 py-2 md:text-xl focus:outline-0'
                  >
                    <option value='actor'>Actor</option>
                    <option value='actress'>Actress</option>
                    <option value='album_designer'>Album Designer</option>
                    <option value='anchor'>Anchor</option>
                    <option value='babysitter'>Babysitter</option>
                    <option value='cinematographer'>Cinematographer</option>
                    <option value='dancer'>Dancer</option>
                    <option value='dance_teacher'>Dance Teacher</option>
                    <option value='dj'>DJ</option>
                    <option value='drawing_teacher'>Drawing Teacher</option>
                    <option value='drone_operator'>Drone Operator</option>
                    <option value='fashion_designer'>Fashion Designer</option>
                    <option value='graphics_designer'>Graphics Designer</option>
                    <option value='influencer'>Influencer</option>
                    <option value='interior_designer'>Interior Designer</option>
                    <option value='lyricist'>Lyricist</option>
                    <option value='maid'>Maid</option>
                    <option value='makeup_artist'>Makeup Artist</option>
                    <option value='mehendi_artist'>Mehendi Artist</option>
                    <option value='model'>Model</option>
                    <option value='musician'>Musician</option>
                    <option value='music_teacher'>Music Teacher</option>
                    <option value='painter'>Painter</option>
                    <option value='photographer'>Photographer</option>
                    <option value='photo_editor'>Photo Editor</option>
                    <option value='private_tutor'>Private Tutor</option>
                    <option value='video_editor'>Video Editor</option>
                    <option value='vocalist'>Vocalist</option>
                    <option value='voice_over_artist'>Voice Over Artist</option>
                    <option value='web_developer'>Web Developer</option>
                  </select>
                </div>
              </div>
              <div className='flex items-center gap-2 self-start'>
                <input
                  type='checkbox'
                  name=''
                  id='multiFreelancer'
                  checked={multipleCategory}
                  onChange={(e) => setMultipleCategory(e.target.checked)}
                  className='w-5 h-5 cursor-pointer'
                />
                <label
                  htmlFor='multiFreelancer'
                  className='capitalize text-sm md:text-xl cursor-pointer'
                >
                  please check, if you need more than one category
                </label>
              </div>
              <div className='flex items-center gap-4'>
                <button
                  type='button'
                  onClick={decreaseProgress}
                  className='px-2 md:px-4 py-1 md:py-2 bg-neutral-400 rounded-md text-white capitalize md:text-lg font-semibold'
                >
                  back
                </button>
                <button
                  type='button'
                  onClick={increaseProgress}
                  className='px-2 md:px-4 py-1 md:py-2 bg-blue-500 rounded-md text-white capitalize md:text-lg font-semibold hover:bg-blue-800'
                >
                  next
                </button>
              </div>
            </div>
          )}

          {currentStage === 3 && (
            <div className='flex flex-col items-center gap-4 border shadow-lg p-4 bg-white rounded-lg'>
              <h3 className='text-lg md:text-2xl font-semibold'>
                Budget Information
              </h3>
              <div className='flex flex-col md:flex-row gap-4 items-center'>
                <div className='flex flex-col items-start border px-2 py-1'>
                  <label htmlFor='minbudget' className='capitalize md:text-xl'>
                    minimum budget
                  </label>
                  <input
                    type='number'
                    id='minbudget'
                    value={minBudget}
                    onChange={(e) => {
                      setMinBudgetError(false);
                      setMinBudget(e.target.value);
                    }}
                    className='px-4 py-2 md:text-xl focus:outline-0'
                    placeholder='Enter your minimum budget'
                  />
                </div>
                <div className='flex flex-col items-start border px-2 py-1'>
                  <label htmlFor='maxbudget' className='capitalize md:text-xl'>
                    maximum budget
                  </label>
                  <input
                    type='number'
                    id='maxbudget'
                    value={maxBudget}
                    onChange={(e) => {
                      setMaxBudgetError(false);
                      setMaxBudget(e.target.value);
                    }}
                    className='px-4 py-2 md:text-xl focus:outline-0'
                    placeholder='Enter your maximum budget'
                  />
                </div>
                <div className='flex flex-col items-start border px-2 py-1 w-full md:w-auto'>
                  <label
                    htmlFor='requiredDate'
                    className='capitalize md:text-xl'
                  >
                    required date
                  </label>
                  <input
                    type='date'
                    id='requiredDate'
                    onChange={(e) => setRequiredDate(e.target.value)}
                    placeholder='Enter your date'
                    className='px-4 py-2 md:text-xl focus:outline-0'
                  />
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <button
                  type='button'
                  onClick={decreaseProgress}
                  className='px-2 md:px-4 py-1 md:py-2 bg-neutral-400 rounded-md text-white capitalize md:text-lg font-semibold'
                >
                  back
                </button>
                <button
                  type='button'
                  onClick={increaseProgress}
                  className='px-2 md:px-4 py-1 md:py-2 bg-blue-500 rounded-md text-white capitalize md:text-lg font-semibold hover:bg-blue-800'
                >
                  next
                </button>
              </div>
            </div>
          )}

          {currentStage === 4 && (
            <div className='flex flex-col items-center gap-4 border shadow-lg p-4 bg-white rounded-lg'>
              <h3 className='text-lg md:text-2xl font-semibold'>
                Additional Information
              </h3>
              <div className='flex flex-col items-start px-2 py-1 w-full'>
                <label htmlFor='description' className='capitalize md:text-xl'>
                  Task description
                </label>
                <textarea
                  name=''
                  id='description'
                  value={description}
                  onChange={(e) => {
                    setDescriptionError(false);
                    setDescription(e.target.value);
                  }}
                  rows='10'
                  placeholder='Provide small task description'
                  className='md:px-4 py-2 md:text-xl focus:outline-0 resize-none w-full h-40 border-b'
                ></textarea>
              </div>
              <h1 className='md:text-lg'>
                By submitting this form you will agree our{" "}
                <Link
                  href='/privacy_and_policy'
                  className='text-blue-500 capitalize'
                >
                  Privacy
                </Link>{" "}
                and{" "}
                <Link
                  href='/terms_and_condition'
                  className='text-blue-500 capitalize'
                >
                  terms and conditions
                </Link>
              </h1>

              <div className='flex items-center gap-4'>
                <button
                  type='button'
                  onClick={decreaseProgress}
                  className='px-2 md:px-4 py-1 md:py-2 bg-neutral-400 rounded-md text-white capitalize md:text-lg font-semibold'
                >
                  back
                </button>
                <button
                  type='submit'
                  className='px-2 md:px-4 py-1 md:py-2 md:text-xl capitalize bg-blue-500 text-white rounded-lg hover:bg-blue-800 font-medium'
                >
                  pay &amp; submit
                </button>
              </div>
              <div>
                <p className='md:text-xl'>
                  The amount 249 is 100% refundable{" "}
                  <span className="text-xs font-bold text-neutral-500">*condition apply</span>
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
      {success && (
        <DialogBox
          title='Success!'
          text='Your request has been submitted. Our team will contact you asap.'
          handleDialogBox={successFallback}
          home={false}
        />
      )}
      {nameError && (
        <Popup errorMsg={"Name can not be less than 6 characters"} />
      )}
      {phoneError && <Popup errorMsg={"Phone number must be 10 characters"} />}
      {emailError && <Popup errorMsg={"Please provide valid email id"} />}
      {addressError && <Popup errorMsg={"Address can not be empty"} />}
      {requiredFreelancerError && (
        <Popup errorMsg={"Required Freelancers Number can not be empty"} />
      )}
      {minBudgetError && <Popup errorMsg={"Minimum budget can not be empty"} />}
      {maxBudgetError && <Popup errorMsg={"Maximum budget can not be empty"} />}
      {descriptionError && (
        <Popup errorMsg={"Description must be minimum 50 chracters"} />
      )}
      <Footer />
    </>
  );
}
