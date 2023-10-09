import Footer from "@/components/Footer";
import Jobcard from "@/components/Jobcard";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyJob = (props) => {
  const [user, setUser] = useState(props.user);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function getJobs(profession) {
      const res = await fetch(
        `${process.env.SERVER_URL}/job/profession/${profession}`
      );
      const jobs = await res.json();
      setJobs(jobs);
    }
    getJobs(user.profession);
  }, []);

  return (
    <>
      <Head>
        <title>Fipezo | My Jobs</title>
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
      </div>
      <Footer />
    </>
  );
};

export default MyJob;
