import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import DialogBox from "./DialogBox";

const ReportModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dialogBox, setDialogBox] = useState(false);

  const submitReport = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;
      const type = localStorage.getItem("type")
        ? JSON.parse(localStorage.getItem("type"))
        : null;
      const res = await fetch(`${process.env.SERVER_URL}/report?type=${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          relatedType: "freelancer report",
          reason: title,
          description: description,
          status: "pending",
          acceptedFreelancer: props.freelancer._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDialogBox(true);
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1100] flex items-center justify-center bg-[#0000001e]">
      <form
        className="bg-white relative flex flex-col items-center gap-4 p-4 mx-2 lg:mx-0 lg:p-8 rounded-md backdrop-blur"
        onSubmit={submitReport}
      >
        <div className="absolute top-0 right-0">
          <button
            type="button"
            onClick={() => props.setShowReportBox(false)}
            className="p-2 bg-blue-500 text-white rounded-bl-lg"
          >
            <IoClose />
          </button>
        </div>
        <h1 className="text-xl lg:text-3xl font-bold">
          Inappropriate User Activity Must Be Reported
        </h1>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="title" className="lg:text-xl cursor-pointer">
            Please select your problem
          </label>
          <select
            name=""
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="capitalize px-2 text-sm lg:text-base lg:px-4 py-2 focus:outline-none border w-full"
          >
            <option value="pretending_to_be_someone">
              pretending to be someone
            </option>
            <option value="fake_account">fake account</option>
            <option value="fake_portfolio">fake portfolio</option>
            <option value="inapproprite_content">inapproprite content</option>
            <option value="harrashment_bullying">
              harrashment or bullying
            </option>
            <option value="scam_fraud">scam or fraud</option>
            <option value="something_else">something else</option>
          </select>
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="description" className="lg:text-xl cursor-pointer">
            Brief Description
          </label>
          <textarea
            name=""
            id="description"
            cols="20"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full focus:outline-none border px-4 py-2 resize-none"
          ></textarea>
        </div>
        <div>
          <button
            className="px-4 py-2 rounded-lg font-semibold capitalize bg-blue-500 text-white"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
      {dialogBox === true && (
        <DialogBox
          title="Your report is submitted"
          text="Our support team will verified your report. And once your issue will be fixed you'll be notified"
          handleDialogBox={setDialogBox}
          home={false}
        />
      )}
    </div>
  );
};

export default ReportModal;
