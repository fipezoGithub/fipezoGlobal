import React from "react";
import { IoPinSharp } from "react-icons/io5";

const CareerFilter = () => {
  return (
    <div className="md:border-r p-4 flex items-start md:block justify-between w-full md:w-auto">
      <div className="flex:flex-col items-start gap-2 my-4">
        <h1 className="text-lg md:text-2xl font-semibold">by department</h1>
        <button
          type="button"
          className="flex items-center gap-1 text-sm md:text-lg text-neutral-500"
        >
          <IoPinSharp />
          management
        </button>
        <button
          type="button"
          className="flex items-center gap-1 text-sm md:text-lg text-neutral-500"
        >
          <IoPinSharp />
          marketing
        </button>
        <button
          type="button"
          className="flex items-center gap-1 text-sm md:text-lg text-neutral-500"
        >
          <IoPinSharp />
          design
        </button>
        <button
          type="button"
          className="flex items-center gap-1 text-sm md:text-lg text-neutral-500"
        >
          <IoPinSharp />
          development
        </button>
      </div>
      <div className="flex flex-col items-start gap-2 my-4">
        <h1 className="text-lg md:text-2xl font-semibold">by type</h1>
        <button
          type="button"
          className="flex items-center gap-1 text-sm md:text-lg text-neutral-500"
        >
          <IoPinSharp />
          full time
        </button>
        <button
          type="button"
          className="flex items-center gap-1 text-sm md:text-lg text-neutral-500"
        >
          <IoPinSharp />
          part time
        </button>
      </div>
    </div>
  );
};

export default CareerFilter;
