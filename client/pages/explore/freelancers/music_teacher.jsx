import ProfileCard from "@/components/ProfileCard";
import styles from "@/styles/Explore.module.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import Image from "next/image";
import Head from "next/head";
import Loading from "@/components/Loading";
import { IoSearch } from "react-icons/io5";

function Explore(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [freelancers, setFreelancers] = useState([]);
  const [showPhotographers, setShowPhotographers] = useState(false);
  const [showCinematographers, setShowCinematographers] = useState(false);
  const [showDroneOperators, setShowDroneOperators] = useState(false);
  const [showPhotoEditor, setShowPhotoEditor] = useState(false);
  const [showVideoEditor, setShowVideoEditor] = useState(false);
  const [showAlbumDesign, setShowAlbumDesign] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showMakeupArtist, setShowMakeupArtist] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showAnchor, setShowAnchor] = useState(false);
  const [showWebDeveloper, setShowWebDeveloper] = useState(false);
  const [showDj, setShowDj] = useState(false);
  const [showDancer, setShowDancer] = useState(false);
  const [showInfluencer, setShowInfluencer] = useState(false);
  const [showGraphicsDesigner, setShowGraphicsDesigner] = useState(false);
  const [showMehendiArtist, setShowMehendiArtist] = useState(false);
  const [showPrivateTutor, setShowPrivateTutor] = useState(false);
  const [showDanceTeacher, setShowDanceTeacher] = useState(false);
  const [showMusicTeacher, setShowMusicTeacher] = useState(true);
  const [showDrawingTeacher, setShowDrawingTeacher] = useState(false);
  const [showPainter, setShowPainter] = useState(false);
  const [showLyricist, setShowLyricist] = useState(false);
  const [showMusician, setShowMusician] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rateSort, setRateSort] = useState("50000");
  const [fourStars, setFourStars] = useState(false);
  const [threeStars, setThreeStars] = useState(false);
  const [noOfPages, setNoOfPages] = useState(0);
  const [filterCity, setFilterCity] = useState("");
  const [divider, setDivider] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const increPage = (e) => {
    if (currentPage !== noOfPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    setFilterCity("none");
    window.innerWidth > 640 && setShowSideBar(true);
    setDivider(window.innerWidth > 640 ? 12 : 10);
  }, []);

  const handelFilter = () => {
    setShowSideBar(!showSideBar);
  };

  const decrePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.SERVER_URL}/freelancer/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      }
    );
    const data = await response.json();
    setFreelancers(data);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchFreelancer() {
      try {
        if (searchQuery.length === 0) {
          const response = await fetch(
            `${process.env.SERVER_URL}/profiles/verified/freelancer`,
            { cache: "no-store" }
          );
          const data = await response.json();
          setFreelancers(data);
          if (window.innerWidth <= 640) {
            setNoOfPages(Math.ceil(data.length / 10));
          } else {
            setNoOfPages(Math.ceil(data.length / 12));
          }
        } else {
          const response = await fetch(
            `${process.env.SERVER_URL}/freelancer/search`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query: searchQuery }),
            }
          );
          const data = await response.json();
          setFreelancers(data);
          if (window.innerWidth < 640) {
            setNoOfPages(Math.ceil(data.length / 10));
          } else {
            setNoOfPages(Math.ceil(data.length / 12));
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFreelancer();
  }, [searchQuery]);

  const filteredFreelancers = freelancers.filter((freelancer) => {
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
      !showMehendiArtist &&
      !showPrivateTutor &&
      !showDanceTeacher &&
      !showMusicTeacher &&
      !showDrawingTeacher &&
      !showPainter &&
      !showLyricist &&
      !showMusician
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
      showMehendiArtist &&
      showPrivateTutor &&
      showDanceTeacher &&
      showMusicTeacher &&
      showDrawingTeacher &&
      showPainter &&
      showLyricist &&
      showMusician
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
        freelancer.profession === "mehendi_artist" ||
        freelancer.profession === "private_tutor" ||
        freelancer.profession === "dance_teacher" ||
        freelancer.profession === "music_teacher" ||
        freelancer.profession === "drawing_teacher" ||
        freelancer.profession === "painter" ||
        freelancer.profession === "lyricist" ||
        freelancer.profession === "musician"
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
    if (showPhotographers && showPrivateTutor) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "private_tutor"
      );
    }
    if (showPhotographers && showDanceTeacher) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "dance_teacher"
      );
    }
    if (showPhotographers && showMusicTeacher) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "music_teacher"
      );
    }
    if (showPhotographers && showDrawingTeacher) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "drawing_teacher"
      );
    }
    if (showPhotographers && showPainter) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "painter"
      );
    }
    if (showPhotographers && showLyricist) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "lyricist"
      );
    }
    if (showPhotographers && showMusician) {
      return (
        freelancer.profession === "photographer" ||
        freelancer.profession === "musician"
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
    if (showCinematographers && showPrivateTutor) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "private_tutor"
      );
    }
    if (showCinematographers && showDanceTeacher) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "dance_teacher"
      );
    }
    if (showCinematographers && showMusicTeacher) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "music_teacher"
      );
    }
    if (showCinematographers && showDrawingTeacher) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "drawing_teacher"
      );
    }
    if (showCinematographers && showPainter) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "painter"
      );
    }
    if (showCinematographers && showLyricist) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "lyricist"
      );
    }
    if (showCinematographers && showMusician) {
      return (
        freelancer.profession === "cinematographer" ||
        freelancer.profession === "musician"
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
    if (showPrivateTutor) {
      return freelancer.profession === "private_tutor";
    }
    if (showDanceTeacher) {
      return freelancer.profession === "dance_teacher";
    }
    if (showMusicTeacher) {
      return freelancer.profession === "music_teacher";
    }
    if (showDrawingTeacher) {
      return freelancer.profession === "drawing_teacher";
    }
    if (showPainter) {
      return freelancer.profession === "painter";
    }
    if (showLyricist) {
      return freelancer.profession === "lyricist";
    }
    if (showMusician) {
      return freelancer.profession === "musician";
    }
    return true;
  });

  const filtered = filteredFreelancers.filter((freelancer) => {
    if (freelancer.rate <= rateSort) {
      return true;
    }
    return false;
  });

  const locationFilter = filtered.filter((freelancer) => {
    if (
      filterCity === "none" &&
      freelancer.location === localStorage.getItem("city")
    ) {
      return true;
    } else if (filterCity !== "none" && freelancer.location === filterCity)
      return true;
    return false;
  });

  const finalFiltered = locationFilter.filter((freelancer) => {
    if (!fourStars && !threeStars) {
      return true;
    } else if (fourStars && threeStars) {
      return freelancer.rating >= 3;
    } else if (fourStars) {
      return freelancer.rating >= 4;
    } else if (threeStars) {
      return freelancer.rating >= 3;
    }
  });

  finalFiltered.sort((a, b) => {
    return b.rating * b.reviewCount - a.rating * a.reviewCount;
  });

  finalFiltered.sort((a, b) => {
    return Number(b.featured) - Number(a.featured);
  });

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setNoOfPages(Math.ceil(finalFiltered.length / 10));
    } else {
      setNoOfPages(Math.ceil(finalFiltered.length / 12));
    }
  }, [finalFiltered]);

  const pages = noOfPages;
  const startIndex = (currentPage - 1) * divider;
  const endIndex = startIndex + divider;
  const displayedFreelancers = finalFiltered.slice(startIndex, endIndex);
  const final = displayedFreelancers;
  return isLoading === true ? (
    <Loading message={"Freelancer is loading"} />
  ) : (
    <div className={styles.explore}>
      <Head>
        <title>Fipezo | Explore Freelancers</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <form
        className={styles.search + " flex items-center justify-center"}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search freelancers by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchIcon} type="submit">
          <IoSearch
            style={{ fontSize: "1.25rem", color: "white" }}
            className="pointer-events-none"
            aria-label="Search"
          />
        </button>
      </form>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div>
            <button
              type="button"
              onClick={handelFilter}
              className="md:hidden flex items-center gap-1 border border-solid px-2 py-1 rounded-md"
            >
              <BiFilter size={"2em"} />
              Filters
            </button>
          </div>
          {showSideBar === true && (
            <Sidebar
              setShowSideBar={setShowSideBar}
              setFreelancers={setFreelancers}
              setShowPhotographers={setShowPhotographers}
              setShowCinematographers={setShowCinematographers}
              setShowDroneOperators={setShowDroneOperators}
              setShowPhotoEditor={setShowPhotoEditor}
              setShowVideoEditor={setShowVideoEditor}
              setShowAlbumDesign={setShowAlbumDesign}
              setShowModel={setShowModel}
              setCurrentPage={setCurrentPage}
              setShowMakeupArtist={setShowMakeupArtist}
              setShowAnchor={setShowAnchor}
              setShowWebDeveloper={setShowWebDeveloper}
              setShowDj={setShowDj}
              setShowDancer={setShowDancer}
              setShowInfluencer={setShowInfluencer}
              showGraphicsDesigner={showGraphicsDesigner}
              setShowGraphicsDesigner={setShowGraphicsDesigner}
              showMehendiArtist={showMehendiArtist}
              setShowMehendiArtist={setShowMehendiArtist}
              showPrivateTutor={showPrivateTutor}
              setShowPrivateTutor={setShowPrivateTutor}
              showDanceTeacher={showDanceTeacher}
              setShowDanceTeacher={setShowDanceTeacher}
              showMusicTeacher={showMusicTeacher}
              setShowMusicTeacher={setShowMusicTeacher}
              showDrawingTeacher={showDrawingTeacher}
              setShowDrawingTeacher={setShowDrawingTeacher}
              showPainter={showPainter}
              setShowPainter={setShowPainter}
              showLyricist={showLyricist}
              setShowLyricist={setShowLyricist}
              showMusician={showMusician}
              setShowMusician={setShowMusician}
              setSearchQuery={setSearchQuery}
              showPhotographers={showPhotographers}
              showCinematographers={showCinematographers}
              showDroneOperators={showDroneOperators}
              showPhotoEditor={showPhotoEditor}
              showVideoEditor={showVideoEditor}
              showAlbumDesign={showAlbumDesign}
              showModel={showModel}
              showMakeupArtist={showMakeupArtist}
              showAnchor={showAnchor}
              showWebDeveloper={showWebDeveloper}
              showDj={showDj}
              showDancer={showDancer}
              showInfluencer={showInfluencer}
              searchQuery={searchQuery}
              setRateSort={setRateSort}
              rateSort={rateSort}
              setFourStars={setFourStars}
              fourStars={fourStars}
              setThreeStars={setThreeStars}
              threeStars={threeStars}
              setFilterCity={setFilterCity}
            />
          )}
        </div>
        <div className={styles.main}>
          {final.length === 0 ? (
            <div className={styles.empty}>
              <Image
                src="/nobody.webp"
                width={500}
                height={500}
                alt="nobody-pic"
              />
              <p className={styles.nobodyMainText}>No freelancers available!</p>
              <p className={styles.nobodyText}>
                Try changing the filters or search for a different city.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.cards}>
                {final.map((freelancer, index) => (
                  <ProfileCard key={index} profile={freelancer} />
                ))}
              </div>
              <nav className={styles.nav}>
                <div className={styles.pages}>
                  {currentPage !== 1 && (
                    <button className={styles.btn} onClick={decrePage}>
                      Back
                    </button>
                  )}
                  {/* {Array.from({ length: pages }, (_, index) => ( */}
                  {/* <div
                    className={styles.page}
                    style={
                      currentPage === 1
                        ? { backgroundColor: "black", color: "white" }
                        : {}
                    }
                    // onClick={() => setCurrentPage(index + 1)}
                    // key={index}
                  > */}
                  {currentPage > 1 && (
                    <span
                      className={styles.page}
                      style={
                        currentPage === currentPage - 1
                          ? { backgroundColor: "black", color: "white" }
                          : {}
                      }
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      {currentPage - 1}
                    </span>
                  )}
                  <span
                    className={styles.page}
                    style={
                      currentPage === currentPage
                        ? { backgroundColor: "black", color: "white" }
                        : {}
                    }
                    onClick={() => setCurrentPage(currentPage)}
                  >
                    {currentPage}
                  </span>
                  {currentPage < noOfPages && (
                    <span
                      className={styles.page}
                      style={
                        currentPage === currentPage + 1
                          ? { backgroundColor: "black", color: "white" }
                          : {}
                      }
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      {currentPage + 1}
                    </span>
                  )}
                  {/* </div> */}
                  {/* )).slice(0, 3)} */}
                  {currentPage < pages - 1 && (
                    <>
                      {"..."}
                      <span
                        onClick={() => setCurrentPage(pages)}
                        className={styles.page}
                        style={
                          currentPage === pages
                            ? { backgroundColor: "black", color: "white" }
                            : {}
                        }
                      >
                        {pages}
                      </span>
                    </>
                  )}
                  {currentPage !== pages && (
                    <button className={styles.btn} onClick={increPage}>
                      Next
                    </button>
                  )}
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
