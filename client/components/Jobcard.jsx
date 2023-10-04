import React from "react";
import { IoLocationSharp, IoPricetags } from "react-icons/io5";
import { MdDateRange, MdPeopleAlt } from "react-icons/md";
const Jobcard = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-start justify-center gap-3">
        <div
          className="flex flex-col items-center bg-[url('/job_date_bg.png')] bg-no-repeat p-8 justify-between"
          style={{ backgroundSize: "100%" }}
        >
          <p className="text-xl text-white capitalize">july, 2023</p>
          <h3 className="text-red-500 text-8xl mt-4">4</h3>
        </div>
        <div
          className="flex flex-col items-start gap-2 bg-[url('/bg2.png')] bg-no-repeat bg-center px-4 py-2 rounded-md"
          style={{ backgroundSize: "100%" }}
        >
          <h3 className="font-bold text-lg lg:text-2xl text-white">title</h3>
          <div className="flex items-center justify-between gap-4">
            <p className="text-lg lg:text-xl flex items-center gap-[5px] bg-orange-500 rounded-full px-4 py-2 text-white">
              <MdPeopleAlt />
              required freelancer vacancy
            </p>
            <p className="text-lg lg:text-xl flex items-center gap-[5px] bg-lime-500 rounded-full px-4 py-2 text-white">
              <IoPricetags />
              budget
            </p>
            <p className="text-lg lg:text-xl flex items-center gap-[5px] bg-red-600 rounded-full px-4 py-2 text-white">
              <IoLocationSharp />
              location
            </p>
          </div>
          <p className="text-lg lg:text-xl flex items-center gap-[5px] bg-emerald-400 rounded-full px-4 py-2 text-white">
            <MdDateRange />
            required date
          </p>
          <p className="text-neutral-600 text-sm lg:text-base self-end">
            remaining days
          </p>
        </div>
        <div className="self-center">
          <button
            type="button"
            className="bg-[#338ef4] capitalize px-4 py-2 text-white font-semibold lg:text-xl rounded-md"
          >
            apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobcard;
