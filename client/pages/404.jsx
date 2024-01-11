import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Custom404 = (props) => {
  return (
    <>
      <Head>
        <title>Fipezo | 404</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 flex items-center justify-center flex-col gap-4">
        <Image
          src={"/404-graphics.png"}
          height={600}
          width={600}
          className=""
          alt="not found 404"
        />
        <p className="text-red-500 font-semibold lg:text-xl">
          OOPS!!! the url you looking for can not found
        </p>
        <Link href="/" className="text-white bg-cyan-500 px-4 py-2 font-bold">
          Back to home
        </Link>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Custom404;
