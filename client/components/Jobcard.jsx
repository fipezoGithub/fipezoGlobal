import React, { useEffect, useState } from "react";
import { BsCash, BsStopCircle } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { MdDateRange, MdOutlineNotStarted } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { AiFillProfile } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaPlaceOfWorship } from "react-icons/fa";
import { useRouter } from "next/router";
import Applicants from "./Applicants";

const Jobcard = ({ job, setJobs, company, user, status }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(500);
  const [vacancy, setVacancy] = useState(1);
  const [location, setLocation] = useState("Kolkata");
  const [venue, setVenue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showModifyBox, setShowModifyBox] = useState(false);
  const [jobProfession, setJobProfession] = useState("album_designer");
  const [requiredDate, setRequiredDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventTime, setEventTime] = useState({ startTime: "", endTime: "" });
  const [hiredFreelancers, setHiredFreelancers] = useState([]);
  const [rejectedFreelancers, setRejectedFreelancers] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  const [hiredState, setHiredState] = useState(false);
  const [rejectState, setRejectState] = useState(false);
  const [warn, setWarn] = useState(false);
  const [profession, setProfession] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    setTitle(job.title);
    setDescription(job.description);
    setBudget(job.budget);
    setVacancy(job.vacancy);
    setLocation(job.location);
    setVenue(job.venue);
    setDueDate(job.dueDate);
    setJobProfession(job.profession);
    setRequiredDate(job.date);
    setEventType(job.eventType);
    setEventTime({
      ...eventTime,
      startTime: JSON.parse(job.eventTime)?.startTime,
      endTime: JSON.parse(job.eventTime)?.endTime,
    });
    job.appliedFreelancers.forEach((element) => {
      if (user?._id === element._id) {
        setIsApplied(true);
      }
    });
    setHiredFreelancers(job.hiredFreelancers);
    setRejectedFreelancers(job.rejectedFreelancers);
    let prof = job.profession
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setProfession(prof);
    let one_day = 1000 * 60 * 60 * 24;
    let a = new Date(job.dueDate);
    let today = new Date();
    var Result = Math.round(a.getTime() - today.getTime()) / one_day;
    var Final_Result = Result.toFixed(0);
    setFinalDate(Final_Result);
  }, [job]);

  const deleteJob = async () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/job/delete/${job._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setJobs([]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateJob = async (e) => {
    e.preventDefault();
    if (
      title === "" ||
      description === "" ||
      venue == "" ||
      dueDate == "" ||
      requiredDate.length === 0
    ) {
      setWarn(true);
      return;
    }
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(`${process.env.SERVER_URL}/job/edit/${job._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          location,
          venue,
          profession: jobProfession,
          budget,
          vacancy,
          dueDate,
          eventTime: JSON.stringify(eventTime),
          eventType,
          date: requiredDate,
        }),
      });
      const update = await res.json();
      setJobs([]);
    } catch (error) {
      console.log(error);
    }
  };

  const markExpire = async () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(`${process.env.SERVER_URL}/job/edit/${job._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dueDate: new Date().getDate() - 1,
        }),
      });
      const update = await res.json();
      setJobs([]);
    } catch (error) {
      console.log(error);
    }
  };

  const hireFreelancer = async (userid) => {
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
        body: JSON.stringify({ jobId: job._id, userId: userid }),
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
              headline: `Your application is selected by ${company.companyname}`,
              acceptedFreelancer: userid,
              sentCompany: company._id,
              href: "/my_job",
            }),
          }
        );
        const data = await res.json();
        setHiredState(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectFreelancer = async (userid) => {
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
        body: JSON.stringify({ jobId: job._id, userId: userid }),
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
              headline: `Sorry! your application is rejected by ${company.companyname}`,
              acceptedFreelancer: userid,
              sentCompany: company._id,
              href: "/my_job",
            }),
          }
        );
        const data = await res.json();
        setRejectState(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewCount = async (jobid) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/job/view/${jobid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-start border rounded-lg shadow-md p-4 gap-3 lg:w-full relative">
      <div
        className={
          "p-1 lg:p-2 border  flex items-center gap-2 " +
          (finalDate > 0
            ? "text-green-600 border-green-600"
            : "text-red-600 border-red-600")
        }
      >
        <BsStopCircle />
        {finalDate > 0 ? `${finalDate} days left` : `Expired`}
      </div>
      <div className="flex items-start gap-4 justify-between w-full">
        <div className="flex flex-col">
          <h3 className="lg:text-2xl font-bold">{job.title}</h3>
          <Link
            href={`/company/${job.createdCompany.uid}`}
            className="text-sm lg:text-lg font-bold text-neutral-600"
          >
            {job.createdCompany.companyname}
          </Link>
        </div>
        <div>
          <Image
            src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${job.createdCompany.profilePicture}`}
            width={70}
            height={70}
            alt="company profile picture"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex items-start w-full">
        <p className="lg:text-lg">{job.description}</p>
      </div>
      <div className="flex items-center gap-1">
        <IoLocationSharp />
        <p className="capitalize">{job.location}</p>
      </div>
      <div className="flex items-start lg:justify-around gap-6 flex-wrap lg:flex-nowrap">
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <MdOutlineNotStarted />
            date
          </div>
          <div className="flex items-center flex-col gap-2">
            <p>{requiredDate?.split("-").reverse().join("-")}</p>
          </div>
        </div>
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <BsCash />
            budget
          </div>
          <p>{job.budget}</p>
        </div>
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <GrGroup />
            vacancy
          </div>
          <p>{job.vacancy}</p>
        </div>
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <AiFillProfile />
            profession
          </div>
          <p className="capitalize">{profession}</p>
        </div>
        <div className="flex flex-col items-start lg:text-lg">
          <div className="flex items-center gap-1 capitalize">
            <FaPlaceOfWorship />
            venue
          </div>
          <p className="capitalize">{job.venue}</p>
        </div>
      </div>
      <div className="flex flex-col items-start lg:text-lg">
        <div className="flex items-center gap-1 capitalize">
          <MdDateRange />
          posted at
        </div>
        <p className="">
          {new Date(job.createdAt).toLocaleString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      {router.asPath === "/my_job" && status !== false && (
        <div className="flex flex-col items-start lg:text-lg gap-2">
          <h2 className="capitalize font-bold lg:text-xl">
            application status
          </h2>
          {job.hiredFreelancers.includes(user._id) && (
            <p className="lg:text-xl capitalize px-2 py-1 bg-green-500 text-white rounded-md">
              hired
            </p>
          )}
          {job.rejectedFreelancers.includes(user._id) && (
            <p className="lg:text-xl capitalize px-2 py-1 bg-red-500 text-white rounded-md">
              rejected
            </p>
          )}
          {!job.hiredFreelancers.includes(user._id) &&
            !job.rejectedFreelancers.includes(user._id) && (
              <p className="lg:text-xl capitalize px-2 py-1 bg-blue-600 text-white rounded-md">
                pending
              </p>
            )}
        </div>
      )}
      {router.asPath !== "/posted-jobs" && (
        <>
          <hr className="h-[1px] w-full bg-neutral-400" />
          <div className="flex items-center justify-between w-full">
            <p className="text-neutral-400">{job.viewCount} views</p>
            <Link
              href={`/jobs/details/${job.uid}`}
              onClick={() => viewCount(job._id)}
              className="border border-[#338ef4] text-[#338ef4] disabled:bg-neutral-600 disabled:cursor-not-allowed capitalize px-4 py-2 font-semibold lg:text-xl rounded-md"
            >
              view details
            </Link>
          </div>
        </>
      )}
      {router.asPath === "/posted-jobs" &&
        company?._id === job.createdCompany._id && (
          <Applicants
            appliedFreelancers={job.appliedFreelancers}
            hiredFreelancers={hiredFreelancers}
            rejectedFreelancers={rejectedFreelancers}
            hiredState={hiredState}
            setHiredState={setHiredState}
            rejectState={rejectState}
            setRejectState={setRejectState}
            jobId={job._id}
            companyname={company.companyname}
            companyId={company._id}
          />
        )}
      {router.asPath === "/posted-jobs" &&
        company?._id === job.createdCompany._id && (
          <>
            <hr className="h-[1px] w-full bg-neutral-400" />
            <div className="self-end flex items-center gap-4">
              {finalDate > 0 && (
                <button
                  type="button"
                  className="border-[#338ef4] border capitalize px-4 py-2 text-[#338ef4] font-semibold lg:text-xl rounded-md"
                  onClick={markExpire}
                >
                  marked as expire
                </button>
              )}
              <button
                type="button"
                className="bg-[#338ef4] capitalize px-4 py-2 text-white font-semibold lg:text-xl rounded-md"
                onClick={() => setShowModifyBox(true)}
              >
                modify
              </button>
              <button
                type="button"
                className="bg-[#df3c3c] capitalize px-4 py-2 text-white font-semibold lg:text-xl rounded-md"
                onClick={deleteJob}
              >
                delete
              </button>
            </div>
          </>
        )}
      {showModifyBox === true && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex lg:justify-center lg:items-center w-full h-full bg-[#00000042] z-[1100]">
          <div className="relative flex flex-col items-center gap-2 lg:gap-4 backdrop-blur px-2 lg:px-4 py-1 lg:py-2 bg-white rounded-lg mx-2 my-1 overflow-y-scroll">
            <div className="absolute top-1 right-1">
              <button
                type="button"
                className="text-3xl"
                onClick={() => setShowModifyBox(false)}
              >
                <IoIosCloseCircleOutline />
              </button>
            </div>
            <h3 className="lg:text-xl font-bold">
              Update your posted requirement
            </h3>
            <form
              action=""
              className="flex flex-col items-start gap-6"
              onSubmit={updateJob}
            >
              {warn && (
                <p className="text-red-500 text-center w-full lg:text-lg">
                  Please fill up all fields
                </p>
              )}
              <div className="flex items-start flex-col w-full">
                <label htmlFor="title" className="lg:text-xl capitalize">
                  title
                </label>
                <input
                  type="text"
                  placeholder="enter job title"
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setWarn(false);
                    setTitle(e.target.value);
                  }}
                  className="placeholder:capitalize bg-transparent outline-none py-1 focus:border-b"
                />
              </div>
              <div className="flex items-start flex-col w-full">
                <label htmlFor="description" className="lg:text-xl capitalize">
                  description
                </label>
                <textarea
                  name=""
                  id="description"
                  cols="30"
                  value={description}
                  onChange={(e) => {
                    setWarn(false);
                    setDescription(e.target.value);
                  }}
                  placeholder="add description about your requirement"
                  rows="5"
                  className="w-full placeholder:capitalize bg-transparent outline-none py-1 focus:border-b h-20 lg:h-auto"
                ></textarea>
              </div>
              <div className="flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
                <div className="flex items-start flex-col">
                  <label htmlFor="budget" className="lg:text-xl capitalize">
                    Budget
                  </label>
                  <input
                    type="number"
                    placeholder="enter the amount you offer"
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="placeholder:capitalize bg-transparent outline-none py-1 focus:border-b"
                  />
                </div>
                <div className="flex items-start flex-col">
                  <label htmlFor="vacancy" className="lg:text-xl capitalize">
                    Vacancy For
                  </label>
                  <input
                    type="number"
                    placeholder="enter the vacancy number"
                    id="vacancy"
                    value={vacancy}
                    onChange={(e) => setVacancy(e.target.value)}
                    className="placeholder:capitalize bg-transparent outline-none px-2 py-1 focus:border-b"
                  />
                </div>
                <div className="flex items-start flex-col">
                  <label htmlFor="vacancy" className="lg:text-xl capitalize">
                    Venue {`(location)`}
                  </label>
                  <input
                    type="text"
                    placeholder="enter the venue location of event"
                    id="vacancy"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="placeholder:capitalize bg-transparent outline-none px-2 py-1 focus:border-b"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 w-full flex-wrap lg:flex-nowrap">
                <div className="flex items-start flex-col">
                  <label htmlFor="location" className="lg:text-xl capitalize">
                    location
                  </label>
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option disabled value="city">
                      kolkata
                    </option>
                    <option value="Agra">Agra</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Amritsar">Amritsar</option>
                    <option value="Aurangabad">Aurangabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Bhubaneswar">Bhubaneswar</option>
                    <option value="Burdwan">Burdwan</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Dehradun">Dehradun</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Dhanbad">Dhanbad</option>
                    <option value="Durgapur">Durgapur</option>
                    <option value="Faridabad">Faridabad</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                    <option value="Guwahati">Guwahati</option>
                    <option value="Gwalior">Gwalior</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Indore">Indore</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Jamshedpur">Jamshedpur</option>
                    <option value="Jodhpur">Jodhpur</option>
                    <option value="Kanpur">Kanpur</option>
                    <option value="Kochi">Kochi</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Ludhiana">Ludhiana</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Mangaluru">Mangaluru</option>
                    <option value="Meerut">Meerut</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Mysuru">Mysuru</option>
                    <option value="Nagpur">Nagpur</option>
                    <option value="Nashik">Nashik</option>
                    <option value="New_Delhi">New Delhi</option>
                    <option value="Navi_Mumbai">Navi Mumbai</option>
                    <option value="Patna">Patna</option>
                    <option value="Prayagraj">Prayagraj</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Pune">Pune</option>
                    <option value="Raipur">Raipur</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Ranchi">Ranchi</option>
                    <option value="Siliguri">Siliguri</option>
                    <option value="Surat">Surat</option>
                    <option value="Thane">Thane</option>
                    <option value="Thiruvananthapuram">
                      Thiruvananthapuram
                    </option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Vadodara">Vadodara</option>
                    <option value="Varanasi">Varanasi</option>
                    <option value="Vijayawada">Vijayawada</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                    <option value="Warangal">Warangal</option>
                  </select>
                </div>
                <div className="flex items-start flex-col">
                  <label htmlFor="profession" className="lg:text-xl capitalize">
                    profession
                  </label>
                  <select
                    id="profession"
                    className="capitalize"
                    value={jobProfession}
                    onChange={(e) => setJobProfession(e.target.value)}
                  >
                    <option disabled value="profession" className="capitalize">
                      photography
                    </option>
                    <option value="album_designer" className="capitalize">
                      album designer
                    </option>
                    <option value="anchor" className="capitalize">
                      anchor
                    </option>
                    <option value="cinematographer" className="capitalize">
                      cinematographer
                    </option>
                    <option value="dancer" className="capitalize">
                      dancer
                    </option>
                    <option value="dj" className="capitalize">
                      dj
                    </option>
                    <option value="drone_operater" className="capitalize">
                      drone operater
                    </option>
                    <option value="graphics_designer">graphics designer</option>
                    <option value="influencer" className="capitalize">
                      influencer
                    </option>
                    <option value="makeup_artist" className="capitalize">
                      makeup artist
                    </option>
                    <option value="mehendi_artist" className="capitalize">
                      mehendi artist
                    </option>
                    <option value="model" className="capitalize">
                      model
                    </option>
                    <option value="photographer" className="capitalize">
                      photographer
                    </option>
                    <option value="photo_editor" className="capitalize">
                      photo editor
                    </option>
                    <option value="video_editor" className="capitalize">
                      video editor
                    </option>
                    <option value="web_developer" className="capitalize">
                      web developer
                    </option>
                  </select>
                </div>
                <div className="flex items-start flex-col">
                  <label htmlFor="dueDate" className="lg:text-xl capitalize">
                    last date for apply
                  </label>
                  <input
                    type="date"
                    placeholder="enter the amount you offer"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="placeholder:capitalize bg-transparent outline-none py-1 focus:border-b"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between w-full flex-wrap lg:flex-nowrap">
                <div className="flex items-start flex-col">
                  <label
                    htmlFor="requiredDate"
                    className="lg:text-xl capitalize"
                  >
                    requirement dates
                  </label>
                  <div className="flex items-center flex-wrap">
                    <input
                      type="date"
                      id="requiredDate"
                      value={requiredDate}
                      onChange={(e) => {
                        setWarn(false);
                        setRequiredDate(e.target.value);
                      }}
                      className="placeholder:capitalize bg-transparent outline-none py-1 focus:border-b"
                    />
                  </div>
                </div>
                {eventTime.startTime && eventTime.endTime && (
                  <div className="flex items-start flex-col">
                    {/* <label className="lg:text-xl capitalize">
                    event time{" "}
                    <span className="text-neutral-500">{"(optional)"}</span>
                  </label> */}
                    <div className="flex items-center justify-between gap-4 ">
                      <div className="flex flex-col">
                        <label
                          htmlFor="starttime"
                          className="lg:text-base capitalize"
                        >
                          start time
                        </label>
                        <input
                          type="time"
                          id="starttime"
                          value={eventTime.startTime}
                          onChange={(e) =>
                            setEventTime({
                              ...eventTime,
                              startTime: e.target.value,
                            })
                          }
                          className="outline-none py-1 focus:border-b inline-flex appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="endtime"
                          className="lg:text-base capitalize"
                        >
                          end time
                        </label>
                        <input
                          type="time"
                          id="endtime"
                          value={eventTime.endTime}
                          onChange={(e) =>
                            setEventTime({
                              ...eventTime,
                              endTime: e.target.value,
                            })
                          }
                          className="placeholder:capitalize outline-none py-1 focus:border-b"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {eventType && (
                  <div className="flex items-start flex-col">
                    <label
                      htmlFor="eventType"
                      className="lg:text-xl capitalize"
                    >
                      event type{" "}
                      <span className="text-neutral-500">{"(optional)"}</span>
                    </label>
                    <input
                      type="text"
                      id="eventType"
                      placeholder="enter event type"
                      className="placeholder:capitalize outline-none py-1 focus:border-b"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center w-full justify-center">
                <button
                  type="submit"
                  className="px-2 py-1 capitalize font-bold lg:text-xl bg-[#338ef4] text-white rounded-lg"
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobcard;
