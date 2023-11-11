import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaSearch } from "react-icons/fa";

const BlogCategory = (props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          Fipezo |{" "}
          {/* {(
            router.query.category.charAt(0).toUpperCase() +
            router.query.category.slice(1)
          )
            .split("_")
            .join(" ")} */}
        </title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16">
        <div className="flex items-center justify-between mx-8">
          <h1 className="text-4xl capitalize font-semibold">
            {router.query.category.split("_").join(" ")}
          </h1>
          <button type="button">
            <FaSearch size={"1.5em"} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          <Link
            href="/resources/details/A_Comprehensive_Guide_to_Navigating_Fipezo's_Platform_for_Maximum_Opportunities"
            className="flex flex-col items-start gap-2"
          >
            <Image
              src="/500-graphics.png"
              width={400}
              height={400}
              alt="resource-cover"
              className="w-[15vw]"
            />
            <h3 className="text-xl font-medium">title</h3>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogCategory;
