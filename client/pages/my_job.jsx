import Footer from "@/components/Footer";
import Jobcard from "@/components/Jobcard";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyJob = (props) => {
  const [user, setUser] = useState(props.user);
  const [recommendedJob, setRecommendedJob] = useState([]);
  const [appliedJob, setAppliedJob] = useState([]);
  const [showRecommendedJob, setShowRecommendedJob] = useState(true);
  const [showAppliedJob, setShowAppliedJob] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    async function getJobs(profession) {
      const res = await fetch(
        `${process.env.SERVER_URL}/job/profession/${profession}`
      );
      const jobs = await res.json();
      setRecommendedJob(jobs);
    }
    async function getApplied() {
      const res = await fetch(`${process.env.SERVER_URL}/freelancer/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jobs = await res.json();
      setAppliedJob(jobs);
    }
    getJobs(user.profession);
    getApplied();
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
        <nav className="my-8">
          <ul className="flex items-center gap-4">
            <li className="group flex flex-col items-center gap-2">
              <button
                type="button"
                className="capitalize text-lg lg:text-2xl font-medium"
                onClick={() => {
                  setShowAppliedJob(false);
                  setShowRecommendedJob(true);
                }}
              >
                recommended jobs
              </button>
              <span
                className={`bg-black transition-all h-px duration-500 ${
                  showRecommendedJob === true
                    ? `w-full`
                    : `w-0 group-hover:w-full`
                }`}
              ></span>
            </li>
            <li className="group flex flex-col items-center gap-2">
              <button
                type="button"
                className="capitalize text-lg lg:text-2xl font-medium"
                onClick={() => {
                  setShowRecommendedJob(false);
                  setShowAppliedJob(true);
                }}
              >
                applied jobs
              </button>
              <span
                className={`bg-black transition-all h-px duration-500 ${
                  showAppliedJob === true ? `w-full` : `w-0 group-hover:w-full`
                }`}
              ></span>
            </li>
          </ul>
        </nav>
        {showRecommendedJob === true && (
          <div className="flex flex-col items-center gap-8 lg:w-2/3">
            {recommendedJob.length > 0 ? (
              recommendedJob
                .toReversed()
                .map((it, index) => (
                  <Jobcard
                    status={false}
                    job={it}
                    key={index}
                    setJobs={setRecommendedJob}
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
        )}
        {showAppliedJob === true && (
          <div className="flex flex-col items-center gap-8 lg:w-2/3">
            {appliedJob.length > 0 ? (
              appliedJob
                .toReversed()
                .map((it, index) => (
                  <Jobcard
                    job={it}
                    key={index}
                    setJobs={setAppliedJob}
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
        )}
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default MyJob;
