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
          <p className="text-white text-3xl py-4 text-center drop-shadow-lg shadow-black flex flex-col items-center font-bold gap-2">
            Ab projects ki tension ko bolo bye!
            <span className="text-xl">with Fipezo Jobs</span>
          </p>
        </div>
        <div className="flex items-start justify-center w-full mt-4 relative">
          <Jobfilter />
          <div className="flex flex-col items-center w-auto lg:w-1/2">
            <h1 className="text-center font-bold text-lg lg:text-2xl mb-4 flex flex-col items-center">
              {props.data.length} Jobs
              <span className="text-sm font-light">
                Start applying to the latest projects vacancies at leading
                companies in India below.
              </span>
            </h1>
            <div className="flex flex-col items-center gap-8 w-full">
              {props.data.map((job, index) => (
                <Jobcard
                  job={job}
                  key={index}
                  company={props.company}
                  user={props.user}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
