import styles from "../styles/Sidebar.module.css";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: true,
      showDropDownSearch: true,
      showDropDownRating: true,
      showDropDownLocation: true,
      cityname: localStorage.getItem("city"),
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      showDropDown: !prevState.showDropDown,
    }));
  };

  componentDidMount() {
    const city = localStorage.getItem("city");
    if (city) this.setState({ cityname: city });
  }

  toggleRating = () => {
    this.setState((prevState) => ({
      showDropDownRating: !prevState.showDropDownRating,
    }));
  };
  toggleSearch = () => {
    this.setState((prevState) => ({
      showDropDownSearch: !prevState.showDropDownSearch,
    }));
  };

  toggleLocation = () => {
    this.setState((prevState) => ({
      showDropDownLocation: !prevState.showDropDownLocation,
    }));
  };

  changeCity = (city) => {
    this.setState({ cityname: city });
    this.props.setFilterCity(city);
    localStorage.setItem("city", city);
  };
  handleSearch = async (search) => {
    const response = await fetch(
      `${process.env.SERVER_URL}/freelancer/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: search }),
      }
    );
    const data = await response.json();
    this.props.setFreelancers(data);
    this.props.setCurrentPage(1);
  };
  render() {
    return (
      <div className={styles.sidebar}>
        <div
          className={`flex flex-col snap-y ${
            this.state.showDropDown === true ? "h-[35vh]" : "h-auto"
          } overflow-hidden overflow-y-scroll justify-start`}
          id={styles.category}
        >
          <div className={styles.title}>
            Category{" "}
            <MdKeyboardArrowDown
              style={{ fontSize: "20" }}
              onClick={this.toggle}
              className={styles.arrow}
            />
          </div>
          {this.state.showDropDown && (
            <div className={styles.options}>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  id="album_designer"
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowAlbumDesign(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  checked={this.props.showAlbumDesign}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="album_designer"
                >
                  Album Designer
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowAnchor(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="anchor"
                  checked={this.props.showAnchor}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="anchor"
                >
                  Anchor
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowCinematographers(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="cinematographer"
                  checked={this.props.showCinematographers}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="cinematographer"
                >
                  Cinematographer
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowDancer(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="dancer"
                  checked={this.props.showDancer}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="dancer"
                >
                  Dancer
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowDanceTeacher(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="dance_teacher"
                  checked={this.props.showDanceTeacher}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="dance_teacher"
                >
                  Dance Teacher
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowDj(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="dj"
                  checked={this.props.showDj}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="dj"
                >
                  DJ
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowDrawingTeacher(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="drawing_teacher"
                  checked={this.props.showDrawingTeacher}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="drawing_teacher"
                >
                  Drawing Teacher
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowDroneOperators(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="drone_operator"
                  checked={this.props.showDroneOperators}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="drone_operator"
                >
                  Drone Operator
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowGraphicsDesigner(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="graphics_designer"
                  checked={this.props.showGraphicsDesigner}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="graphics_designer"
                >
                  Graphics Designer
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowInfluencer(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="influencer"
                  checked={this.props.showInfluencer}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="influencer"
                >
                  Influencer
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowMakeupArtist(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="makeup_artist"
                  checked={this.props.showMakeupArtist}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="makeup_artist"
                >
                  Makeup Artist
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowMehendiArtist(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="mehendi_artist"
                  checked={this.props.showMehendiArtist}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="mehendi_artist"
                >
                  Mehendi Artist
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowModel(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="model"
                  checked={this.props.showModel}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="model"
                >
                  Model
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowMusicTeacher(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="music_teacher"
                  checked={this.props.showMusicTeacher}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="music_teacher"
                >
                  Music Teacher
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowPhotographers(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="photographer"
                  checked={this.props.showPhotographers}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="photographer"
                >
                  Photographer
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowPhotoEditor(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="photo_editor"
                  checked={this.props.showPhotoEditor}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="photo_editor"
                >
                  Photo Editor
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowPrivateTutor(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="private_tutor"
                  checked={this.props.showPrivateTutor}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="private_tutor"
                >
                  Private Tutor
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowVideoEditor(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="video_editor"
                  checked={this.props.showVideoEditor}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="video_editor"
                >
                  Video Editor
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowWebDeveloper(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="web_developer"
                  checked={this.props.showWebDeveloper}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="web_developer"
                >
                  Web Developer
                </label>
              </div>
            </div>
          )}
        </div>

        <hr className={styles.divider} />

        <div className={styles.filter} id={styles.price}>
          <div className={styles.title}>Price</div>
          <span className={styles.rate}>Rs. {this.props.rateSort} / Day</span>
          <input
            type="range"
            min="500"
            max="50000"
            step="100"
            className={styles.slider}
            onChange={(e) => {
              this.props.setRateSort(e.target.value);
            }}
            value={this.props.rateSort}
          />
        </div>

        <hr className={styles.divider} />

        <div className={styles.filter} id={styles.rating}>
          <div className={styles.title}>
            Customer Rating{" "}
            <MdKeyboardArrowDown
              style={{ fontSize: "20" }}
              onClick={this.toggleRating}
              className={styles.arrow}
            />
          </div>
          {this.state.showDropDownRating && (
            <div className={styles.options}>
              <div className={styles.inputs}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id="star4"
                  onChange={(e) => {
                    this.props.setFourStars(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  checked={this.props.fourStars}
                />
                <label
                  id={styles.labelid}
                  className={styles.label}
                  htmlFor="star4"
                >
                  4&nbsp;
                  <BsStarFill
                    className={styles.star}
                    style={{ color: "#1f1c1c", fontSize: "18px" }}
                  />{" "}
                  &nbsp; <span>& Above</span>
                </label>
              </div>
              <div className={styles.inputs}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id="star3"
                  onChange={(e) => {
                    this.props.setThreeStars(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  checked={this.props.threeStars}
                />
                <label
                  id={styles.labelid}
                  className={styles.label}
                  htmlFor="star3"
                >
                  3&nbsp;
                  <BsStarFill
                    className={styles.star}
                    style={{ color: "#1f1c1c", fontSize: "18px" }}
                  />{" "}
                  &nbsp; <span>& Above</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <hr className={styles.divider} />

        <div className={styles.filter} id={styles.location}>
          <div className={styles.title}>
            Location{" "}
            <MdKeyboardArrowDown
              style={{ fontSize: "20" }}
              onClick={this.toggleLocation}
              className={styles.arrow}
            />
          </div>
          {this.state.showDropDownLocation && (
            <div id={styles.optionx}>
              <select
                id="locations"
                value={this.state.cityname}
                className={styles.select}
                onChange={() => {
                  this.changeCity(document.getElementById("locations").value);
                  if (window.innerWidth < 640) {
                    this.props.setShowSideBar(false);
                  }
                }}
              >
                <option disabled value="city" id={styles.selected}>
                  {this.state.cityname}
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
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;
