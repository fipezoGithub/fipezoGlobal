import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { GoLocation } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { RiStore2Line } from "react-icons/ri";

const Jobheader = () => {
  const [options, setOptions] = useState([
    "Actor",
    "Actress",
    "Album Designer",
    "Anchor",
    "Babysitter",
    "Cinematographer",
    "Dancer",
    "Dance Teacher",
    "DJ",
    "Drawing Teacher",
    "Drone Operator",
    "Fashion Designer",
    "Graphics Designer",
    "Influencer",
    "Interior Designer",
    "Lyricist",
    "Maid",
    "Makeup Artist",
    "Mehendi Artist",
    "Model",
    "Musician",
    "Music Teacher",
    "Painter",
    "Photographer",
    "Photo Editor",
    "Private Tutor",
    "Video Editor",
    "Vocalist",
    "Voice Over Artist",
    "Web Developer",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState([
    "Agra",
    "Ahmedabad",
    "Amritsar",
    "Aurangabad",
    "Bengaluru",
    "Bhopal",
    "Bhubaneswar",
    "Burdwan",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Dehradun",
    "Delhi",
    "Dhanbad",
    "Durgapur",
    "Faridabad",
    "Ghaziabad",
    "Guwahati",
    "Gwalior",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Jamshedpur",
    "Jodhpur",
    "Kanpur",
    "Kochi",
    "Kolkata",
    "Lucknow",
    "Ludhiana",
    "Madurai",
    "Mangaluru",
    "Meerut",
    "Mumbai",
    "Mysuru",
    "Nagpur",
    "Nashik",
    "New_Delhi",
    "Navi_Mumbai",
    "Patna",
    "Prayagraj",
    "Puducherry",
    "Pune",
    "Raipur",
    "Rajkot",
    "Ranchi",
    "Siliguri",
    "Surat",
    "Thane",
    "Thiruvananthapuram",
    "Udaipur",
    "Vadodara",
    "Varanasi",
    "Vijayawada",
    "Visakhapatnam",
    "Warangal",
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cityTerm, setCityTerm] = useState("");
  const [showDropDownCategory, setShowDropDownCategory] = useState(false);
  const [showDropDownCity, setShowDropDownCity] = useState(false);
  const router = useRouter();
  const errorBoxRef = useRef();

  const handleSearch = (event) => {
    if (cityTerm.length <= 0) {
      setErrorMessage("Please enter a city");
      errorBoxRef.current.style.transform = "translateY(-100%)";
      setTimeout(() => {
        errorBoxRef.current.removeAttribute("style");
        setErrorMessage("");
      }, 3000);
      return;
    }
    router.push(
      `/jobs/${cityTerm.split(" ").join("_")}/${searchTerm
        .split(" ")
        .join("_")}`
    );
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCity = city.filter((option) =>
    option.toLowerCase().includes(cityTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row my-4 bg-white md:bg-inherit px-2 md:px-0 py-2 md:py-0 z-[100] shadow-md md:shadow-none rounded-md md:rounded-none gap-3 md:gap-0 border">
      <div className="relative group overflow-visible lg:max-h-8">
        <div className="flex items-center border md:border-0 rounded-md md:rounded-none md:rounded-l-md px-4">
          <GoLocation color="#000000" size={"1.5em"} />
          <input
            type="text"
            name=""
            id=""
            value={cityTerm.split("_").join(" ")}
            onChange={(e) => {
              setCityTerm(e.target.value);
              if (e.target.value.length > 0) {
                setShowDropDownCity(true);
              }
            }}
            onClick={() => {
              setCityTerm("");
              setShowDropDownCity(!showDropDownCity);
              setShowDropDownCategory(false);
            }}
            placeholder="Select city"
            className="py-4 px-2 focus:outline-none placeholder:text-black placeholder:font-semibold"
          />
          <IoIosArrowDown color="#000000" size={"1.5em"} />
        </div>
        {showDropDownCity === true && (
          <div className=" w-full z-[1100] relative h-80 overflow-hidden overflow-y-scroll bg-white border border-t-0 shadow-md">
            <span className="text-left block ml-2 mb-2 capitalize text-xs font-semibold">
              major cities
            </span>
            {filteredCity.length > 0 &&
              filteredCity.map((option, index) => {
                if (
                  option === "Bengaluru" ||
                  option === "Bhubaneswar" ||
                  option === "Chennai" ||
                  option === "Delhi" ||
                  option === "Hyderabad" ||
                  option === "Kolkata" ||
                  option === "Mumbai"
                ) {
                  return (
                    <p
                      onClick={() => {
                        setCityTerm(option);
                        setShowDropDownCity(false);
                        if (searchTerm.length <= 0) {
                          setShowDropDownCategory(true);
                        }
                      }}
                      className="cursor-pointer text-left p-2 flex items-center gap-2 hover:bg-blue-100 hover:text-black"
                      key={index}
                    >
                      <GoLocation color="#000000" />
                      {option.split("_").join(" ")}
                    </p>
                  );
                }
              })}
            <span className="text-left block ml-2 mb-2 capitalize text-xs font-semibold">
              other cities
            </span>
            {filteredCity.length > 0 &&
              filteredCity.map((option, index) => {
                if (
                  option !== "Bengaluru" &&
                  option !== "Bhubaneswar" &&
                  option !== "Chennai" &&
                  option !== "Delhi" &&
                  option !== "Hyderabad" &&
                  option !== "Kolkata" &&
                  option !== "Mumbai"
                ) {
                  return (
                    <p
                      onClick={() => {
                        setCityTerm(option);
                        setShowDropDownCity(false);
                        if (searchTerm.length <= 0) {
                          setShowDropDownCategory(true);
                        }
                      }}
                      className="cursor-pointer text-left p-2 flex items-center gap-2 hover:bg-blue-100 hover:text-black"
                      key={index}
                    >
                      <GoLocation color="#000000" />
                      {option.split("_").join(" ")}
                    </p>
                  );
                }
              })}
          </div>
        )}
        <div
          className="absolute left-0 top-0 text-white flex items-center p-4 gap-2 justify-center translate-y-0 -z-10 transition-transform duration-500 ease-linear w-full rounded-l-lg"
          ref={errorBoxRef}
        >
          <IoWarning size={"1.5em"} />
          <h1 className="font-bold">{errorMessage}</h1>
        </div>
      </div>
      <div className="relative group overflow-visible lg:max-h-8">
        <div
          className="flex items-center px-2 md:px-4 border md:border-r md:border-0 rounded-md md:rounded-none w-full md:w-auto"
          onClick={() => {
            setSearchTerm("");
            setShowDropDownCategory(!showDropDownCategory);
            setShowDropDownCity(false);
          }}
        >
          <RiStore2Line color="#000000" size={"1.5em"} />
          <input
            type="text"
            name=""
            value={searchTerm
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value.length > 0) {
                setShowDropDownCategory(true);
              }
            }}
            id="freelancer_category"
            placeholder="Enter freelancer category"
            className="py-4 px-2 focus:outline-none placeholder:text-black placeholder:font-semibold"
          />
          <input type="text" disabled className="hidden lg:block w-20" />
          <IoIosArrowDown color="#000000" size={"1.5em"} />
        </div>
        {showDropDownCategory === true && (
          <div className="w-full z-[1100] relative h-80 overflow-hidden overflow-y-scroll bg-white border border-t-0 shadow-md">
            {filteredOptions.length > 0 &&
              filteredOptions.map((option, index) => {
                let value = option;
                if (value === "Photographer") value = "photographer";
                else if (value === "Cinematographer") value = "cinematographer";
                else if (value === "Drone Operator") value = "drone_operator";
                else if (value === "Photo Editor") value = "photo_editor";
                else if (value === "Video Editor") value = "video_editor";
                else if (value === "Album Designer") value = "album_designer";
                else if (value === "Model") value = "model";
                else if (value === "Makeup Artist") value = "makeup_artist";
                else if (value === "Mehendi Artist") value = "mehendi_artist";
                else if (value === "Anchor") value = "anchor";
                else if (value === "Web Developer") value = "web_developer";
                else if (value === "DJ") value = "dj";
                else if (value === "Dancer") value = "dancer";
                else if (value === "Influencer") value = "influencer";
                else if (value === "Private Tutor") value = "private_tutor";
                else if (value === "Dance Teacher") value = "dance_teacher";
                else if (value === "Music Teacher") value = "music_teacher";
                else if (value === "Musician") value = "musician";
                else if (value === "Drawing Teacher") value = "drawing_teacher";
                else if (value === "Painter") value = "painter";
                else if (value === "Lyricist") value = "lyricist";
                else if (value === "Vocalist") value = "vocalist";
                else if (value === "Actor") value = "actor";
                else if (value === "Actress") value = "actress";
                else if (value === "Babysitter") value = "babysitter";
                else if (value === "Maid") value = "maid";
                else if (value === "Interior Designer")
                  value = "interior_designer";
                else if (value === "Fashion Designer")
                  value = "fashion_designer";
                else if (value === "Voice Over Artist")
                  value = "voice_over_artist";
                else if (value === "Graphics Designer")
                  value = "graphics_designer";
                return (
                  <p
                    onClick={() => {
                      setSearchTerm(option);
                      setSearchTerm(value);
                      setShowDropDownCategory(false);
                      if (cityTerm.length === 0) {
                        setShowDropDownCity(true);
                      }
                    }}
                    className="text-left p-2 cursor-pointer flex items-center gap-2 hover:bg-blue-100 hover:text-black"
                    key={index}
                  >
                    <RiStore2Line color="#000000" />
                    {option}
                  </p>
                );
              })}
          </div>
        )}
      </div>
      <div className="rounded-r-md">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-[#ff6767] text-white py-2 md:py-4 px-8 md:px-4 capitalize font-semibold w-full md:w-auto rounded-md md:rounded-none md:rounded-r-md flex items-center text-base gap-2 justify-center md:justify-normal"
        >
          find job
        </button>
      </div>
    </div>
  );
};

export default Jobheader;
