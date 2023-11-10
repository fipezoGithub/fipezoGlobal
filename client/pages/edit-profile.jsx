import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loading from "@/components/Loading";
import DialogBox from "@/components/DialogBox";

const ProfileSetting = (props) => {
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passowordInputType, setPassowordInputType] = useState("password");
  const [location, setLocation] = useState("");
  const [rate, setRate] = useState("");
  const [bio, setBio] = useState("");
  const [equipments, setEquipments] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profession, setProfession] = useState("");
  const [warns, setWarns] = useState({
    profilePictureWarn: false,
    coverPictureWarn: false,
  });
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const router = useRouter();

  const passwordRef = useRef();
  const oldPasswordRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    async function getFreelancer(authToken) {
      const res = await fetch(`${process.env.SERVER_URL}/navbar`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const freelancer = await res.json();
      setProfilePicture(freelancer.authData.user.profilePicture);
      setCoverPicture(freelancer.authData.user.coverPicture);
      setEmail(freelancer.authData.user.email);
      setLocation(freelancer.authData.user.location);
      setRate(freelancer.authData.user.rate);
      setBio(freelancer.authData.user.bio);
      setEquipments(freelancer.authData.user.equipments);
      setProfession(freelancer.authData.user.profession);
    }
    getFreelancer(token);
  }, []);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    if (file.size > 10485760 && index === 0) {
      setWarns((prev) => [...prev, { profilePictureWarn: true }]);
      return;
    }

    if (file.size > 10485760 && index === 1) {
      setWarns((prev) => [...prev, { coverPictureWarn: true }]);
      return;
    }

    reader.onloadend = () => {
      const newImages = [...images];
      newImages[index] = reader.result;
      setImages(newImages);
    };
    if (index === 0) {
      setProfilePicture(file);
    } else if (index === 1) {
      setCoverPicture(file);
    }
    reader.readAsDataURL(file);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    setIsLoading(true);
    try {
      const data = new FormData();
      if (typeof profilePicture !== "string") {
        data.append("profilePicture", profilePicture);
      }
      if (typeof coverPicture !== "string") {
        data.append("coverPicture", coverPicture);
      }
      data.append("location", location);
      data.append("email", email);
      if (password !== undefined) {
        data.append("password", password);
      }
      data.append("rate", rate);
      data.append("bio", bio);
      data.append("equipments", equipments);
      const res = await fetch(`${process.env.SERVER_URL}/edit/freelancer`, {
        method: "PUT",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(Object.fromEntries(data)),
        body: data,
      });
      const update = await res.json();
      if (update) {
        setIsLoading(false);
        setShowConfirmBox(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handelDialougeBox = () => {
    setShowConfirmBox(false);
    props.setUser(null);
    router.push("/freelancer_profile");
  };

  return (
    <>
      <Head>
        <title>Fipezo | My Profile</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      {isLoading === false ? (
        <div className="flex flex-col justify-center mt-16">
          <h1 className="lg:text-2xl capitalize text-center font-bold tracking-wide">
            update your profile
          </h1>
          <form
            action=""
            onSubmit={updateProfile}
            encType="multipart/form-data"
            className="flex flex-col items-center justify-center mx-8"
          >
            <div
              className="relative w-full h-[20vh] lg:h-[60vh] bg-white mt-8 cursor-pointer bg-no-repeat bg-center bg-cover shadow-inner"
              style={{
                backgroundImage: images[1]
                  ? `url('${images[1]}')`
                  : `url(https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${coverPicture})`,
              }}
            >
              <Image
                className="absolute bottom-2 lg:bottom-6 left-3 lg:left-8 flex items-center justify-center opacity-50 cursor-pointer border-2 p-[5px] rounded-full border-[#ffffff]"
                src="/cameraIcon.png"
                width={40}
                height={40}
                alt="camera"
              />
              <input
                type="file"
                className="h-full w-full cursor-pointer opacity-0"
                accept="image/jpeg,image/png"
                name="coverPicture"
                onChange={(e) => handleImageChange(e, 1)}
              />
              {warns.coverPictureWarn === true && (
                <p className="text-red-600 text-sm absolute -bottom-8 left-0 font-medium w-72">
                  File size exceeds maximum limit of 10MB
                </p>
              )}
              <span className="text-[#686868] absolute -bottom-[4.7rem] lg:-bottom-8 right-0 text-xs lg:text-sm font-normal">
                Max file size: 10 Mb and max resolution: 5000px x 5000px. File
                type: jpeg, jpg, png
              </span>
            </div>
            <div
              className="relative bg-no-repeat -top-14 lg:-top-24 flex justify-center rounded-full bg-cover shadow-[var(--shadow)] bg-center h-24 lg:h-44 w-24 lg:w-44 border-2 border-[#d3d3d3]"
              style={{
                backgroundImage: images[0]
                  ? `url(${images[0]})`
                  : `url(https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${profilePicture})`,
              }}
            >
              <Image
                className="absolute -bottom-2 lg:bottom-1 -left-3 lg:left-0 flex items-center justify-center opacity-50 cursor-pointer border-2 p-[5px] rounded-full border-[#ffffff]"
                src="/cameraIcon.png"
                width={40}
                height={40}
                alt="camera"
              />
              <input
                type="file"
                className="h-full w-full cursor-pointer rounded-full opacity-0"
                accept="image/jpeg,image/png"
                onChange={(e) => handleImageChange(e, 0)}
                name="profilePicture"
              />
              {warns.profilePictureWarn === true && (
                <p className="text-red-600 text-sm absolute -bottom-8 font-medium w-72">
                  File size exceeds maximum limit of 10mb
                </p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center w-full lg:w-1/2 border px-4 pb-6 shadow-md">
              <div className="flex flex-col lg:flex-row items-start justify-between w-full">
                <div className="flex flex-col justify-center w-full lg:w-auto">
                  <label
                    htmlFor="location"
                    className="text-base lg:text-lg p-4 pl-0 capitalize text-center lg:text-left"
                  >
                    location
                  </label>
                  <select
                    required
                    className="p-4 w-full lg:w-[80%] border border-[#d3d3d3] text-[#3d3d3d] bg-transparent cursor-pointer"
                    name="location"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option className="p-2 text-black" value="Agra">
                      Agra
                    </option>
                    <option className="p-2 text-black" value="Ahmedabad">
                      Ahmedabad
                    </option>
                    <option className="p-2 text-black" value="Amritsar">
                      Amritsar
                    </option>
                    <option className="p-2 text-black" value="Aurangabad">
                      Aurangabad
                    </option>
                    <option className="p-2 text-black" value="Bengaluru">
                      Bengaluru
                    </option>
                    <option className="p-2 text-black" value="Bhopal">
                      Bhopal
                    </option>
                    <option className="p-2 text-black" value="Bhubaneswar">
                      Bhubaneswar
                    </option>
                    <option className="p-2 text-black" value="Burdwan">
                      Burdwan
                    </option>
                    <option className="p-2 text-black" value="Chandigarh">
                      Chandigarh
                    </option>
                    <option className="p-2 text-black" value="Chennai">
                      Chennai
                    </option>
                    <option className="p-2 text-black" value="Coimbatore">
                      Coimbatore
                    </option>
                    <option className="p-2 text-black" value="Dehradun">
                      Dehradun
                    </option>
                    <option className="p-2 text-black" value="Delhi">
                      Delhi
                    </option>
                    <option className="p-2 text-black" value="Dhanbad">
                      Dhanbad
                    </option>
                    <option className="p-2 text-black" value="Durgapur">
                      Durgapur
                    </option>
                    <option className="p-2 text-black" value="Faridabad">
                      Faridabad
                    </option>
                    <option className="p-2 text-black" value="Ghaziabad">
                      Ghaziabad
                    </option>
                    <option className="p-2 text-black" value="Guwahati">
                      Guwahati
                    </option>
                    <option className="p-2 text-black" value="Gwalior">
                      Gwalior
                    </option>
                    <option className="p-2 text-black" value="Hyderabad">
                      Hyderabad
                    </option>
                    <option className="p-2 text-black" value="Indore">
                      Indore
                    </option>
                    <option className="p-2 text-black" value="Jaipur">
                      Jaipur
                    </option>
                    <option className="p-2 text-black" value="Jamshedpur">
                      Jamshedpur
                    </option>
                    <option className="p-2 text-black" value="Jodhpur">
                      Jodhpur
                    </option>
                    <option className="p-2 text-black" value="Kanpur">
                      Kanpur
                    </option>
                    <option className="p-2 text-black" value="Kochi">
                      Kochi
                    </option>
                    <option className="p-2 text-black" value="Kolkata">
                      Kolkata
                    </option>
                    <option className="p-2 text-black" value="Lucknow">
                      Lucknow
                    </option>
                    <option className="p-2 text-black" value="Ludhiana">
                      Ludhiana
                    </option>
                    <option className="p-2 text-black" value="Madurai">
                      Madurai
                    </option>
                    <option className="p-2 text-black" value="Mangaluru">
                      Mangaluru
                    </option>
                    <option className="p-2 text-black" value="Meerut">
                      Meerut
                    </option>
                    <option className="p-2 text-black" value="Mumbai">
                      Mumbai
                    </option>
                    <option className="p-2 text-black" value="Mysuru">
                      Mysuru
                    </option>
                    <option className="p-2 text-black" value="Nagpur">
                      Nagpur
                    </option>
                    <option className="p-2 text-black" value="Nashik">
                      Nashik
                    </option>
                    <option className="p-2 text-black" value="New Delhi">
                      New Delhi
                    </option>
                    <option className="p-2 text-black" value="Navi Mumbai">
                      Navi Mumbai
                    </option>
                    <option className="p-2 text-black" value="Patna">
                      Patna
                    </option>
                    <option className="p-2 text-black" value="Prayagraj">
                      Prayagraj
                    </option>
                    <option className="p-2 text-black" value="Puducherry">
                      Puducherry
                    </option>
                    <option className="p-2 text-black" value="Pune">
                      Pune
                    </option>
                    <option className="p-2 text-black" value="Raipur">
                      Raipur
                    </option>
                    <option className="p-2 text-black" value="Rajkot">
                      Rajkot
                    </option>
                    <option className="p-2 text-black" value="Ranchi">
                      Ranchi
                    </option>
                    <option className="p-2 text-black" value="Siliguri">
                      Siliguri
                    </option>
                    <option className="p-2 text-black" value="Surat">
                      Surat
                    </option>
                    <option className="p-2 text-black" value="Thane">
                      Thane
                    </option>
                    <option
                      className="p-2 text-black"
                      value="Thiruvananthapuram"
                    >
                      Thiruvananthapuram
                    </option>
                    <option className="p-2 text-black" value="Udaipur">
                      Udaipur
                    </option>
                    <option className="p-2 text-black" value="Vadodara">
                      Vadodara
                    </option>
                    <option className="p-2 text-black" value="Varanasi">
                      Varanasi
                    </option>
                    <option className="p-2 text-black" value="Vijayawada">
                      Vijayawada
                    </option>
                    <option className="p-2 text-black" value="Visakhapatnam">
                      Visakhapatnam
                    </option>
                    <option className="p-2 text-black" value="Warangal">
                      Warangal
                    </option>
                  </select>
                </div>
                <div className="flex flex-col justify-center w-full lg:w-auto">
                  <label
                    htmlFor="rate"
                    className="text-base lg:text-lg p-4 pl-0 text-center lg:text-left"
                  >
                    Remuneration per day?
                  </label>
                  <input
                    required
                    className={
                      "p-2 my-2 border-[1px] border-solid w-full lg:w-[80%] bg-transparent border-[hsl(0,0%,52%)]"
                    }
                    name="rate"
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="Enter your remuneration per day amount"
                    id="rate"
                  />
                  {/* <input
                required
                className={styles.range}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                name="rate"
                type="range"
                min="500"
                max="50000"
                step="100"
                id="rate"
              /> */}
                </div>
              </div>
              <hr className="h-px w-full my-4" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full">
                <div className="flex flex-col justify-center w-full">
                  <label
                    htmlFor="email"
                    className="text-base lg:text-lg p-4 pl-0 text-center lg:text-left"
                  >
                    Email :
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:outline-none bg-transparent p-2 border border-[#878787]"
                    placeholder="Enter your email address"
                    id="email"
                  />
                </div>
              </div>
              <hr className="h-px w-full my-4" />
              <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full">
                {/* <div className="flex flex-col justify-center">
                  <label
                    htmlFor="oldpassword"
                    className="text-base lg:text-lg p-4 pl-0 text-center lg:text-left"
                  >
                    Old Password :
                  </label>
                  <div>
                    <div className="flex border border-[#878787] items-center justify-between p-2 group">
                      <input
                        type="password"
                        className="focus:outline-none bg-transparent"
                        placeholder="Enter old password"
                        id="oldpassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        minLength={8}
                        maxLength={15}
                        ref={oldPasswordRef}
                      />
                      <button
                        type="button"
                        className="hidden group-focus-within:inline"
                        onClick={() => {
                          if (oldPasswordRef.current.type === "password") {
                            oldPasswordRef.current.type = "text";
                            setPassowordInputType("text");
                          } else {
                            oldPasswordRef.current.type = "password";
                            setPassowordInputType("password");
                          }
                        }}
                      >
                        {oldPasswordRef === "password" ? (
                          <AiFillEye />
                        ) : (
                          <AiFillEyeInvisible />
                        )}
                      </button>
                    </div>
                  </div>
                </div> */}
                <div className="flex flex-col justify-center">
                  <label
                    htmlFor="password"
                    className="text-base lg:text-lg p-4 pl-0 text-center lg:text-left"
                  >
                    New Password :
                  </label>
                  <div>
                    <div className="flex border border-[#878787] items-center p-2 justify-between group">
                      <input
                        type="password"
                        className="focus:outline-none bg-transparent"
                        placeholder="Enter new password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        maxLength={15}
                        ref={passwordRef}
                      />
                      <button
                        type="button"
                        className="hidden group-focus-within:inline"
                        onClick={() => {
                          if (passwordRef.current.type === "password") {
                            passwordRef.current.type = "text";
                            setPassowordInputType("text");
                          } else {
                            passwordRef.current.type = "password";
                            setPassowordInputType("password");
                          }
                        }}
                      >
                        {passowordInputType === "password" ? (
                          <AiFillEye />
                        ) : (
                          <AiFillEyeInvisible />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <label
                    htmlFor="confirmPassword"
                    className="text-base lg:text-lg p-4 pl-0 text-center lg:text-left"
                  >
                    Confirm Password :
                  </label>
                  <div>
                    <div className="flex border border-[#878787] p-2 items-center justify-between">
                      <input
                        type="password"
                        className="focus:outline-none bg-transparent"
                        placeholder="Confirm your new password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        minLength={8}
                        maxLength={15}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="h-px w-full my-4" />
              <div className="flex justify-between w-full flex-col">
                <div className="flex flex-col justify-center w-full">
                  <label
                    htmlFor="bio"
                    className="text-base lg:text-lg p-4 pl-0 capitalize text-center lg:text-left"
                  >
                    bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    cols="30"
                    rows="10"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="border border-[#d3d3d3] p-4 h-40 resize-none"
                  ></textarea>
                </div>
                <div className="flex flex-col justify-center w-full">
                  <label
                    htmlFor="equipments"
                    className="text-base lg:text-lg p-4 pl-0 capitalize text-center lg:text-left"
                  >
                    {(profession === "photgrapher" ||
                      profession === "drone_operator" ||
                      profession === "cinematographer") &&
                      "equipments"}
                    {(profession === "makeup_artist" ||
                      profession === "mehendi_artist") &&
                      "Products Use"}
                    {(profession === "model" ||
                      profession === "anchor" ||
                      profession === "dj" ||
                      profession === "dancer" ||
                      profession === "influencer") &&
                      "Describe work experience"}
                    {(profession === "photo_editor" ||
                      profession === "video_editor" ||
                      profession === "album_designer" ||
                      profession === "graphics_designer") &&
                      "Software Knowledge"}
                    {profession === "web_developer" && "Fimiliar Language"}
                  </label>
                  <textarea
                    name="equipments"
                    id="equipments"
                    cols="30"
                    rows="10"
                    value={equipments}
                    onChange={(e) => setEquipments(e.target.value)}
                    className="border border-[#d3d3d3] p-4 h-40 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="m-4">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 capitalize rounded-md"
              >
                update
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Loading message={"Updating your data"} />
      )}
      <Footer />
      {showConfirmBox === true && (
        <DialogBox
          title="Profile Upadated Successfully!"
          text="Your profile update was successful! Your new information is now reflected in our system. If you ever have questions or need assistance, feel free to reach out to our customer support team via the contact us. We're here to help!"
          handleDialogBox={handelDialougeBox}
        />
      )}
    </>
  );
};

export default ProfileSetting;
