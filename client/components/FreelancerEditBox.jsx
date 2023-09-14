import React, { useState } from "react";
import { ImCross } from "react-icons/im";
const FreelancerEditBox = (props) => {
  const [bio, setBio] = useState(props.bio);
  const [equipments, setEquipments] = useState(props.equipments);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/edit/freelancer/${props.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bio: bio,
            equipments: equipments,
          }),
        }
      );
      const data = await res.json();
      props.setShowEditBox(false);
      props.route();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white p-8 relative rounded shadow-md flex flex-col">
      <h1 className="text-2xl font-semibold tracking-wide my-4">
        Edit Yourself
      </h1>
      <div className="absolute top-2.5 right-2.5">
        <button
          type="button"
          className="cursor-pointer text-xl"
          onClick={() => props.setShowEditBox(false)}
        >
          <ImCross />
        </button>
      </div>
      <form action="" className="flex flex-col gap-4" onSubmit={handelSubmit}>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="freeLancerBio"
            className="cursor-pointer capitalize text-lg"
          >
            bio
          </label>
          <textarea
            name=""
            id="freeLancerBio"
            cols="30"
            rows="10"
            className="rounded-[5px] [letter-spacing:_1px] shadow-md p-3 border-[1px] border-solid border-[lightgray] focus:outline-none h-40"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="freeLancerEquipments"
            className="cursor-pointer capitalize text-lg"
          >
            equipments
          </label>
          <textarea
            name=""
            id="freeLancerEquipments"
            cols="30"
            rows="10"
            className="rounded-[5px] [letter-spacing:_1px] shadow-md p-3 border-[1px] border-solid border-[lightgray] focus:outline-none h-40"
            value={equipments}
            onChange={(e) => setEquipments(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#1f1c1c] text-white capitalize p-2 text-base font-medium shadow rounded-[5px]"
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
};

export default FreelancerEditBox;
