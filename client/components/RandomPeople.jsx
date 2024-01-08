import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RandomPeople = (props) => {
  const [freelancers, setFreelancers] = useState([]);
  const [filterCity, setFilterCity] = useState("");
  const [loginType, setLoginType] = useState("");
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }
  useEffect(() => {
    setFilterCity("none");
    setLoginType(JSON.parse(localStorage.getItem("type")));
  }, []);

  useEffect(() => {
    async function fetchFreelancer() {
      try {
        const response = await fetch(
          `${process.env.SERVER_URL}/profiles/verified/freelancer?loc=${props.location}`,
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

  const userFilterer = freelancers.filter((freelancer) => {
    return freelancer._id !== props.user._id;
  });
  const followingFilters = userFilterer.filter((freelancer) => {
    return !props.user.following.includes(freelancer._id);
  });
  const shuffleFilter = shuffleArray(followingFilters);
  const locationFilter = shuffleFilter.filter((freelancer) => {
    if (
      filterCity === "none" &&
      freelancer.location === localStorage.getItem("city")
    ) {
      return true;
    } else if (filterCity !== "none" && freelancer.location === filterCity)
      return true;
    return false;
  });
  const handelFollow = async (id) => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (!props.user || !props.user?.uid) {
      router.push("/register/freelancer");
    } else {
      try {
        if (token) {
          const res = await fetch(
            `${process.env.SERVER_URL}/follow/freelancer`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ userid: id }),
            }
          );
          const data = await res.json();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const displayedFreelancers = locationFilter.slice(0, 3);
  const final = displayedFreelancers;
  return (
    final.length !== 0 &&
    final.map((people, index) => {
      return (
        <div
          className="flex flex-col items-center gap-2 my-4 mx-2 rounded-lg py-2 shadow-md border "
          key={index}
        >
          <Image
            src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${people.profilePicture}`}
            alt="profile picture"
            width={600}
            height={600}
            className="w-60 h-36 object-contain"
          />
          <Link
            className="capitalize"
            href={`/profile/${people.uid}`}
            target="_blank"
          >
            {people.firstname.toLowerCase() +
              " " +
              people.lastname.toLowerCase()}
          </Link>
          {loginType === "freelancer" && (
            <button
              type="button"
              className="p-2 text-sm rounded-xl capitalize bg-[#0095f6] text-white"
              onClick={() => handelFollow(people._id)}
            >
              follow
            </button>
          )}
        </div>
      );
    })
  );
};

export default RandomPeople;
