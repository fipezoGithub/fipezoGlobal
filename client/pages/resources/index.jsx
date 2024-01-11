import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchBlog from "@/components/SearchBlog";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.SERVER_URL}/blog/`);
  const data = await response.json();
  return { props: { data } };
};

export default function Blogs(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [freelanceInsightsBlogs, setFreelanceInsightsBlogs] = useState([]);
  const [hiringInsightsBlogs, setHiringInsightsBlogs] = useState([]);
  const [fipezoInsightsBlogs, setFipezoInsightsBlogs] = useState([]);
  const [howToGuideBlogs, setHowToGuideBlogs] = useState([]);
  const [successStoryBlogs, setSuccessStoryBlogs] = useState([]);

  useEffect(() => {
    async function getFeaturedBlogs() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/blog/category/featured`
        );
        const blogs = await res.json();
        setFeaturedBlogs(blogs);
      } catch (error) {
        console.log(error);
      }
    }
    async function getFreelanceInsightBlogs() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/blog/category/freelance_insights`
        );
        const blogs = await res.json();
        setFreelanceInsightsBlogs(blogs);
      } catch (error) {
        console.log(error);
      }
    }
    async function getHiringInsightBlogs() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/blog/category/hiring_insights`
        );
        const blogs = await res.json();
        setHiringInsightsBlogs(blogs);
      } catch (error) {
        console.log(error);
      }
    }
    async function getFipezoInsightBlogs() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/blog/category/fipezo_insights`
        );
        const blogs = await res.json();
        setFipezoInsightsBlogs(blogs);
      } catch (error) {
        console.log(error);
      }
    }
    async function getHowToGuideBlogs() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/blog/category/how_to_guide`
        );
        const blogs = await res.json();
        setHowToGuideBlogs(blogs);
      } catch (error) {
        console.log(error);
      }
    }
    async function getSuccessStoriesBlogs() {
      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/blog/category/success_stories`
        );
        const blogs = await res.json();
        setSuccessStoryBlogs(blogs);
      } catch (error) {
        console.log(error);
      }
    }
    getFeaturedBlogs();
    getFreelanceInsightBlogs();
    getHiringInsightBlogs();
    getFipezoInsightBlogs();
    getHowToGuideBlogs();
    getSuccessStoriesBlogs();
  }, []);

  const viewCount = async (id) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/blog/viewcount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const view = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Fipezo | Resources</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 flex flex-col gap-8">
        <div className="flex items-center justify-center gap-8 flex-col lg:flex-row">
          <div>
            <Image
              src="/cinematographer-cat-logo.png"
              alt="cinematographer-category-logo"
              width={800}
              height={800}
              className="lg:w-[40vw]"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/resources/category/featured"
              className="text-2xl lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              featured
            </Link>
            <Link
              href="/resources/category/freelance_insights"
              className="text-2xl lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              freelance insights
            </Link>
            <Link
              href="/resources/category/hiring_insights"
              className="text-2xl lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              hiring insights
            </Link>
            <Link
              href="/resources/category/fipezo_insights"
              className="text-2xl lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              fipezo insights
            </Link>
            <Link
              href="/resources/category/how_to_guide"
              className="text-2xl lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              how to guide
            </Link>
            <Link
              href="/resources/category/success_stories"
              className="text-2xl lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              success stories
            </Link>
            <hr className="h-px w-full text-neutral-500 bg-neutral-500 my-4" />
            <button
              type="button"
              className="px-6 py-3 border-[1.5px] rounded-3xl capitalize w-full text-left border-gray-600 text-neutral-500 flex items-center gap-4"
              onClick={() => setShowSearch(true)}
            >
              <FaSearch size={"1.35em"} />
              type to search...
            </button>
          </div>
        </div>
        {featuredBlogs.length > 0 && (
          <div className="m-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-3xl lg:text-5xl font-bold capitalize lg:ml-12 border-b-4 lg:border-b-8 border-rose-500">
                  Featured
                </li>
              </ul>
            </nav>
            <section className="flex flex-col items-center justify-center gap-6">
              <div className="flex items-start flex-wrap gap-y-8 lg:gap-y-12">
                {featuredBlogs.map((item, index) => (
                  <Link
                    href={`/resources/details/${item.uid}`}
                    onClick={() => viewCount(item._id)}
                    className="flex flex-col items-start lg:mx-12 gap-2 max-w-sm"
                    key={index}
                  >
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                      alt="cover image"
                      // src={`/How to stat freelancing.png`}
                      width={800}
                      height={800}
                      className=""
                    />
                    <p className="font-bold lg:text-2xl line-clamp-2">
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
              <Link
                href="/resources/category/featured"
                className="bg-red-500 text-white font-semibold tracking-wider rounded-lg px-4 lg:px-6 py-2 lg:py-3 text-sm whitespace-nowrap lg:text-base capitalize"
              >
                view more...
              </Link>
            </section>
          </div>
        )}
        {freelanceInsightsBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="lg:ml-12 text-3xl lg:text-5xl font-bold capitalize border-b-4 lg:border-b-8 border-rose-500">
                  Freelance Insights
                </li>
              </ul>
            </nav>
            <section className="flex flex-col items-center gap-6">
              <div className="flex items-start flex-wrap gap-y-8 lg:gap-y-12">
                {freelanceInsightsBlogs.map((item, index) => (
                  <Link
                    href={`/resources/details/${item.uid}`}
                    onClick={() => viewCount(item._id)}
                    className="flex flex-col items-start lg:mx-12 gap-2 max-w-sm"
                    key={index}
                  >
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                      alt="cover image"
                      width={400}
                      height={400}
                      className=""
                    />
                    <h3 className="font-bold lg:text-2xl line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
              <Link
                href="/resources/category/freelance_insights"
                className="bg-red-500 text-white font-semibold tracking-wider rounded-lg px-4 lg:px-6 py-2 lg:py-3 text-sm whitespace-nowrap lg:text-base capitalize"
              >
                view more...
              </Link>
            </section>
          </div>
        )}
        {hiringInsightsBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-3xl lg:text-5xl lg:ml-12 font-bold capitalize border-b-4 lg:border-b-8 border-rose-500">
                  hiring insights
                </li>
              </ul>
            </nav>
            <section className="flex flex-col items-center gap-6">
              <div className="flex items-start flex-wrap gap-y-8 lg:gap-y-12">
                {hiringInsightsBlogs.map((item, index) => (
                  <Link
                    href={`/resources/details/${item.uid}`}
                    onClick={() => viewCount(item._id)}
                    className="flex flex-col items-start lg:mx-12 gap-2 max-w-sm"
                    key={index}
                  >
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                      alt="cover image"
                      width={400}
                      height={400}
                      className=""
                    />
                    <h3 className="font-bold lg:text-2xl line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
              <Link
                href="/resources/category/hiring_insights"
                className="bg-red-500 text-white font-semibold tracking-wider rounded-lg px-4 lg:px-6 py-2 lg:py-3 text-sm whitespace-nowrap lg:text-base capitalize"
              >
                view more...
              </Link>
            </section>
          </div>
        )}
        {fipezoInsightsBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-3xl lg:text-5xl border-b-4 lg:border-b-8 border-red-500 lg:ml-12 font-bold capitalize">
                  fipezo insights
                </li>
              </ul>
            </nav>
            <section className="flex flex-col items-center gap-6">
              <div className="flex items-start flex-wrap gap-y-8 lg:gap-y-12">
                {fipezoInsightsBlogs.map((item, index) => (
                  <Link
                    href={`/resources/details/${item.uid}`}
                    onClick={() => viewCount(item._id)}
                    className="flex flex-col items-start lg:mx-12 gap-2 max-w-sm"
                    key={index}
                  >
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                      alt="cover image"
                      width={400}
                      height={400}
                      className=""
                    />
                    <h3 className="font-bold lg:text-2xl line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
              <Link
                href="/resources/category/fipezo_insights"
                className="bg-red-500 text-white font-semibold rounded-lg px-4 lg:px-6 py-2 lg:py-3 text-sm whitespace-nowrap lg:text-base capitalize"
              >
                view more...
              </Link>
            </section>
          </div>
        )}
        {howToGuideBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-3xl lg:text-5xl border-b-4 lg:border-b-8 border-red-500 lg:ml-12 font-bold capitalize">
                  how to guide
                </li>
              </ul>
            </nav>
            <section className="flex flex-col items-center gap-6">
              <div className="flex items-start flex-wrap gap-y-8 lg:gap-y-12">
                {howToGuideBlogs.map((item, index) => (
                  <Link
                    href={`/resources/details/${item.uid}`}
                    onClick={() => viewCount(item._id)}
                    className="flex flex-col items-start lg:mx-12 gap-2 max-w-sm"
                    key={index}
                  >
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                      alt="cover image"
                      width={400}
                      height={400}
                      className=""
                    />
                    <h3 className="font-bold lg:text-2xl line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
              <Link
                href="/resources/category/how_to_guide"
                className="bg-red-500 text-white rounded-lg px-4 lg:px-6 py-2 lg:py-3 text-sm whitespace-nowrap lg:text-base capitalize"
              >
                view more...
              </Link>
            </section>
          </div>
        )}
        {successStoryBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="border-b-4 lg:border-b-8 border-red-500 text-3xl lg:ml-12 lg:text-5xl font-bold capitalize">
                  success stories
                </li>
              </ul>
            </nav>
            <section className="flex items-center flex-col gap-6">
              <div className="flex items-start flex-wrap gap-y-8 lg:gap-y-12">
                {successStoryBlogs.map((item, index) => (
                  <Link
                    href={`/resources/details/${item.uid}`}
                    onClick={() => viewCount(item._id)}
                    className="flex flex-col items-start lg:mx-12 gap-2 max-w-sm"
                    key={index}
                  >
                    <Image
                      src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                      alt="cover image"
                      width={400}
                      height={400}
                      className=""
                    />
                    <h3 className="font-bold lg:text-2xl line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
              <Link
                href="/resources/category/success_stories"
                className="bg-red-500 text-white rounded-lg px-4 lg:px-6 py-2 lg:py-3 text-sm whitespace-nowrap lg:text-base capitalize"
              >
                view more...
              </Link>
            </section>
          </div>
        )}
      </div>
      {showSearch === true && <SearchBlog setShowSearch={setShowSearch} />}
      <Footer premium={props.user?.premium} />
    </>
  );
}
