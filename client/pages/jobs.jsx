import Footer from "@/components/Footer";
import Jobcard from "@/components/Jobcard";
import Jobfilter from "@/components/Jobfilter";
import Navbar from "@/components/Navbar";
import Head from "next/head";
export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.SERVER_URL}/job/get/`);
  const data = await response.json();
  return { props: { data } };
};
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
        <div className="bg-[url('/bg2.png')] bg-no-repeat bg-center bg-cover">
          <p className="text-white text-2xl py-4 text-center drop-shadow-lg shadow-black">
            Get hired from <span className="font-bold">Fipezo</span>
          </p>
        </div>
        <h1 className="text-center font-bold text-lg lg:text-2xl my-4">
          Latest Jobs
        </h1>
        <div className="flex items-start w-full">
          <Jobfilter />
          <div className="flex flex-col items-center gap-8 w-full">
            {props.data.map((job, index) => (
              <Jobcard job={job} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
