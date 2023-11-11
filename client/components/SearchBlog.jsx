import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const SearchBlog = (props) => {
  return (
    <div className="fixed top-12 left-0 w-full h-screen bg-white flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-2 border border-blue-600 px-4 py-2 rounded-xl w-4/5 mt-4">
        <FaSearch size={"1.5em"} />
        <input
          type="text"
          placeholder="Type to search"
          className="focus:outline-none p-2 w-full"
        />
        <button type="button" onClick={() => props.setShowSearch(false)}>
          <AiOutlineClose size={"1.5em"} />
        </button>
      </div>
      <div className="flex flex-col items-start">
        <Link href="" className="text-2xl truncate">
          title
        </Link>
      </div>
    </div>
  );
};

export default SearchBlog;
