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
import { useRouter } from "next/router";

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
  const [showMusicTeacher, setShowMusicTeacher] = useState(false);
  const [showDrawingTeacher, setShowDrawingTeacher] = useState(false);
  const [showPainter, setShowPainter] = useState(false);
  const [showLyricist, setShowLyricist] = useState(false);
  const [showMusician, setShowMusician] = useState(false);
  const [showVoiceOverArtist, setShowVoiceOverArtist] = useState(false);
  const [showFashionDesigner, setShowFashionDesigner] = useState(false);
  const [showVocalist, setShowVocalist] = useState(false);
  const [showActor, setShowActor] = useState(false);
  const [showActress, setShowActress] = useState(false);
  const [showBabySitter, setShowBabySitter] = useState(false);
  const [showMaid, setShowMaid] = useState(false);
  const [showInteriorDesigner, setShowInteriorDesigner] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rateSort, setRateSort] = useState("50000");
  const [fourStars, setFourStars] = useState(false);
  const [threeStars, setThreeStars] = useState(false);
  const [noOfPages, setNoOfPages] = useState(0);
  const [filterCity, setFilterCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.query.profession === "album_designer") {
      setShowAlbumDesign(true);
    } else if (router.query.profession === "anchor") {
      setShowAnchor(true);
    } else if (router.query.profession === "cinematographer") {
      setShowCinematographers(true);
    } else if (router.query.profession === "dancer") {
      setShowDancer(true);
    } else if (router.query.profession === "dance_teacher") {
      setShowDanceTeacher(true);
    } else if (router.query.profession === "dj") {
      setShowDj(true);
    } else if (router.query.profession === "drone_operator") {
      setShowDroneOperators(true);
    } else if (router.query.profession === "drawing_teacher") {
      setShowDrawingTeacher(true);
    } else if (router.query.profession === "drone_operator") {
      setShowDroneOperators(true);
    } else if (router.query.profession === "fashion_designer") {
      setShowFashionDesigner(true);
    } else if (router.query.profession === "graphics_designer") {
      setShowGraphicsDesigner(true);
    } else if (router.query.profession === "influencer") {
      setShowInfluencer(true);
    } else if (router.query.profession === "lyricist") {
      setShowLyricist(true);
    } else if (router.query.profession === "makeup_artist") {
      setShowMakeupArtist(true);
    } else if (router.query.profession === "mehendi_artist") {
      setShowMehendiArtist(true);
    } else if (router.query.profession === "model") {
      setShowModel(true);
    } else if (router.query.profession === "musician") {
      setShowMusician(true);
    } else if (router.query.profession === "music_teacher") {
      setShowMusicTeacher(true);
    } else if (router.query.profession === "painter") {
      setShowPainter(true);
    } else if (router.query.profession === "photographer") {
      setShowPhotographers(true);
    } else if (router.query.profession === "photo_editor") {
      setShowPhotoEditor(true);
    } else if (router.query.profession === "private_tutor") {
      setShowPrivateTutor(true);
    } else if (router.query.profession === "video_editor") {
      setShowVideoEditor(true);
    } else if (router.query.profession === "voice_over_artist") {
      setShowVoiceOverArtist(true);
    } else if (router.query.profession === "vocalist") {
      setShowVocalist(true);
    } else if (router.query.profession === "web_developer") {
      setShowWebDeveloper(true);
    } else if (router.query.profession === "actor") {
      setShowActor(true);
    } else if (router.query.profession === "actress") {
      setShowActress(true);
    } else if (router.query.profession === "babysitter") {
      setShowBabySitter(true);
    } else if (router.query.profession === "maid") {
      setShowMaid(true);
    } else if (router.query.profession === "interior_designer") {
      setShowInteriorDesigner(true);
    }
  }, [router.query]);

  const increPage = (e) => {
    if (currentPage !== noOfPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    window.innerWidth > 640 && setShowSideBar(true);
    setFilterCity(localStorage.getItem("city"));
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
    const location = localStorage.getItem("city");
    const response = await fetch(
      `${process.env.SERVER_URL}/freelancer/search?loc=${location}&page=${currentPage}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      }
    );
    const data = await response.json();
    setFreelancers(data.data);
    setNoOfPages(data.totalPages);
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchFreelancer() {
      const location = localStorage.getItem("city");
      try {
        setIsLoading(true);
        if (
          searchQuery.length === 0 &&
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
          !showMusician &&
          !showVoiceOverArtist &&
          !showFashionDesigner &&
          !showVocalist &&
          !showActor &&
          !showActress &&
          !showBabySitter &&
          !showMaid &&
          !showInteriorDesigner
        ) {
          const response = await fetch(
            `${process.env.SERVER_URL}/freelancer/professions?q[]=${router.query.profession}&loc=${location}&page=${currentPage}`,
            { cache: "no-store" }
          );
          const data = await response.json();
          setFreelancers(data.freelancers);
          setNoOfPages(data.totalPages);
        } else {
          let queryStr = "";
          if (showPhotographers) {
            queryStr = queryStr + "q[]=photographer&";
          }
          if (showCinematographers) {
            queryStr = queryStr + "q[]=cinematographer&";
          }
          if (showDroneOperators) {
            queryStr = queryStr + "q[]=drone_operator&";
          }
          if (showPhotoEditor) {
            queryStr = queryStr + "q[]=photo_editor&";
          }
          if (showVideoEditor) {
            queryStr = queryStr + "q[]=video_editor&";
          }
          if (showAlbumDesign) {
            queryStr = queryStr + "q[]=album_designer&";
          }
          if (showModel) {
            queryStr = queryStr + "q[]=model&";
          }
          if (showMakeupArtist) {
            queryStr = queryStr + "q[]=makeup_artist&";
          }
          if (showAnchor) {
            queryStr = queryStr + "q[]=anchor&";
          }
          if (showWebDeveloper) {
            queryStr = queryStr + "q[]=web_developer&";
          }
          if (showDj) {
            queryStr = queryStr + "q[]=dj&";
          }
          if (showDancer) {
            queryStr = queryStr + "q[]=dancer&";
          }
          if (showInfluencer) {
            queryStr = queryStr + "q[]=influencer&";
          }
          if (showGraphicsDesigner) {
            queryStr = queryStr + "q[]=graphics_designer&";
          }
          if (showMehendiArtist) {
            queryStr = queryStr + "q[]=mehendi_artist&";
          }
          if (showPrivateTutor) {
            queryStr = queryStr + "q[]=private_tutor&";
          }
          if (showDanceTeacher) {
            queryStr = queryStr + "q[]=dance_teacher&";
          }
          if (showMusicTeacher) {
            queryStr = queryStr + "q[]=music_teacher&";
          }
          if (showDrawingTeacher) {
            queryStr = queryStr + "q[]=drawing_teacher&";
          }
          if (showPainter) {
            queryStr = queryStr + "q[]=painter&";
          }
          if (showLyricist) {
            queryStr = queryStr + "q[]=lyricist&";
          }
          if (showMusician) {
            queryStr = queryStr + "q[]=musician&";
          }
          if (showVoiceOverArtist) {
            queryStr = queryStr + "q[]=voice_over_artist&";
          }
          if (showFashionDesigner) {
            queryStr = queryStr + "q[]=fashion_designer&";
          }
          if (showVocalist) {
            queryStr = queryStr + "q[]=vocalist&";
          }
          if (showActor) {
            queryStr = queryStr + "q[]=actor&";
          }
          if (showActress) {
            queryStr = queryStr + "q[]=actress&";
          }
          if (showBabySitter) {
            queryStr = queryStr + "q[]=babysitter&";
          }
          if (showMaid) {
            queryStr = queryStr + "q[]=maid&";
          }
          if (showInteriorDesigner) {
            queryStr = queryStr + "q[]=interior_designer&";
          }
          const response = await fetch(
            `${process.env.SERVER_URL}/freelancer/professions?${queryStr}loc=${location}&page=${currentPage}`,
            { cache: "no-store" }
          );
          const data = await response.json();
          setFreelancers(data.freelancers);
          setNoOfPages(data.totalPages);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }

    fetchFreelancer();
  }, [
    showPhotographers,
    showCinematographers,
    showDroneOperators,
    showPhotoEditor,
    showVideoEditor,
    showAlbumDesign,
    showModel,
    showMakeupArtist,
    showAnchor,
    showWebDeveloper,
    showDj,
    showDancer,
    showInfluencer,
    showGraphicsDesigner,
    showMehendiArtist,
    showPrivateTutor,
    showDanceTeacher,
    showMusicTeacher,
    showDrawingTeacher,
    showPainter,
    showLyricist,
    showMusician,
    showVoiceOverArtist,
    showFashionDesigner,
    showVocalist,
    showActor,
    showActress,
    showBabySitter,
    showMaid,
    showInteriorDesigner,
    filterCity,
    currentPage,
  ]);

  const filtered = freelancers.filter((freelancer) => {
    if (freelancer.rate <= rateSort) {
      return true;
    }
    return false;
  });

  const finalFiltered = filtered.filter((freelancer) => {
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

  const final = finalFiltered;
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
          type='text'
          className={styles.searchInput}
          placeholder='Search freelancers by name...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchIcon} type='submit'>
          <IoSearch
            style={{ fontSize: "1.25rem", color: "white" }}
            className='pointer-events-none'
            aria-label='Search'
          />
        </button>
      </form>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <div>
            <button
              type='button'
              onClick={handelFilter}
              className='md:hidden flex items-center gap-1 border border-solid px-2 py-1 rounded-md'
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
              showVoiceOverArtist={showVoiceOverArtist}
              setShowVoiceOverArtist={setShowVoiceOverArtist}
              showFashionDesigner={showFashionDesigner}
              setShowFashionDesigner={setShowFashionDesigner}
              showVocalist={showVocalist}
              setShowVocalist={setShowVocalist}
              showActor={showActor}
              setShowActor={setShowActor}
              showActress={showActress}
              setShowActress={setShowActress}
              showBabySitter={showBabySitter}
              setShowBabySitter={setShowBabySitter}
              showInteriorDesigner={showInteriorDesigner}
              setShowInteriorDesigner={setShowInteriorDesigner}
              showMaid={showMaid}
              setShowMaid={setShowMaid}
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
                src='/nobody.webp'
                width={500}
                height={500}
                alt='nobody-pic'
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
                  {currentPage < noOfPages - 1 && (
                    <>
                      {"..."}
                      <span
                        onClick={() => setCurrentPage(noOfPages)}
                        className={styles.page}
                        style={
                          currentPage === noOfPages
                            ? { backgroundColor: "black", color: "white" }
                            : {}
                        }
                      >
                        {noOfPages}
                      </span>
                    </>
                  )}
                  {currentPage !== noOfPages && (
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
      <Footer premium={props.user?.premium} />
    </div>
  );
}

export default Explore;
