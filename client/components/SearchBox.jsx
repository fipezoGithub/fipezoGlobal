import React from "react";
import Router from "next/router";
import { RiStore2Line } from "react-icons/ri";
import { GoLocation } from "react-icons/go";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freelancerCategory: "",
      isInputFocused: false,
      options: [
        "Photographer",
        "Video Editor",
        "Album Designer",
        "Photo Editor",
        "Cinematographer",
        "Drone Operator",
        "Model",
        "Makeup Artist",
        "Anchor",
        "Web Developer",
        "DJ",
        "Dancer",
        "Influencer",
        "Graphics Designer",
        "Mehendi Artist",
      ],
      city: [
        "Agra",
        "Ahmedabad",
        "Amritsar",
        "Aurangabad",
        "Bengaluru",
        "Bhopal",
        "Bhubaneswar",
        "Burdwan",
        "Chandigarh",
        "Chennai",
        "Coimbatore",
        "Dehradun",
        "Delhi",
        "Dhanbad",
        "Durgapur",
        "Faridabad",
        "Ghaziabad",
        "Guwahati",
        "Gwalior",
        "Hyderabad",
        "Indore",
        "Jaipur",
        "Jamshedpur",
        "Jodhpur",
        "Kanpur",
        "Kochi",
        "Kolkata",
        "Lucknow",
        "Ludhiana",
        "Madurai",
        "Mangaluru",
        "Meerut",
        "Mumbai",
        "Mysuru",
        "Nagpur",
        "Nashik",
        "New Delhi",
        "Navi Mumbai",
        "Patna",
        "Prayagraj",
        "Puducherry",
        "Pune",
        "Raipur",
        "Rajkot",
        "Ranchi",
        "Siliguri",
        "Surat",
        "Thane",
        "Thiruvananthapuram",
        "Udaipur",
        "Vadodara",
        "Varanasi",
        "Vijayawada",
        "Visakhapatnam",
        "Warangal",
      ],
      cityTerm: "",
      searchTerm: "",
      searchValue: "",
      showDropDownCategory: false,
      showDropDownCity: false,
      isInputFocused: false,
      cityname: "New Delhi",
    };
  }

  componentDidMount() {
    const city = localStorage.getItem("city");
    if (city) this.setState({ cityname: city });
    else localStorage.setItem("city", "New Delhi");
  }

  toggle = () => {
    this.setState((prevState) => ({
      showDropDown: !prevState.showDropDown,
    }));
  };

  changeCity = (city) => {
    this.setState({ cityname: city });
    this.toggle();
    localStorage.setItem("city", city);
  };

  setSearchTerm = (term) => {
    this.setState({ searchTerm: term });
  };

  handleInputClick = (event) => {
    event.stopPropagation();
    this.setState({ isInputFocused: !this.state.isInputFocused });
  };

  handleSearch = (event) => {
    // this.setState({ isInputFocused: true });
    // this.setSearchTerm(event.target.value);
    localStorage.setItem("city", this.state.cityTerm);
    Router.push(`/explore/freelancers/${this.state.searchValue}`);
  };

  handleKeyDown = (event) => {
    const { options, searchTerm } = this.state;
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (
      event.key === "Enter" &&
      filteredOptions.length > 0 &&
      searchTerm !== ""
    ) {
      event.preventDefault();
      let value = filteredOptions[0];
      if (value === "Photographer") value = "photographer";
      else if (value === "Cinematographer") value = "cinematographer";
      else if (value === "Drone Operator") value = "drone_operator";
      else if (value === "Photo Editor") value = "photo_editor";
      else if (value === "Video Editor") value = "video_editor";
      else if (value === "Album Designer") value = "album_designer";
      else if (value === "Model") value = "model";
      else if (value === "Makeup Artist") value = "makeup_artist";
      else if (value === "Mehendi Artist") value = "mehendi_artist";
      else if (value === "Anchor") value = "anchor";
      else if (value === "Web Developer") value = "web_developer";
      else if (value === "DJ") value = "dj";
      else if (value === "Dancer") value = "dancer";
      else if (value === "Influencer") value = "influencer";
      else if (value === "Graphics Designer") value = "graphics_designer";
      Router.push(`/explore/freelancers/${value}`);
    }
  };

  handleSearchBtn = () => {
    const { options, searchTerm } = this.state;
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredOptions.length > 0 && searchTerm !== "") {
      let value = filteredOptions[0];
      if (value === "Photographer") value = "photographer";
      else if (value === "Cinematographer") value = "cinematographer";
      else if (value === "Drone Operator") value = "drone_operator";
      else if (value === "Photo Editor") value = "photo_editor";
      else if (value === "Video Editor") value = "video_editor";
      else if (value === "Album Designer") value = "album_designer";
      else if (value === "Model") value = "model";
      else if (value === "Makeup Artist") value = "makeup_artist";
      else if (value === "Mehendi Artist") value = "mehendi_artist";
      else if (value === "Anchor") value = "anchor";
      else if (value === "Web Developer") value = "web_developer";
      else if (value === "DJ") value = "dj";
      else if (value === "Dancer") value = "dancer";
      else if (value === "Influencer") value = "influencer";
      else if (value === "Graphics Designer") value = "graphics_designer";
      Router.push(`/explore/freelancers/${value}`);
    }
  };

  render() {
    const {
      options,
      searchTerm,
      city,
      cityTerm,
      showDropDownCategory,
      showDropDownCity,
    } = this.state;
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredCity = city.filter((option) =>
      option.toLowerCase().includes(cityTerm.toLowerCase())
    );

    return (
      <div className="flex flex-col lg:flex-row my-4 bg-white lg:bg-inherit px-2 lg:px-0 py-2 lg:py-0">
        {/* <div
          className={styles.searchBox}
          style={{ border: this.props.border ? "1px solid lightgray" : "none" }}
        >
          <button className={styles.searchIcon} onClick={this.handleSearchBtn}>
            <IoSearch
              style={{ fontSize: "1.25rem", color: "white" }}
              aria-label="Search"
            />
          </button>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for freelancers"
            onClick={(event) => this.handleInputClick(event)}
            onChange={this.handleSearch}
            value={searchTerm}
            onKeyDown={this.handleKeyDown}
          />
          {isInputFocused && (
            <div className={styles.searchNames}>
              <ul className={styles.names}>
                {filteredOptions.length > 0 ? (
                  window.innerWidth > 640 ? (
                    filteredOptions.slice(0, 5).map((option, index) => {
                      let value = option;
                      if (value === "Photographer") value = "photographer";
                      else if (value === "Cinematographer")
                        value = "cinematographer";
                      else if (value === "Drone Operator")
                        value = "drone_operator";
                      else if (value === "Photo Editor") value = "photo_editor";
                      else if (value === "Video Editor") value = "video_editor";
                      else if (value === "Album Designer")
                        value = "album_designer";
                      else if (value === "Model") value = "model";
                      else if (value === "Makeup Artist")
                        value = "makeup_artist";
                      else if (value === "Mehendi Artist")
                        value = "mehendi_artist";
                      else if (value === "Anchor") value = "anchor";
                      else if (value === "Web Developer")
                        value = "web_developer";
                      else if (value === "DJ") value = "dj";
                      else if (value === "Dancer") value = "dancer";
                      else if (value === "Influencer") value = "influencer";
                      else if (value === "Graphics Designer")
                        value = "graphics_designer";
                      return (
                        <Link
                          href={`/explore/freelancers/${value}`}
                          className={styles.name}
                          key={index}
                        >
                          {option}
                        </Link>
                      );
                    })
                  ) : (
                    filteredOptions.slice(0, 3).map((option, index) => {
                      let value = option;
                      if (value === "Photographer") value = "photographer";
                      else if (value === "Cinematographer")
                        value = "cinematographer";
                      else if (value === "Drone Operator")
                        value = "drone_operator";
                      else if (value === "Photo Editor") value = "photo_editor";
                      else if (value === "Video Editor") value = "video_editor";
                      else if (value === "Album Designer")
                        value = "album_designer";
                      else if (value === "Model") value = "model";
                      else if (value === "Makeup Artist")
                        value = "makeup_artist";
                      else if (value === "Mehendi Artist")
                        value = "mehendi_artist";
                      else if (value === "Anchor") value = "anchor";
                      else if (value === "Web Developer")
                        value = "web_developer";
                      else if (value === "DJ") value = "dj";
                      else if (value === "Dancer") value = "dancer";
                      else if (value === "Influencer") value = "influencer";
                      else if (value === "Graphics Designer")
                        value = "graphics_designer";
                      return (
                        <Link
                          href={`/explore/freelancers/${value}`}
                          className={styles.name}
                          key={index}
                        >
                          {option}
                        </Link>
                      );
                    })
                  )
                ) : (
                  <li className={styles.name}>No results found</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.location}>
          <IoLocationSharp
            className={styles.locationIcon}
            style={{ color: "red" }}
          />{" "}
          <span
            id={styles.span}
            onClick={this.toggle}
            className="cursor-pointer"
          >
            {this.state.cityname}
          </span>
          <IoIosArrowDown className={styles.arrow} onClick={this.toggle} />
          <div
            className={styles.dropDown}
            style={{ display: this.state.showDropDown ? "block" : "none" }}
          >
            <p className={styles.p} onClick={() => this.changeCity("Agra")}>
              Agra
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Ahmedabad")}
            >
              Ahmedabad
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Amritsar")}>
              Amritsar
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Aurangabad")}
            >
              Aurangabad
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Bengaluru")}
            >
              Bengaluru
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Bhopal")}>
              Bhopal
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Bhubaneswar")}
            >
              Bhubaneswar
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Burdwan")}>
              Burdwan
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Chandigarh")}
            >
              Chandigarh
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Chennai")}>
              Chennai
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Coimbatore")}
            >
              Coimbatore
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Dehradun")}>
              Dehradun
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Delhi")}>
              Delhi
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Dhanbad")}>
              Dhanbad
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Durgapur")}>
              Durgapur
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Faridabad")}
            >
              Faridabad
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Ghaziabad")}
            >
              Ghaziabad
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Guwahati")}>
              Guwahati
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Gwalior")}>
              Gwalior
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Hyderabad")}
            >
              Hyderabad
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Indore")}>
              Indore
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Jaipur")}>
              Jaipur
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Jamshedpur")}
            >
              Jamshedpur
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Jodhpur")}>
              Jodhpur
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Kanpur")}>
              Kanpur
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Kochi")}>
              Kochi
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Kolkata")}>
              Kolkata
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Ludhiana")}>
              Ludhiana
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Lucknow")}>
              Lucknow
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Madurai")}>
              Madurai
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Mangaluru")}
            >
              Mangaluru
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Meerut")}>
              Meerut
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Mumbai")}>
              Mumbai
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Mysuru")}>
              Mysuru
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Nagpur")}>
              Nagpur
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Nashik")}>
              Nashik
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Navi Mumbai")}
            >
              Navi Mumbai
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("New Delhi")}
            >
              New Delhi
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Patna")}>
              Patna
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Prayagraj")}
            >
              Prayagraj
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Puducherry")}
            >
              Puducherry
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Pune")}>
              Pune
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Raipur")}>
              Raipur
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Rajkot")}>
              Rajkot
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Ranchi")}>
              Ranchi
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Siliguri")}>
              Siliguri
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Surat")}>
              Surat
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Thane")}>
              Thane
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Thiruvananthapuram")}
            >
              Thiruvananthapuram
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Udaipur")}>
              Udaipur
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Vadodara")}>
              Vadodara
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Varanasi")}>
              Varanasi
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Vijayawada")}
            >
              Vijayawada
            </p>
            <p
              className={styles.p}
              onClick={() => this.changeCity("Visakhapatnam")}
            >
              Visakhapatnam
            </p>
            <p className={styles.p} onClick={() => this.changeCity("Warangal")}>
              Warangal
            </p>
          </div>
        </div> */}
        <div className="relative flex flex-col items-start">
          <div className="flex items-center bg-white px-2">
            <RiStore2Line color="#adaeb5" />
            <input
              type="text"
              name=""
              value={this.state.searchTerm}
              onClick={() =>
                this.setState({
                  showDropDownCategory: !this.state.showDropDownCategory,
                })
              }
              onChange={(e) => this.setState({ searchTerm: e.target.value })}
              id="freelancer_category"
              placeholder="Enter freelancer category"
              className="py-4 px-2 focus:outline-none border-r"
            />
          </div>
          {showDropDownCategory === true && (
            <div className="bg-white w-full z-[1100] h-40 overflow-hidden overflow-y-scroll">
              {filteredOptions.length > 0 &&
                filteredOptions.map((option, index) => {
                  let value = option;
                  if (value === "Photographer") value = "photographer";
                  else if (value === "Cinematographer")
                    value = "cinematographer";
                  else if (value === "Drone Operator") value = "drone_operator";
                  else if (value === "Photo Editor") value = "photo_editor";
                  else if (value === "Video Editor") value = "video_editor";
                  else if (value === "Album Designer") value = "album_designer";
                  else if (value === "Model") value = "model";
                  else if (value === "Makeup Artist") value = "makeup_artist";
                  else if (value === "Mehendi Artist") value = "mehendi_artist";
                  else if (value === "Anchor") value = "anchor";
                  else if (value === "Web Developer") value = "web_developer";
                  else if (value === "DJ") value = "dj";
                  else if (value === "Dancer") value = "dancer";
                  else if (value === "Influencer") value = "influencer";
                  else if (value === "Graphics Designer")
                    value = "graphics_designer";
                  return (
                    <p
                      onClick={() => {
                        this.setState({ searchTerm: option });
                        this.setState({ searchValue: value });
                        this.setState({ showDropDownCategory: false });
                      }}
                      className="text-left p-2 cursor-pointer"
                      key={index}
                    >
                      {option}
                    </p>
                  );
                })}
            </div>
          )}
        </div>
        <div className="relative group">
          <div className="flex items-center bg-white">
            <GoLocation color="#adaeb5" />
            <input
              type="text"
              name=""
              id=""
              value={this.state.cityTerm}
              onChange={(e) => this.setState({ cityTerm: e.target.value })}
              onClick={() =>
                this.setState({
                  showDropDownCity: !this.state.showDropDownCity,
                })
              }
              placeholder="Select city"
              className="py-4 px-2 focus:outline-none"
            />
          </div>
          {showDropDownCity === true && (
            <div className="bg-white w-full z-[1100] relative h-40 overflow-hidden overflow-y-scroll">
              {filteredCity.length > 0 &&
                filteredCity.map((option, index) => {
                  return (
                    <p
                      onClick={() => {
                        this.setState({ cityTerm: option });
                        this.setState({ showDropDownCity: false });
                      }}
                      className="cursor-pointer text-left p-2"
                      key={index}
                    >
                      {option}
                    </p>
                  );
                })}
            </div>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={this.handleSearch}
            className="bg-blue-600 text-white py-2 lg:py-4 px-2 capitalize font-medium w-full lg:w-auto rounded-md lg:rounded-none"
          >
            find freelancer
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBox;
