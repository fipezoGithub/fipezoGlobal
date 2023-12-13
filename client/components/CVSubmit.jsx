import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";

const CVSubmit = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fileAttached, setFileAttached] = useState(false);
  const [cv, setCV] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitResume = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(false);
      const data = new FormData();
      data.append("phone", number);
      data.append("name", fname + " " + lname);
      data.append("email", email);
      data.append("carrerCV", cv);
      data.append("proffesion", "Drop CV");
      const res = await fetch(`${process.env.SERVER_URL}/carrer/apply`, {
        method: "POST",
        body: data,
      });
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      setFileAttached(false);
      return;
    }

    reader.onloadend = () => {
      setFileAttached(true);
    };

    reader.readAsDataURL(file);
    setCV(file);
  };

  return (
    <div className="fixed top-0 left-0 bg-[#0000001f] w-full h-full flex items-center justify-center z-[1200]">
      <div className="bg-white p-4 md:p-8 flex flex-col items-center justify-center rounded-3xl gap-4 md:w-[40rem] md:h-[30rem]">
        <h2 className="text-2xl md:text-4xl capitalize font-bold">
          join fipezo team
        </h2>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={submitResume}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 md:gap-x-8">
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="fname"
                className="text-base md:text-lg capitalize font-bold"
              >
                first name
              </label>
              <input
                type="text"
                id="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="Enter your first name"
                className="px-1 py-2 focus:outline-none border-b"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="lname"
                className="text-base md:text-lg capitalize font-bold"
              >
                last name
              </label>
              <input
                type="text"
                id="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Enter your last name"
                className="px-1 py-2 focus:outline-none border-b"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 md:gap-x-8">
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="phone"
                className="text-base md:text-lg capitalize font-bold"
              >
                phone number
              </label>
              <input
                type="tel"
                id="phone"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="px-1 py-2 focus:outline-none border-b"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="mail"
                className="text-base md:text-lg capitalize font-bold"
              >
                email
              </label>
              <input
                type="email"
                id="mail"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-1 py-2 focus:outline-none border-b"
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-y-4">
            <label
              htmlFor=""
              className="text-base md:text-lg capitalize font-bold"
            >
              drop resume below
            </label>
            <label
              htmlFor="cv"
              className={
                "px-0 w-full md:w-auto flex md:block items-center justify-center md:px-20 py-2 md:py-6 border border-black rounded-xl md:rounded-3xl text-2xl md:text-5xl cursor-pointer " +
                (fileAttached ? " bg-green-300" : " bg-gray-300")
              }
            >
              {fileAttached ? <IoCheckmark /> : <GoPlus />}
            </label>
            <input
              type="file"
              id="cv"
              onChange={(e) => fileChange(e)}
              accept="application/pdf"
              className="hidden"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-3 md:px-6 md:py-1 py-2 capitalize border border-red-600 rounded-lg text-red-600 hover:text-white hover:border-transparent font-semibold hover:bg-red-600"
              onClick={() => props.closeModal(false)}
            >
              close&nbsp;
            </button>
            <button
              type="submit"
              className="px-3 md:px-6 md:py-1 py-2 capitalize border border-blue-600 rounded-lg text-blue-600 hover:text-white hover:border-transparent font-semibold hover:bg-blue-600"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CVSubmit;
