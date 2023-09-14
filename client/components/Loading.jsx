import Image from "next/image";
import React from "react";

const Loading = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/loading.gif" width={300} height={300} alt="loading" />
      <span>Please wait...</span>
      <span>{message}</span>
    </div>
  );
};

export default Loading;
