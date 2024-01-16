import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ShippingAndDelivery = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | Shipping And Delivery</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 flex flex-col items-center justify-center bg-[url('/bg14.jpg')]">
        <h1 className="text-4xl font-bold text-center my-4">
          Welcome to Fipezo - Your Trusted Freelance Platform
        </h1>
        <div className="flex flex-col relative items-center md:w-1/2 p-4 m-8 gap-4 h-screen overflow-hidden overflow-y-scroll bg-white">
          <Link className="absolute top-[2%] right-[2%]" href="/">
            <Image
              src="/cross.png"
              height={28}
              width={28}
              alt="cross"
              className=""
            ></Image>
          </Link>
          <div className="flex gap-2 flex-col">
            <h2 className="font-bold text-lg">1. Service Delivery Process</h2>
            <p className="text-lg">
              At Fipezo, our focus is on connecting freelance artists with
              clients seamlessly. Here&apos;s an overview of our service
              delivery process:
            </p>

            <p className="text-lg">
              <span className="font-bold">Project Initiation:</span> Once
              you&apos;ve selected a freelance artist and initiated a project,
              the collaboration begins.
            </p>

            <p className="text-lg">
              <span className="font-bold">Project Timeline:</span> The timeline
              for project completion varies depending on the scope and
              complexity of the services required. Freelancers and clients work
              together to establish project milestones and deadlines.
            </p>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="font-bold text-lg">
              2. No Physical Products or Shipping Costs
            </h2>
            <p className="text-lg">
              As a platform dedicated to freelance services, Fipezo does not
              involve the shipment of physical products. Therefore, there are no
              shipping costs associated with our services.
            </p>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="font-bold text-lg">
              3. International Collaboration
            </h2>
            <p className="text-lg">
              Fipezo facilitates international collaboration between freelance
              artists and clients. Regardless of your geographical location, you
              can connect with talented freelancers from around the world.
            </p>

            <p className="text-lg">
              <span className="font-bold">Time Zone Considerations:</span> Once
              you&apos;ve selected a freelance artist and initiated a project,
              the collaboration begins.
            </p>

            <p className="text-lg">
              <span className="font-bold">Digital Delivery:</span> The delivery
              of freelance services is facilitated digitally, eliminating the
              need for physical shipping.
            </p>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="font-bold text-lg">
              4. Changes to Service Information
            </h2>
            <p className="text-lg">
              It is the responsibility of users to communicate effectively
              regarding project requirements and timelines. Any changes to
              project details or timelines should be discussed and agreed upon
              between the freelancer and the client.
            </p>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="font-bold text-lg">5. Contact Us</h2>
            <p className="text-lg">
              If you have any questions or concerns regarding service delivery,
              please contact our customer support team at{" "}
              <Link href="mailto:help@fipezo.com">help@fipezo.com</Link>.
            </p>
          </div>
        </div>
      </div>

      <Footer premium={props.user?.premium} />
    </>
  );
};

export default ShippingAndDelivery;
