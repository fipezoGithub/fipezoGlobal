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
      <div className="mt-16 mx-8">
        <h4 className="border-b py-2">Fipezo {">"} Sitemap</h4>
        <div className="mt-4">
          <h1 className="text-2xl mb-4">Site map</h1>
          <div className="mb-4">
            <h3 className="text-2xl mb-4">Navbar Menu</h3>
            <ul className="flex flex-col gap-4 ml-4">
              <li>
                <Link
                  href="/jobs"
                  className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                >
                  <SlTarget /> browse jobs
                </Link>
              </li>
              <li className="flex flex-col gap-2">
                <p className="flex items-center capitalize gap-1 text-[#4a4aeb]">
                  <SlTarget /> explore
                </p>
                <ul className="ml-4">
                  <li>
                    <Link
                      href="/explore/freelancers"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> a freelancer
                    </Link>
                    <Link
                      href="/explore/companies"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> a company
                    </Link>
                  </li>
                  <li></li>
                </ul>
              </li>
              <li className="flex flex-col gap-2">
                <p className="flex items-center capitalize gap-1 text-[#4a4aeb]">
                  <SlTarget /> get help
                </p>
                <ul className="ml-4">
                  <li>
                    <Link
                      href="/guides_and_reviews"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> guides and reviews
                    </Link>
                    <Link
                      href="/faqs"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> FAQs
                    </Link>
                    <Link
                      href="/contact_us"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> Contact Us
                    </Link>
                  </li>
                  <li></li>
                </ul>
              </li>
              <li>
                <Link
                  href="/login"
                  className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                >
                  <SlTarget /> Login
                </Link>
              </li>
              <li className="flex flex-col gap-2">
                <p className="flex items-center capitalize gap-1 text-[#4a4aeb]">
                  <SlTarget /> Sign up
                </p>
                <ul className="ml-4">
                  <li>
                    <Link
                      href="/register/freelancer"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget />
                      as a freelancer
                    </Link>
                    <Link
                      href="/register/company"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget />
                      as a company
                    </Link>
                    <Link
                      href="/register/client"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget />
                      as a client
                    </Link>
                  </li>
                  <li></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl mb-4">Footer Menu</h3>
            <ul className="flex flex-col gap-4 ml-4">
              <li>
                <Link
                  href="/explore/freelancers"
                  className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                >
                  <SlTarget /> freelancing services
                </Link>
              </li>
              <li className="flex flex-col gap-2">
                <p className="flex items-center capitalize gap-1 text-[#4a4aeb]">
                  <SlTarget /> Help and Support
                </p>
                <ul className="ml-4">
                  <li>
                    <Link
                      href="/contact_us"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> contact us
                    </Link>
                    <Link
                      href="/faqs"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> FAQs
                    </Link>
                  </li>
                  <li></li>
                </ul>
              </li>
              <li className="flex flex-col gap-2">
                <p className="flex items-center capitalize gap-1 text-[#4a4aeb]">
                  <SlTarget /> Law and Order
                </p>
                <ul className="ml-4">
                  <li>
                    <Link
                      href="/terms_and_condition"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> terms of service
                    </Link>
                    <Link
                      href="/data_protection"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> data protection
                    </Link>
                    <Link
                      href="/privacy_and_policy"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> privacy policy
                    </Link>
                    <Link
                      href="/cancellation_and_refund"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> cancellation &amp; refund
                    </Link>
                    <Link
                      href="/shipping_and_delivery"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> shipping &amp; delivery
                    </Link>
                  </li>
                  <li></li>
                </ul>
              </li>
              <li className="flex flex-col gap-2">
                <p className="flex items-center capitalize gap-1 text-[#4a4aeb]">
                  <SlTarget /> useful links
                </p>
                <ul className="ml-4">
                  <li>
                    <Link
                      href="/freelancer-premium-plans"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> Fipezo premium
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/referandearn"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> refer and earn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/submit_your_city"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> submit your city
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="flex flex-col gap-2">
                <p className="flex items-center capitalize gap-1 text-[#4a4aeb]">
                  <SlTarget />
                  about
                </p>
                <ul className="ml-4">
                  <li>
                    <Link
                      href="/about_us"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> about us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides_and_reviews"
                      className="flex items-center capitalize gap-1 text-[#4a4aeb]"
                    >
                      <SlTarget /> guides and reviews
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Sitemap;
