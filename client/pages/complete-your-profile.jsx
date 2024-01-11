import Verification from "@/components/Verification";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

const CompleteYourProfile = (props) => {
  const [bio, setBio] = useState("");
  const [equipments, setEquipments] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [aadhaarCard, setAadhaarCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [links, setLinks] = useState({});
  const [works, setWorks] = useState([]);
  const [termsAndConditions, setTermsAndConditions] = useState(true);
  const [worksError, setWorksError] = useState(false);
  const [addharError, setAddharError] = useState(false);
  const [completeError, setCompleteError] = useState(false);
  const [panError, setPanError] = useState(false);
  const [coverPicError, setCoverPicError] = useState(false);
  const [profilePicError, setProfilePicError] = useState(false);
  const [warns, setWarns] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getVerificationDetails = (val, index) => {
    if (index === 4) setProfilePicture(val);
    if (index === 5) setCoverPicture(val);
    if (index === 6) setAadhaarCard(val);
    if (index === 7) setPanCard(val);
    if (index === 8 || index === 9 || index === 10 || index === 11) {
      const newIndex = index - 4;
      setWorks((prevState) => [
        ...prevState.slice(0, newIndex),
        val,
        ...prevState.slice(newIndex),
      ]);
    } else if (index === 0 || index === 1 || index === 2 || index === 3) {
      setWorks((prevState) => [
        ...prevState.slice(0, index),
        val,
        ...prevState.slice(index),
      ]);
    }
    if (index === 12) {
      setLinks((prev) => ({ ...prev, facebook: val }));
    }
    if (index === 13) {
      setLinks((prev) => ({ ...prev, instagram: val }));
    }
    if (index === 14) {
      setLinks((prev) => ({ ...prev, twitter: val }));
    }
    if (index === 15) {
      setLinks((prev) => ({ ...prev, youtube: val }));
    }
    if (index === 16) {
      setTermsAndConditions(val);
    }
    if (
      index === 17 ||
      index === 18 ||
      index === 19 ||
      index === 20 ||
      index === 21 ||
      index === 22 ||
      index === 23 ||
      index === 24 ||
      index === 25
    ) {
      const newIndex = index - 17;
      setWorks((prevState) => [
        ...prevState.slice(0, newIndex),
        val,
        ...prevState.slice(newIndex),
      ]);
    }
  };

  const checkWorks = (val) => {
    if (val === 1) setWorksError(false);
    if (val === 2) setAddharError(false);
    if (val === 3) setPanError(false);
    if (val === 4) setProfilePicError(false);
    if (val === 5) setCoverPicError(false);
  };

  const setPicError = (val, i) => {
    if (i === 1) setProfilePicError(val);
    if (i === 2) setCoverPicError(val);
    if (i === 3) setAddharError(val);
    if (i === 4) setPanError(val);
  };

  const verificationDetails = async (e) => {
    if (props.user.works.length > 0) {
      setCompleteError(false);
      return;
    }
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const data = new FormData();
      data.append("aadhaarCard", aadhaarCard);
      data.append("panCard", panCard);
      if (works.length > 0) {
        works.forEach((element) => {
          data.append("works[]", element);
        });
        // data.append("works[]", works[1]);
        // data.append("works[]", works[2]);
        // data.append("works[]", works[3]);
        // data.append("works[]", works[4]);
        // data.append("works[]", works[5]);
        // data.append("works[]", works[6]);
        // data.append("works[]", works[7]);
      }
      data.append("links", JSON.stringify(links));
      data.append("termsAndConditions", termsAndConditions);
      const response = await fetch(
        `${process.env.SERVER_URL}/freelancer/verify`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      const responseData = await response.json();
      if (responseData) {
        router.push(`/freelancer_profile`);
        props.setUser(null);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar
        user={props?.user}
        company={props?.company}
        setCompany={props?.setCompany}
        setUser={props?.setUser}
      />
      {loading === false ? (
        <form
          className="flex flex-col items-center mb-24 p-8 lg:p-16 rounded-[5px] pt-8 relative top-8"
          onSubmit={verificationDetails}
        >
          <Verification
            getVerificationDetails={getVerificationDetails}
            checkWorks={checkWorks}
            worksError={worksError}
            addharError={addharError}
            panError={panError}
            bio={bio}
            setBio={setBio}
            equipments={equipments}
            setEquipments={setEquipments}
            setPicError={setPicError}
            coverPicError={coverPicError}
            profilePicError={profilePicError}
            warns={warns}
            setWarns={setWarns}
            user={props.user}
            setUser={props.setUser}
            company={props.company}
            setCompany={props.setCompany}
            profession={props.user?.profession}
          />
          {completeError === true && (
            <p className="text-xl capitalize font-bold text-red-600 mt-8">
              oops! looks like you already completed your profile
            </p>
          )}
        </form>
      ) : (
        <Loading message={"Complete your profile"} />
      )}
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default CompleteYourProfile;
