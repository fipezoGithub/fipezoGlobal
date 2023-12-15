import ContactCard from "@/components/ContactCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VerificationCard from "@/components/VerificationCard";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoCall } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { MdContactPhone, MdReport, MdVerified } from "react-icons/md";
import { FaCity, FaWpforms } from "react-icons/fa";

const Dashboard = (props) => {
  const [freelancers, setFreelancers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [callbacks, setCallBacks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [requestedCities, setRequestedCities] = useState([]);
  const [reports, setReports] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [verificationBox, setVerificationBox] = useState(true);
  const [callbackBox, setCallbackBox] = useState(false);
  const [contactRequestBox, setContactRequestBox] = useState(false);
  const [submittedCityBox, setSubmittedCityBox] = useState(false);
  const [reportBox, setReportBox] = useState(false);
  const [jobApplicationBox, setJobApplicationBox] = useState(false);
  const [optionBox, setOptionBox] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!props.user || !props.user?.phone === 3335573725) {
      router.push("/");
    }

    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;

    if (window.innerWidth > 700) {
      setOptionBox(true);
    }

    async function fetchFreelancer() {
      try {
        if (token) {
          const response = await fetch(
            `${process.env.SERVER_URL}/profiles/unverified/freelancer`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setFreelancers(data.reverse());
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchCompany() {
      try {
        if (token) {
          const response = await fetch(
            `${process.env.SERVER_URL}/profiles/unverified/company`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setCompanies(data.reverse());
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function getCallbacks() {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/callback`);
        const callback = await res.json();
        setCallBacks(callback);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchMessages() {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;
      try {
        if (token) {
          const response = await fetch(
            `${process.env.SERVER_URL}/contact/messages`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function getRequestedCities() {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/request`);
        const cities = await res.json();
        setRequestedCities(cities);
      } catch (error) {
        console.log(error);
      }
    }

    async function getReports() {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/report`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const reports = await res.json();
        setReports(reports);
      } catch (error) {
        console.log(error);
      }
    }

    async function getJobApplications() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/carrer/all/applicants`
        );
        const allApplicants = await res.json();
        let data = [];
        allApplicants.forEach((element) => {
          data.push(JSON.parse(element));
        });
        setApplicants(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFreelancer();
    fetchCompany();
    getCallbacks();
    fetchMessages();
    getRequestedCities();
    getReports();
    getJobApplications();
  }, [props.user, router]);

  const updateFreelancers = (id) => {
    const newFreelancers = freelancers.filter((freelancer) => {
      return freelancer._id !== id;
    });
    setFreelancers(newFreelancers);
  };

  const updateCompanies = (id) => {
    const newCompanies = companies.filter((company) => {
      return company._id !== id;
    });
    setCompanies(newCompanies);
  };

  const handelRequestedCities = async (id) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/request/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const newCites = requestedCities.filter((req) => {
          return req._id !== id;
        });
        setRequestedCities(newCites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Fipezo | Admin Panel</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <main className="mt-16 md:mx-8 flex items-start w-full">
        <div className="md:hidden">
          <button
            type="button"
            className="text-4xl"
            onClick={() => setOptionBox(!optionBox)}
          >
            <AiOutlineMenuFold />
          </button>
        </div>
        {optionBox === true && (
          <div className="fixed md:static left-0 top-28">
            <ul className="flex flex-col gap-2 bg-white p-2">
              <li
                className={`px-4 py-2 ${
                  verificationBox === true &&
                  "bg-slate-500 text-white rounded-2xl shadow-lg"
                }`}
              >
                <button
                  type="button"
                  className="capitalize whitespace-nowrap flex items-center gap-1 text-xl"
                  onClick={() => {
                    setCallbackBox(false);
                    setContactRequestBox(false);
                    setSubmittedCityBox(false);
                    setReportBox(false);
                    setVerificationBox(true);
                    setJobApplicationBox(false);
                  }}
                >
                  <MdVerified />
                  verification
                </button>
              </li>
              <li
                className={`px-4 py-2 ${
                  callbackBox === true &&
                  "bg-slate-500 text-white rounded-2xl shadow-lg"
                }`}
              >
                <button
                  type="button"
                  className="capitalize whitespace-nowrap flex items-center gap-1 text-xl"
                  onClick={() => {
                    setContactRequestBox(false);
                    setVerificationBox(false);
                    setSubmittedCityBox(false);
                    setReportBox(false);
                    setCallbackBox(true);
                    setJobApplicationBox(false);
                  }}
                >
                  <IoCall />
                  callback
                </button>
              </li>
              <li
                className={`px-4 py-2 ${
                  contactRequestBox === true &&
                  "bg-slate-500 text-white rounded-2xl shadow-lg"
                }`}
              >
                <button
                  type="button"
                  className="capitalize whitespace-nowrap flex items-center gap-1 text-xl"
                  onClick={() => {
                    setVerificationBox(false);
                    setCallbackBox(false);
                    setSubmittedCityBox(false);
                    setReportBox(false);
                    setContactRequestBox(true);
                    setJobApplicationBox(false);
                  }}
                >
                  <MdContactPhone />
                  contact request
                </button>
              </li>
              <li
                className={`px-4 py-2 ${
                  submittedCityBox === true &&
                  "bg-slate-500 text-white rounded-2xl shadow-lg"
                }`}
              >
                <button
                  type="button"
                  className="capitalize whitespace-nowrap flex items-center gap-1 text-xl"
                  onClick={() => {
                    setVerificationBox(false);
                    setCallbackBox(false);
                    setContactRequestBox(false);
                    setReportBox(false);
                    setSubmittedCityBox(true);
                    setJobApplicationBox(false);
                  }}
                >
                  <FaCity />
                  submitted cities
                </button>
              </li>
              <li
                className={`px-4 py-2 ${
                  reportBox === true &&
                  "bg-slate-500 text-white rounded-2xl shadow-lg"
                }`}
              >
                <button
                  type="button"
                  className="capitalize whitespace-nowrap flex items-center gap-1 text-xl"
                  onClick={() => {
                    setVerificationBox(false);
                    setCallbackBox(false);
                    setContactRequestBox(false);
                    setSubmittedCityBox(false);
                    setReportBox(true);
                    setJobApplicationBox(false);
                  }}
                >
                  <MdReport />
                  reports
                </button>
              </li>
              <li
                className={`px-4 py-2 ${
                  jobApplicationBox === true &&
                  "bg-slate-500 text-white rounded-2xl shadow-lg"
                }`}
              >
                <button
                  type="button"
                  className="capitalize whitespace-nowrap flex items-center gap-1 text-xl"
                  onClick={() => {
                    setVerificationBox(false);
                    setCallbackBox(false);
                    setContactRequestBox(false);
                    setSubmittedCityBox(false);
                    setReportBox(false);
                    setJobApplicationBox(true);
                  }}
                >
                  <FaWpforms />
                  job applicants
                </button>
              </li>
              <li className={`px-4 py-2`}>
                <Link
                  href="/resources/create"
                  className="capitalize whitespace-nowrap flex items-center gap-1 text-xl"
                >
                  <IoIosCreate />
                  create blog
                </Link>
              </li>
            </ul>
          </div>
        )}
        <div className="h-screen overflow-hidden overflow-y-scroll w-full">
          {verificationBox === true && (
            <div
              className="flex flex-col gap-4 items-center justify-center w-full"
              id="verification"
            >
              {freelancers.map((freelancer, index) => {
                return (
                  <VerificationCard
                    key={index}
                    profile={freelancer}
                    updateFreelancers={updateFreelancers}
                  />
                );
              })}
              {companies.map((company, index) => {
                return (
                  <VerificationCard
                    key={index}
                    profile={company}
                    updateCompanies={updateCompanies}
                  />
                );
              })}
            </div>
          )}
          {callbackBox === true && (
            <div
              id="callback"
              className="flex items-center justify-center w-full"
            >
              <table className="w-full mt-8 border border-collapse">
                <thead className="">
                  <tr className="py-4">
                    <th className="capitalize text-sm lg:text-2xl">dp</th>
                    <th className="capitalize text-sm lg:text-2xl">name</th>
                    <th className="capitalize text-sm lg:text-2xl">
                      profession
                    </th>
                    <th className="capitalize text-sm lg:text-2xl">phone</th>
                    <th className="capitalize text-sm lg:text-2xl">location</th>
                  </tr>
                </thead>
                <tbody className="">
                  {callbacks.length > 0 &&
                    callbacks.map((it, i) => (
                      <tr key={i} className="border-b">
                        <th className="flex items-center justify-center py-4">
                          <Image
                            src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${it.requestedUser.profilePicture}`}
                            width={120}
                            height={120}
                            alt="callback requeted user"
                            className="w-12 lg:w-16"
                          />
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          <Link
                            href={`/profile/${it.requestedUser.uid}`}
                            target="_blank"
                          >
                            {it.requestedUser.firstname +
                              " " +
                              it.requestedUser.lastname}
                          </Link>
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          {it.requestedUser.profession
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          <a href={`tel:${it.requestedUser.phone}`}>
                            {it.requestedUser.phone}
                          </a>
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          {it.requestedUser.location}
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {submittedCityBox === true && (
            <div
              id="submittedCity"
              className="flex items-center justify-center w-full"
            >
              <table className="w-full mt-8 border border-collapse">
                <thead className="">
                  <tr className="py-4">
                    <th className="capitalize text-sm lg:text-2xl">name</th>
                    <th className="capitalize text-sm lg:text-2xl">phone</th>
                    <th className="capitalize text-sm lg:text-2xl">location</th>
                    <th className="capitalize text-sm lg:text-2xl">action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {requestedCities.length > 0 &&
                    requestedCities.map((it, i) => (
                      <tr key={i} className="border-b">
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          <h3>{it.name}</h3>
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          <a href={`tel:${it.phone}`}>{it.phone}</a>
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          {it.city}
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          <button
                            type="button"
                            onClick={() => handelRequestedCities(it._id)}
                            className="bg-red-500 text-white px-2 lg:px-4 py-2 rounded-md capitalize text-sm lg:text-base"
                          >
                            complete
                          </button>
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {contactRequestBox === true && (
            <div className="flex flex-col items-center justify-center gap-4">
              {messages.map((message, index) => {
                return <ContactCard key={index} message={message} />;
              })}
            </div>
          )}
          {reportBox === true && (
            <div className="flex flex-col gap-4">
              {reports.length > 0 &&
                reports.map((it, i) => (
                  <div
                    key={i}
                    className="border px-4 py-2 flex flex-col items-start gap-2"
                  >
                    {it.createdFreelancer && (
                      <h1>
                        <span className="capitalize font-semibold">
                          {it.createdFreelancer?.firstname.toLowerCase() +
                            " " +
                            it.createdFreelancer?.lastname.toLowerCase()}
                        </span>{" "}
                        reported{" "}
                        <span className="capitalize font-semibold">
                          {it.acceptedFreelancer?.firstname.toLowerCase() +
                            " " +
                            it.acceptedFreelancer?.lastname.toLowerCase()}
                        </span>
                      </h1>
                    )}
                    {it.createdUser && (
                      <h1>
                        <span className="capitalize font-semibold">
                          {it.createdUser?.firstname.toLowerCase() +
                            " " +
                            it.createdUser?.lastname.toLowerCase()}
                        </span>{" "}
                        reported{" "}
                        <span className="capitalize font-semibold">
                          {it.acceptedFreelancer?.firstname.toLowerCase() +
                            " " +
                            it.acceptedFreelancer?.lastname.toLowerCase()}
                        </span>
                      </h1>
                    )}
                    {it.createdCompany && (
                      <h1>
                        <span className="capitalize font-semibold">
                          {it.createdCompany.companyname.toLowerCase()}
                        </span>{" "}
                        reported{" "}
                        <span className="capitalize font-semibold">
                          {it.acceptedFreelancer?.firstname.toLowerCase() +
                            " " +
                            it.acceptedFreelancer?.lastname.toLowerCase()}
                        </span>
                      </h1>
                    )}
                    <h2 className="capitalize">
                      reason {it.reason.split("_").join(" ")}
                    </h2>
                    <p>{it.description}</p>
                    <p>status {it.status}</p>
                    <p>
                      {new Date(it.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <button type="button">mark as solved</button>
                  </div>
                ))}
            </div>
          )}
          {jobApplicationBox === true && (
            <div
              id="applicants"
              className="flex items-center justify-center w-full"
            >
              <table className="w-full mt-8 border border-collapse">
                <thead className="">
                  <tr className="py-4">
                    <th className="capitalize text-sm lg:text-2xl">name</th>
                    <th className="capitalize text-sm lg:text-2xl">
                      profession
                    </th>
                    <th className="capitalize text-sm lg:text-2xl">phone</th>
                    <th className="capitalize text-sm lg:text-2xl">email</th>
                    <th className="uppercase text-sm lg:text-2xl">cv</th>
                  </tr>
                </thead>
                <tbody className="">
                  {applicants.length > 0 &&
                    applicants.map((it, i) => (
                      <tr key={i} className="border-b">
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          <p>{it.name}</p>
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          {it.proffesion}
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          <a href={`tel:${it.phone}`}>{it.phone}</a>
                        </th>
                        <th className="text-sm lg:text-xl font-medium py-4">
                          {it.email}
                        </th>
                        <th className="capitalize text-sm lg:text-xl font-medium py-4">
                          <a
                            href={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${it.cv}`}
                            target="_blank"
                            className="hover:text-blue-500"
                          >
                            download
                          </a>
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
