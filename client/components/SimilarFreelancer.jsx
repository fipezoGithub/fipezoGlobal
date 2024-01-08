import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";

const SimilarFreelancer = (props) => {
  const [freelancers, setFreelancers] = useState([]);
  const [rateSort, setRateSort] = useState("50000");

  useEffect(() => {
    async function fetchFreelancer() {
      try {
        const response = await fetch(
          `${process.env.SERVER_URL}/freelancer/professions?q[]=${
            props.profession
          }&loc=${props.location}&page=${1}`,
          { cache: "no-store" }
        );
        const data = await response.json();
        setFreelancers(data.freelancers);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFreelancer();
  }, []);

  const filtered = freelancers.filter((freelancer) => {
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
