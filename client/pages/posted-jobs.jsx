import Createjob from "@/components/Createjob";
import Footer from "@/components/Footer";
import Jobcard from "@/components/Jobcard";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";

const PostedJobs = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | Posted Job</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16">
        <h1 className="text-center font-bold text-lg lg:text-2xl mb-4">
          My Jobs
        </h1>
        <Jobcard />
      </div>
      <Createjob />
      <Footer />
    </>
  );
};

export default PostedJobs;
