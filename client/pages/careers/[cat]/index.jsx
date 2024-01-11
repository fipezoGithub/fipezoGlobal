import CareerFilter from "@/components/CareerFilter";
import Footer from "@/components/Footer";
import JobPostViewBox from "@/components/JobPostViewBox";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

export const getServerSideProps = async (ctx) => {
  let response;
  if (ctx.query.cat === "all") {
    response = await fetch(`${process.env.SERVER_URL}/carrer`);
  } else {
    response = await fetch(
      `${process.env.SERVER_URL}/carrer/cat/${ctx.query.cat}`
    );
  }
  const data = await response.json();
  return { props: { data } };
};

const FipezoJobDetails = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState(props.data);

  const searchResults = () => {
    let newResults = [];
    props.data.forEach((element) => {
      if (element.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        newResults.push(element);
      }
    });
    setJobs(newResults);
  };
  return (
    <>
      <Head>
        <title>Fipezo | Join Our Team at Fipezo</title>
        <meta
          name="description"
          content="At Fipezo, we believe that our people are the driving force behind our success. If you're looking for more than just a job, but a meaningful career where you can make a real impact, you've come to the right place.Join our team and be part of a dynamic and innovative company that values your skills, talents, and aspirations. Our commitment to excellence, diversity, and inclusion makes Fipezo a fantastic place to grow professionally and personally."
        />
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="my-8 flex flex-col gap-6 items-center justify-center">
        <div className="w-full">
          <Image
            src="/Lets_Grow_with_Fipezo.png"
            alt="Fipezo carrer banner"
            width={1963}
            height={700}
            className="w-full"
          />
        </div>
        <div className="flex justify-between items-center peer-focus:outline-2 outline-blue-500 bg-neutral-100 mx-4 md:mx-0 md:px-4 py-2 rounded-2xl w-auto md:w-[40rem]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search for jobs"
            className="peer focus:outline-none bg-transparent placeholder:font-bold placeholder:text-lg md:placeholder:text-3xl py-2 md:py-4 text-xl md:text-3xl font-bold"
          />
          <button
            type="button"
            onClick={searchResults}
            className="text-lg md:text-2xl bg-blue-800 text-white px-2 md:px-4 py-2 rounded-lg"
          >
            search
          </button>
        </div>
        <div>
          <h3 className="text-lg md:text-2xl font-semibold text-neutral-600">
            viewing {props.data.length} job requiremnets
          </h3>
        </div>
        <div className="flex flex-col md:flex-row items-start border-t md:gap-8 md:w-[75rem]">
          <CareerFilter />
          <div className="flex justify-center items-start flex-wrap gap-4">
            {jobs.length > 0 &&
              jobs.map((item, index) => (
                <JobPostViewBox job={item} key={index} />
              ))}
          </div>
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default FipezoJobDetails;
