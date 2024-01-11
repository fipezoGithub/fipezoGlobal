import Footer from "@/components/Footer";
import Jobcard from "@/components/Jobcard";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiBookAdd } from "react-icons/bi";


const PostedJobs = (props) => {
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
        setJobs(job.reverse());
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
      <div className="mt-16 relative flex flex-col items-center justify-center">
        <h1 className="text-center font-bold text-lg lg:text-2xl mb-4">
          My Jobs
        </h1>
        <div className="flex flex-col items-center gap-8 lg:w-2/3">
          {jobs.length > 0 ? (
            jobs.map((it, index) => (
              <Jobcard
                job={it}
                key={index}
                setJobs={setJobs}
                company={props.company}
                user={props.user}
                status={true}
              />
            ))
          ) : (
            <div>
              <Image
                src="/no-job-found.png"
                width={400}
                height={400}
                alt="No job found"
              />
            </div>
          )}
        </div>

        <Link
          href="/jobs/create"
          className="fixed top-28 right-1 lg:right-9 flex items-center bg-[#338ef4] capitalize px-2 lg:px-4 py-1 lg:py-2 text-white font-semibold lg:text-lg rounded-md"
        >
          create job
          <BiBookAdd color="white" className="w-6 lg:w-12 h-6 lg:h-12" />
        </Link>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default PostedJobs;
