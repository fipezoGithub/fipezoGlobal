import styles from "@/styles/Explore.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import Image from "next/image";
import Head from "next/head";
import Loading from "@/components/Loading";
import SidebarCompany from "@/components/SidebarCompany";
import CompanyCard from "@/components/CompanyCard";
import SearchBoxCompany from "@/components/SearchBoxCompany";

function Explore(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);
  const [filterCity, setFilterCity] = useState("");
  const [divider, setDivider] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showphotography, setShowPhotography] = useState(false);
  const [showECommerce, setShowECommerce] = useState(false);
  const [showProductionHouse, setShowProductionHouse] = useState(false);
  const [showAdvertisingAgency, setShowAdvertisingAgency] = useState(true);
  const [showPhotographyInstitute, setShowPhotographyInstitute] =
    useState(false);
  const [showOther, setShowOther] = useState(false);

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
  useEffect(() => {
    async function fetchFreelancer() {
      setIsLoading(true);
      try {
        if (searchQuery.length === 0) {
          const response = await fetch(
            `${process.env.SERVER_URL}/profiles/verified/companies`,
            { cache: "no-store" }
          );
          const data = await response.json();
          setCompanies(data);
          if (window.innerWidth < 640) {
            setNoOfPages(Math.ceil(data.length / 10));
          } else {
            setNoOfPages(Math.ceil(data.length / 12));
          }
        } else {
          const response = await fetch(
            `${process.env.SERVER_URL}/company/search`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query: searchQuery }),
            }
          );
          const data = await response.json();
          setCompanies(data);
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
  const filteredCompanies = companies.filter((freelancer) => {
    if (
      !showphotography &&
      !showECommerce &&
      !showProductionHouse &&
      !showAdvertisingAgency &&
      !showPhotographyInstitute &&
      !showOther
    ) {
      return true;
    }
    if (
      showphotography &&
      showECommerce &&
      showProductionHouse &&
      showAdvertisingAgency &&
      showPhotographyInstitute &&
      showOther
    ) {
      return (
        freelancer.companytype === "photography" ||
        freelancer.companytype === "eCommerce" ||
        freelancer.companytype === "production_house" ||
        freelancer.companytype === "advertising_agency" ||
        freelancer.companytype === "photography_institute" ||
        freelancer.companytype === "other"
      );
    }
    if (showphotography && showECommerce) {
      return (
        freelancer.profession === "photography" ||
        freelancer.profession === "eCommerce"
      );
    }
    if (showphotography && showProductionHouse) {
      return (
        freelancer.profession === "photography" ||
        freelancer.profession === "production_house"
      );
    }
    if (showphotography && showAdvertisingAgency) {
      return (
        freelancer.profession === "photography" ||
        freelancer.profession === "advertising_agency"
      );
    }
    if (showphotography && showOther) {
      return (
        freelancer.profession === "photography" ||
        freelancer.profession === "other"
      );
    }

    if (showphotography) {
      return freelancer.companytype === "photography";
    }
    if (showECommerce) {
      return freelancer.companytype === "eCommerce";
    }
    if (showProductionHouse) {
      return freelancer.companytype === "production_house";
    }
    if (showAdvertisingAgency) {
      return freelancer.companytype === "advertising_agency";
    }
    if (showPhotographyInstitute) {
      return freelancer.companytype === "photography_institute";
    }
    if (showOther) {
      return freelancer.companytype === "other";
    }

    return true;
  });

  const locationFilter = filteredCompanies.filter((freelancer) => {
    const address = JSON.parse(freelancer.companyaddress);
    const city = address.city;
    if (filterCity === "none" && city === localStorage.getItem("city")) {
      return true;
    } else if (filterCity !== "none" && city === filterCity) return true;
    return false;
  });
  useEffect(() => {
    if (window.innerWidth < 640) {
      setNoOfPages(Math.ceil(locationFilter.length / 10));
    } else {
      setNoOfPages(Math.ceil(locationFilter.length / 12));
    }
  }, [locationFilter]);
  const pages = noOfPages;
  const startIndex = (currentPage - 1) * divider;
  const endIndex = startIndex + divider;
  const displayedFreelancers = locationFilter.slice(startIndex, endIndex);
  const final = displayedFreelancers;
  return isLoading === true ? (
    <Loading message={"Companies are loading"} />
  ) : (
    <>
      <div className={styles.explore}>
        <Head>
          <title>Fipezo | Explore Companies</title>
        </Head>
        <Navbar
          user={props.user}
          company={props.company}
          setCompany={props.setCompany}
          setUser={props.setUser}
        />
        <div className={styles.search}>
          <SearchBoxCompany border={true} />
        </div>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <div>
              <button
                type="button"
                onClick={handelFilter}
                className="sm:hidden flex items-center gap-1 border border-solid px-2 py-1 rounded-md"
              >
                <BiFilter size={"2em"} />
                Filters
              </button>
            </div>
            {showSideBar === true && (
              <SidebarCompany
                setCompanies={setCompanies}
                setCurrentPage={setCurrentPage}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                setFilterCity={setFilterCity}
                showAdvertisingAgency={showAdvertisingAgency}
                setShowAdvertisingAgency={setShowAdvertisingAgency}
                showECommerce={showECommerce}
                setShowECommerce={setShowECommerce}
                showphotography={showphotography}
                setShowPhotography={setShowPhotography}
                showProductionHouse={showProductionHouse}
                setShowProductionHouse={setShowProductionHouse}
                showPhotographyInstitute={showPhotographyInstitute}
                setShowPhotographyInstitute={setShowPhotographyInstitute}
                showOther={showOther}
                setShowOther={setShowOther}
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
                <p className={styles.nobodyMainText}>No Companies available!</p>
                <p className={styles.nobodyText}>
                  Try changing the filters or search for a different city.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.cards}>
                  {final.map((freelancer, index) => (
                    <CompanyCard key={index} profile={freelancer} />
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
          <Footer premium={props.user?.premium} />
      </div>
    </>
  );
}

export default Explore;
