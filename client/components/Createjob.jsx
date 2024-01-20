import React, { useState } from "react";

const Createjob = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(500);
  const [vacancy, setVacancy] = useState(1);
  const [location, setLocation] = useState("Kolkata");
  const [venue, setVenue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [profession, setProfession] = useState("album_designer");
  const [requiredDate, setRequiredDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventTime, setEventTime] = useState({ startTime: "", endTime: "" });
  const [warn, setWarn] = useState(false);

  const handelPostJob = async (e) => {
    e.preventDefault();
    if (
      title === "" ||
      description === "" ||
      venue === "" ||
      dueDate === "" ||
      requiredDate.length === 0
    ) {
      setWarn(true);
      return;
    }
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    try {
      const res = await fetch(`${process.env.SERVER_URL}/create-job/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          location,
          venue,
          profession,
          budget,
          vacancy,
          dueDate,
          date: requiredDate,
          eventType,
          eventTime: JSON.stringify({
            startTime: eventTime.startTime,
            endTime: eventTime.endTime,
          }),
        }),
      });
      const newJob = await res.json();
      if (newJob) {
        props.setShowConfirmBox(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex flex-col items-center gap-2 lg:gap-4 backdrop-blur px-2 lg:px-4 py-1 lg:py-2 bg-white rounded-lg mx-2 my-1 border shadow-md">
      <h3 className="lg:text-xl font-bold">Post your requirement</h3>
      <form
        action=""
        className="flex flex-col items-start gap-6"
        onSubmit={handelPostJob}
      >
        {warn && (
          <p className="text-red-500 text-center w-full lg:text-lg">
            Please fill up all fields
          </p>
        )}
        <div className="flex items-start flex-col w-full">
          <label htmlFor="title" className="lg:text-xl capitalize">
            title
          </label>
          <input
            type="text"
            placeholder="enter job title"
            id="title"
            value={title}
            onChange={(e) => {
              setWarn(false);
              setTitle(e.target.value);
            }}
            className="placeholder:capitalize bg-transparent outline-none py-1 focus:border-b w-full"
          />
        </div>
        <div className="flex items-start flex-col w-full">
          <label htmlFor="description" className="lg:text-xl capitalize">
            description
          </label>
          <textarea
            name=""
            id="description"
            cols="30"
            value={description}
            onChange={(e) => {
              setWarn(false);
              setDescription(e.target.value);
            }}
            placeholder="add description about your requirement"
            rows="5"
            className="w-full placeholder:capitalize bg-transparent outline-none py-1 focus:border-b h-20 lg:h-auto"
          ></textarea>
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
          <div className="flex items-start flex-col">
            <label htmlFor="budget" className="lg:text-xl capitalize">
              Budget
            </label>
            <input
              type="number"
              placeholder="enter the amount you offer"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="placeholder:capitalize bg-transparent outline-none py-1 focus:border-b"
            />
          </div>
          <div className="flex items-start flex-col">
            <label htmlFor="vacancy" className="lg:text-xl capitalize">
              Vacancy For
            </label>
            <input
              type="number"
              placeholder="enter the vacancy number"
              id="vacancy"
              value={vacancy}
              onChange={(e) => setVacancy(e.target.value)}
              className="placeholder:capitalize bg-transparent outline-none px-2 py-1 focus:border-b"
            />
          </div>
          <div className="flex items-start flex-col">
            <label htmlFor="vacancy" className="lg:text-xl capitalize">
              Venue {`(location)`}
            </label>
            <input
              type="text"
              placeholder="enter the venue location of event"
              id="vacancy"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="placeholder:capitalize bg-transparent outline-none px-2 py-1 focus:border-b"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 w-full flex-wrap lg:flex-nowrap">
          <div className="flex items-start flex-col">
            <label htmlFor="location" className="lg:text-xl capitalize">
              location
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option disabled value="city">
                kolkata
              </option>
              <option value="Agra">Agra</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Amritsar">Amritsar</option>
              <option value="Aurangabad">Aurangabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
              <option value="Burdwan">Burdwan</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Dehradun">Dehradun</option>
              <option value="Delhi">Delhi</option>
              <option value="Dhanbad">Dhanbad</option>
              <option value="Durgapur">Durgapur</option>
              <option value="Faridabad">Faridabad</option>
              <option value="Ghaziabad">Ghaziabad</option>
              <option value="Guwahati">Guwahati</option>
              <option value="Gwalior">Gwalior</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Indore">Indore</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Jamshedpur">Jamshedpur</option>
              <option value="Jodhpur">Jodhpur</option>
              <option value="Kanpur">Kanpur</option>
              <option value="Kochi">Kochi</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Ludhiana">Ludhiana</option>
              <option value="Madurai">Madurai</option>
              <option value="Mangaluru">Mangaluru</option>
              <option value="Meerut">Meerut</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Mysuru">Mysuru</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Nashik">Nashik</option>
              <option value="New_Delhi">New Delhi</option>
              <option value="Navi_Mumbai">Navi Mumbai</option>
              <option value="Patna">Patna</option>
              <option value="Prayagraj">Prayagraj</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Pune">Pune</option>
              <option value="Raipur">Raipur</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Ranchi">Ranchi</option>
              <option value="Siliguri">Siliguri</option>
              <option value="Surat">Surat</option>
              <option value="Thane">Thane</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Udaipur">Udaipur</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Varanasi">Varanasi</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Warangal">Warangal</option>
            </select>
          </div>
          <div className="flex items-start flex-col">
            <label htmlFor="profession" className="lg:text-xl capitalize">
              profession
            </label>
            <select
              id="profession"
              className="capitalize"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            >
              <option disabled value="profession" className="capitalize">
                photographer
              </option>
              <option value="actor" className="capitalize">
                actor
              </option>
              <option value="actress" className="capitalize">
                actress
              </option>
              <option value="album_designer" className="capitalize">
                album designer
              </option>
              <option value="anchor" className="capitalize">
                anchor
              </option>
              <option value="babysitter" className="capitalize">
                babysitter
              </option>
              <option value="cinematographer" className="capitalize">
                cinematographer
              </option>
              <option value="dancer" className="capitalize">
                dancer
              </option>
              <option value="dance_teacher" className="capitalize">
                dance teacher
              </option>
              <option value="dj" className="capitalize">
                dj
              </option>
              <option value="drawing_teacher" className="capitalize">
                drawing teacher
              </option>
              <option value="drone_operater" className="capitalize">
                drone operater
              </option>
              <option value="fashion_designer" className="capitalize">
                fashion designer
              </option>
              <option value="graphics_designer">graphics designer</option>
              <option value="influencer" className="capitalize">
                influencer
              </option>
              <option value="interior_designer" className="capitalize">
                interior designer
              </option>
              <option value="lyricist" className="capitalize">
                lyricist
              </option>
              <option value="maid" className="capitalize">
                maid
              </option>
              <option value="makeup_artist" className="capitalize">
                makeup artist
              </option>
              <option value="mehendi_artist" className="capitalize">
                mehendi artist
              </option>
              <option value="model" className="capitalize">
                model
              </option>
              <option value="musician" className="capitalize">
                musician
              </option>
              <option value="music_teacher" className="capitalize">
                music teacher
              </option>
              <option value="painter" className="capitalize">
                painter
              </option>
              <option value="photographer" className="capitalize">
                photographer
              </option>
              <option value="photo_editor" className="capitalize">
                photo editor
              </option>
              <option value="private_tutor" className="capitalize">
                private tutor
              </option>
              <option value="video_editor" className="capitalize">
                video editor
              </option>
              <option value="vocalist" className="capitalize">
                vocalist
              </option>
              <option value="voice_over_artist" className="capitalize">
                voice over artist
              </option>
              <option value="web_developer" className="capitalize">
                web developer
              </option>
            </select>
          </div>
          <div className="flex items-start flex-col">
            <label htmlFor="dueDate" className="lg:text-xl capitalize">
              last date for apply
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="placeholder:capitalize outline-none py-1 focus:border-b"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full flex-wrap lg:flex-nowrap">
          <div className="flex items-start flex-col">
            <label htmlFor="requiredDate" className="lg:text-xl capitalize">
              requirement date
            </label>
            <input
              type="date"
              id="requiredDate"
              onChange={(e) => {
                setWarn(false);
                setRequiredDate(e.target.value);
              }}
              className="placeholder:capitalize outline-none py-1 focus:border-b"
            />
          </div>
          <div className="flex items-start flex-col">
            <label className="lg:text-xl capitalize">
              event time{" "}
              <span className="text-neutral-500">{"(optional)"}</span>
            </label>
            <div className="flex items-center justify-between gap-4 ">
              <div className="flex flex-col">
                <label htmlFor="starttime" className="lg:text-base capitalize">
                  start time
                </label>
                <input
                  type="time"
                  id="starttime"
                  value={eventTime.startTime}
                  onChange={(e) =>
                    setEventTime({ ...eventTime, startTime: e.target.value })
                  }
                  className="outline-none py-1 focus:border-b inline-flex appearance-none"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="endtime" className="lg:text-base capitalize">
                  end time
                </label>
                <input
                  type="time"
                  id="endtime"
                  value={eventTime.endTime}
                  onChange={(e) =>
                    setEventTime({ ...eventTime, endTime: e.target.value })
                  }
                  className="placeholder:capitalize outline-none py-1 focus:border-b"
                />
              </div>
            </div>
          </div>
          <div className="flex items-start flex-col">
            <label htmlFor="eventType" className="lg:text-xl capitalize">
              event type{" "}
              <span className="text-neutral-500">{"(optional)"}</span>
            </label>
            <input
              type="text"
              id="eventType"
              placeholder="enter event type"
              className="placeholder:capitalize outline-none py-1 focus:border-b"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center w-full justify-center">
          <button
            type="submit"
            className="px-2 py-1 capitalize font-bold lg:text-xl bg-[#338ef4] text-white rounded-lg"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createjob;
