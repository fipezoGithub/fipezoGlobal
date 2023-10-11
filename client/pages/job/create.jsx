import Createjob from "@/components/Createjob";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";

const Create = (props) => {
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
        <Createjob />
      </div>
      <Footer />
    </>
  );
};

export default Create;
