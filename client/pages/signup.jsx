import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const signup = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | Sign up</title>
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-28 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 justify-center">
          <h1 className="text-5xl font-bold">Tell us who you are</h1>
          <div className="flex items-center justify-center gap-3 h-52">
            <Link
              href="/register/user"
              className="flex flex-col items-center text-lg border px-6 py-3 rounded-lg gap-2"
            >
              <Image
                src="/client_register.png"
                width={175}
                height={175}
                className="w-12 h-12"
              />
              <p className="w-2/3 text-center">I am a client, wants to hire freelancer</p>
            </Link>
            <Link
              href="/register/freelancer"
              className="flex flex-col items-center text-lg border px-6 py-3 rounded-lg gap-2"
            >
              <Image
                src="/freelancer_register.png"
                width={175}
                height={175}
                className="w-12 h-12"
              />
              <p className="w-2/3 text-center">I am a freelancer, looking for work</p>
            </Link>
            <Link
              href="/register/freelancer"
              className="flex flex-col items-center text-lg border px-6 py-3 rounded-lg gap-2"
            >
              <Image
                src="/company_register.png"
                width={175}
                height={175}
                className="w-12 h-12"
              />
              <p className="w-2/3 text-center">I am a company, wants to hire freelancer</p>
            </Link>
          </div>
          <p className="text-xl">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default signup;
