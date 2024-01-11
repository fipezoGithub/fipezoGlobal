import Footer from "@/components/Footer";
import Jobcard from "@/components/Jobcard";
import Jobfilter from "@/components/Jobfilter";
import Jobheader from "@/components/Jobheader";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/job/location/${ctx.query.location}`
  );
  const data = await response.json();
  data.reverse();
  return { props: { data } };
};
export default function Jobs(props) {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showPhotographers, setShowPhotographers] = useState(false);
  const [showCinematographers, setShowCinematographers] = useState(false);
  const [showDroneOperators, setShowDroneOperators] = useState(false);
  const [showPhotoEditor, setShowPhotoEditor] = useState(false);
  const [showVideoEditor, setShowVideoEditor] = useState(false);
  const [showAlbumDesign, setShowAlbumDesign] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showMakeupArtist, setShowMakeupArtist] = useState(false);
  const [showAnchor, setShowAnchor] = useState(false);
  const [showWebDeveloper, setShowWebDeveloper] = useState(false);
  const [showDj, setShowDj] = useState(false);
  const [showDancer, setShowDancer] = useState(false);
  const [showInfluencer, setShowInfluencer] = useState(false);
  const [showGraphicsDesigner, setShowGraphicsDesigner] = useState(false);
  const [showMehendiArtist, setShowMehendiArtist] = useState(false);
  const [showOpenJob, setShowOpenJob] = useState(false);
  const [showClosedJob, setShowClosedJob] = useState(false);
  const [budgetSort, setBudgetSort] = useState("50000");
  const [filterCity, setFilterCity] = useState("Kolkata");
  const router = useRouter();

  useEffect(() => {
    window.innerWidth > 640 && setShowSideBar(true);
  }, []);

  const handelFilter = () => {
    setShowSideBar(!showSideBar);
  };

  const fstFilter = props.data.filter((job) => {
    let one_day = 1000 * 60 * 60 * 24;
    let a = new Date(job.dueDate);
    let today = new Date();
    var Result = Math.round(a.getTime() - today.getTime()) / one_day;
    var Final_Result = Result.toFixed(0);
    if (showClosedJob) {
      return Final_Result < 0;
    } else if (showOpenJob) {
      return Final_Result > 0;
    }
    return Final_Result;
  });

  const filtered = fstFilter.filter((job) => {
    if (job.budget <= budgetSort) {
      return true;
    }
    return false;
  });

  const filteredFreelancers = filtered.filter((freelancer) => {
    if (
      !showPhotographers &&
      !showCinematographers &&
      !showDroneOperators &&
      !showPhotoEditor &&
      !showVideoEditor &&
      !showAlbumDesign &&
      !showModel &&
      !showMakeupArtist &&
      !showAnchor &&
      !showWebDeveloper &&
      !showDj &&
      !showDancer &&
      !showInfluencer &&
      !showGraphicsDesigner &&
      !showMehendiArtist
    ) {
      return true;
    }
    if (
      showPhotographers &&
      showCinematographers &&
      showDroneOperators &&
      showPhotoEditor &&
      showVideoEditor &&
      showAlbumDesign &&
      showModel &&
      showMakeupArtist &&
      showAnchor &&
      showWebDeveloper &&
      showDj &&
      showDancer &&
      showInfluencer &&
      showGraphicsDesigner &&
      showMehendiArtist
    ) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "drone_operator" ||
        freelancer.profession === "photo_editor" ||
        freelancer.profession === "video_editor" ||
        freelancer.profession === "album_designer" ||
        freelancer.profession === "model" ||
        freelancer.profession === "makeup_artist" ||
        freelancer.profession === "anchor" ||
        freelancer.profession === "web_developer" ||
        freelancer.profession === "dj" ||
        freelancer.profession === "dancer" ||
        freelancer.profession === "influencer" ||
        freelancer.profession === "graphics_designer" ||
        freelancer.profession === "mehendi_artist"
      );
    }
    if (showPhotographers && showCinematographers) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "cinematographer"
      );
    }
    if (showPhotographers && showDroneOperators) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "drone_operator"
      );
    }
    if (showPhotographers && showPhotoEditor) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "photo_editor"
      );
    }
    if (showPhotographers && showAlbumDesign) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "album_designer"
      );
    }
    if (showPhotographers && showAnchor) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "anchor"
      );
    }
    if (showPhotographers && showDancer) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "dancer"
      );
    }
    if (showPhotographers && showDj) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "dj"
      );
    }
    if (showPhotographers && showMakeupArtist) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "makeup_artist"
      );
    }
    if (showPhotographers && showModel) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "model"
      );
    }
    if (showPhotographers && showVideoEditor) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "video_editor"
      );
    }
    if (showPhotographers && showWebDeveloper) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "web_developer"
      );
    }
    if (showPhotographers && showInfluencer) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "influencer"
      );
    }
    if (showPhotographers && showGraphicsDesigner) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "graphics_designer"
      );
    }
    if (showPhotographers && showMehendiArtist) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "mehendi_artist"
      );
    }
    if (showCinematographers && showDroneOperators) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "drone_operator"
      );
    }
    if (showCinematographers && showPhotoEditor) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "photo_editor"
      );
    }
    if (showCinematographers && showAlbumDesign) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "album_designer"
      );
    }
    if (showCinematographers && showAnchor) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "anchor"
      );
    }
    if (showCinematographers && showDancer) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "dancer"
      );
    }
    if (showCinematographers && showDj) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "dj"
      );
    }
    if (showCinematographers && showMakeupArtist) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "makeup_artist"
      );
    }
    if (showCinematographers && showModel) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "model"
      );
    }
    if (showCinematographers && showVideoEditor) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "video_editor"
      );
    }
    if (showCinematographers && showWebDeveloper) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "web_developer"
      );
    }
    if (showCinematographers && showInfluencer) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "influencer"
      );
    }
    if (showCinematographers && showGraphicsDesigner) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "graphics_designer"
      );
    }
    if (showCinematographers && showMehendiArtist) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "mehendi_artist"
      );
    }
    if (showPhotographers) {
      return freelancer.profession === "photographer";
    }
    if (showCinematographers) {
      return freelancer.profession === "cinematographer";
    }
    if (showDroneOperators) {
      return freelancer.profession === "drone_operator";
    }
    if (showPhotoEditor) {
      return freelancer.profession === "photo_editor";
    }
    if (showVideoEditor) {
      return freelancer.profession === "video_editor";
    }
    if (showAlbumDesign) {
      return freelancer.profession === "album_designer";
    }
    if (showModel) {
      return freelancer.profession === "model";
    }
    if (showMakeupArtist) {
      return freelancer.profession === "makeup_artist";
    }
    if (showAnchor) {
      return freelancer.profession === "anchor";
    }
    if (showWebDeveloper) {
      return freelancer.profession === "web_developer";
    }
    if (showDj) {
      return freelancer.profession === "dj";
    }
    if (showDancer) {
      return freelancer.profession === "dancer";
    }
    if (showInfluencer) {
      return freelancer.profession === "influencer";
    }
    if (showGraphicsDesigner) {
      return freelancer.profession === "graphics_designer";
    }
    if (showMehendiArtist) {
      return freelancer.profession === "mehendi_artist";
    }
    return true;
  });

  return (
    <>
      <Head>
        <title>Fipezo | Jobs At {router.query.location}</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16">
        <div className="w-full">
          <Image
            src="/Abb Jobs Ki Tension ko bolo bye!.webp"
            alt="Job Banner"
            width={800}
            height={300}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex items-center flex-col justify-center w-full mt-4 relative">
        <h1 className="text-center font-bold text-lg lg:text-2xl mb-4 flex flex-col items-center">
          {filteredFreelancers.length} Projects
          <span className="text-sm font-light">
            Start applying to the latest projects vacancies at leading companies
            in India below.
          </span>
        </h1>
        <Jobheader />
        <div className="flex items-start justify-center w-full mt-4 relative">
          {showSideBar === true && (
            <Jobfilter
              showOpenJob={showOpenJob}
              setShowOpenJob={setShowOpenJob}
              showClosedJob={showClosedJob}
              setShowClosedJob={setShowClosedJob}
              budgetSort={budgetSort}
              setBudgetSort={setBudgetSort}
              filterCity={filterCity}
              setFilterCity={setFilterCity}
              showAlbumDesign={showAlbumDesign}
              setShowAlbumDesign={setShowAlbumDesign}
              showAnchor={showAnchor}
              setShowAnchor={setShowAnchor}
              showCinematographers={showCinematographers}
              setShowCinematographers={setShowCinematographers}
              showDancer={showDancer}
              setShowDancer={setShowDancer}
              showDj={showDj}
              setShowDj={setShowDj}
              showDroneOperators={showDroneOperators}
              setShowDroneOperators={setShowDroneOperators}
              showGraphicsDesigner={showGraphicsDesigner}
              setShowGraphicsDesigner={setShowGraphicsDesigner}
              showInfluencer={showInfluencer}
              setShowInfluencer={setShowInfluencer}
              showMakeupArtist={showMakeupArtist}
              setShowMakeupArtist={setShowMakeupArtist}
              showMehendiArtist={showMehendiArtist}
              setShowMehendiArtist={setShowMehendiArtist}
              showModel={showModel}
              setShowModel={setShowModel}
              showPhotographers={showPhotographers}
              setShowPhotographers={setShowPhotographers}
              showPhotoEditor={showPhotoEditor}
              setShowPhotoEditor={setShowPhotoEditor}
              showVideoEditor={showVideoEditor}
              setShowVideoEditor={setShowVideoEditor}
              showWebDeveloper={showWebDeveloper}
              setShowWebDeveloper={setShowWebDeveloper}
            />
          )}
          <div className="flex flex-col items-center w-auto lg:w-1/2">
            <div>
              <button
                type="button"
                onClick={handelFilter}
                className="md:hidden flex items-center gap-1 border border-solid px-2 py-1 rounded-md mb-4"
              >
                <BiFilter size={"2em"} />
                Filters
              </button>
              <div className="flex flex-col items-center gap-8 w-full h-screen overflow-hidden overflow-y-scroll">
                {filteredFreelancers.length > 0 ? (
                  filteredFreelancers.map((job, index) => (
                    <Jobcard
                      job={job}
                      key={index}
                      company={props.company}
                      user={props.user}
                    />
                  ))
                ) : (
                  <div>
                    <Image
                      src="/no-job-found.png"
                      width={400}
                      height={400}
                      alt="No job found"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
}
