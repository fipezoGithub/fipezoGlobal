import React from "react";
import { IoMdClose } from "react-icons/io";

const Popup = ({ errorMsg }) => {
  return (
    <section className='fixed right-0 top-24 bg-red-50 p-4 rounded-l-lg flex items-center gap-2'>
      <p className='text-sm md:text-2xl'>
        <IoMdClose color='#DC2626' />
      </p>
      <p className='text-red-600 text-sm md:text-lg font-semibold'>
        {errorMsg}
      </p>
    </section>
  );
};

export default Popup;
