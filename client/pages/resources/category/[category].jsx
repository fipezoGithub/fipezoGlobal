import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchBlog from "@/components/SearchBlog";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/blog/category/${ctx.query.category}`
  );
  const data = await response.json();
  return { props: { data } };
};

export default function BlogCategory(props) {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

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
        <title>
          Fipezo |{" "}
          {(
            router.query.category.charAt(0).toUpperCase() +
            router.query.category.slice(1)
          )
            .split("_")
            .join(" ")}
        </title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 w-full">
        <Image
          src="/resource-category-banner.png"
          alt="category-banner"
          width={1000}
          height={400}
          className="w-full h-[13vh] lg:h-auto object-cover"
        />
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between mx-2 lg:mx-8">
          <h1 className="border-b-4 lg:border-b-8 border-red-500 text-3xl lg:text-4xl capitalize font-semibold">
            {router.query.category.split("_").join(" ")}
          </h1>
          <button type="button" onClick={() => setShowSearch(true)}>
            <FaSearch size={"1.5em"} />
          </button>
        </div>
        <div className="flex items-start justify-center gap-12 flex-wrap my-4 gap-y-8 lg:gap-y-12 mx-2 lg:mx-8">
          {props.data.length > 0 ? (
            props.data.map((item, index) => (
              <Link
                href={`/resources/details/${item.uid}`}
                onClick={() => viewCount(item._id)}
                className="flex flex-col items-start gap-2 mx-4 lg:mx-0 max-w-md hover:text-blue-600"
                key={index}
              >
                <Image
                  src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${item.cover}`}
                  width={600}
                  height={350}
                  alt="resource-cover"
                  className=""
                />
                <h3 className="lg:text-xl font-semibold line-clamp-2">
                  {item.title}
                </h3>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center my-4">
              <Image src="/no-blogs.png" alt="no-blogs" width={1080} height={1080} />
              <p className="text-lg">
                No blogs found. Try different categories
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer premium={props.user?.premium} />
      {showSearch === true && <SearchBlog setShowSearch={setShowSearch} />}
    </>
  );
}
