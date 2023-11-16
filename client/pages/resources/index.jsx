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
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-2xl lg:text-5xl font-bold capitalize">
                  Featured
                </li>
                <li>
                  <Link
                    href="/resources/category/featured"
                    className="border border-black rounded-lg px-3 lg:px-6 py-1 lg:py-3 text-xs whitespace-nowrap lg:text-base capitalize"
                  >
                    view more...
                  </Link>
                </li>
              </ul>
            </nav>
            <section className="flex items-center justify-center flex-wrap">
              {featuredBlogs.map((item, index) => (
                <Link
                  href={`/resources/details/${item.uid}`}
                  onClick={() => viewCount(item._id)}
                  className="flex flex-col items-start mx-12"
                  key={index}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                    width={400}
                    height={400}
                    className="w-60"
                  />
                  <p className="font-bold lg:text-2xl line-clamp-2">
                    {item.title}
                  </p>
                </Link>
              ))}
            </section>
          </div>
        )}
        {freelanceInsightsBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-2xl lg:text-5xl font-bold capitalize">
                  Freelance Insights
                </li>
                <li>
                  <Link
                    href="/resources/category/freelance_insights"
                    className="border border-black rounded-lg px-3 lg:px-6 py-1 lg:py-3 text-xs whitespace-nowrap lg:text-base capitalize"
                  >
                    view more...
                  </Link>
                </li>
              </ul>
            </nav>
            <section className="flex items-center justify-center flex-wrap">
              {freelanceInsightsBlogs.map((item, index) => (
                <Link
                  href={`/resources/details/${item.uid}`}
                  onClick={() => viewCount(item._id)}
                  className="flex flex-col items-start mx-12"
                  key={index}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                    width={400}
                    height={400}
                    className="w-60"
                  />
                  <h3 className="font-bold lg:text-2xl line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </section>
          </div>
        )}
        {hiringInsightsBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-2xl lg:text-5xl font-bold capitalize">
                  hiring insights
                </li>
                <li>
                  <Link
                    href="/resources/category/hiring_insights"
                    className="border border-black rounded-lg px-3 lg:px-6 py-1 lg:py-3 text-xs whitespace-nowrap lg:text-base capitalize"
                  >
                    view more...
                  </Link>
                </li>
              </ul>
            </nav>
            <section className="flex items-center justify-center flex-wrap">
              {hiringInsightsBlogs.map((item, index) => (
                <Link
                  href={`/resources/details/${item.uid}`}
                  onClick={() => viewCount(item._id)}
                  className="flex flex-col items-start mx-12"
                  key={index}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                    width={400}
                    height={400}
                    className="w-60"
                  />
                  <h3 className="font-bold lg:text-2xl line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </section>
          </div>
        )}
        {fipezoInsightsBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-2xl lg:text-5xl font-bold capitalize">
                  fipezo insights
                </li>
                <li>
                  <Link
                    href="/resources/category/fipezo_insights"
                    className="border border-black rounded-lg px-3 lg:px-6 py-1 lg:py-3 text-xs whitespace-nowrap lg:text-base capitalize"
                  >
                    view more...
                  </Link>
                </li>
              </ul>
            </nav>
            <section className="flex items-center justify-center flex-wrap">
              {fipezoInsightsBlogs.map((item, index) => (
                <Link
                  href={`/resources/details/${item.uid}`}
                  onClick={() => viewCount(item._id)}
                  className="flex flex-col items-start mx-12"
                  key={index}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                    width={400}
                    height={400}
                    className="w-60"
                  />
                  <h3 className="font-bold lg:text-2xl line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </section>
          </div>
        )}
        {howToGuideBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-2xl lg:text-5xl font-bold capitalize">
                  how to guide
                </li>
                <li>
                  <Link
                    href="/resources/category/how_to_guide"
                    className="border border-black rounded-lg px-3 lg:px-6 py-1 lg:py-3 text-xs whitespace-nowrap lg:text-base capitalize"
                  >
                    view more...
                  </Link>
                </li>
              </ul>
            </nav>
            <section className="flex items-center justify-center flex-wrap">
              {howToGuideBlogs.map((item, index) => (
                <Link
                  href={`/resources/details/${item.uid}`}
                  onClick={() => viewCount(item._id)}
                  className="flex flex-col items-start mx-12"
                  key={index}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                    width={400}
                    height={400}
                    className="w-60"
                  />
                  <h3 className="font-bold lg:text-2xl line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </section>
          </div>
        )}
        {successStoryBlogs.length > 0 && (
          <div className="mx-8 my-8">
            <nav className="my-8">
              <ul className="flex items-center justify-between">
                <li className="text-2xl lg:text-5xl font-bold capitalize">
                  success stories
                </li>
                <li>
                  <Link
                    href="/resources/category/success_stories"
                    className="border border-black rounded-lg px-3 lg:px-6 py-1 lg:py-3 text-xs whitespace-nowrap lg:text-base capitalize"
                  >
                    view more...
                  </Link>
                </li>
              </ul>
            </nav>
            <section className="flex items-center justify-center flex-wrap">
              {successStoryBlogs.map((item, index) => (
                <Link
                  href={`/resources/details/${item.uid}`}
                  onClick={() => viewCount(item._id)}
                  className="flex flex-col items-start mx-12"
                  key={index}
                >
                  <Image
                    src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                    width={400}
                    height={400}
                    className="w-60"
                  />
                  <h3 className="font-bold lg:text-2xl line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </section>
          </div>
        )}
      </div>
      {showSearch === true && <SearchBlog setShowSearch={setShowSearch} />}
      <Footer />
    </>
  );
}
