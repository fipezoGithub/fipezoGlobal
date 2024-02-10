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
              className={`flex flex-col snap-y max-h-[41vh] overflow-hidden overflow-y-scroll justify-start`}
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
              <div className='mb-2 mr-1'>
                <input
                  type='text'
                  placeholder='search category'
                  onChange={(e) => this.searchCategory(e.target.value)}
                  className='focus:outline-none px-2 py-1 placeholder:capitalize placeholder:text-sm md:placeholder:text-base w-48 md:w-auto border'
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
                      id='actor'
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowActor(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      checked={this.props.showActor}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='actor'
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
                      id='actress'
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowActress(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      checked={this.props.showActress}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='actress'
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
                      id='album_designer'
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowAlbumDesign(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      checked={this.props.showAlbumDesign}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='album_designer'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowAnchor(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='anchor'
                      checked={this.props.showAnchor}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='anchor'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowBabySitter(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='babysitter'
                      checked={this.props.showBabySitter}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='babysitter'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowCinematographers(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='cinematographer'
                      checked={this.props.showCinematographers}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='cinematographer'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowDancer(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='dancer'
                      checked={this.props.showDancer}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='dancer'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowDanceTeacher(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='dance_teacher'
                      checked={this.props.showDanceTeacher}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='dance_teacher'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowDj(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='dj'
                      checked={this.props.showDj}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='dj'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowDrawingTeacher(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='drawing_teacher'
                      checked={this.props.showDrawingTeacher}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='drawing_teacher'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowDroneOperators(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='drone_operator'
                      checked={this.props.showDroneOperators}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='drone_operator'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowFashionDesigner(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='fashion_designer'
                      checked={this.props.showFashionDesigner}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='fashion_designer'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowGraphicsDesigner(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='graphics_designer'
                      checked={this.props.showGraphicsDesigner}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='graphics_designer'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowInfluencer(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='influencer'
                      checked={this.props.showInfluencer}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='influencer'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowInteriorDesigner(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='interior_designer'
                      checked={this.props.showInteriorDesigner}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='interior_designer'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowLyricist(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='lyricist'
                      checked={this.props.showLyricist}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='lyricist'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowMaid(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='maid'
                      checked={this.props.showMaid}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='maid'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowMakeupArtist(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='makeup_artist'
                      checked={this.props.showMakeupArtist}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='makeup_artist'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowMehendiArtist(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='mehendi_artist'
                      checked={this.props.showMehendiArtist}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='mehendi_artist'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowModel(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='model'
                      checked={this.props.showModel}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='model'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowMusician(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='musician'
                      checked={this.props.showMusician}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='musician'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowMusicTeacher(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='music_teacher'
                      checked={this.props.showMusicTeacher}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='music_teacher'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowPainter(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='painter'
                      checked={this.props.showPainter}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='painter'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowPhotographers(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='photographer'
                      checked={this.props.showPhotographers}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='photographer'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowPhotoEditor(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='photo_editor'
                      checked={this.props.showPhotoEditor}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='photo_editor'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowPrivateTutor(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='private_tutor'
                      checked={this.props.showPrivateTutor}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='private_tutor'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowVideoEditor(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='video_editor'
                      checked={this.props.showVideoEditor}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='video_editor'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowVocalist(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='video_editor'
                      checked={this.props.showVocalist}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='video_editor'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowVoiceOverArtist(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='video_editor'
                      checked={this.props.showVoiceOverArtist}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='video_editor'
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
                      type='checkbox'
                      onChange={(e) => {
                        this.props.setShowWebDeveloper(e.target.checked);
                        this.props.setCurrentPage(1);
                      }}
                      id='web_developer'
                      checked={this.props.showWebDeveloper}
                    />
                    <label
                      className={styles.label + " cursor-pointer"}
                      htmlFor='web_developer'
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
                    href='/explore/freelancers'
                    className='capitalize text-xl font-semibold hover:text-blue-600'
                  >
                    explore all
                  </Link>
                </div>
              )}
            </div>
          )}

          <hr className={styles.divider} />
          {this.props.router.route === "/explore/freelancers/[profession]" && (
            <>
              <div
                className={`flex flex-col snap-y py-2 max-h-[41vh] overflow-hidden overflow-y-scroll justify-start`}
                id={styles.category}
              >
                <div className={styles.title}>
                  Speciality{" "}
                  <MdKeyboardArrowDown
                    style={{ fontSize: "20" }}
                    onClick={this.toggle}
                    className={styles.arrow}
                  />
                </div>
                {this.state.showDropDown && (
                  <div className={styles.options}>
                    {(this.props.profession === "actor" ||
                      this.props.profession === "actress") && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            className={styles.checkbox}
                            type='checkbox'
                            name=''
                            onChange={(e) =>
                              this.props.handelServices(e, "photoshoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "photoshoot"
                            )}
                            id='photoshoot'
                          />
                          <label
                            htmlFor='photoshoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Photoshoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='stageshow'
                            onChange={(e) =>
                              this.props.handelServices(e, "stageshow")
                            }
                            checked={this.props.freelancerServices.includes(
                              "stageshow"
                            )}
                          />
                          <label
                            htmlFor='stageshow'
                            className={styles.label + " cursor-pointer"}
                          >
                            Stage Show
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='inauguration'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "inauguration_ceremony"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "inauguration_ceremony"
                            )}
                          />
                          <label
                            htmlFor='inauguration'
                            className={styles.label + " cursor-pointer"}
                          >
                            Inauguration Ceremony
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='social_promotion'
                            onChange={(e) =>
                              this.props.handelServices(e, "social_promotion")
                            }
                            checked={this.props.freelancerServices.includes(
                              "social_promotion"
                            )}
                          />
                          <label
                            htmlFor='social_promotion'
                            className={styles.label + " cursor-pointer"}
                          >
                            Social Promotion
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='tvc_ad'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "television_commercial_ads"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "television_commercial_ads"
                            )}
                          />
                          <label
                            htmlFor='tvc_ad'
                            className={styles.label + " cursor-pointer"}
                          >
                            Television Commercial Ads
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            name=''
                            id='hoading'
                            className={styles.checkbox}
                            onChange={(e) =>
                              this.props.handelServices(e, "hoarding_shoots")
                            }
                            checked={this.props.freelancerServices.includes(
                              "hoarding_shoots"
                            )}
                          />
                          <label
                            htmlFor='hoading'
                            className={styles.label + " cursor-pointer"}
                          >
                            Hoarding Shoots
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='brand_endorsement'
                            onChange={(e) =>
                              this.props.handelServices(e, "brand_endorsement")
                            }
                            checked={this.props.freelancerServices.includes(
                              "brand_endorsement"
                            )}
                          />
                          <label
                            htmlFor='brand_endorsement'
                            className={styles.label + " cursor-pointer"}
                          >
                            Brand Endorsement
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "anchor" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='stageshow'
                            onChange={(e) =>
                              this.props.handelServices(e, "stageshow")
                            }
                            checked={this.props.freelancerServices.includes(
                              "stageshow"
                            )}
                          />
                          <label
                            htmlFor='stageshow'
                            className={styles.label + " cursor-pointer"}
                          >
                            Stage Show
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wedding'
                            onChange={(e) =>
                              this.props.handelServices(e, "wedding_ceremony")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='wedding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wedding Ceremony
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='corporate'
                            onChange={(e) =>
                              this.props.handelServices(e, "corporate_events")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='corporate'
                            className={styles.label + " cursor-pointer"}
                          >
                            Corporate Parties
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='personal_parties'
                            onChange={(e) =>
                              this.props.handelServices(e, "personal_parties")
                            }
                            checked={this.props.freelancerServices.includes(
                              "personal_parties"
                            )}
                          />
                          <label
                            htmlFor='personal_parties'
                            className={styles.label + " cursor-pointer"}
                          >
                            Personal Parties
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "cinematographer" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wedding'
                            onChange={(e) =>
                              this.props.handelServices(e, "wedding_ceremony")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='wedding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wedding Ceremony
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='pre-wedding'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "pre_wedding_ceremony"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "pre_wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='pre-wedding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Pre Wedding Ceremony
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='corporate'
                            onChange={(e) =>
                              this.props.handelServices(e, "corporate_events")
                            }
                            checked={this.props.freelancerServices.includes(
                              "corporate_events"
                            )}
                          />
                          <label
                            htmlFor='corporate'
                            className={styles.label + " cursor-pointer"}
                          >
                            Corporate Events
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='personal_parties'
                            onChange={(e) =>
                              this.props.handelServices(e, "personal_parties")
                            }
                            checked={this.props.freelancerServices.includes(
                              "personal_parties"
                            )}
                          />
                          <label
                            htmlFor='personal_parties'
                            className={styles.label + " cursor-pointer"}
                          >
                            Personal Parties
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='fashion_portfolio'
                            onChange={(e) =>
                              this.props.handelServices(e, "fashion_portfolio")
                            }
                            checked={this.props.freelancerServices.includes(
                              "fashion_portfolio"
                            )}
                          />
                          <label
                            htmlFor='fashion_portfolio'
                            className={styles.label + " cursor-pointer"}
                          >
                            Fashion Portfolio
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='food_industry'
                            onChange={(e) =>
                              this.props.handelServices(e, "food_industry")
                            }
                            checked={this.props.freelancerServices.includes(
                              "food_industry"
                            )}
                          />
                          <label
                            htmlFor='food_industry'
                            className={styles.label + " cursor-pointer"}
                          >
                            Food Industry
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='automobile_industry'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "automobile_industry"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "automobile_industry"
                            )}
                          />
                          <label
                            htmlFor='automobile_industry'
                            className={styles.label + " cursor-pointer"}
                          >
                            Automobile Industry
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='architecture'
                            onChange={(e) =>
                              this.props.handelServices(e, "architecture_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "architecture_shoot"
                            )}
                          />
                          <label
                            htmlFor='architecture'
                            className={styles.label + " cursor-pointer"}
                          >
                            Architecture Design
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='tvc_ad'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "television_commercial_ads"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "television_commercial_ads"
                            )}
                          />
                          <label
                            htmlFor='tvc_ad'
                            className={styles.label + " cursor-pointer"}
                          >
                            Television Commercial Ads
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='short_film'
                            onChange={(e) =>
                              this.props.handelServices(e, "short_film")
                            }
                            checked={this.props.freelancerServices.includes(
                              "short_film"
                            )}
                          />
                          <label
                            htmlFor='short_film'
                            className={styles.label + " cursor-pointer"}
                          >
                            Short Film
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='music_video'
                            onChange={(e) =>
                              this.props.handelServices(e, "music_video")
                            }
                            checked={this.props.freelancerServices.includes(
                              "music_video"
                            )}
                          />
                          <label
                            htmlFor='music_video'
                            className={styles.label + " cursor-pointer"}
                          >
                            Music Video
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "dancer" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='stageshow'
                            onChange={(e) =>
                              this.props.handelServices(e, "stageshow")
                            }
                            checked={this.props.freelancerServices.includes(
                              "stageshow"
                            )}
                          />
                          <label
                            htmlFor='stageshow'
                            className={styles.label + " cursor-pointer"}
                          >
                            Stage Show
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='backleading_dancer'
                            onChange={(e) =>
                              this.props.handelServices(e, "backleading_dancer")
                            }
                            checked={this.props.freelancerServices.includes(
                              "backleading_dancer"
                            )}
                          />
                          <label
                            htmlFor='backleading_dancer'
                            className={styles.label + " cursor-pointer"}
                          >
                            Backleading Dancer
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wedding_party'
                            onChange={(e) =>
                              this.props.handelServices(e, "wedding_party")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wedding_party"
                            )}
                          />
                          <label
                            htmlFor='wedding_party'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wedding Parties
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='personal_parties'
                            onChange={(e) =>
                              this.props.handelServices(e, "personal_parties")
                            }
                            checked={this.props.freelancerServices.includes(
                              "personal_parties"
                            )}
                          />
                          <label
                            htmlFor='personal_parties'
                            className={styles.label + " cursor-pointer"}
                          >
                            personal Parties
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='music_video'
                            onChange={(e) =>
                              this.props.handelServices(e, "music_video")
                            }
                            checked={this.props.freelancerServices.includes(
                              "music_video"
                            )}
                          />
                          <label
                            htmlFor='music_video'
                            className={styles.label + " cursor-pointer"}
                          >
                            Music Video
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "dance_teacher" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='modern_dance'
                            onChange={(e) =>
                              this.props.handelServices(e, "modern_dance")
                            }
                            checked={this.props.freelancerServices.includes(
                              "modern_dance"
                            )}
                          />
                          <label
                            htmlFor='modern_dance'
                            className={styles.label + " cursor-pointer"}
                          >
                            Modern Dance
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='ballet'
                            onChange={(e) =>
                              this.props.handelServices(e, "ballet")
                            }
                            checked={this.props.freelancerServices.includes(
                              "ballet"
                            )}
                          />
                          <label
                            htmlFor='ballet'
                            className={styles.label + " cursor-pointer"}
                          >
                            Ballet
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='swing'
                            onChange={(e) =>
                              this.props.handelServices(e, "swing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "swing"
                            )}
                          />
                          <label
                            htmlFor='swing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Swing
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='tap_dance'
                            onChange={(e) =>
                              this.props.handelServices(e, "tap_dance")
                            }
                            checked={this.props.freelancerServices.includes(
                              "tap_dance"
                            )}
                          />
                          <label
                            htmlFor='tap_dance'
                            className={styles.label + " cursor-pointer"}
                          >
                            Tap Dance
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='hip_hop'
                            onChange={(e) =>
                              this.props.handelServices(e, "hip_hop")
                            }
                            checked={this.props.freelancerServices.includes(
                              "hip_hop"
                            )}
                          />
                          <label
                            htmlFor='hip_hop'
                            className={styles.label + " cursor-pointer"}
                          >
                            Hip Hop
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='folk_dance'
                            onChange={(e) =>
                              this.props.handelServices(e, "folk_dance")
                            }
                            checked={this.props.freelancerServices.includes(
                              "folk_dance"
                            )}
                          />
                          <label
                            htmlFor='folk_dance'
                            className={styles.label + " cursor-pointer"}
                          >
                            Folk Dance
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='irish_dance'
                            onChange={(e) =>
                              this.props.handelServices(e, "irish_dance")
                            }
                            checked={this.props.freelancerServices.includes(
                              "irish_dance"
                            )}
                          />
                          <label
                            htmlFor='irish_dance'
                            className={styles.label + " cursor-pointer"}
                          >
                            Irish Dance
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='bharatanatyam'
                            onChange={(e) =>
                              this.props.handelServices(e, "bharatanatyam")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bharatanatyam"
                            )}
                          />
                          <label
                            htmlFor='bharatanatyam'
                            className={styles.label + " cursor-pointer"}
                          >
                            Bharatanatyam
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='contemporary'
                            onChange={(e) =>
                              this.props.handelServices(e, "contemporary")
                            }
                            checked={this.props.freelancerServices.includes(
                              "contemporary"
                            )}
                          />
                          <label
                            htmlFor='contemporary'
                            className={styles.label + " cursor-pointer"}
                          >
                            Contemporary
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='line_dancing'
                            onChange={(e) =>
                              this.props.handelServices(e, "line_dancing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "line_dancing"
                            )}
                          />
                          <label
                            htmlFor='line_dancing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Line Dancing
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='samba'
                            onChange={(e) =>
                              this.props.handelServices(e, "samba")
                            }
                            checked={this.props.freelancerServices.includes(
                              "samba"
                            )}
                          />
                          <label
                            htmlFor='samba'
                            className={styles.label + " cursor-pointer"}
                          >
                            Samba
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='tango'
                            onChange={(e) =>
                              this.props.handelServices(e, "tango")
                            }
                            checked={this.props.freelancerServices.includes(
                              "tango"
                            )}
                          />
                          <label
                            htmlFor='tango'
                            className={styles.label + " cursor-pointer"}
                          >
                            Tango
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='ballroom'
                            onChange={(e) =>
                              this.props.handelServices(e, "ballroom")
                            }
                            checked={this.props.freelancerServices.includes(
                              "ballroom"
                            )}
                          />
                          <label
                            htmlFor='ballroom'
                            className={styles.label + " cursor-pointer"}
                          >
                            Ballroom
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='belly_dance'
                            onChange={(e) =>
                              this.props.handelServices(e, "bally_dance")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bally_dance"
                            )}
                          />
                          <label
                            htmlFor='belly_dance'
                            className={styles.label + " cursor-pointer"}
                          >
                            Belly Dance
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='jazz'
                            onChange={(e) =>
                              this.props.handelServices(e, "jazz")
                            }
                            checked={this.props.freelancerServices.includes(
                              "jazz"
                            )}
                          />
                          <label
                            htmlFor='jazz'
                            className={styles.label + " cursor-pointer"}
                          >
                            Jazz
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='jive'
                            onChange={(e) =>
                              this.props.handelServices(e, "jive")
                            }
                            checked={this.props.freelancerServices.includes(
                              "jive"
                            )}
                          />
                          <label
                            htmlFor='jive'
                            className={styles.label + " cursor-pointer"}
                          >
                            Jive
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='breakdance'
                            onChange={(e) =>
                              this.props.handelServices(e, "break_dance")
                            }
                            checked={this.props.freelancerServices.includes(
                              "break_dance"
                            )}
                          />
                          <label
                            htmlFor='breakdance'
                            className={styles.label + " cursor-pointer"}
                          >
                            Break Dance
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='capoeira'
                            onChange={(e) =>
                              this.props.handelServices(e, "capoeira")
                            }
                            checked={this.props.freelancerServices.includes(
                              "capoeira"
                            )}
                          />
                          <label
                            htmlFor='capoeira'
                            className={styles.label + " cursor-pointer"}
                          >
                            Capoeira
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='cha_cha'
                            onChange={(e) =>
                              this.props.handelServices(e, "cha_cha")
                            }
                            checked={this.props.freelancerServices.includes(
                              "cha_cha"
                            )}
                          />
                          <label
                            htmlFor='cha_cha'
                            className={styles.label + " cursor-pointer"}
                          >
                            Cha Cha
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='kathak'
                            onChange={(e) =>
                              this.props.handelServices(e, "kathak")
                            }
                            checked={this.props.freelancerServices.includes(
                              "kathak"
                            )}
                          />
                          <label
                            htmlFor='kathak'
                            className={styles.label + " cursor-pointer"}
                          >
                            Kathak
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='mambo'
                            onChange={(e) =>
                              this.props.handelServices(e, "mambo")
                            }
                            checked={this.props.freelancerServices.includes(
                              "mambo"
                            )}
                          />
                          <label
                            htmlFor='mambo'
                            className={styles.label + " cursor-pointer"}
                          >
                            Mambo
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='rumba'
                            onChange={(e) =>
                              this.props.handelServices(e, "rumba")
                            }
                            checked={this.props.freelancerServices.includes(
                              "rumba"
                            )}
                          />
                          <label
                            htmlFor='rumba'
                            className={styles.label + " cursor-pointer"}
                          >
                            Rumba
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='salsa'
                            onChange={(e) =>
                              this.props.handelServices(e, "salsa")
                            }
                            checked={this.props.freelancerServices.includes(
                              "salsa"
                            )}
                          />
                          <label
                            htmlFor='salsa'
                            className={styles.label + " cursor-pointer"}
                          >
                            Salsa
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='bolero'
                            onChange={(e) =>
                              this.props.handelServices(e, "bolero")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bolero"
                            )}
                          />
                          <label
                            htmlFor='bolero'
                            className={styles.label + " cursor-pointer"}
                          >
                            Bolero
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "dj" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wedding_party'
                            onChange={(e) =>
                              this.props.handelServices(e, "wedding_party")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wedding_party"
                            )}
                          />
                          <label
                            htmlFor='wedding_party'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wedding Parties
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='personal_parties'
                            onChange={(e) =>
                              this.props.handelServices(e, "personal_parties")
                            }
                            checked={this.props.freelancerServices.includes(
                              "personal_parties"
                            )}
                          />
                          <label
                            htmlFor='personal_parties'
                            className={styles.label + " cursor-pointer"}
                          >
                            Personal Parties
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='club'
                            onChange={(e) =>
                              this.props.handelServices(e, "club_party")
                            }
                            checked={this.props.freelancerServices.includes(
                              "club_party"
                            )}
                          />
                          <label
                            htmlFor='club'
                            className={styles.label + " cursor-pointer"}
                          >
                            Club party
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "drawing_teacher" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='pencil_drawing'
                            onChange={(e) =>
                              this.props.handelServices(e, "pencil_drawing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "pencil_drawing"
                            )}
                          />
                          <label
                            htmlFor='pencil_drawing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Pencil Drawing
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='ink_drawing'
                            onChange={(e) =>
                              this.props.handelServices(e, "ink_drawing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "ink_drawing"
                            )}
                          />
                          <label
                            htmlFor='ink_drawing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Ink Drawing
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='pen_drawing'
                            onChange={(e) =>
                              this.props.handelServices(e, "pen_drawing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "pen_drawing"
                            )}
                          />
                          <label
                            htmlFor='pen_drawing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Pen Drawing
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='chalk_drawing'
                            onChange={(e) =>
                              this.props.handelServices(e, "chalk_drawing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "chalk_drawing"
                            )}
                          />
                          <label
                            htmlFor='chalk_drawing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Chalk Drawing
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='crayon_drawing'
                            onChange={(e) =>
                              this.props.handelServices(e, "crayon_drawing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "crayon_drawing"
                            )}
                          />
                          <label
                            htmlFor='crayon_drawing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Crayon Drawing
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='charcoal_drawing'
                            onChange={(e) =>
                              this.props.handelServices(e, "charcoal_drawing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "charcoal_drawing"
                            )}
                          />
                          <label
                            htmlFor='charcoal_drawing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Charcoal Drawing
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "drone_operator" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wedding'
                            onChange={(e) =>
                              this.props.handelServices(e, "wedding_ceremony")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='wedding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wedding Ceremony
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='pre-wedding'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "pre_wedding_ceremony"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "pre_wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='pre-wedding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Pre Wedding Ceremony
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='corporate'
                            onChange={(e) =>
                              this.props.handelServices(e, "commercial_project")
                            }
                            checked={this.props.freelancerServices.includes(
                              "commercial_project"
                            )}
                          />
                          <label
                            htmlFor='corporate'
                            className={styles.label + " cursor-pointer"}
                          >
                            Commercial Project
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='industrial'
                            onChange={(e) =>
                              this.props.handelServices(e, "industrial_project")
                            }
                            checked={this.props.freelancerServices.includes(
                              "industrial_project"
                            )}
                          />
                          <label
                            htmlFor='industrial'
                            className={styles.label + " cursor-pointer"}
                          >
                            Industrial Project
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='personal_parties'
                            onChange={(e) =>
                              this.props.handelServices(e, "personal_parties")
                            }
                            checked={this.props.freelancerServices.includes(
                              "personal_parties"
                            )}
                          />
                          <label
                            htmlFor='personal_parties'
                            className={styles.label + " cursor-pointer"}
                          >
                            Personal Parties
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='political_rally'
                            onChange={(e) =>
                              this.props.handelServices(e, "political_rally")
                            }
                            checked={this.props.freelancerServices.includes(
                              "political_rally"
                            )}
                          />
                          <label
                            htmlFor='political_rally'
                            className={styles.label + " cursor-pointer"}
                          >
                            Political Rally
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='tvc_ad'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "television_commercial_ads"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "television_commercial_ads"
                            )}
                          />
                          <label
                            htmlFor='tvc_ad'
                            className={styles.label + " cursor-pointer"}
                          >
                            Television Commercial Ads
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "fashion_designer" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='western'
                            onChange={(e) =>
                              this.props.handelServices(e, "western")
                            }
                            checked={this.props.freelancerServices.includes(
                              "western"
                            )}
                          />
                          <label
                            htmlFor='western'
                            className={styles.label + " cursor-pointer"}
                          >
                            Western
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='athentic'
                            onChange={(e) =>
                              this.props.handelServices(e, "athentic")
                            }
                            checked={this.props.freelancerServices.includes(
                              "athentic"
                            )}
                          />
                          <label
                            htmlFor='athentic'
                            className={styles.label + " cursor-pointer"}
                          >
                            Athentic
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='traditional'
                            onChange={(e) =>
                              this.props.handelServices(e, "traditional")
                            }
                            checked={this.props.freelancerServices.includes(
                              "traditional"
                            )}
                          />
                          <label
                            htmlFor='traditional'
                            className={styles.label + " cursor-pointer"}
                          >
                            Traditional
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wedding'
                            onChange={(e) =>
                              this.props.handelServices(e, "wedding_ceremony")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='wedding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wedding
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='pre_wedding'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "pre_wedding_ceremony"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "pre_wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='pre_wedding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Pre Wedding
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='babyshoot'
                            onChange={(e) =>
                              this.props.handelServices(e, "babyshoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "babyshoot"
                            )}
                          />
                          <label
                            htmlFor='babyshoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Babyshoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='maternity'
                            onChange={(e) =>
                              this.props.handelServices(e, "maternity_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "maternity_shoot"
                            )}
                          />
                          <label
                            htmlFor='maternity'
                            className={styles.label + " cursor-pointer"}
                          >
                            Maternity
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='bridal'
                            onChange={(e) =>
                              this.props.handelServices(e, "bridal_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bridal_shoot"
                            )}
                          />
                          <label
                            htmlFor='bridal'
                            className={styles.label + " cursor-pointer"}
                          >
                            Bridal Shoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='tvc_ad'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "television_commercial_ads"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "television_commercial_ads"
                            )}
                          />
                          <label
                            htmlFor='tvc_ad'
                            className={styles.label + " cursor-pointer"}
                          >
                            Television Commercial Ads
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='tvserial'
                            onChange={(e) =>
                              this.props.handelServices(e, "television_serial")
                            }
                            checked={this.props.freelancerServices.includes(
                              "television_serial"
                            )}
                          />
                          <label
                            htmlFor='tvserial'
                            className={styles.label + " cursor-pointer"}
                          >
                            Television Serial
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='fashion_show'
                            onChange={(e) =>
                              this.props.handelServices(e, "fashion_show")
                            }
                            checked={this.props.freelancerServices.includes(
                              "fashion_show"
                            )}
                          />
                          <label
                            htmlFor='fashion_show'
                            className={styles.label + " cursor-pointer"}
                          >
                            Fashion Show
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='music_video'
                            onChange={(e) =>
                              this.props.handelServices(e, "music_video")
                            }
                            checked={this.props.freelancerServices.includes(
                              "music_video"
                            )}
                          />
                          <label
                            htmlFor='music_video'
                            className={styles.label + " cursor-pointer"}
                          >
                            Music Video
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='film'
                            onChange={(e) =>
                              this.props.handelServices(e, "film")
                            }
                            checked={this.props.freelancerServices.includes(
                              "film"
                            )}
                          />
                          <label
                            htmlFor='film'
                            className={styles.label + " cursor-pointer"}
                          >
                            Film
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='short_film'
                            onChange={(e) =>
                              this.props.handelServices(e, "short_film")
                            }
                            checked={this.props.freelancerServices.includes(
                              "short_film"
                            )}
                          />
                          <label
                            htmlFor='short_film'
                            className={styles.label + " cursor-pointer"}
                          >
                            Short Film
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "graphics_designer" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='brochure'
                            onChange={(e) =>
                              this.props.handelServices(e, "brochure_design")
                            }
                            checked={this.props.freelancerServices.includes(
                              "brochure_design"
                            )}
                          />
                          <label
                            htmlFor='brochure'
                            className={styles.label + " cursor-pointer"}
                          >
                            Brochure Design
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='magazine'
                            onChange={(e) =>
                              this.props.handelServices(e, "magazine_design")
                            }
                            checked={this.props.freelancerServices.includes(
                              "magazine_design"
                            )}
                          />
                          <label
                            htmlFor='magazine'
                            className={styles.label + " cursor-pointer"}
                          >
                            Magazine Design
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='website'
                            onChange={(e) =>
                              this.props.handelServices(e, "website_design")
                            }
                            checked={this.props.freelancerServices.includes(
                              "website_design"
                            )}
                          />
                          <label
                            htmlFor='website'
                            className={styles.label + " cursor-pointer"}
                          >
                            Website Design
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='logo'
                            onChange={(e) =>
                              this.props.handelServices(e, "logo_design")
                            }
                            checked={this.props.freelancerServices.includes(
                              "logo_design"
                            )}
                          />
                          <label
                            htmlFor='logo'
                            className={styles.label + " cursor-pointer"}
                          >
                            Logo Design
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='poster'
                            onChange={(e) =>
                              this.props.handelServices(e, "poster_design")
                            }
                            checked={this.props.freelancerServices.includes(
                              "poster_design"
                            )}
                          />
                          <label
                            htmlFor='poster'
                            className={styles.label + " cursor-pointer"}
                          >
                            Poster
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='hoarding'
                            onChange={(e) =>
                              this.props.handelServices(e, "hoarding_design")
                            }
                            checked={this.props.freelancerServices.includes(
                              "hoarding_design"
                            )}
                          />
                          <label
                            htmlFor='hoarding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Hoarding Design
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "influencer" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='reels'
                            onChange={(e) =>
                              this.props.handelServices(e, "reels")
                            }
                            checked={this.props.freelancerServices.includes(
                              "reels"
                            )}
                          />
                          <label
                            htmlFor='reels'
                            className={styles.label + " cursor-pointer"}
                          >
                            Reels
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='post'
                            onChange={(e) =>
                              this.props.handelServices(e, "posts")
                            }
                            checked={this.props.freelancerServices.includes(
                              "posts"
                            )}
                          />
                          <label
                            htmlFor='post'
                            className={styles.label + " cursor-pointer"}
                          >
                            Post
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='stories'
                            onChange={(e) =>
                              this.props.handelServices(e, "stories")
                            }
                            checked={this.props.freelancerServices.includes(
                              "stories"
                            )}
                          />
                          <label
                            htmlFor='stories'
                            className={styles.label + " cursor-pointer"}
                          >
                            Stories
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='youtube_videoes'
                            onChange={(e) =>
                              this.props.handelServices(e, "youtube_videoes")
                            }
                            checked={this.props.freelancerServices.includes(
                              "youtube_videoes"
                            )}
                          />
                          <label
                            htmlFor='youtube_videoes'
                            className={styles.label + " cursor-pointer"}
                          >
                            Youtube Videoes
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "maid" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='cooking'
                            onChange={(e) =>
                              this.props.handelServices(e, "cooking")
                            }
                            checked={this.props.freelancerServices.includes(
                              "cooking"
                            )}
                          />
                          <label
                            htmlFor='cooking'
                            className={styles.label + " cursor-pointer"}
                          >
                            Cooking
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='moping'
                            onChange={(e) =>
                              this.props.handelServices(e, "moping")
                            }
                            checked={this.props.freelancerServices.includes(
                              "moping"
                            )}
                          />
                          <label
                            htmlFor='moping'
                            className={styles.label + " cursor-pointer"}
                          >
                            Moping
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='cloth_washing'
                            onChange={(e) =>
                              this.props.handelServices(e, "cloth_washing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "cloth_washing"
                            )}
                          />
                          <label
                            htmlFor='cloth_washing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Cloth Washing
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='dish_washing'
                            onChange={(e) =>
                              this.props.handelServices(e, "dish_washing")
                            }
                            checked={this.props.freelancerServices.includes(
                              "dish_washing"
                            )}
                          />
                          <label
                            htmlFor='dish_washing'
                            className={styles.label + " cursor-pointer"}
                          >
                            Dish Washing
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "makeup_artist" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='bridal'
                            onChange={(e) =>
                              this.props.handelServices(e, "bridal_makeup")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bridal_makeup"
                            )}
                          />
                          <label
                            htmlFor='bridal'
                            className={styles.label + " cursor-pointer"}
                          >
                            Bridal
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='fashion_shoot'
                            onChange={(e) =>
                              this.props.handelServices(e, "fashion_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "fashion_shoot"
                            )}
                          />
                          <label
                            htmlFor='fashion_shoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Fashion Shoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='fashion_show'
                            onChange={(e) =>
                              this.props.handelServices(e, "fashion_show")
                            }
                            checked={this.props.freelancerServices.includes(
                              "fashion_show"
                            )}
                          />
                          <label
                            htmlFor='fashion_show'
                            className={styles.label + " cursor-pointer"}
                          >
                            Fashion Show
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='party_makeup'
                            onChange={(e) =>
                              this.props.handelServices(e, "party_makeup")
                            }
                            checked={this.props.freelancerServices.includes(
                              "party_makeup"
                            )}
                          />
                          <label
                            htmlFor='party_makeup'
                            className={styles.label + " cursor-pointer"}
                          >
                            Party Makeup
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "model" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='fashion_show'
                            onChange={(e) =>
                              this.props.handelServices(e, "fashion_show")
                            }
                            checked={this.props.freelancerServices.includes(
                              "fashion_show"
                            )}
                          />
                          <label
                            htmlFor='fashion_show'
                            className={styles.label + " cursor-pointer"}
                          >
                            Fashion Show
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='bridal'
                            onChange={(e) =>
                              this.props.handelServices(e, "bridal_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bridal_shoot"
                            )}
                          />
                          <label
                            htmlFor='bridal'
                            className={styles.label + " cursor-pointer"}
                          >
                            Bridal
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='ramp_show'
                            onChange={(e) =>
                              this.props.handelServices(e, "ramp_show")
                            }
                            checked={this.props.freelancerServices.includes(
                              "ramp_show"
                            )}
                          />
                          <label
                            htmlFor='ramp_show'
                            className={styles.label + " cursor-pointer"}
                          >
                            Ramp Show
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='music_video'
                            onChange={(e) =>
                              this.props.handelServices(e, "music_video")
                            }
                            checked={this.props.freelancerServices.includes(
                              "music_video"
                            )}
                          />
                          <label
                            htmlFor='music_video'
                            className={styles.label + " cursor-pointer"}
                          >
                            Music Video
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='tvc_ad'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "television_commercial_ads"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "television_commercial_ads"
                            )}
                          />
                          <label
                            htmlFor='tvc_ad'
                            className={styles.label + " cursor-pointer"}
                          >
                            Television Commercial Ads
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='short_film'
                            onChange={(e) =>
                              this.props.handelServices(e, "short_film")
                            }
                            checked={this.props.freelancerServices.includes(
                              "short_film"
                            )}
                          />
                          <label
                            htmlFor='short_film'
                            className={styles.label + " cursor-pointer"}
                          >
                            Short Film
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='hoarding_shoot'
                            onChange={(e) =>
                              this.props.handelServices(e, "hoarding_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "hoarding_shoot"
                            )}
                          />
                          <label
                            htmlFor='hoarding_shoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Hoarding Shoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='bikini_shoot'
                            onChange={(e) =>
                              this.props.handelServices(e, "bikini_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bikini_shoot"
                            )}
                          />
                          <label
                            htmlFor='bikini_shoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Bikini Shoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='monokini_shoot'
                            onChange={(e) =>
                              this.props.handelServices(e, "monokini_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "monokini_shoot"
                            )}
                          />
                          <label
                            htmlFor='monokini_shoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Monokini Shoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='semi_nude_shoot'
                            onChange={(e) =>
                              this.props.handelServices(e, "semi_nude_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "semi_nude_shoot"
                            )}
                          />
                          <label
                            htmlFor='semi_nude_shoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Semi Nude Shoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='bold_shoot'
                            onChange={(e) =>
                              this.props.handelServices(e, "bold_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bold_shoot"
                            )}
                          />
                          <label
                            htmlFor='bold_shoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Bold Shoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='nude_shoot'
                            onChange={(e) =>
                              this.props.handelServices(e, "nude_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "nude_shoot"
                            )}
                          />
                          <label
                            htmlFor='nude_shoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Nude Shoot
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "musician" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='pianist'
                            onChange={(e) =>
                              this.props.handelServices(e, "pianist")
                            }
                            checked={this.props.freelancerServices.includes(
                              "pianist"
                            )}
                          />
                          <label
                            htmlFor='pianist'
                            className={styles.label + " cursor-pointer"}
                          >
                            Pianist
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='guitarist'
                            onChange={(e) =>
                              this.props.handelServices(e, "guitarist")
                            }
                            checked={this.props.freelancerServices.includes(
                              "guitarist"
                            )}
                          />
                          <label
                            htmlFor='guitarist'
                            className={styles.label + " cursor-pointer"}
                          >
                            Guitarist
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='violinist'
                            onChange={(e) =>
                              this.props.handelServices(e, "violinist")
                            }
                            checked={this.props.freelancerServices.includes(
                              "violinist"
                            )}
                          />
                          <label
                            htmlFor='violinist'
                            className={styles.label + " cursor-pointer"}
                          >
                            Violinist
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='Cellist'
                            onChange={(e) =>
                              this.props.handelServices(e, "cellist")
                            }
                            checked={this.props.freelancerServices.includes(
                              "cellist"
                            )}
                          />
                          <label
                            htmlFor='Cellist'
                            className={styles.label + " cursor-pointer"}
                          >
                            Cellist
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='flutist'
                            onChange={(e) =>
                              this.props.handelServices(e, "flutist")
                            }
                            checked={this.props.freelancerServices.includes(
                              "flutist"
                            )}
                          />
                          <label
                            htmlFor='flutist'
                            className={styles.label + " cursor-pointer"}
                          >
                            Flutist
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='trumpeter'
                            onChange={(e) =>
                              this.props.handelServices(e, "trumpeter")
                            }
                            checked={this.props.freelancerServices.includes(
                              "trumpeter"
                            )}
                          />
                          <label
                            htmlFor='trumpeter'
                            className={styles.label + " cursor-pointer"}
                          >
                            Trumpeter
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='saxophonist'
                            onChange={(e) =>
                              this.props.handelServices(e, "saxophonist")
                            }
                            checked={this.props.freelancerServices.includes(
                              "saxophonist"
                            )}
                          />
                          <label
                            htmlFor='saxophonist'
                            className={styles.label + " cursor-pointer"}
                          >
                            Saxophonist
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='drummer'
                            onChange={(e) =>
                              this.props.handelServices(e, "drummer")
                            }
                            checked={this.props.freelancerServices.includes(
                              "drummer"
                            )}
                          />
                          <label
                            htmlFor='drummer'
                            className={styles.label + " cursor-pointer"}
                          >
                            Drummer
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='bassist'
                            onChange={(e) =>
                              this.props.handelServices(e, "bassist")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bassist"
                            )}
                          />
                          <label
                            htmlFor='bassist'
                            className={styles.label + " cursor-pointer"}
                          >
                            Bassist
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='harpist'
                            onChange={(e) =>
                              this.props.handelServices(e, "harpist")
                            }
                            checked={this.props.freelancerServices.includes(
                              "harpist"
                            )}
                          />
                          <label
                            htmlFor='harpist'
                            className={styles.label + " cursor-pointer"}
                          >
                            Harpist
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='percussionist'
                            onChange={(e) =>
                              this.props.handelServices(e, "percussionist")
                            }
                            checked={this.props.freelancerServices.includes(
                              "percussionist"
                            )}
                          />
                          <label
                            htmlFor='percussionist'
                            className={styles.label + " cursor-pointer"}
                          >
                            Percussionist
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "music_teacher" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='classical_music'
                            onChange={(e) =>
                              this.props.handelServices(e, "classical_music")
                            }
                            checked={this.props.freelancerServices.includes(
                              "classical_music"
                            )}
                          />
                          <label
                            htmlFor='classical_music'
                            className={styles.label + " cursor-pointer"}
                          >
                            Classical Music
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='rock'
                            onChange={(e) =>
                              this.props.handelServices(e, "rock_music")
                            }
                            checked={this.props.freelancerServices.includes(
                              "rock_music"
                            )}
                          />
                          <label
                            htmlFor='rock'
                            className={styles.label + " cursor-pointer"}
                          >
                            Rock
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='pop'
                            onChange={(e) =>
                              this.props.handelServices(e, "pop_music")
                            }
                            checked={this.props.freelancerServices.includes(
                              "pop_music"
                            )}
                          />
                          <label
                            htmlFor='pop'
                            className={styles.label + " cursor-pointer"}
                          >
                            Pop
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='blues'
                            onChange={(e) =>
                              this.props.handelServices(e, "blues")
                            }
                            checked={this.props.freelancerServices.includes(
                              "blues"
                            )}
                          />
                          <label
                            htmlFor='blues'
                            className={styles.label + " cursor-pointer"}
                          >
                            Blues
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='country'
                            onChange={(e) =>
                              this.props.handelServices(e, "country_music")
                            }
                            checked={this.props.freelancerServices.includes(
                              "country_music"
                            )}
                          />
                          <label
                            htmlFor='country'
                            className={styles.label + " cursor-pointer"}
                          >
                            Country
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='folk'
                            onChange={(e) =>
                              this.props.handelServices(e, "folk_music")
                            }
                            checked={this.props.freelancerServices.includes(
                              "folk_music"
                            )}
                          />
                          <label
                            htmlFor='folk'
                            className={styles.label + " cursor-pointer"}
                          >
                            Folk
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='world_music'
                            onChange={(e) =>
                              this.props.handelServices(e, "world_music")
                            }
                            checked={this.props.freelancerServices.includes(
                              "world_music"
                            )}
                          />
                          <label
                            htmlFor='world_music'
                            className={styles.label + " cursor-pointer"}
                          >
                            World Music
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='digital_music'
                            onChange={(e) =>
                              this.props.handelServices(e, "digital_music")
                            }
                            checked={this.props.freelancerServices.includes(
                              "digital_music"
                            )}
                          />
                          <label
                            htmlFor='digital_music'
                            className={styles.label + " cursor-pointer"}
                          >
                            Digital Music
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='hip-hop'
                            onChange={(e) =>
                              this.props.handelServices(e, "hip_hop")
                            }
                            checked={this.props.freelancerServices.includes(
                              "hip_hop"
                            )}
                          />
                          <label
                            htmlFor='hip-hop'
                            className={styles.label + " cursor-pointer"}
                          >
                            Hip-Hop
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='rhythm_and_blues'
                            onChange={(e) =>
                              this.props.handelServices(e, "rhythm_and_blues")
                            }
                            checked={this.props.freelancerServices.includes(
                              "rhythm_and_blues"
                            )}
                          />
                          <label
                            htmlFor='rhythm_and_blues'
                            className={styles.label + " cursor-pointer"}
                          >
                            Rhythm and Blues
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='gospel'
                            onChange={(e) =>
                              this.props.handelServices(e, "gospel")
                            }
                            checked={this.props.freelancerServices.includes(
                              "gospel"
                            )}
                          />
                          <label
                            htmlFor='gospel'
                            className={styles.label + " cursor-pointer"}
                          >
                            Gospel
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='reggae'
                            onChange={(e) =>
                              this.props.handelServices(e, "reggae")
                            }
                            checked={this.props.freelancerServices.includes(
                              "reggae"
                            )}
                          />
                          <label
                            htmlFor='reggae'
                            className={styles.label + " cursor-pointer"}
                          >
                            Reggae
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='metal'
                            onChange={(e) =>
                              this.props.handelServices(e, "metal")
                            }
                            checked={this.props.freelancerServices.includes(
                              "metal"
                            )}
                          />
                          <label
                            htmlFor='metal'
                            className={styles.label + " cursor-pointer"}
                          >
                            Metal
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='indie'
                            onChange={(e) =>
                              this.props.handelServices(e, "indie")
                            }
                            checked={this.props.freelancerServices.includes(
                              "indie"
                            )}
                          />
                          <label
                            htmlFor='indie'
                            className={styles.label + " cursor-pointer"}
                          >
                            Indie
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "painter" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='portrait'
                            onChange={(e) =>
                              this.props.handelServices(e, "portrait")
                            }
                            checked={this.props.freelancerServices.includes(
                              "portrait"
                            )}
                          />
                          <label
                            htmlFor='portrait'
                            className={styles.label + " cursor-pointer"}
                          >
                            Portrait
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wall_painting'
                            onChange={(e) =>
                              this.props.handelServices(e, "wall_painting")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wall_painting"
                            )}
                          />
                          <label
                            htmlFor='wall_painting'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wall Painting
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='family_portrait'
                            onChange={(e) =>
                              this.props.handelServices(e, "family_portrait")
                            }
                            checked={this.props.freelancerServices.includes(
                              "family_portrait"
                            )}
                          />
                          <label
                            htmlFor='family_portrait'
                            className={styles.label + " cursor-pointer"}
                          >
                            Family Portrait
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "photographer" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wedding'
                            onChange={(e) =>
                              this.props.handelServices(e, "wedding_ceremony")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='wedding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wedding Ceremony
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='pre-wedding'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "pre_wedding_ceremony"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "pre_wedding_ceremony"
                            )}
                          />
                          <label
                            htmlFor='pre-wedding'
                            className={styles.label + " cursor-pointer"}
                          >
                            Pre Wedding Ceremony
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='corporate'
                            onChange={(e) =>
                              this.props.handelServices(e, "corporate_events")
                            }
                            checked={this.props.freelancerServices.includes(
                              "corporate_events"
                            )}
                          />
                          <label
                            htmlFor='corporate'
                            className={styles.label + " cursor-pointer"}
                          >
                            Corporate Events
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='personal_parties'
                            onChange={(e) =>
                              this.props.handelServices(e, "personal_parties")
                            }
                            checked={this.props.freelancerServices.includes(
                              "personal_parties"
                            )}
                          />
                          <label
                            htmlFor='personal_parties'
                            className={styles.label + " cursor-pointer"}
                          >
                            Personal Parties
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='portfolio'
                            onChange={(e) =>
                              this.props.handelServices(e, "portfolio_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "portfolio_shoot"
                            )}
                          />
                          <label
                            htmlFor='portfolio'
                            className={styles.label + " cursor-pointer"}
                          >
                            Portfolio
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='new_born_baby_shoot'
                            onChange={(e) =>
                              this.props.handelServices(
                                e,
                                "new_born_baby_shoot"
                              )
                            }
                            checked={this.props.freelancerServices.includes(
                              "new_born_baby_shoot"
                            )}
                          />
                          <label
                            htmlFor='new_born_baby_shoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            New Born Baby Shoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='baby_shoot'
                            onChange={(e) =>
                              this.props.handelServices(e, "baby_shoot")
                            }
                            checked={this.props.freelancerServices.includes(
                              "baby_shoot"
                            )}
                          />
                          <label
                            htmlFor='baby_shoot'
                            className={styles.label + " cursor-pointer"}
                          >
                            Baby Shoot
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='mundan'
                            onChange={(e) =>
                              this.props.handelServices(e, "mundan")
                            }
                            checked={this.props.freelancerServices.includes(
                              "mundan"
                            )}
                          />
                          <label
                            htmlFor='mundan'
                            className={styles.label + " cursor-pointer"}
                          >
                            Mundan
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='upanayan'
                            onChange={(e) =>
                              this.props.handelServices(e, "upanayan")
                            }
                            checked={this.props.freelancerServices.includes(
                              "upanayan"
                            )}
                          />
                          <label
                            htmlFor='upanayan'
                            className={styles.label + " cursor-pointer"}
                          >
                            Upanayan
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='rice_ceremony'
                            onChange={(e) =>
                              this.props.handelServices(e, "rice_ceremony")
                            }
                            checked={this.props.freelancerServices.includes(
                              "rice_ceremony"
                            )}
                          />
                          <label
                            htmlFor='rice_ceremony'
                            className={styles.label + " cursor-pointer"}
                          >
                            Rice Ceremony
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='birthday_party'
                            onChange={(e) =>
                              this.props.handelServices(e, "birthday_party")
                            }
                            checked={this.props.freelancerServices.includes(
                              "birthday_party"
                            )}
                          />
                          <label
                            htmlFor='birthday_party'
                            className={styles.label + " cursor-pointer"}
                          >
                            Birthday Party
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "private_tutor" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='arts'
                            onChange={(e) =>
                              this.props.handelServices(e, "arts")
                            }
                            checked={this.props.freelancerServices.includes(
                              "arts"
                            )}
                          />
                          <label
                            htmlFor='arts'
                            className={styles.label + " cursor-pointer"}
                          >
                            Arts
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='commerce'
                            onChange={(e) =>
                              this.props.handelServices(e, "commerce")
                            }
                            checked={this.props.freelancerServices.includes(
                              "commerce"
                            )}
                          />
                          <label
                            htmlFor='commerce'
                            className={styles.label + " cursor-pointer"}
                          >
                            Commerce
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='science'
                            onChange={(e) =>
                              this.props.handelServices(e, "science")
                            }
                            checked={this.props.freelancerServices.includes(
                              "science"
                            )}
                          />
                          <label
                            htmlFor='science'
                            className={styles.label + " cursor-pointer"}
                          >
                            Science
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "vocalist" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='soprano'
                            onChange={(e) =>
                              this.props.handelServices(e, "soprano")
                            }
                            checked={this.props.freelancerServices.includes(
                              "soprano"
                            )}
                          />
                          <label
                            htmlFor='soprano'
                            className={styles.label + " cursor-pointer"}
                          >
                            Soprano
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='alto'
                            onChange={(e) =>
                              this.props.handelServices(e, "alto")
                            }
                            checked={this.props.freelancerServices.includes(
                              "alto"
                            )}
                          />
                          <label
                            htmlFor='alto'
                            className={styles.label + " cursor-pointer"}
                          >
                            Alto
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='tenor'
                            onChange={(e) =>
                              this.props.handelServices(e, "tenor")
                            }
                            checked={this.props.freelancerServices.includes(
                              "tenor"
                            )}
                          />
                          <label
                            htmlFor='tenor'
                            className={styles.label + " cursor-pointer"}
                          >
                            Tenor
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='bass'
                            onChange={(e) =>
                              this.props.handelServices(e, "bass")
                            }
                            checked={this.props.freelancerServices.includes(
                              "bass"
                            )}
                          />
                          <label
                            htmlFor='bass'
                            className={styles.label + " cursor-pointer"}
                          >
                            Bass
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='baritone'
                            onChange={(e) =>
                              this.props.handelServices(e, "baritone")
                            }
                            checked={this.props.freelancerServices.includes(
                              "baritone"
                            )}
                          />
                          <label
                            htmlFor='baritone'
                            className={styles.label + " cursor-pointer"}
                          >
                            Baritone
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='mezzo-soprano'
                            onChange={(e) =>
                              this.props.handelServices(e, "mezzo-soprano")
                            }
                            checked={this.props.freelancerServices.includes(
                              "mezzo-soprano"
                            )}
                          />
                          <label
                            htmlFor='mezzo-soprano'
                            className={styles.label + " cursor-pointer"}
                          >
                            Mezzo-soprano
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='countertenor'
                            onChange={(e) =>
                              this.props.handelServices(e, "countertenor")
                            }
                            checked={this.props.freelancerServices.includes(
                              "countertenor"
                            )}
                          />
                          <label
                            htmlFor='countertenor'
                            className={styles.label + " cursor-pointer"}
                          >
                            Countertenor
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "voice_over_artist" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='short_film'
                            onChange={(e) =>
                              this.props.handelServices(e, "short_film")
                            }
                            checked={this.props.freelancerServices.includes(
                              "short_film"
                            )}
                          />
                          <label
                            htmlFor='short_film'
                            className={styles.label + " cursor-pointer"}
                          >
                            Short Film
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='audio_podcast'
                            onChange={(e) =>
                              this.props.handelServices(e, "audio_podcast")
                            }
                            checked={this.props.freelancerServices.includes(
                              "audio_podcast"
                            )}
                          />
                          <label
                            htmlFor='audio_podcast'
                            className={styles.label + " cursor-pointer"}
                          >
                            Audio Podcast
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='film'
                            onChange={(e) =>
                              this.props.handelServices(e, "film")
                            }
                            checked={this.props.freelancerServices.includes(
                              "film"
                            )}
                          />
                          <label
                            htmlFor='film'
                            className={styles.label + " cursor-pointer"}
                          >
                            Film
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='animation_film'
                            onChange={(e) =>
                              this.props.handelServices(e, "animation_film")
                            }
                            checked={this.props.freelancerServices.includes(
                              "animation_film"
                            )}
                          />
                          <label
                            htmlFor='animation_film'
                            className={styles.label + " cursor-pointer"}
                          >
                            Animation Film
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='advertising'
                            onChange={(e) =>
                              this.props.handelServices(e, "advertisement")
                            }
                            checked={this.props.freelancerServices.includes(
                              "advertisement"
                            )}
                          />
                          <label
                            htmlFor='advertising'
                            className={styles.label + " cursor-pointer"}
                          >
                            Advertising
                          </label>
                        </div>
                      </>
                    )}
                    {this.props.profession === "web_developer" && (
                      <>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wordpress'
                            onChange={(e) =>
                              this.props.handelServices(e, "wordpress")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wordpress"
                            )}
                          />
                          <label
                            htmlFor='wordpress'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wordpress
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='wix'
                            onChange={(e) =>
                              this.props.handelServices(e, "wix")
                            }
                            checked={this.props.freelancerServices.includes(
                              "wix"
                            )}
                          />
                          <label
                            htmlFor='wix'
                            className={styles.label + " cursor-pointer"}
                          >
                            Wix
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='squarespace'
                            onChange={(e) =>
                              this.props.handelServices(e, "squarespace")
                            }
                            checked={this.props.freelancerServices.includes(
                              "squarespace"
                            )}
                          />
                          <label
                            htmlFor='squarespace'
                            className={styles.label + " cursor-pointer"}
                          >
                            Squarespace
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='weebly'
                            onChange={(e) =>
                              this.props.handelServices(e, "weebly")
                            }
                            checked={this.props.freelancerServices.includes(
                              "weebly"
                            )}
                          />
                          <label
                            htmlFor='weebly'
                            className={styles.label + " cursor-pointer"}
                          >
                            Weebly
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='shopify'
                            onChange={(e) =>
                              this.props.handelServices(e, "shopify")
                            }
                            checked={this.props.freelancerServices.includes(
                              "shopify"
                            )}
                          />
                          <label
                            htmlFor='shopify'
                            className={styles.label + " cursor-pointer"}
                          >
                            Shopify
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='webflow'
                            onChange={(e) =>
                              this.props.handelServices(e, "webflow")
                            }
                            checked={this.props.freelancerServices.includes(
                              "webflow"
                            )}
                          />
                          <label
                            htmlFor='webflow'
                            className={styles.label + " cursor-pointer"}
                          >
                            Webflow
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='elementor'
                            onChange={(e) =>
                              this.props.handelServices(e, "elementor")
                            }
                            checked={this.props.freelancerServices.includes(
                              "elementor"
                            )}
                          />
                          <label
                            htmlFor='elementor'
                            className={styles.label + " cursor-pointer"}
                          >
                            Elementor
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='jimdo'
                            onChange={(e) =>
                              this.props.handelServices(e, "jimdo")
                            }
                            checked={this.props.freelancerServices.includes(
                              "jimdo"
                            )}
                          />
                          <label
                            htmlFor='jimdo'
                            className={styles.label + " cursor-pointer"}
                          >
                            Jimdo
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='mean'
                            onChange={(e) =>
                              this.props.handelServices(e, "mean")
                            }
                            checked={this.props.freelancerServices.includes(
                              "mean"
                            )}
                          />
                          <label
                            htmlFor='mean'
                            className={styles.label + " cursor-pointer"}
                          >
                            MEAN
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='mern'
                            onChange={(e) =>
                              this.props.handelServices(e, "mern")
                            }
                            checked={this.props.freelancerServices.includes(
                              "mern"
                            )}
                          />
                          <label
                            htmlFor='mern'
                            className={styles.label + " cursor-pointer"}
                          >
                            MERN
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='mevn'
                            onChange={(e) =>
                              this.props.handelServices(e, "mevn")
                            }
                            checked={this.props.freelancerServices.includes(
                              "mevn"
                            )}
                          />
                          <label
                            htmlFor='mevn'
                            className={styles.label + " cursor-pointer"}
                          >
                            MEVN
                          </label>
                        </div>
                        <div className={styles.inputs + " snap-center"}>
                          <input
                            type='checkbox'
                            className={styles.checkbox}
                            name=''
                            id='static'
                            onChange={(e) =>
                              this.props.handelServices(e, "static")
                            }
                            checked={this.props.freelancerServices.includes(
                              "static"
                            )}
                          />
                          <label
                            htmlFor='static'
                            className={styles.label + " cursor-pointer"}
                          >
                            Static
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <hr className={styles.divider} />
            </>
          )}

          <div className={styles.filter} id={styles.price}>
            <div className={styles.title}>Price</div>
            <span className={styles.rate}>Rs. {this.props.rateSort}</span>
            <input
              type='range'
              min='500'
              max='50000'
              step='100'
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
                    type='checkbox'
                    id='star4'
                    onChange={(e) => {
                      this.props.setFourStars(e.target.checked);
                      this.props.setCurrentPage(1);
                    }}
                    checked={this.props.fourStars}
                  />
                  <label
                    id={styles.labelid}
                    className={styles.label}
                    htmlFor='star4'
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
                    type='checkbox'
                    id='star3'
                    onChange={(e) => {
                      this.props.setThreeStars(e.target.checked);
                      this.props.setCurrentPage(1);
                    }}
                    checked={this.props.threeStars}
                  />
                  <label
                    id={styles.labelid}
                    className={styles.label}
                    htmlFor='star3'
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
                  id='locations'
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
                  <option disabled value='city' id={styles.selected}>
                    {this.state.cityname}
                  </option>
                  <option value='Agra'>Agra</option>
                  <option value='Ahmedabad'>Ahmedabad</option>
                  <option value='Amritsar'>Amritsar</option>
                  <option value='Aurangabad'>Aurangabad</option>
                  <option value='Bengaluru'>Bengaluru</option>
                  <option value='Bhopal'>Bhopal</option>
                  <option value='Bhubaneswar'>Bhubaneswar</option>
                  <option value='Burdwan'>Burdwan</option>
                  <option value='Chandigarh'>Chandigarh</option>
                  <option value='Chennai'>Chennai</option>
                  <option value='Coimbatore'>Coimbatore</option>
                  <option value='Dehradun'>Dehradun</option>
                  <option value='Delhi'>Delhi</option>
                  <option value='Dhanbad'>Dhanbad</option>
                  <option value='Durgapur'>Durgapur</option>
                  <option value='Faridabad'>Faridabad</option>
                  <option value='Ghaziabad'>Ghaziabad</option>
                  <option value='Guwahati'>Guwahati</option>
                  <option value='Gwalior'>Gwalior</option>
                  <option value='Hyderabad'>Hyderabad</option>
                  <option value='Indore'>Indore</option>
                  <option value='Jaipur'>Jaipur</option>
                  <option value='Jamshedpur'>Jamshedpur</option>
                  <option value='Jodhpur'>Jodhpur</option>
                  <option value='Kanpur'>Kanpur</option>
                  <option value='Kochi'>Kochi</option>
                  <option value='Kolkata'>Kolkata</option>
                  <option value='Lucknow'>Lucknow</option>
                  <option value='Ludhiana'>Ludhiana</option>
                  <option value='Madurai'>Madurai</option>
                  <option value='Mangaluru'>Mangaluru</option>
                  <option value='Meerut'>Meerut</option>
                  <option value='Mumbai'>Mumbai</option>
                  <option value='Mysuru'>Mysuru</option>
                  <option value='Nagpur'>Nagpur</option>
                  <option value='Nashik'>Nashik</option>
                  <option value='New_Delhi'>New Delhi</option>
                  <option value='Navi_Mumbai'>Navi Mumbai</option>
                  <option value='Patna'>Patna</option>
                  <option value='Prayagraj'>Prayagraj</option>
                  <option value='Puducherry'>Puducherry</option>
                  <option value='Pune'>Pune</option>
                  <option value='Raipur'>Raipur</option>
                  <option value='Rajkot'>Rajkot</option>
                  <option value='Ranchi'>Ranchi</option>
                  <option value='Siliguri'>Siliguri</option>
                  <option value='Surat'>Surat</option>
                  <option value='Thane'>Thane</option>
                  <option value='Thiruvananthapuram'>Thiruvananthapuram</option>
                  <option value='Udaipur'>Udaipur</option>
                  <option value='Vadodara'>Vadodara</option>
                  <option value='Varanasi'>Varanasi</option>
                  <option value='Vijayawada'>Vijayawada</option>
                  <option value='Visakhapatnam'>Visakhapatnam</option>
                  <option value='Warangal'>Warangal</option>
                </select>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
);
