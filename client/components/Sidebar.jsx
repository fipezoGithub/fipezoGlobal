import styles from "../styles/Sidebar.module.css";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { withRouter } from "next/router";
import Link from "next/link";

export default withRouter(
  class Sidebar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showDropDown: true,
        showDropDownSearch: true,
        showDropDownRating: true,
        showDropDownLocation: true,
        cityname: localStorage.getItem("city"),
        catQuery: "",
        displayCat: [
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
          "flex",
        ],
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

    searchCategory = (val) => {
      const cat = [
        "Actor",
        "Actress",
        "Album Designer",
        "Anchor",
        "Babysitter",
        "Cinematographer",
        "Dancer",
        "Dance Teacher",
        "DJ",
        "Drawing Teacher",
        "Drone Operator",
        "Fashion Designer",
        "Graphics Designer",
        "Influencer",
        "Interior Designer",
        "Lyricist",
        "Maid",
        "Makeup Artist",
        "Mehendi Artist",
        "Model",
        "Musician",
        "Music Teacher",
        "Painter",
        "Photographer",
        "Photo Editor",
        "Private Tutor",
        "Video Editor",
        "Vocalist",
        "Voice Over Artist",
        "Web Developer",
      ];
      cat.forEach((element, index) => {
        if (!element.toLocaleLowerCase().includes(val.toLocaleLowerCase())) {
          this.setState((prevState) => [
            ...prevState.displayCat,
            (prevState.displayCat[index] = "none"),
          ]);
        } else {
          this.setState((prevState) => [
            ...prevState.displayCat,
            (prevState.displayCat[index] = "flex"),
          ]);
        }
      });
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

    render() {
      return (
        <div className={styles.sidebar}>
          {this.props.router.pathname === "/explore/freelancers" ? (
            <div
              className={`flex flex-col snap-y ${
                this.state.showDropDown === true ? "h-[41vh]" : "h-auto"
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
              <div className="mb-2 mr-1">
                <input
                  type="text"
                  placeholder="search category"
                  onChange={(e) => this.searchCategory(e.target.value)}
                  className="focus:outline-none px-2 py-1 placeholder:capitalize placeholder:text-sm md:placeholder:text-base w-48 md:w-auto border"
                />
              </div>
              {this.state.showDropDown && (
                <div className={styles.options}>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[0] }}
                  >
                    <input
                      className={styles.checkbox}
                      id="actor"
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowActor(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      checked={this.props.showActor}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="actor"
                    >
                      Actor
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[1] }}
                  >
                    <input
                      className={styles.checkbox}
                      id="actress"
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowActress(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      checked={this.props.showActress}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="actress"
                    >
                      Actress
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[2] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[3] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[4] }}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowBabySitter(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id="babysitter"
                      checked={this.props.showBabySitter}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="babysitter"
                    >
                      Babysitter
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[5] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[6] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[7] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[8] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[9] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[10] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[11] }}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowFashionDesigner(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id="fashion_designer"
                      checked={this.props.showFashionDesigner}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="fashion_designer"
                    >
                      Fashion Designer
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[12] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[13] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[14] }}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowInteriorDesigner(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id="interior_designer"
                      checked={this.props.showInteriorDesigner}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="interior_designer"
                    >
                      Interior Designer
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[15] }}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowLyricist(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id="lyricist"
                      checked={this.props.showLyricist}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="lyricist"
                    >
                      Lyricist
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[16] }}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowMaid(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id="maid"
                      checked={this.props.showMaid}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="maid"
                    >
                      Maid
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[17] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[18] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[19] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[20] }}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowMusician(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id="musician"
                      checked={this.props.showMusician}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="musician"
                    >
                      Musician
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[21] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[22] }}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowPainter(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id="painter"
                      checked={this.props.showPainter}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="painter"
                    >
                      Painter
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[23] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[24] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[25] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[26] }}
                  >
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
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[27] }}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowVocalist(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id="video_editor"
                      checked={this.props.showVocalist}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="video_editor"
                    >
                      Vocalist
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[28] }}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.setShowVoiceOverArtist(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id="video_editor"
                      checked={this.props.showVoiceOverArtist}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor="video_editor"
                    >
                      Voice Over Artist
                    </label>
                  </div>
                  <div
                    className={styles.inputs + " snap-center"}
                    style={{ display: this.state.displayCat[29] }}
                  >
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
          ) : (
            <div
              className={`flex flex-col snap-y my-4 overflow-hidden overflow-y-scroll justify-start`}
              id={styles.category}
            >
              {this.state.showDropDown && (
                <div className={styles.options}>
                  <Link
                    href="/explore/freelancers"
                    className="capitalize text-xl font-semibold hover:text-blue-600"
                  >
                    explore all
                  </Link>
                </div>
              )}
            </div>
          )}

          <hr className={styles.divider} />

          <div className={styles.filter} id={styles.price}>
            <div className={styles.title}>Price</div>
            <span className={styles.rate}>Rs. {this.props.rateSort}</span>
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
                    this.props.setCurrentPage(1);
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
);
