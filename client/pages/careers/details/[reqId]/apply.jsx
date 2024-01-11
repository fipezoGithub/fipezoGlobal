import DialogBox from "@/components/DialogBox";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/carrer/${ctx.query.reqId}`
  );
  const data = await response.json();
  return { props: { data } };
};
const Apply = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fileAttached, setFileAttached] = useState(false);
  const [cv, setCV] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const router = useRouter();

  const submitResume = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(false);
      const data = new FormData();
      data.append("phone", number);
      data.append("name", fname + " " + lname);
      data.append("email", email);
      data.append("carrerCV", cv);
      data.append("proffesion", props.data.title);
      const res = await fetch(
        `${process.env.SERVER_URL}/carrer/apply/${router.query.reqId}`,
        {
          method: "PUT",
          body: data,
        }
      );
      const response = await res.json();
      setShowDialogBox(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) {
      setFileAttached("");
      return;
    }

    reader.onloadend = () => {
      setFileAttached(file.name);
    };

    reader.readAsDataURL(file);
    setCV(file);
  };

  const handelDialog = () => {
    setShowDialogBox(false);
    router.back();
  };

  return (
    <>
      <Head>
        <title>Fipezo | Join Our Team at Fipezo</title>
        <meta
          name="description"
          content="At Fipezo, we believe that our people are the driving force behind our success. If you're looking for more than just a job, but a meaningful career where you can make a real impact, you've come to the right place.Join our team and be part of a dynamic and innovative company that values your skills, talents, and aspirations. Our commitment to excellence, diversity, and inclusion makes Fipezo a fantastic place to grow professionally and personally."
        />
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 flex items-start justify-center px-6 py-3">
        <div className="self-stretch hidden md:block rounded-l-lg">
          <Image
            src="/jobApplyPageBG.png"
            alt="Apply Job"
            width={307}
            height={150}
            className="h-full"
          />
        </div>
        <form
          className="flex flex-col items-start gap-4 bg-gray-200 px-4 py-4 md:rounded-r-lg"
          onSubmit={submitResume}
        >
          <div className=" flex flex-col items-start gap-2">
            <h2 className="text-2xl font-semibold">just one last thing</h2>
            <p className="md:w-[35vw] text-sm font-semibold">
              we require your basic details to proceed with the application.
              this information helps us evaluate your application.
            </p>
          </div>
          <hr className="h-0.5 w-full" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
                className="px-1 py-2 focus:outline-none border-b bg-transparent"
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
                className="px-1 py-2 focus:outline-none border-b bg-transparent"
              />
            </div>
          </div>
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
              className="px-1 py-2 focus:outline-none border-b bg-transparent"
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
              className="px-1 py-2 focus:outline-none border-b bg-transparent"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor=""
              className="text-base md:text-lg capitalize font-bold"
            >
              drop resume below
            </label>
            {fileAttached.length > 0 && (
              <p className="inline-block">{fileAttached}</p>
            )}
            <label
              htmlFor="cv"
              className="w-full md:w-auto flex flex-col md:block items-center justify-center rounded-xl md:rounded-3xl text-base md:text-lg cursor-pointer font-bold"
            >
              choose a file {">"}
            </label>
            <input
              type="file"
              id="cv"
              onChange={(e) => fileChange(e)}
              accept="application/pdf"
              className="hidden"
            />
          </div>
          <button
            type="submit"
            className="px-3 md:px-6 md:py-1 py-2 capitalize border border-blue-600 rounded-lg text-blue-600 hover:text-white hover:border-transparent font-semibold hover:bg-blue-600"
          >
            submit
          </button>
          <div>
            <p className="md:w-[35vw] text-sm font-semibold text-neutral-500">
              we take privacy very seriously at FIPEZO, and the information that
              you have shared with us will only be used to process your
              application and further possible candidature.
            </p>
          </div>
        </form>
      </div>
      {showDialogBox && (
        <DialogBox
          title="Your application has been received"
          text="Your application has been received by us. We will'be informed via email or phone regarding further process."
          handleDialogBox={handelDialog}
        />
      )}
    </>
  );
};

export default Apply;
