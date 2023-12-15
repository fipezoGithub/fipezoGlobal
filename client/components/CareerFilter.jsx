import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoPinSharp } from "react-icons/io5";

const CareerFilter = () => {
  const router = useRouter();
  console.log(router.query.cat);
  return (
    <div className="md:border-r p-4 flex items-start md:block justify-between w-full md:w-auto">
      <div className="flex:flex-col items-start gap-2 my-4">
        <h1 className="text-lg md:text-2xl font-semibold whitespace-nowrap">
          by department
        </h1>
        <Link
          href={`/careers/management`}
          className={
            "flex items-center gap-1 text-sm md:text-lg" +
            (router.query.cat === "management"
              ? " text-blue-500"
              : " text-neutral-500")
          }
        >
          <IoPinSharp />
          management
        </Link>
        <Link
          href="/careers/marketing"
          className={
            "flex items-center gap-1 text-sm md:text-lg" +
            (router.query.cat === "marketing"
              ? " text-blue-500"
              : " text-neutral-500")
          }
        >
          <IoPinSharp />
          marketing
        </Link>
        <Link
          href="/careers/design"
          className={
            "flex items-center gap-1 text-sm md:text-lg" +
            (router.query.cat === "design"
              ? " text-blue-500"
              : " text-neutral-500")
          }
        >
          <IoPinSharp />
          design
        </Link>
        <Link
          href="/careers/development"
          className={
            "flex items-center gap-1 text-sm md:text-lg" +
            (router.query.cat === "development"
              ? " text-blue-500"
              : " text-neutral-500")
          }
        >
          <IoPinSharp />
          development
        </Link>
      </div>
      <div className="flex flex-col items-start gap-2 my-4">
        <h1 className="text-lg md:text-2xl font-semibold whitespace-nowrap">
          by type
        </h1>
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
