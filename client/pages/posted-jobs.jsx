import Createjob from "@/components/Createjob";
import Footer from "@/components/Footer";
import Jobcard from "@/components/Jobcard";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { BiBookAdd } from "react-icons/bi";
const PostedJobs = (props) => {
  const [showCreateBox, setShowCreateBox] = useState(false);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    async function fetchJob() {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/job/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const job = await res.json();
        console.log(job);
        setJobs(job);
      } catch (error) {
        console.log(error);
      }
    }
    fetchJob();
  }, [jobs.length <= 0]);

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
      <div className="mt-16 relative">
        <h1 className="text-center font-bold text-lg lg:text-2xl mb-4">
          My Jobs
        </h1>
        <div className="flex flex-col items-center gap-8 w-full">
          {jobs.length > 0 ? (
            jobs.map((it, index) => <Jobcard job={it} key={index} />)
          ) : (
            <p>none found</p>
          )}
        </div>

        <button
          type="button"
          className="fixed top-28 right-9 flex items-center bg-[#338ef4] capitalize px-4 py-2 text-white font-semibold lg:text-lg rounded-md"
          onClick={() => setShowCreateBox(true)}
        >
          create job
          <BiBookAdd size={"3em"} color="white" />
        </button>
      </div>
      {showCreateBox && (
        <Createjob setShowCreateBox={setShowCreateBox} setJobs={setJobs} />
      )}
      <Footer />
    </>
  );
};

export default PostedJobs;
