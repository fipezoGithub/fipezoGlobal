import React from "react";

const Createjob = () => {
  return (
    <div>
      <h3>Post your requirement</h3>
      <form action="">
        <div>
          <div>
            <label htmlFor="title">title</label>
            <input type="text" placeholder="enter job title" id="title" />
          </div>
          <div>
            <label htmlFor="budget">Budget</label>
            <input
              type="number"
              placeholder="enter the amount you offer"
              id="budget"
            />
          </div>
          <div>
            <label htmlFor="vacancy">Vacancy For</label>
            <input
              type="number"
              placeholder="enter the vacancy number"
              id="vacancy"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Createjob;
