import Createjob from "@/components/Createjob";
import DialogBox from "@/components/DialogBox";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Create = (props) => {
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const router = useRouter();

  const handelDialougeBox = () => {
    setShowConfirmBox(false);
    router.push("/posted-jobs");
  };

  return (
    <>
      <Head>
        <title>Fipezo | Create Job</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 flex items-center justify-center ">
        <Createjob setShowConfirmBox={setShowConfirmBox} />
      </div>
      <Footer premium={props.user?.premium} />
      {showConfirmBox === true && (
        <DialogBox
          title="Job Posted Successfully!"
          text="Your new job post is live and ready. Manage applications seamlessly on your dashboard. Need to add more jobs or make updates? Do it directly from your account. We're here to help if you have any questions. Happy hiring!"
          handleDialogBox={handelDialougeBox}
        />
      )}
    </>
  );
};

export default Create;
