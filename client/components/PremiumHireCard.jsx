import React from "react";

const PremiumHireCard = (props) => {
  console.log(props);
  return (
    <div className='flex flex-col items-start gap-4 border px-4 md:px-6 py-4 rounded-md shadow-lg'>
      <h1 className='self-start text-center w-full text-2xl capitalize font-semibold'>
        task details
      </h1>
      <h2 className='capitalize text-base md:text-lg'>
        client name : <span className='font-bold'>{props.hire.fullName}</span>
      </h2>
      <h2 className='capitalize text-base md:text-lg'>
        client phone number :{" "}
        <span className='font-bold'>{props.hire.phone}</span>
      </h2>
      <h2 className='capitalize text-base md:text-lg'>
        requested freelancer :{" "}
        <span className='font-bold'>
          {props.hire.freelancer.firstname +
            " " +
            props.hire.freelancer.lastname}
        </span>
      </h2>
      <h2 className='capitalize text-base md:text-lg'>
        requested freelancer profession:{" "}
        <span className='font-bold'>
          {props.hire.freelancer.profession.split("_").join(" ")}
        </span>
      </h2>
      <h2 className='capitalize text-base md:text-lg'>
        requested freelancer location:{" "}
        <span className='font-bold'>{props.hire.freelancer.location}</span>
      </h2>
      <h2 className='capitalize text-base md:text-lg'>
        client&apos;s required date :{" "}
        <span className='font-bold'>
          {new Date(props.hire.reuireDate).toDateString()}
        </span>
      </h2>
      <h2 className='capitalize text-base md:text-lg'>
        event address: <span className='font-bold'>{props.hire.address}</span>
      </h2>
      <h2 className='capitalize text-base md:text-lg'>
        status: <span className='font-bold'>{props.hire.status}</span>
      </h2>
    </div>
  );
};

export default PremiumHireCard;
