import { useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const SimilarFreelancer = (props) => {
  const [freelancers, setFreelancers] = useState([]);
  const [rateSort, setRateSort] = useState("50000");
  const similarRef = useRef();

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

  const handelTestimonail = (range, direct, ref) => {
    similarRef.current.scrollBy(range, 0);

    // if (direct === "right") {
    //   if (index !== 5) {
    //     setIndex(index + 1);
    //   }
    // } else if (direct === "left") {
    //   if (index !== 1) {
    //     setIndex(index - 1);
    //   }
    // }
  };
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
    <div
      className="flex items-center w-full overflow-hidden gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar"
      ref={similarRef}
    >
      <div className="absolute top-0 right-0 py-6 px-5 md:px-9 hidden md:flex items-center gap-4">
        <button
          type="button"
          className="text-2xl disabled:cursor-not-allowed"
          onClick={() => handelTestimonail(-350, "left")}
        >
          <AiOutlineLeft />
        </button>
        <button
          type="button"
          className="text-2xl disabled:cursor-not-allowed"
          onClick={() => handelTestimonail(350, "right")}
        >
          <AiOutlineRight />
        </button>
      </div>
      <div className="flex items-start gap-x-4 animate-marquee hover:[animation-play-state:_paused]">
        {filtered.map((item, index) => (
          <ProfileCard key={index} profile={item} />
        ))}
      </div>
    </div>
  );
};

export default SimilarFreelancer;
