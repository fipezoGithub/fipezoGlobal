import React from "react";
import styles from "../styles/Jobfilter.module.css";
import { BiFilter } from "react-icons/bi";
const Jobfilter = (props) => {
  return (
    <div className="absolute left-1 top-32 lg:static flex flex-col items-start gap-4 lg:px-4 z-[1100] lg:z-auto bg-white lg:bg-transparent">
      <div className="flex flex-col items-start gap-4 border-[2.2px] border-[#338ef4] p-4 rounded-lg shadow-xl">
        <h3 className="capitalize font-bold text-lg lg:text-2xl w-full flex items-center justify-center">
          <BiFilter /> filter
        </h3>
        <div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              name=""
              id="open"
              className="w-4 h-4"
              onChange={(e) => props.setShowOpenJob(e.target.checked)}
              checked={props.showOpenJob}
            />
            <label
              htmlFor="open"
              className="cursor-pointer lg:text-xl capitalize"
            >
              open
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              name=""
              id="close"
              className="w-4 h-4"
              onChange={(e) => props.setShowClosedJob(e.target.checked)}
              checked={props.showClosedJob}
            />
            <label
              htmlFor="close"
              className="cursor-pointer lg:text-xl capitalize"
            >
              close
            </label>
          </div>
        </div>
        <hr className="bg-neutral-500 h-px w-full drop-shadow-lg" />
        <div className="flex flex-col items-start w-full gap-2">
          <label
            htmlFor="budget"
            className="cursor-pointer lg:text-xl capitalize"
          >
            Budget
          </label>
          <div className="w-full">
            <p className="font-bold lg:text-lg capitalize">
              ₹ {props.budgetSort}
            </p>
            <input
              type="range"
              name=""
              id="budget"
              value={props.budgetSort}
              onChange={(e) => props.setBudgetSort(e.target.value)}
              min={1000}
              max={50000}
              step={500}
              className={styles.slider}
            />
          </div>
        </div>
        {/* <hr className="bg-neutral-500 h-px w-full drop-shadow-lg" />
        <div className="flex flex-col items-start gap-2">
          <label
            htmlFor="location"
            className="cursor-pointer lg:text-xl capitalize"
          >
            location
          </label>
          <select
            id="location"
            value={props.filterCity}
            onChange={(e) => {
              props.setFilterCity(e.target.value);
            }}
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
        <hr className="bg-neutral-500 h-px w-full drop-shadow-lg" />
        <div className="flex flex-col items-start gap-2">
          <label
            htmlFor="profession"
            className="cursor-pointer lg:text-xl capitalize"
          >
            profession
          </label>
          <div className="h-48 overflow-hidden overflow-y-scroll snap-y">
            <div className={"snap-center flex items-center gap-1"}>
              <input
                id="album_designer"
                type="checkbox"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowAlbumDesign(e.target.checked);
                }}
                checked={props.showAlbumDesign}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="album_designer"
              >
                Album Designer
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="anchor"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowAnchor(e.target.checked);
                }}
                checked={props.showAnchor}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="anchor"
              >
                Anchor
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="cinematographer"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowCinematographers(e.target.checked);
                }}
                checked={props.showCinematographers}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="cinematographer"
              >
                Cinematographer
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="dancer"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowDancer(e.target.checked);
                }}
                checked={props.showDancer}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="dancer"
              >
                Dancer
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="dj"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowDj(e.target.checked);
                }}
                checked={props.showDj}
              />
              <label
                className={
                  " cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="dj"
              >
                DJ
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="drone_operator"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowDroneOperators(e.target.checked);
                }}
                checked={props.showDroneOperators}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="drone_operator"
              >
                Drone Operator
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="graphics_designer"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowGraphicsDesigner(e.target.checked);
                }}
                checked={props.showGraphicsDesigner}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="graphics_designer"
              >
                Graphics Designer
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="influencer"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowInfluencer(e.target.checked);
                }}
                checked={props.showInfluencer}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="influencer"
              >
                Influencer
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="makeup_artist"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowMakeupArtist(e.target.checked);
                }}
                checked={props.showMakeupArtist}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="makeup_artist"
              >
                Makeup Artist
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="mehendi_artist"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowMehendiArtist(e.target.checked);
                }}
                checked={props.showMehendiArtist}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="mehendi_artist"
              >
                Mehendi Artist
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="model"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowModel(e.target.checked);
                }}
                checked={props.showModel}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="model"
              >
                Model
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="photographer"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowPhotographers(e.target.checked);
                }}
                checked={props.showPhotographers}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="photographer"
              >
                Photographer
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="photo_editor"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowPhotoEditor(e.target.checked);
                }}
                checked={props.showPhotoEditor}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="photo_editor"
              >
                Photo Editor
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="video_editor"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowVideoEditor(e.target.checked);
                }}
                checked={props.showVideoEditor}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="video_editor"
              >
                Video Editor
              </label>
            </div>
            <div className={"snap-center flex items-center gap-1"}>
              <input
                type="checkbox"
                id="web_developer"
                className="w-4 h-4"
                onChange={(e) => {
                  props.setShowWebDeveloper(e.target.checked);
                }}
                checked={props.showWebDeveloper}
              />
              <label
                className={
                  "cursor-pointer lg:text-xl capitalize whitespace-nowrap"
                }
                htmlFor="web_developer"
              >
                Web Developer
              </label>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Jobfilter;
