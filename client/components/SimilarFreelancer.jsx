import { useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const SimilarFreelancer = (props) => {
  const [freelancers, setFreelancers] = useState([]);
  const [rateSort, setRateSort] = useState("50000");

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

  filtered.sort((a, b) => {
    return Number(b.featured) - Number(a.featured);
  });

  return (
    <div className="flex items-center w-full overflow-hidden gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar">
      <div
        className={`flex gap-x-4 animate-none hover:[animation-play-state:_paused] ${
          filtered.length > 4
            ? "lg:animate-marquee items-start "
            : "items-center"
        }`}
      >
        {filtered.map((item, index) => (
          <ProfileCard key={index} profile={item} />
        ))}
      </div>
    </div>
  );
};

export default SimilarFreelancer;
