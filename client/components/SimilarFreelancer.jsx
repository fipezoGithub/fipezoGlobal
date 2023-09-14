import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";

const SimilarFreelancer = (props) => {
  const [freelancers, setFreelancers] = useState([]);
  const [rateSort, setRateSort] = useState("10100");
  useEffect(() => {
    async function fetchFreelancer() {
      try {
        const response = await fetch(
          `${process.env.SERVER_URL}/profiles/verified/freelancer`,
          { cache: "no-store" }
        );
        const data = await response.json();
        setFreelancers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFreelancer();
  }, []);
  const filteredFreelancers = freelancers.filter((freelancer) => {
    return freelancer.profession === props.profession;
  });
  const locationFilter = filteredFreelancers.filter((freelancer) => {
    return freelancer.location === props.location;
  });
  const filtered = locationFilter.filter((freelancer) => {
    if (freelancer.rate <= rateSort) {
      return true;
    }
    return false;
  });

  filtered.sort((a, b) => {
    return b.rating * b.reviewCount - a.rating * a.reviewCount;
  });
  const displayedFreelancers = filtered.slice(0, 4);
  return displayedFreelancers.map((item, index) => (
    <ProfileCard key={index} profile={item} />
  ));
};

export default SimilarFreelancer;
