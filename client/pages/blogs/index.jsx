import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";

const Blogs = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | Blogs</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <Footer />
    </>
  );
};

export default Blogs;
