import Image from "next/image";
import React from "react";

const Loading = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <Image src="/Loadingnew.gif" width={300} height={300} alt="loading" />
      <span className="text-white">Please wait...</span>
      <span className="text-white">{message}</span>
    </div>
  );
};

export default Loading;
