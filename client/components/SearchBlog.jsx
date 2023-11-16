import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const SearchBlog = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const getSearchResult = async (srchQuery) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/blog/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: srchQuery }),
      });
      const blogs = await res.json();
      setSearchResults(blogs);
    } catch (error) {
      console.log(error);
    }
  };
  const viewCount = async (id) => {
    try {
      const res = await fetch(`${process.env.SERVER_URL}/blog/viewcount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const view = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-12 left-0 w-full h-screen bg-white flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-2 border border-blue-600 px-4 py-2 rounded-xl w-4/5 mt-4">
        <FaSearch size={"1.5em"} />
        <input
          type="text"
          placeholder="Type to search"
          onChange={(e) => getSearchResult(e.target.value)}
          className="focus:outline-none p-2 w-full"
        />
        <button type="button" onClick={() => props.setShowSearch(false)}>
          <AiOutlineClose size={"1.5em"} />
        </button>
      </div>
      <div className="flex flex-col items-start">
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <Link
              href={`/resources/details/${item.uid}`}
              key={index}
              onClick={() => viewCount(item._id)}
              className="text-lg lg:text-2xl line-clamp-1 border-b px-2 lg:px-4 py-1 lg:py-2 border-neutral-500"
            >
              {item.title}
            </Link>
          ))
        ) : (
          <div className="self-center flex flex-col gap-2 items-center justify-center">
            <Image
              src="/no-search.png"
              width={600}
              height={600}
              alt="none found"
              className="w-1/2"
            />
            <p className="text-lg font-medium">
              No blogs found. Try different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBlog;
