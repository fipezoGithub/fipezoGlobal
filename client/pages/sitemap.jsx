import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { SlTarget } from "react-icons/sl";
import React from "react";
import Link from "next/link";

const Sitemap = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | My Profile</title>
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16">
        <h4>Fipezo {">"} Sitemap</h4>
        <div>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/jobs" className="flex items-center capitalize gap-1">
                <SlTarget /> browse jobs
              </Link>
            </li>
            <li className="flex flex-col gap-2">
              <p className="flex items-center capitalize gap-1">
                <SlTarget /> explore
              </p>
              <ul className="ml-4">
                <li>
                  <Link
                    href="/explore/freelancers"
                    className="flex items-center capitalize gap-1"
                  >
                    <SlTarget /> a freelancer
                  </Link>
                </li>
                <li></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sitemap;
