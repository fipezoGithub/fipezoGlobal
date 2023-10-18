import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

const Premium = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | premium</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 mx-8 bg-gradient-to-l from-sky-500 to-indigo-500 text-white py-8">
        <h1 className="text-center text-2xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quis
          error sed asperiores consequatur, reiciendis
        </h1>
        <h3 className="text-center text-2xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem magni
          ipsam adipisci, at repellat quod,
        </h3>
        <div className="flex items-center justify-center mt-8 gap-8">
          <div className="flex flex-col items-start gap-4 px-4 py-2 bg-white text-black rounded-xl w-72 h-72">
            <h3 className="lg:text-xl text-neutral-500">3 month plan</h3>
            <hr className="w-full h-px" />
            <p className="font-bold lg:text-2xl">₹99</p>
            <div className="flex items-center gap-4">
              <p className="line-through lg:text-xl text-neutral-500">₹140</p>
              <p className="px-2 py-1 bg-yellow-500 rounded-2xl text-white">
                40% off
              </p>
            </div>
            <div className="h-1/3"></div>
            <button
              type="button"
              className="bg-orange-500 text-white px-4 py-2 w-full capitalize font-semibold "
            >
              buy now
            </button>
          </div>
          <div className="flex flex-col items-start gap-4 px-4 py-2 bg-white text-black rounded-xl w-72 h-72">
            <h3 className="lg:text-xl text-neutral-500">Custom plan</h3>
            <hr className="w-full h-px" />
            <p className="font-semibold lg:text-2xl">
              Explore the best solutions and offers for your hiring requirements
            </p>
            <div className="h-1/3"></div>
            <button
              type="button"
              className="bg-orange-500 text-white px-4 py-2 w-full capitalize font-semibold"
            >
              request a callback
            </button>
          </div>
        </div>
        <p className="text-center mt-4 text-lg">
          Reach out to us on <a href="tel:9038578787">+91 90385 78787</a> or
          <a href="mailto:fipezocare@gmail.com"> fipezocare@gmail.com</a> for
          more details.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          repellat esse porro ea molestias, sit dolore voluptates
        </h2>
        <div>
          <table className="text-2xl text-left border">
            <thead className="text-xs">
              <tr className="border-b">
                <th scope="col" className="uppercase px-6 py-3">
                  benefits
                </th>
                <th scope="col" className="uppercase px-6 py-3">
                  free
                </th>
                <th scope="col" className="uppercase px-6 py-3">
                  premium
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                  <AiOutlineCheck color="#12c96b" />
                </td>
                <td className="px-6 py-4">
                  <AiOutlineCheck color="#12c96b" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                  <GrClose color="#dddddd" />
                </td>
                <td className="px-6 py-4">
                  <AiOutlineCheck color="#12c96b" />
                </td>
              </tr>
              <tr className="bg-white">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                  <GrClose color="#dddddd" />
                </td>
                <td className="px-6 py-4">
                  <AiOutlineCheck color="#12c96b" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Premium;
