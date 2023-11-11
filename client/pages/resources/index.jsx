import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchBlog from "@/components/SearchBlog";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.SERVER_URL}/blog/`);
  const data = await response.json();
  return { props: { data } };
};

export default function Blogs(props) {
  const [showSearch, setShowSearch] = useState(false);

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
        <div className="flex items-center justify-center gap-8">
          <div>
            <Image
              src="/cinematographer-cat-logo.png"
              width={800}
              height={800}
              className="w-[40vw]"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/resources/category/featured"
              className="lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              featured
            </Link>
            <Link
              href="/resources/category/freelance_insights"
              className="lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              freelance insights
            </Link>
            <Link
              href="/resources/category/hiring_insights"
              className="lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              hiring insights
            </Link>
            <Link
              href="/resources/category/fipezo_insights"
              className="lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              fipezo insights
            </Link>
            <Link
              href="/resources/category/how_to_guide"
              className="lg:text-5xl capitalize font-bold hover:text-blue-500"
            >
              how to guide
            </Link>
            <Link
              href="/resources/category/success_stories"
              className="lg:text-5xl capitalize font-bold hover:text-blue-500"
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
        <div className="mx-8 my-8">
          <nav className="my-8">
            <ul className="flex items-center justify-between">
              <li className="text-5xl font-bold capitalize">Featured</li>
              <li>
                <Link
                  href="/resources/category/featured"
                  className="border border-black rounded-lg px-6 py-3 capitalize"
                >
                  view more...
                </Link>
              </li>
            </ul>
          </nav>
          <section className="flex items-center justify-center flex-wrap">
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
          </section>
        </div>
        <div className="mx-8 my-8">
          <nav className="my-8">
            <ul className="flex items-center justify-between">
              <li className="text-5xl font-bold capitalize">
                Freelance Insights
              </li>
              <li>
                <Link
                  href="/resources/category/freelance_insight"
                  className="border border-black rounded-lg px-6 py-3 capitalize"
                >
                  view more...
                </Link>
              </li>
            </ul>
          </nav>
          <section className="flex items-center justify-center flex-wrap">
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
          </section>
        </div>
        <div className="mx-8 my-8">
          <nav className="my-8">
            <ul className="flex items-center justify-between">
              <li className="text-5xl font-bold capitalize">hiring insights</li>
              <li>
                <Link
                  href="/resources/category/hiring_insights"
                  className="border border-black rounded-lg px-6 py-3 capitalize"
                >
                  view more...
                </Link>
              </li>
            </ul>
          </nav>
          <section className="flex items-center justify-center flex-wrap">
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
          </section>
        </div>
        <div className="mx-8 my-8">
          <nav className="my-8">
            <ul className="flex items-center justify-between">
              <li className="text-5xl font-bold capitalize">how to guide</li>
              <li>
                <Link
                  href="/resources/category/how_to_guide"
                  className="border border-black rounded-lg px-6 py-3 capitalize"
                >
                  view more...
                </Link>
              </li>
            </ul>
          </nav>
          <section className="flex items-center justify-center flex-wrap">
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
          </section>
        </div>
        <div className="mx-8 my-8">
          <nav className="my-8">
            <ul className="flex items-center justify-between">
              <li className="text-5xl font-bold capitalize">success stories</li>
              <li>
                <Link
                  href="/resources/category/success_stories"
                  className="border border-black rounded-lg px-6 py-3 capitalize"
                >
                  view more...
                </Link>
              </li>
            </ul>
          </nav>
          <section className="flex items-center justify-center flex-wrap">
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
            <Link href="" className="flex flex-col items-start mx-12">
              <Image
                src="/freeX.png"
                width={400}
                height={400}
                className="w-60"
              />
              <h3 className="font-bold lg:text-2xl">title</h3>
            </Link>
          </section>
        </div>
      </div>
      {showSearch === true && <SearchBlog setShowSearch={setShowSearch} />}
      <Footer />
    </>
  );
}
