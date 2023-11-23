import React from "react";

const ReportModal = (props) => {
  return (
    <form className="fixed top-2/4 left-2/4">
      <h1>Report Freelancer</h1>
      <div>
        <label htmlFor="title">Please select your problem</label>
        <select name="" id="title">
            <option value=""></option>
        </select>
      </div>
    </form>
  );
};

export default ReportModal;
