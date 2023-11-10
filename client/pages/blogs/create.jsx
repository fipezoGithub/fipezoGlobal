import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";

const Create = (props) => {
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
      <div className="mt-16 flex flex-col items-center justify-center gap-4">
        <h1 className="lg:text-3xl font-bold">Create Blog</h1>
        <form
          action=""
          className="flex flex-col gap-4 items-center border shadow-md"
        >
          <div className="flex flex-col p-4 gap-4 w-full">
            <label htmlFor="title" className="capitalize text-xl">
              title
            </label>
            <input
              type="text"
              placeholder="Enter your title..."
              id="title"
              className="focus:outline-none focus:border-b p-3"
            />
          </div>
          <div className="flex flex-col p-4 gap-4 w-full">
            <label htmlFor="description" className="capitalize text-xl">
              description
            </label>
            <textarea
              name=""
              id="description"
              cols="30"
              className="w-full focus:outline-none focus:border-b"
              rows="10"
              placeholder="Enter your description..."
            ></textarea>
          </div>
          <div className="flex flex-col p-4 gap-4">
            <label htmlFor="cover" className="capitalize text-xl">
              Cover Image
            </label>
            <input type="file" accept="image/*" id="cover" />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 capitalize fomt-bold">
              submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Create;
