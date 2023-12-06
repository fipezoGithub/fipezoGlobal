import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const Applicants = ({
  appliedFreelancers,
  hiredFreelancers,
  rejectedFreelancers,
  setHiredState,
  setRejectState,
  jobId,
  companyname,
  companyId,
}) => {
  const hireRef = useRef();
  const rejectRef = useRef();
  useEffect(() => {
    if (!hireRef.current || !rejectRef.current) {
      console.log("true");
      return;
    }
  }, [hireRef.current, rejectRef.current]);

  const hireFreelancer = async (e, userid) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(`${process.env.SERVER_URL}/job/hire`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId: jobId, userId: userid }),
      });
      const data = await res.json();
      if (data) {
        const res = await fetch(
          `${process.env.SERVER_URL}/notification/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "Job apply",
              headline: `Your application is selected by ${companyname}`,
              acceptedFreelancer: userid,
              sentCompany: companyId,
              href: "/my_job",
            }),
          }
        );
        const data = await res.json();
        e.target.disabled = true;
        e.target.innerText = "Hired";
        rejectRef.current.style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectFreelancer = async (e, userid) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(`${process.env.SERVER_URL}/job/reject`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId: jobId, userId: userid }),
      });
      const data = await res.json();
      if (data) {
        const res = await fetch(
          `${process.env.SERVER_URL}/notification/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "Job apply",
              headline: `Sorry! your application is rejected by ${companyname}`,
              acceptedFreelancer: userid,
              sentCompany: companyId,
              href: "/my_job",
            }),
          }
        );
        const data = await res.json();
        e.target.disabled = true;
        e.target.innerText = "Rejected";
        hireRef.current.style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <hr className="h-[1px] w-full bg-neutral-400" />
      <div className="flex flex-col items-start gap-4">
        <h4 className="capitalize font-bold lg:text-xl">
          applicant freelancers
        </h4>
        <ol className="flex flex-col items-start w-full gap-4">
          {appliedFreelancers.length > 0 &&
            appliedFreelancers.map((freelancer, index) => {
              const h = hiredFreelancers?.some((hire) => {
                if (hire._id === freelancer._id) {
                  setHiredState(true);
                  return true;
                }
              });
              const r = rejectedFreelancers?.some((reject) => {
                if (reject === freelancer._id) {
                  setRejectState(true);
                  return true;
                }
              });
              return (
                <li
                  key={index}
                  className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between"
                >
                  <div className="flex items-center gap-4 justify-between">
                    <p className="font-bold text-sm lg:text-lg">{index + 1}.</p>
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${freelancer.profilePicture}`}
                      width={40}
                      height={40}
                      alt="pro-pic"
                      className="rounded-full w-8 lg:w-10 h-8 lg:h-10 object-cover"
                    />
                    <Link
                      className="capitalize hover:font-bold text-xs lg:text-base"
                      href={`/profile/${freelancer.uid}`}
                    >
                      {freelancer.firstname.toLowerCase() +
                        " " +
                        freelancer.lastname.toLowerCase()}
                    </Link>
                    <a
                      href={`tel:${freelancer.phone}`}
                      className="hover:text-cyan-500 text-xs lg:text-base"
                    >
                      {freelancer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    {r === false && (
                      <button
                        className="capitalize px-2 py-1 bg-green-600 text-white rounded-md font-bold text-sm lg:text-base"
                        type="button"
                        ref={hireRef}
                        onClick={(e) => hireFreelancer(e, freelancer._id)}
                        disabled={h === true ? true : false}
                      >
                        {h === true ? "hired" : "hire"}
                      </button>
                    )}
                    {h === false && (
                      <button
                        className="capitalize px-2 py-1 bg-red-600 text-white rounded-md font-bold text-sm lg:text-base"
                        type="button"
                        ref={(e) => (rejectRef.current = e)}
                        onClick={(e) => rejectFreelancer(e, freelancer._id)}
                        disabled={r === true ? true : false}
                      >
                        {r === true ? "rejected" : "reject"}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    </>
  );
};

export default Applicants;
