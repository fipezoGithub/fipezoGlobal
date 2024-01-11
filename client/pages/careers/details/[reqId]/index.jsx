import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RWebShare } from "react-web-share";

export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/carrer/${ctx.query.reqId}`
  );
  const data = await response.json();
  return { props: { data } };
};
const ReqId = (props) => {
  const [url, setUrl] = useState();
  const router = useRouter();

  useEffect(() => {
    setUrl(window.location.origin + "/careers/details/" + props.data._id);
  }, []);

  return (
    <>
      <Head>
        <title>Fipezo | Join Our Team at Fipezo</title>
        <meta
          name="description"
          content="At Fipezo, we believe that our people are the driving force behind our success. If you're looking for more than just a job, but a meaningful career where you can make a real impact, you've come to the right place.Join our team and be part of a dynamic and innovative company that values your skills, talents, and aspirations. Our commitment to excellence, diversity, and inclusion makes Fipezo a fantastic place to grow professionally and personally."
        />
      </Head>
      <Navbar
        color="black"
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16 flex flex-col items-center justify-center gap-6 py-4 bg-[url('/jobDetailsPageBG.png')] bg-cover bg-center bg-no-repeat min-h-[40vh] md:min-h-[60vh] text-white">
        <h1 className="text-2xl md:text-3xl font-bold">{props.data.title}</h1>
        <p className="text-xl md:text-2xl font-bold">{props.data.location}</p>
        <Link
          href={`/careers/details/${props.data.uid}/apply`}
          className="bg-white text-black px-4 md:px-6 py-2 md:py-4 rounded-lg font-bold text-base md:text-xl shadow-xl"
        >
          Apply to this job
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center mx-4 md:mx-0 md:w-1/2 gap-6 my-8 py-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center self-start text-blue-500 font-medium"
            >
              <MdOutlineKeyboardBackspace />
              back to jobs
            </button>
            <RWebShare
              data={{
                text: "Share the profile of ",
                url: url,
                title: "Fipezo",
              }}
            >
              <button className="text-3xl text-blue-600" type="button">
                <CiShare2 />
              </button>
            </RWebShare>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-lg font-semibold">What is Fipezo?</h3>
            <p className="text-sm leading-7">
              Fipezo - where freelancers and clients converge to redefine the
              freelance experience. At Fipezo, we&apos;re not just a platform;
              we&apos;re a dynamic community driven by collaboration,
              innovation, and empowerment.
              <br />
              <br />
              Fipezo was founded on the principles of trust and excellence.
              We&apos;re creating a community that embodies these virtues at its
              core, envisioning a future where trust is the norm, not the
              exception.
              <br />
              <br />
              Join us, and you become part of a unique community where passion
              and drive flourish. Fipezo isn&apos;t just a startup; it&apos;s a
              movement, and your role in the {props.data.title} team is a
              pivotal part of our transformative journey. Shape the future of
              freelancing with Fipezo - where your career is an opportunity to
              be part of something extraordinary.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-lg font-semibold">
              You should apply if you have:
            </h3>
            {props.data.category === "designer" && (
              <ul className="text-sm font-medium leading-7 list-disc">
                <li>
                  1 year of experience in website desigining, graphics
                  desigining, or a related field.
                </li>
                <li>
                  Adept with Figma, Adobe Illustrator, Adobe Photoshop, Canva
                </li>
              </ul>
            )}
            {props.data.category === "development" && (
              <ul className="text-sm font-medium leading-7 list-disc">
                <li>
                  1 year of experience in frontend developing, backend
                  developing, or a related field.
                </li>
                <li>
                  Adept with HTML, CSS, JavaScript, React, Next, Tailwind,
                  MongoDb
                </li>
              </ul>
            )}
            {props.data.category === "marketing" && (
              <ul className="text-sm font-medium leading-7 list-disc">
                <li>
                  6 months of experience in digital marketing, social marketing
                  or a related field.
                </li>
                <li>
                  Adept with Analytical Skills, Content Creation and Marketing,
                  SEO, Social Media Management, Email Marketing
                </li>
              </ul>
            )}
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-lg font-semibold">How life is at Fipezo?</h3>
            <p className="text-sm leading-7">
              Welcome to Fipezo, where work is an experience like no other.
              Surrounded by top-tier talent, our dynamic community thrives on
              diverse skills and hidden talents. Hard work is recognized, and
              we&apos;re committed to your well-being with perks like stocked
              pantries, provided meals, and comprehensive health coverage. At
              Fipezo, transparency reigns - no rigid schedules or traditional
              job titles. We trust you, and that&apos;s evident from day one -
              your salary arrives before you do. Join us for a career
              that&apos;s not just a job, but a uniquely Fipezo experience. If
              this feels like your kind of workplace, let&apos;s connect!
            </p>
          </div>
          <Link
            href={`/careers/details/${props.data.uid}/apply`}
            className="text-white bg-red-500 px-2 py-1 md:p-4 rounded-lg font-bold text-lg shadow-xl self-center"
          >
            Apply to this job
          </Link>
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default ReqId;
