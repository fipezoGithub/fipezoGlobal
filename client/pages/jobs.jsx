import Footer from "@/components/Footer";
import Jobcard from "@/components/Jobcard";
import Navbar from "@/components/Navbar";
import Head from "next/head";


export default function Jobs(props) {
  return (
    <>
      <Head>
        <title>Fipezo | Jobs</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16">
        <h1 className="text-center font-bold text-lg lg:text-2xl mb-4">
          Latest Jobs
        </h1>
        <Jobcard />
      </div>
      <Footer />
    </>
  );
}
