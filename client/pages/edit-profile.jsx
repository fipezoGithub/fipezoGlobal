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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passowordInputType, setPassowordInputType] = useState("password");
  const [location, setLocation] = useState("");
  const [rate, setRate] = useState("");
  const [bio, setBio] = useState("");
  const [equipments, setEquipments] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profession, setProfession] = useState("");
  const [warns, setWarns] = useState({
    profilePictureWarn: false,
    coverPictureWarn: false,
    bioError: false,
    equipmentsError: false,
  });
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const router = useRouter();

  const passwordRef = useRef();

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
      setServices(freelancer.user.services);
      setProfilePicture(freelancer.user.profilePicture);
      setCoverPicture(freelancer.user.coverPicture);
      setEmail(freelancer.user.email);
      setLocation(freelancer.user.location);
      setRate(freelancer.user.rate);
      setBio(freelancer.user.bio);
      setEquipments(freelancer.user.equipments);
      setProfession(freelancer.user.profession);
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
    if (bio.length > 500 || bio.length < 50) {
      setWarns((prev) => ({ ...prev, bioError: true }));
      return;
    }
    if (equipments.length > 200 || equipments.length < 50) {
      setWarns((prev) => ({ ...prev, equipmentsError: true }));
      return;
    }
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
      services.forEach((element) => {
        data.append("services[]", element);
      });
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

  const handelServices = (e, val) => {
    if (e.target.checked) {
      const newService = [...services];
      newService.push(val);
      setServices(newService);
    } else {
      const newService = [...services];
      if (newService.includes(val)) {
        let index = newService.indexOf(val);

        setServices((prev) => [
          ...prev.slice(0, index),
          ...prev.slice(index + 1, prev.length),
        ]);
      }
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
                  : `url('https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${coverPicture}')`,
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
                    <option className="p-2 text-black" value="New_Delhi">
                      New Delhi
                    </option>
                    <option className="p-2 text-black" value="Navi_Mumbai">
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
                    Remuneration per{" "}
                    {(profession === "actor" ||
                      profession === "actress" ||
                      profession === "model") &&
                      "Shoot"}
                    {profession === "influencer" && "Post"}
                    {profession === "fashion_designer" && "Dress"}
                    {(profession === "babysitter" ||
                      profession === "maid" ||
                      profession === "dance_teacher" ||
                      profession === "drawing_teacher" ||
                      profession === "music_teacher" ||
                      profession == "private_tutor") &&
                      "Month"}
                    {(profession === "dj" ||
                      profession == "musician" ||
                      profession === "drone_operator") &&
                      "Hour"}
                    {(profession === "album_designer" ||
                      profession === "dancer" ||
                      profession === "graphics_designer" ||
                      profession === "interior_designer" ||
                      profession === "mehendi_artist" ||
                      profession === "painter" ||
                      profession === "photo_editor" ||
                      profession === "video_editor" ||
                      profession === "voice_over_artist" ||
                      profession === "anchor" ||
                      profession === "lyricist" ||
                      profession === "makeup_artist" ||
                      profession === "vocalist" ||
                      profession === "web_developer") &&
                      "Project"}
                    {(profession === "cinematographer" ||
                      profession === "photographer") &&
                      "Day"}
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
                </div>
              </div>
              <hr className="h-px w-full my-4" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full">
                <div className="flex flex-col justify-center w-full">
                  <label
                    htmlFor="services"
                    className="text-base lg:text-lg p-4 pl-0 text-center lg:text-left"
                  >
                    Services :
                  </label>
                  {profession !== "babysitter" &&
                    profession !== "album_designer" &&
                    profession !== "photo_editor" &&
                    profession !== "video_editor" &&
                    profession !== "interior_designer" &&
                    profession !== "lyricist" &&
                    profession !== "mehendi_artist" && (
                      <div>
                        {(profession === "actor" ||
                          profession === "actress") && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                className="w-6 h-6"
                                type="checkbox"
                                name=""
                                onChange={(e) =>
                                  handelServices(e, "photoshoot")
                                }
                                checked={services.includes("photoshoot")}
                                id="photoshoot"
                              />
                              <label
                                htmlFor="photoshoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Photoshoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="stageshow"
                                onChange={(e) =>
                                  handelServices(e, "stageshow")
                                }
                                checked={services.includes("stageshow")}
                              />
                              <label
                                htmlFor="stageshow"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Stage show
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="inauguration"
                                onChange={(e) =>
                                  handelServices(
                                    e,
                                    "inauguration_ceremony"
                                  )
                                }
                                checked={services.includes("inauguration_ceremony")}
                              />
                              <label
                                htmlFor="inauguration"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Inauguration ceremony
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="social_promotion"
                                onChange={(e) =>
                                  handelServices(e, "social_promotion")
                                }
                                checked={services.includes("social_promotion")}
                              />
                              <label
                                htmlFor="social_promotion"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Social promotion
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="tvc_ad"
                                onChange={(e) =>
                                  handelServices(
                                    e,
                                    "television_commercial_ads"
                                  )
                                }
                                checked={services.includes("television_commercial_ads")}
                              />
                              <label
                                htmlFor="tvc_ad"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Television Commercial Ads
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                name=""
                                id="hoading"
                                className="w-6 h-6"
                                onChange={(e) =>
                                  handelServices(e, "hoading_shoots")
                                }
                                checked={services.includes("hoading_shoots")}
                              />
                              <label
                                htmlFor="hoading"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Hoading shoots
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="brand_endorsement"
                                onChange={(e) =>
                                  handelServices(e, "brand_endorsement")
                                }
                                checked={services.includes("brand_endorsement")}
                              />
                              <label
                                htmlFor="brand_endorsement"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Brand endorsement
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "anchor" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="stageshow"
                                onChange={(e) =>
                                  handelServices(e, "stageshow")
                                }
                                checked={services.includes("stageshow")}
                              />
                              <label
                                htmlFor="stageshow"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Stage show
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="weeding"
                                onChange={(e) =>
                                  handelServices(e, "weeding_ceremony")
                                }
                                checked={services.includes("weeding_ceremony")}
                              />
                              <label
                                htmlFor="weeding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                weeding ceremony
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="corporate"
                                onChange={(e) =>
                                  handelServices(e, "corporate_events")
                                }
                                checked={services.includes("corporate_events")}
                              />
                              <label
                                htmlFor="corporate"
                                className="text-lg capitalize cursor-pointer"
                              >
                                corporate parties
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="personal_parties"
                                onChange={(e) =>
                                  handelServices(e, "personal_parties")
                                }
                                checked={services.includes("personal_parties")}
                              />
                              <label
                                htmlFor="personal_parties"
                                className="text-lg capitalize cursor-pointer"
                              >
                                personal parties
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "cinematographer" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="weeding"
                                onChange={(e) =>
                                  handelServices(e, "weeding_ceremony")
                                }
                                checked={services.includes("weeding_ceremony")}
                              />
                              <label
                                htmlFor="weeding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                weeding ceremony
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="pre-weeding"
                                onChange={(e) =>
                                  handelServices(e, "pre_weeding_ceremony")
                                }
                                checked={services.includes("pre_weeding_ceremony")}
                              />
                              <label
                                htmlFor="pre-weeding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                pre weeding ceremony
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="corporate"
                                onChange={(e) =>
                                  handelServices(e, "corporate_events")
                                }
                                checked={services.includes("corporate_events")}
                              />
                              <label
                                htmlFor="corporate"
                                className="text-lg capitalize cursor-pointer"
                              >
                                corporate events
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="personal_parties"
                                onChange={(e) =>
                                  handelServices(e, "personal_parties")
                                }
                                checked={services.includes("personal_parties")}
                              />
                              <label
                                htmlFor="personal_parties"
                                className="text-lg capitalize cursor-pointer"
                              >
                                personal parties
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="fashion_portfolio"
                                onChange={(e) =>
                                  handelServices(e, "fashion_portfolio")
                                }
                                checked={services.includes("fashion_portfolio")}
                              />
                              <label
                                htmlFor="fashion_portfolio"
                                className="text-lg capitalize cursor-pointer"
                              >
                                fashion portfolio
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="food_industry"
                                onChange={(e) =>
                                  handelServices(e, "food_industry")
                                }
                                checked={services.includes("food_industry")}
                              />
                              <label
                                htmlFor="food_industry"
                                className="text-lg capitalize cursor-pointer"
                              >
                                food industry
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="automobile_industry"
                                onChange={(e) =>
                                  handelServices(e, "automobile_industry")
                                }
                                checked={services.includes("automobile_industry")}
                              />
                              <label
                                htmlFor="automobile_industry"
                                className="text-lg capitalize cursor-pointer"
                              >
                                automobile industry
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="architecture"
                                onChange={(e) =>
                                  handelServices(e, "architecture_shoot")
                                }
                                checked={services.includes("architecture_shoot")}
                              />
                              <label
                                htmlFor="architecture"
                                className="text-lg capitalize cursor-pointer"
                              >
                                architecture design
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="tvc_ad"
                                onChange={(e) =>
                                  handelServices(
                                    e,
                                    "television_commercial_ads"
                                  )
                                }
                                checked={services.includes("television_commercial_ads")}
                              />
                              <label
                                htmlFor="tvc_ad"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Television Commercial Ads
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="short_film"
                                onChange={(e) =>
                                  handelServices(e, "short_film")
                                }
                                checked={services.includes("short_film")}
                              />
                              <label
                                htmlFor="short_film"
                                className="text-lg capitalize cursor-pointer"
                              >
                                short film
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="music_video"
                                onChange={(e) =>
                                  handelServices(e, "music_video")
                                }
                                checked={services.includes("music_video")}
                              />
                              <label
                                htmlFor="music_video"
                                className="text-lg capitalize cursor-pointer"
                              >
                                music video
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "dancer" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="stageshow"
                                onChange={(e) =>
                                  handelServices(e, "stageshow")
                                }
                                checked={services.includes("stageshow")}
                              />
                              <label
                                htmlFor="stageshow"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Stage show
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="backleading_dancer"
                                onChange={(e) =>
                                  handelServices(e, "backleading_dancer")
                                }
                                checked={services.includes("backleading_dancer")}
                              />
                              <label
                                htmlFor="backleading_dancer"
                                className="text-lg capitalize cursor-pointer"
                              >
                                backleading dancer
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="weeding_party"
                                onChange={(e) =>
                                  handelServices(e, "weeding_party")
                                }
                                checked={services.includes("weeding_party")}
                              />
                              <label
                                htmlFor="weeding_party"
                                className="text-lg capitalize cursor-pointer"
                              >
                                weeding parties
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="personal_parties"
                                onChange={(e) =>
                                  handelServices(e, "personal_parties")
                                }
                                checked={services.includes("personal_parties")}
                              />
                              <label
                                htmlFor="personal_parties"
                                className="text-lg capitalize cursor-pointer"
                              >
                                personal parties
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="music_video"
                                onChange={(e) =>
                                  handelServices(e, "music_video")
                                }
                                checked={services.includes("music_video")}
                              />
                              <label
                                htmlFor="music_video"
                                className="text-lg capitalize cursor-pointer"
                              >
                                music video
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "dance_teacher" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="modern_dance"
                                onChange={(e) =>
                                  handelServices(e, "modern_dance")
                                }
                                checked={services.includes("modern_dance")}
                              />
                              <label
                                htmlFor="modern_dance"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Modern dance
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="ballet"
                                onChange={(e) =>
                                 handelServices(e, "ballet")
                                }
                                checked={services.includes("ballet")}
                              />
                              <label
                                htmlFor="ballet"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Ballet
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="swing"
                                onChange={(e) =>
                                  handelServices(e, "swing")
                                }
                                checked={services.includes("swing")}
                              />
                              <label
                                htmlFor="swing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Swing
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="tap_dance"
                                onChange={(e) =>
                                  handelServices(e, "tap_dance")
                                }
                                checked={services.includes("tap_dance")}
                              />
                              <label
                                htmlFor="tap_dance"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Tap dance
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="hip_hop"
                                onChange={(e) =>
                                  handelServices(e, "hip_hop")
                                }
                                checked={services.includes("hip_hop")}
                              />
                              <label
                                htmlFor="hip_hop"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Hip hop
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="folk_dance"
                                onChange={(e) =>
                                  handelServices(e, "folk_dance")
                                }
                                checked={services.includes("folk_dance")}
                              />
                              <label
                                htmlFor="folk_dance"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Folk dance
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="irish_dance"
                                onChange={(e) =>
                                  handelServices(e, "irish_dance")
                                }
                                checked={services.includes("irish_dance")}
                              />
                              <label
                                htmlFor="irish_dance"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Irish Dance
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="bharatanatyam"
                                onChange={(e) =>
                                  handelServices(e, "bharatanatyam")
                                }
                                checked={services.includes("bharatanatyam")}
                              />
                              <label
                                htmlFor="bharatanatyam"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Bharatanatyam
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="contemporary"
                                onChange={(e) =>
                                  handelServices(e, "contemporary")
                                }
                                checked={services.includes("contemporary")}
                              />
                              <label
                                htmlFor="contemporary"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Contemporary
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="line_dancing"
                                onChange={(e) =>
                                  handelServices(e, "line_dancing")
                                }
                                checked={services.includes("line_dancing")}
                              />
                              <label
                                htmlFor="line_dancing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Line dancing
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="samba"
                                onChange={(e) =>
                                  handelServices(e, "samba")
                                }
                                checked={services.includes("samba")}
                              />
                              <label
                                htmlFor="samba"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Samba
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="tango"
                                onChange={(e) =>
                                  handelServices(e, "tango")
                                }
                                checked={services.includes("tango")}
                              />
                              <label
                                htmlFor="tango"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Tango
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="ballroom"
                                onChange={(e) =>
                                  handelServices(e, "ballroom")
                                }
                                checked={services.includes("ballroom")}
                              />
                              <label
                                htmlFor="ballroom"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Ballroom
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="belly_dance"
                                onChange={(e) =>
                                  handelServices(e, "bally_dance")
                                }
                                checked={services.includes("bally_dance")}
                              />
                              <label
                                htmlFor="belly_dance"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Belly dance
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="jazz"
                                onChange={(e) => handelServices(e, "jazz")}
                                checked={services.includes("jazz")}
                              />
                              <label
                                htmlFor="jazz"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Jazz
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="jive"
                                onChange={(e) => handelServices(e, "jive")}
                                checked={services.includes("jive")}
                              />
                              <label
                                htmlFor="jive"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Jive
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="breakdance"
                                onChange={(e) =>
                                  handelServices(e, "break_dance")
                                }
                                checked={services.includes("break_dance")}
                              />
                              <label
                                htmlFor="breakdance"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Break dance
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="capoeira"
                                onChange={(e) =>
                                  handelServices(e, "capoeira")
                                }
                                checked={services.includes("capoeira")}
                              />
                              <label
                                htmlFor="capoeira"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Capoeira
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="cha_cha"
                                onChange={(e) =>
                                  handelServices(e, "cha_cha")
                                }
                                checked={services.includes("cha_cha")}
                              />
                              <label
                                htmlFor="cha_cha"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Cha Cha
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="kathak"
                                onChange={(e) =>
                                  handelServices(e, "kathak")
                                }
                                checked={services.includes("kathak")}
                              />
                              <label
                                htmlFor="kathak"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Kathak
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="mambo"
                                onChange={(e) =>
                                  handelServices(e, "mambo")
                                }
                                checked={services.includes("mambo")}
                              />
                              <label
                                htmlFor="mambo"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Mambo
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="rumba"
                                onChange={(e) =>
                                  handelServices(e, "rumba")
                                }
                                checked={services.includes("rumba")}
                              />
                              <label
                                htmlFor="rumba"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Rumba
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="salsa"
                                onChange={(e) =>
                                  handelServices(e, "salsa")
                                }
                                checked={services.includes("salsa")}
                              />
                              <label
                                htmlFor="salsa"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Salsa
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="bolero"
                                onChange={(e) =>
                                  handelServices(e, "bolero")
                                }
                                checked={services.includes("bolero")}
                              />
                              <label
                                htmlFor="bolero"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Bolero
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "dj" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="weeding_party"
                                onChange={(e) =>
                                  handelServices(e, "weeding_party")
                                }
                                checked={services.includes("weeding_party")}
                              />
                              <label
                                htmlFor="weeding_party"
                                className="text-lg capitalize cursor-pointer"
                              >
                                weeding parties
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="personal_parties"
                                onChange={(e) =>
                                  handelServices(e, "personal_parties")
                                }
                                checked={services.includes("personal_parties")}
                              />
                              <label
                                htmlFor="personal_parties"
                                className="text-lg capitalize cursor-pointer"
                              >
                                personal parties
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="club"
                                onChange={(e) =>
                                  handelServices(e, "club_party")
                                }
                                checked={services.includes("club_party")}
                              />
                              <label
                                htmlFor="club"
                                className="text-lg capitalize cursor-pointer"
                              >
                                club party
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "drawing_teacher" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="pencil_drawing"
                                onChange={(e) =>
                                  handelServices(e, "pencil_drawing")
                                }
                                checked={services.includes("pencil_drawing")}
                              />
                              <label
                                htmlFor="pencil_drawing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                pencil drawing
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="ink_drawing"
                                onChange={(e) =>
                                  handelServices(e, "ink_drawing")
                                }
                                checked={services.includes("ink_drawing")}
                              />
                              <label
                                htmlFor="ink_drawing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                ink drawing
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="pen_drawing"
                                onChange={(e) =>
                                  handelServices(e, "pen_drawing")
                                }
                                checked={services.includes("pen_drawing")}
                              />
                              <label
                                htmlFor="pen_drawing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Pen drawing
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="chalk_drawing"
                                onChange={(e) =>
                                  handelServices(e, "chalk_drawing")
                                }
                                checked={services.includes("chalk_drawing")}
                              />
                              <label
                                htmlFor="chalk_drawing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Chalk drawing
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="crayon_drawing"
                                onChange={(e) =>
                                  handelServices(e, "crayon_drawing")
                                }
                                checked={services.includes("crayon_drawing")}
                              />
                              <label
                                htmlFor="crayon_drawing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Crayon drawing
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="charcoal_drawing"
                                onChange={(e) =>
                                  handelServices(e, "charcoal_drawing")
                                }
                                checked={services.includes("charcoal_drawing")}
                              />
                              <label
                                htmlFor="charcoal_drawing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Charcoal drawing
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "drone_operator" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="weeding"
                                onChange={(e) =>
                                  handelServices(e, "weeding_ceremony")
                                }
                                checked={services.includes("weeding_ceremony")}
                              />
                              <label
                                htmlFor="weeding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                weeding ceremony
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="pre-weeding"
                                onChange={(e) =>
                                  handelServices(e, "pre_weeding_ceremony")
                                }
                                checked={services.includes("pre_weeding_ceremony")}
                              />
                              <label
                                htmlFor="pre-weeding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                pre weeding ceremony
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="corporate"
                                onChange={(e) =>
                                  handelServices(e, "commercial_project")
                                }
                                checked={services.includes("commercial_project")}
                              />
                              <label
                                htmlFor="corporate"
                                className="text-lg capitalize cursor-pointer"
                              >
                                commercial project
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="industrial"
                                onChange={(e) =>
                                  handelServices(e, "industrial_project")
                                }
                                checked={services.includes("industrial_project")}
                              />
                              <label
                                htmlFor="industrial"
                                className="text-lg capitalize cursor-pointer"
                              >
                                industrial project
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="personal_parties"
                                onChange={(e) =>
                                  handelServices(e, "personal_parties")
                                }
                                checked={services.includes("personal_parties")}
                              />
                              <label
                                htmlFor="personal_parties"
                                className="text-lg capitalize cursor-pointer"
                              >
                                personal parties
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="political_rally"
                                onChange={(e) =>
                                  handelServices(e, "political_rally")
                                }
                                checked={services.includes("political_rally")}
                              />
                              <label
                                htmlFor="political_rally"
                                className="text-lg capitalize cursor-pointer"
                              >
                                political rally
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="tvc_ad"
                                onChange={(e) =>
                                  handelServices(
                                    e,
                                    "television_commercial_ads"
                                  )
                                }
                                checked={services.includes("television_commercial_ads")}
                              />
                              <label
                                htmlFor="tvc_ad"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Television Commercial Ads
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "fashion_designer" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="western"
                                onChange={(e) => handelServices(e, "western")}
                                checked={services.includes("western")}
                              />
                              <label
                                htmlFor="western"
                                className="text-lg capitalize cursor-pointer"
                              >
                                western
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="athentic"
                                onChange={(e) => handelServices(e, "athentic")}
                                checked={services.includes("athentic")}
                              />
                              <label
                                htmlFor="athentic"
                                className="text-lg capitalize cursor-pointer"
                              >
                                athentic
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="traditional"
                                onChange={(e) =>
                                  handelServices(e, "traditional")
                                }
                                checked={services.includes("traditional")}
                              />
                              <label
                                htmlFor="traditional"
                                className="text-lg capitalize cursor-pointer"
                              >
                                traditional
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="weeding"
                                onChange={(e) =>
                                  handelServices(e, "weeding_ceremony")
                                }
                                checked={services.includes("weeding_ceremony")}
                              />
                              <label
                                htmlFor="weeding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                weeding
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="pre_weeding"
                                onChange={(e) =>
                                  handelServices(e, "pre_weeding_ceremony")
                                }
                                checked={services.includes(
                                  "pre_weeding_ceremony"
                                )}
                              />
                              <label
                                htmlFor="pre_weeding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                pre weeding
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="babyshoot"
                                onChange={(e) => handelServices(e, "babyshoot")}
                                checked={services.includes("babyshoot")}
                              />
                              <label
                                htmlFor="babyshoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                babyshoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="maternity"
                                onChange={(e) =>
                                  handelServices(e, "maternity_shoot")
                                }
                                checked={services.includes("maternity_shoot")}
                              />
                              <label
                                htmlFor="maternity"
                                className="text-lg capitalize cursor-pointer"
                              >
                                maternity
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="bridal"
                                onChange={(e) =>
                                  handelServices(e, "bridal_shoot")
                                }
                                checked={services.includes("bridal_shoot")}
                              />
                              <label
                                htmlFor="bridal"
                                className="text-lg capitalize cursor-pointer"
                              >
                                bridal shoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="tvc_ad"
                                onChange={(e) =>
                                  handelServices(e, "television_commercial_ads")
                                }
                                checked={services.includes(
                                  "television_commercial_ads"
                                )}
                              />
                              <label
                                htmlFor="tvc_ad"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Television Commercial Ads
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="tvserial"
                                onChange={(e) =>
                                  handelServices(e, "television_serial")
                                }
                                checked={services.includes("television_serial")}
                              />
                              <label
                                htmlFor="tvserial"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Television Serial
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="fashion_show"
                                onChange={(e) =>
                                  handelServices(e, "fashion_show")
                                }
                                checked={services.includes("fashion_show")}
                              />
                              <label
                                htmlFor="fashion_show"
                                className="text-lg capitalize cursor-pointer"
                              >
                                fashion show
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="music_video"
                                onChange={(e) =>
                                  handelServices(e, "music_video")
                                }
                                checked={services.includes("music_video")}
                              />
                              <label
                                htmlFor="music_video"
                                className="text-lg capitalize cursor-pointer"
                              >
                                music video
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="film"
                                onChange={(e) => handelServices(e, "film")}
                                checked={services.includes("film")}
                              />
                              <label
                                htmlFor="film"
                                className="text-lg capitalize cursor-pointer"
                              >
                                film
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="short_film"
                                onChange={(e) =>
                                  handelServices(e, "short_film")
                                }
                                checked={services.includes("short_film")}
                              />
                              <label
                                htmlFor="short_film"
                                className="text-lg capitalize cursor-pointer"
                              >
                                short film
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "graphics_designer" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="brochure"
                                onChange={(e) =>
                                  handelServices(e, "brochure_design")
                                }
                                checked={services.includes("brochure_design")}
                              />
                              <label
                                htmlFor="brochure"
                                className="text-lg capitalize cursor-pointer"
                              >
                                brochure design
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="magazine"
                                onChange={(e) =>
                                  handelServices(e, "magazine_design")
                                }
                                checked={services.includes("magazine_design")}
                              />
                              <label
                                htmlFor="magazine"
                                className="text-lg capitalize cursor-pointer"
                              >
                                magazine design
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="website"
                                onChange={(e) =>
                                  handelServices(e, "website_design")
                                }
                                checked={services.includes("website_design")}
                              />
                              <label
                                htmlFor="website"
                                className="text-lg capitalize cursor-pointer"
                              >
                                website design
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="logo"
                                onChange={(e) =>
                                  handelServices(e, "logo_design")
                                }
                                checked={services.includes("logo_design")}
                              />
                              <label
                                htmlFor="logo"
                                className="text-lg capitalize cursor-pointer"
                              >
                                logo design
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="poster"
                                onChange={(e) =>
                                  handelServices(e, "poster_design")
                                }
                                checked={services.includes("poster_design")}
                              />
                              <label
                                htmlFor="poster"
                                className="text-lg capitalize cursor-pointer"
                              >
                                poster
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="hodding"
                                onChange={(e) =>
                                  handelServices(e, "hodding_design")
                                }
                                checked={services.includes("hodding_design")}
                              />
                              <label
                                htmlFor="hodding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                hodding design
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "influencer" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="reels"
                                onChange={(e) =>
                                  handelServices(e, "reels")
                                }
                                checked={services.includes("reels")}
                              />
                              <label
                                htmlFor="reels"
                                className="text-lg capitalize cursor-pointer"
                              >
                                reels
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="post"
                                onChange={(e) =>
                                  handelServices(e, "posts")
                                }
                                checked={services.includes("posts")}
                              />
                              <label
                                htmlFor="post"
                                className="text-lg capitalize cursor-pointer"
                              >
                                post
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="stories"
                                onChange={(e) =>
                                  handelServices(e, "stories")
                                }
                                checked={services.includes("stories")}
                              />
                              <label
                                htmlFor="stories"
                                className="text-lg capitalize cursor-pointer"
                              >
                                stories
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="youtube_videoes"
                                onChange={(e) =>
                                  handelServices(e, "youtube_videoes")
                                }
                                checked={services.includes("youtube_videoes")}
                              />
                              <label
                                htmlFor="youtube_videoes"
                                className="text-lg capitalize cursor-pointer"
                              >
                                youtube videoes
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "maid" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="cooking"
                                onChange={(e) =>
                                  handelServices(e, "cooking")
                                }
                                checked={services.includes("cooking")}
                              />
                              <label
                                htmlFor="cooking"
                                className="text-lg capitalize cursor-pointer"
                              >
                                cooking
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="moping"
                                onChange={(e) =>
                                  handelServices(e, "moping")
                                }
                                checked={services.includes("moping")}
                              />
                              <label
                                htmlFor="moping"
                                className="text-lg capitalize cursor-pointer"
                              >
                                moping
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="cloth_washing"
                                onChange={(e) =>
                                  handelServices(e, "cloth_washing")
                                }
                                checked={services.includes("cloth_washing")}
                              />
                              <label
                                htmlFor="cloth_washing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                cloth washing
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="dish_washing"
                                onChange={(e) =>
                                  handelServices(e, "dish_washing")
                                }
                                checked={services.includes("dish_washing")}
                              />
                              <label
                                htmlFor="dish_washing"
                                className="text-lg capitalize cursor-pointer"
                              >
                                dish washing
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "makeup_artist" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="bridal"
                                onChange={(e) =>
                                  handelServices(e, "bridal_makeup")
                                }
                                checked={services.includes("bridal_makeup")}
                              />
                              <label
                                htmlFor="bridal"
                                className="text-lg capitalize cursor-pointer"
                              >
                                bridal
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="fashion_shoot"
                                onChange={(e) =>
                                  handelServices(e, "fashion_shoot")
                                }
                                checked={services.includes("fashion_shoot")}
                              />
                              <label
                                htmlFor="fashion_shoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                fashion shoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="fashion_show"
                                onChange={(e) =>
                                  handelServices(e, "fashion_show")
                                }
                                checked={services.includes("fashion_show")}
                              />
                              <label
                                htmlFor="fashion_show"
                                className="text-lg capitalize cursor-pointer"
                              >
                                fashion show
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="party_makeup"
                                onChange={(e) =>
                                  handelServices(e, "party_makeup")
                                }
                                checked={services.includes("party_makeup")}
                              />
                              <label
                                htmlFor="party_makeup"
                                className="text-lg capitalize cursor-pointer"
                              >
                                party makeup
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "model" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="fashion_show"
                                onChange={(e) =>
                                  handelServices(e, "fashion_show")
                                }
                                checked={services.includes("fashion_show")}
                              />
                              <label
                                htmlFor="fashion_show"
                                className="text-lg capitalize cursor-pointer"
                              >
                                fashion show
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="bridal"
                                onChange={(e) =>
                                  handelServices(e, "bridal_shoot")
                                }
                                checked={services.includes("bridal_shoot")}
                              />
                              <label
                                htmlFor="bridal"
                                className="text-lg capitalize cursor-pointer"
                              >
                                bridal
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="ramp_show"
                                onChange={(e) =>
                                  handelServices(e, "ramp_show")
                                }
                                checked={services.includes("ramp_show")}
                              />
                              <label
                                htmlFor="ramp_show"
                                className="text-lg capitalize cursor-pointer"
                              >
                                ramp show
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="music_video"
                                onChange={(e) =>
                                  handelServices(e, "music_video")
                                }
                                checked={services.includes("music_video")}
                              />
                              <label
                                htmlFor="music_video"
                                className="text-lg capitalize cursor-pointer"
                              >
                                music video
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="tvc_ad"
                                onChange={(e) =>
                                  handelServices(
                                    e,
                                    "television_commercial_ads"
                                  )
                                }
                                checked={services.includes("television_commercial_ads")}
                              />
                              <label
                                htmlFor="tvc_ad"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Television Commercial Ads
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="short_film"
                                onChange={(e) =>
                                  handelServices(e, "short_film")
                                }
                                checked={services.includes("short_film")}
                              />
                              <label
                                htmlFor="short_film"
                                className="text-lg capitalize cursor-pointer"
                              >
                                short film
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="hodding_shoot"
                                onChange={(e) =>
                                  handelServices(e, "hodding_shoot")
                                }
                                checked={services.includes("hodding_shoot")}
                              />
                              <label
                                htmlFor="hodding_shoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                hodding shoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="bikini_shoot"
                                onChange={(e) =>
                                  handelServices(e, "bikini_shoot")
                                }
                                checked={services.includes("bikini_shoot")}
                              />
                              <label
                                htmlFor="bikini_shoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                bikini shoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="monokini_shoot"
                                onChange={(e) =>
                                  handelServices(e, "monokini_shoot")
                                }
                                checked={services.includes("monokini_shoot")}
                              />
                              <label
                                htmlFor="monokini_shoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                monokini shoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="semi_nude_shoot"
                                onChange={(e) =>
                                  handelServices(e, "semi_nude_shoot")
                                }
                                checked={services.includes("semi_nude_shoot")}
                              />
                              <label
                                htmlFor="semi_nude_shoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                semi nude shoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="bold_shoot"
                                onChange={(e) =>
                                  handelServices(e, "bold_shoot")
                                }
                                checked={services.includes("bold_shoot")}
                              />
                              <label
                                htmlFor="bold_shoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                bold shoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="nude_shoot"
                                onChange={(e) =>
                                  handelServices(e, "nude_shoot")
                                }
                                checked={services.includes("nude_shoot")}
                              />
                              <label
                                htmlFor="nude_shoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                nude shoot
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "musician" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="pianist"
                                onChange={(e) =>
                                  handelServices(e, "pianist")
                                }
                                checked={services.includes("pianist")}
                              />
                              <label
                                htmlFor="pianist"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Pianist
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="guitarist"
                                onChange={(e) =>
                                  this.handelServices(e, "guitarist")
                                }
                                checked={services.includes("guitarist")}
                              />
                              <label
                                htmlFor="guitarist"
                                className="text-lg capitalize cursor-pointer"
                              >
                                guitarist
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="violinist"
                                onChange={(e) =>
                                  handelServices(e, "violinist")
                                }
                                checked={services.includes("violinist")}
                              />
                              <label
                                htmlFor="violinist"
                                className="text-lg capitalize cursor-pointer"
                              >
                                violinist
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="Cellist"
                                onChange={(e) =>
                                  handelServices(e, "cellist")
                                }
                                checked={services.includes("cellist")}
                              />
                              <label
                                htmlFor="Cellist"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Cellist
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="flutist"
                                onChange={(e) =>
                                  handelServices(e, "flutist")
                                }
                                checked={services.includes("flutist")}
                              />
                              <label
                                htmlFor="flutist"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Flutist
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="trumpeter"
                                onChange={(e) =>
                                  handelServices(e, "trumpeter")
                                }
                                checked={services.includes("trumpeter")}
                              />
                              <label
                                htmlFor="trumpeter"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Trumpeter
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="saxophonist"
                                onChange={(e) =>
                                  handelServices(e, "saxophonist")
                                }
                                checked={services.includes("saxophonist")}
                              />
                              <label
                                htmlFor="saxophonist"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Saxophonist
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="drummer"
                                onChange={(e) =>
                                  handelServices(e, "drummer")
                                }
                                checked={services.includes("drummer")}
                              />
                              <label
                                htmlFor="drummer"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Drummer
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="bassist"
                                onChange={(e) =>
                                  handelServices(e, "bassist")
                                }
                                checked={services.includes("bassist")}
                              />
                              <label
                                htmlFor="bassist"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Bassist
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="harpist"
                                onChange={(e) =>
                                  handelServices(e, "harpist")
                                }
                                checked={services.includes("harpist")}
                              />
                              <label
                                htmlFor="harpist"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Harpist
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="percussionist"
                                onChange={(e) =>
                                  handelServices(e, "percussionist")
                                }
                                checked={services.includes("percussionist")}
                              />
                              <label
                                htmlFor="percussionist"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Percussionist
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "music_teacher" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="classical_music"
                                onChange={(e) =>
                                  handelServices(e, "classical_music")
                                }
                                checked={services.includes("classical_music")}
                              />
                              <label
                                htmlFor="classical_music"
                                className="text-lg capitalize cursor-pointer"
                              >
                                classical music
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="rock"
                                onChange={(e) =>
                                  handelServices(e, "rock_music")
                                }
                                checked={services.includes("rock_music")}
                              />
                              <label
                                htmlFor="rock"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Rock
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="pop"
                                onChange={(e) =>
                                  handelServices(e, "pop_music")
                                }
                                checked={services.includes("pop_music")}
                              />
                              <label
                                htmlFor="pop"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Pop
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="blues"
                                onChange={(e) =>
                                  handelServices(e, "blues")
                                }
                                checked={services.includes("blues")}
                              />
                              <label
                                htmlFor="blues"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Blues
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="country"
                                onChange={(e) =>
                                  handelServices(e, "country_music")
                                }
                                checked={services.includes("country_music")}
                              />
                              <label
                                htmlFor="country"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Country
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="folk"
                                onChange={(e) =>
                                  handelServices(e, "folk_music")
                                }
                                checked={services.includes("folk_music")}
                              />
                              <label
                                htmlFor="folk"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Folk
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="world_music"
                                onChange={(e) =>
                                  handelServices(e, "world_music")
                                }
                                checked={services.includes("world_music")}
                              />
                              <label
                                htmlFor="world_music"
                                className="text-lg capitalize cursor-pointer"
                              >
                                World Music
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="digital_music"
                                onChange={(e) =>
                                  handelServices(e, "digital_music")
                                }
                                checked={services.includes("digital_music")}
                              />
                              <label
                                htmlFor="digital_music"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Digital Music
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="hip-hop"
                                onChange={(e) =>
                                  handelServices(e, "hip_hop")
                                }
                                checked={services.includes("hip_hop")}
                              />
                              <label
                                htmlFor="hip-hop"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Hip-Hop
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="rhythm_and_blues"
                                onChange={(e) =>
                                  handelServices(e, "rhythm_and_blues")
                                }
                                checked={services.includes("rhythm_and_blues")}
                              />
                              <label
                                htmlFor="rhythm_and_blues"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Rhythm and Blues
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="gospel"
                                onChange={(e) =>
                                  handelServices(e, "gospel")
                                }
                                checked={services.includes("gospel")}
                              />
                              <label
                                htmlFor="gospel"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Gospel
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="reggae"
                                onChange={(e) =>
                                  handelServices(e, "reggae")
                                }
                                checked={services.includes("reggae")}
                              />
                              <label
                                htmlFor="reggae"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Reggae
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="metal"
                                onChange={(e) =>
                                  handelServices(e, "metal")
                                }
                                checked={services.includes("metal")}
                              />
                              <label
                                htmlFor="metal"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Metal
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="indie"
                                onChange={(e) =>
                                  handelServices(e, "indie")
                                }
                                checked={services.includes("indie")}
                              />
                              <label
                                htmlFor="indie"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Indie
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "painter" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="portrait"
                                onChange={(e) =>
                                  handelServices(e, "portrait")
                                }
                                checked={services.includes("portrait")}
                              />
                              <label
                                htmlFor="portrait"
                                className="text-lg capitalize cursor-pointer"
                              >
                                portrait
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="wall_painting"
                                onChange={(e) =>
                                  handelServices(e, "wall_painting")
                                }
                                checked={services.includes("wall_painting")}
                              />
                              <label
                                htmlFor="wall_painting"
                                className="text-lg capitalize cursor-pointer"
                              >
                                wall painting
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="family_portrait"
                                onChange={(e) =>
                                  handelServices(e, "family_portrait")
                                }
                                checked={services.includes("family_portrait")}
                              />
                              <label
                                htmlFor="family_portrait"
                                className="text-lg capitalize cursor-pointer"
                              >
                                family portrait
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "photographer" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="weeding"
                                onChange={(e) =>
                                  handelServices(e, "family_portrait")
                                }
                                checked={services.includes("family_portrait")}
                              />
                              <label
                                htmlFor="weeding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                weeding ceremony
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="pre-weeding"
                                onChange={(e) =>
                                  handelServices(e, "pre_weeding_ceremony")
                                }
                                checked={services.includes("pre_weeding_ceremony")}
                              />
                              <label
                                htmlFor="pre-weeding"
                                className="text-lg capitalize cursor-pointer"
                              >
                                pre weeding ceremony
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="corporate"
                                onChange={(e) =>
                                  handelServices(e, "corporate_events")
                                }
                                checked={services.includes("corporate_events")}
                              />
                              <label
                                htmlFor="corporate"
                                className="text-lg capitalize cursor-pointer"
                              >
                                corporate events
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="personal_parties"
                                onChange={(e) =>
                                  handelServices(e, "personal_parties")
                                }
                                checked={services.includes("personal_parties")}
                              />
                              <label
                                htmlFor="personal_parties"
                                className="text-lg capitalize cursor-pointer"
                              >
                                personal parties
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="portfolio"
                                onChange={(e) =>
                                  handelServices(e, "portfolio_shoot")
                                }
                                checked={services.includes("portfolio_shoot")}
                              />
                              <label
                                htmlFor="portfolio"
                                className="text-lg capitalize cursor-pointer"
                              >
                                portfolio
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="new_born_baby_shoot"
                                onChange={(e) =>
                                  handelServices(e, "new_born_baby_shoot")
                                }
                                checked={services.includes("new_born_baby_shoot")}
                              />
                              <label
                                htmlFor="new_born_baby_shoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                new born baby shoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="baby_shoot"
                                onChange={(e) =>
                                  handelServices(e, "baby_shoot")
                                }
                                checked={services.includes("baby_shoot")}
                              />
                              <label
                                htmlFor="baby_shoot"
                                className="text-lg capitalize cursor-pointer"
                              >
                                baby shoot
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="mundan"
                                onChange={(e) =>
                                  handelServices(e, "mundan")
                                }
                                checked={services.includes("mundan")}
                              />
                              <label
                                htmlFor="mundan"
                                className="text-lg capitalize cursor-pointer"
                              >
                                mundan
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="upanayan"
                                onChange={(e) =>
                                  handelServices(e, "upanayan")
                                }
                                checked={services.includes("upanayan")}
                              />
                              <label
                                htmlFor="upanayan"
                                className="text-lg capitalize cursor-pointer"
                              >
                                upanayan
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="rice_ceremony"
                                onChange={(e) =>
                                  handelServices(e, "rice_ceremony")
                                }
                                checked={services.includes("rice_ceremony")}
                              />
                              <label
                                htmlFor="rice_ceremony"
                                className="text-lg capitalize cursor-pointer"
                              >
                                rice ceremony
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="birthday_party"
                                onChange={(e) =>
                                  handelServices(e, "birthday_party")
                                }
                                checked={services.includes("birthday_party")}
                              />
                              <label
                                htmlFor="birthday_party"
                                className="text-lg capitalize cursor-pointer"
                              >
                                birthday party
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "private_tutor" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="arts"
                                onChange={(e) => handelServices(e, "arts")}
                                checked={services.includes("arts")}
                              />
                              <label
                                htmlFor="arts"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Arts
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="commerce"
                                onChange={(e) =>
                                  handelServices(e, "commerce")
                                }
                                checked={services.includes("commerce")}
                              />
                              <label
                                htmlFor="commerce"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Commerce
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="science"
                                onChange={(e) =>
                                  handelServices(e, "science")
                                }
                                checked={services.includes("science")}
                              />
                              <label
                                htmlFor="science"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Science
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "vocalist" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="soprano"
                                onChange={(e) =>
                                  handelServices(e, "soprano")
                                }
                                checked={services.includes("soprano")}
                              />
                              <label
                                htmlFor="soprano"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Soprano
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="alto"
                                onChange={(e) => handelServices(e, "alto")}
                                checked={services.includes("alto")}
                              />
                              <label
                                htmlFor="alto"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Alto
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="tenor"
                                onChange={(e) =>
                                  handelServices(e, "tenor")
                                }
                                checked={services.includes("tenor")}
                              />
                              <label
                                htmlFor="tenor"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Tenor
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="bass"
                                onChange={(e) => this.handelServices(e, "bass")}
                                checked={services.includes("bass")}
                              />
                              <label
                                htmlFor="bass"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Bass
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="baritone"
                                onChange={(e) =>
                                  handelServices(e, "baritone")
                                }
                                checked={services.includes("baritone")}
                              />
                              <label
                                htmlFor="baritone"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Baritone
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="mezzo-soprano"
                                onChange={(e) =>
                                  this.handelServices(e, "mezzo-soprano")
                                }
                                checked={services.includes("mezzo-soprano")}
                              />
                              <label
                                htmlFor="mezzo-soprano"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Mezzo-soprano
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="countertenor"
                                onChange={(e) =>
                                  this.handelServices(e, "countertenor")
                                }
                                checked={services.includes("countertenor")}
                              />
                              <label
                                htmlFor="countertenor"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Countertenor
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "voice_over_artist" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="short_film"
                                onChange={(e) =>
                                  handelServices(e, "short_film")
                                }
                                checked={services.includes("short_film")}
                              />
                              <label
                                htmlFor="short_film"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Short film
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="audio_podcast"
                                onChange={(e) =>
                                  handelServices(e, "audio_podcast")
                                }
                                checked={services.includes("audio_podcast")}
                              />
                              <label
                                htmlFor="audio_podcast"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Audio podcast
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="film"
                                onChange={(e) => handelServices(e, "film")}
                                checked={services.includes("film")}
                              />
                              <label
                                htmlFor="film"
                                className="text-lg capitalize cursor-pointer"
                              >
                                film
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="animation_film"
                                onChange={(e) =>
                                  handelServices(e, "animation_film")
                                }
                                checked={services.includes("animation_film")}
                              />
                              <label
                                htmlFor="animation_film"
                                className="text-lg capitalize cursor-pointer"
                              >
                                animation film
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="advertising"
                                onChange={(e) =>
                                  handelServices(e, "advertisement")
                                }
                                checked={services.includes("advertisement")}
                              />
                              <label
                                htmlFor="advertising"
                                className="text-lg capitalize cursor-pointer"
                              >
                                advertising
                              </label>
                            </div>
                          </div>
                        )}
                        {profession === "web_developer" && (
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="wordpress"
                                onChange={(e) =>
                                  handelServices(e, "wordpress")
                                }
                                checked={services.includes("wordpress")}
                              />
                              <label
                                htmlFor="wordpress"
                                className="text-lg capitalize cursor-pointer"
                              >
                                wordpress
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="wix"
                                onChange={(e) => handelServices(e, "wix")}
                                checked={services.includes("wix")}
                              />
                              <label
                                htmlFor="wix"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Wix
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="squarespace"
                                onChange={(e) =>
                                  handelServices(e, "squarespace")
                                }
                                checked={services.includes("squarespace")}
                              />
                              <label
                                htmlFor="squarespace"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Squarespace
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="weebly"
                                onChange={(e) =>
                                  handelServices(e, "weebly")
                                }
                                checked={services.includes("weebly")}
                              />
                              <label
                                htmlFor="weebly"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Weebly
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="shopify"
                                onChange={(e) =>
                                  handelServices(e, "shopify")
                                }
                                checked={services.includes("shopify")}
                              />
                              <label
                                htmlFor="shopify"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Shopify
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="webflow"
                                onChange={(e) =>
                                  handelServices(e, "webflow")
                                }
                                checked={services.includes("webflow")}
                              />
                              <label
                                htmlFor="webflow"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Webflow
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="elementor"
                                onChange={(e) =>
                                  handelServices(e, "elementor")
                                }
                                checked={services.includes("elementor")}
                              />
                              <label
                                htmlFor="elementor"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Elementor
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="jimdo"
                                onChange={(e) =>
                                  handelServices(e, "jimdo")
                                }
                                checked={services.includes("jimdo")}
                              />
                              <label
                                htmlFor="jimdo"
                                className="text-lg capitalize cursor-pointer"
                              >
                                Jimdo
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="mean"
                                onChange={(e) => handelServices(e, "mean")}
                                checked={services.includes("mean")}
                              />
                              <label
                                htmlFor="mean"
                                className="text-lg cursor-pointer"
                              >
                                MEAN
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="mern"
                                onChange={(e) => handelServices(e, "mern")}
                                checked={services.includes("mern")}
                              />
                              <label
                                htmlFor="mern"
                                className="text-lg cursor-pointer"
                              >
                                MERN
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="mevn"
                                onChange={(e) => handelServices(e, "mevn")}
                                checked={services.includes("mevn")}
                              />
                              <label
                                htmlFor="mevn"
                                className="text-lg cursor-pointer"
                              >
                                MEVN
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-6 h-6"
                                name=""
                                id="static"
                                onChange={(e) =>
                                  handelServices(e, "static")
                                }
                                checked={services.includes("static")}
                              />
                              <label
                                htmlFor="static"
                                className="text-lg capitalize cursor-pointer"
                              >
                                static
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
                <div className="flex flex-col justify-center w-full relative">
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
                    onChange={(e) => {
                      setWarns((prev) => ({ ...prev, bioError: false }));
                      setBio(e.target.value);
                    }}
                    className="border border-[#d3d3d3] p-4 h-40 resize-none"
                  ></textarea>
                  {warns.bioError && (
                    <p className="text-xs font-bold text-red-600 mt-2 text-center md:absolute bottom-0 left-0">
                      Bio length should be greater than 50 and less than 200
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-center w-full relative">
                  <label
                    htmlFor="equipments"
                    className="text-base lg:text-lg p-4 pl-0 capitalize text-center lg:text-left"
                  >
                    {(profession === "photgrapher" ||
                      profession === "drone_operator" ||
                      profession === "cinematographer" ||
                      profession === "musician") &&
                      "equipments"}
                    {(profession === "makeup_artist" ||
                      profession === "mehendi_artist") &&
                      "Products Use"}
                    {(profession === "model" ||
                      profession === "anchor" ||
                      profession === "dj" ||
                      profession === "dancer" ||
                      profession === "influencer" ||
                      profession === "private_tutor" ||
                      profession === "dance_teacher" ||
                      profession === "music_teacher" ||
                      profession === "drawing_teacher" ||
                      profession === "painter" ||
                      profession === "lyricist" ||
                      profession === "voice_over_artist" ||
                      profession === "vocalist" ||
                      profession === "fashion_designer" ||
                      profession === "actor" ||
                      profession === "actress" ||
                      profession === "babysitter" ||
                      profession === "interior_designer" ||
                      profession === "maid") &&
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
                    onChange={(e) => {
                      setWarns((prev) => ({ ...prev, equipmentsError: false }));
                      setEquipments(e.target.value);
                    }}
                    className="border border-[#d3d3d3] p-4 h-40 resize-none"
                  ></textarea>
                  {warns.equipmentsError && (
                    <p className="text-xs font-bold text-red-600 mt-2 text-center md:absolute bottom-0 left-0">
                      {(profession === "photgrapher" ||
                        profession === "drone_operator" ||
                        profession === "cinematographer") &&
                        "equipments length should be greater than 50 and less than 200"}
                      {(profession === "makeup_artist" ||
                        profession === "mehendi_artist") &&
                        "Products Use length should be  50 and less  200"}
                      {(profession === "model" ||
                        profession === "anchor" ||
                        profession === "dj" ||
                        profession === "dancer" ||
                        profession === "influencer" ||
                        profession === "private_tutor") &&
                        "Describe work experience length should be  50 and less  200"}
                      {(profession === "photo_editor" ||
                        profession === "video_editor" ||
                        profession === "album_designer" ||
                        profession === "graphics_designer") &&
                        "Software Knowledge length should be  50 and less  200"}
                      {profession === "web_developer" &&
                        "Fimiliar Language length should be  50 and less  200"}
                    </p>
                  )}
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
      <Footer premium={props.user?.premium} />
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
