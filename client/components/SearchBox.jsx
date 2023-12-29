import React from "react";
import Router from "next/router";
import { RiStore2Line } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        "Private Tutor",
        "Dance Teacher",
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
        "New_Delhi",
        "Navi_Mumbai",
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
      cityname: "New_Delhi",
    };
  }

  componentDidMount() {
    const city = localStorage.getItem("city");
    if (city) this.setState({ cityname: city });
    else localStorage.setItem("city", "New_Delhi");
  }

  setSearchTerm = (term) => {
    this.setState({ searchTerm: term });
  };

  handleSearch = (event) => {
    localStorage.setItem("city", this.state.cityTerm);
    Router.push(`/explore/freelancers/${this.state.searchValue}`);
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
      <div className="flex flex-col md:flex-row my-4 bg-white md:bg-inherit px-2 md:px-0 py-2 md:py-0 z-[100] shadow-md md:shadow-none border-b md:border-b-0 rounded-md md:rounded-none gap-3 md:gap-0">
        <div className="relative flex flex-col items-start">
          <div
            className="flex items-center bg-white px-2 md:px-4 md:rounded-l-md border md:border-r md:border-0 rounded-md md:rounded-none w-full md:w-auto"
            onClick={() => {
              this.setState({ searchTerm: "" });
              this.setState({
                showDropDownCategory: !this.state.showDropDownCategory,
              });
              this.setState({ showDropDownCity: false });
            }}
          >
            <RiStore2Line color="#bebebe" size={"1.5em"} />
            <input
              type="text"
              name=""
              value={this.state.searchTerm}
              onChange={(e) => {
                this.setState({ searchTerm: e.target.value });
                if (e.target.value.length > 0) {
                  this.setState({ showDropDownCategory: true });
                }
              }}
              id="freelancer_category"
              placeholder="Enter freelancer category"
              className="py-4 px-2 focus:outline-none placeholder:text-black"
            />
            <input type="text" disabled className="hidden lg:block w-20" />
            <IoIosArrowDown color="#bebebe" size={"1.5em"} />
          </div>
          {showDropDownCategory === true && (
            <div className="bg-white w-full z-[1100] h-80 overflow-hidden overflow-y-scroll">
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
                  else if (value === "Private Tutor") value = "private_tutor";
                  else if (value === "Dance Teacher") value = "dance_teacher";
                  else if (value === "Graphics Designer")
                    value = "graphics_designer";
                  return (
                    <p
                      onClick={() => {
                        this.setState({ searchTerm: option });
                        this.setState({ searchValue: value });
                        this.setState({ showDropDownCategory: false });
                        if (this.state.cityTerm.length === 0) {
                          this.setState({ showDropDownCity: true });
                        }
                      }}
                      className="text-left p-2 cursor-pointer flex items-center gap-2 hover:bg-blue-100"
                      key={index}
                    >
                      <RiStore2Line color="#bebebe" />
                      {option}
                    </p>
                  );
                })}
            </div>
          )}
        </div>
        <div className="relative group">
          <div className="flex items-center bg-white border md:border-0 rounded-md md:rounded-none px-4">
            <GoLocation color="#bebebe" size={"1.5em"} />
            <input
              type="text"
              name=""
              id=""
              value={this.state.cityTerm}
              onChange={(e) => {
                this.setState({ cityTerm: e.target.value });
                if (e.target.value.length > 0) {
                  this.setState({ showDropDownCity: true });
                }
              }}
              onClick={() => {
                this.setState({ cityTerm: "" });
                this.setState({
                  showDropDownCity: !this.state.showDropDownCity,
                });
                this.setState({ showDropDownCategory: false });
              }}
              placeholder="Select city"
              className="py-4 px-2 focus:outline-none placeholder:text-black"
            />
            <IoIosArrowDown color="#bebebe" size={"1.5em"} />
          </div>
          {showDropDownCity === true && (
            <div className="bg-white w-full z-[1100] relative h-80 overflow-hidden overflow-y-scroll">
              <span className="text-left block ml-2 mb-2 capitalize text-xs font-semibold text-neutral-500">
                major cities
              </span>
              {filteredCity.length > 0 &&
                filteredCity.map((option, index) => {
                  if (
                    option === "Bengaluru" ||
                    option === "Bhubaneswar" ||
                    option === "Chennai" ||
                    option === "Delhi" ||
                    option === "Hyderabad" ||
                    option === "Kolkata" ||
                    option === "Mumbai"
                  ) {
                    return (
                      <p
                        onClick={() => {
                          this.setState({ cityTerm: option });
                          this.setState({ showDropDownCity: false });
                        }}
                        className="cursor-pointer text-left p-2 flex items-center gap-2 hover:bg-blue-100"
                        key={index}
                      >
                        <GoLocation color="#bebebe" />
                        {option}
                      </p>
                    );
                  }
                })}
              <span className="text-left block ml-2 mb-2 capitalize text-xs font-semibold text-neutral-500">
                other cities
              </span>
              {filteredCity.length > 0 &&
                filteredCity.map((option, index) => {
                  if (
                    option !== "Bengaluru" &&
                    option !== "Bhubaneswar" &&
                    option !== "Chennai" &&
                    option !== "Delhi" &&
                    option !== "Hyderabad" &&
                    option !== "Kolkata" &&
                    option !== "Mumbai"
                  ) {
                    return (
                      <p
                        onClick={() => {
                          this.setState({ cityTerm: option });
                          this.setState({ showDropDownCity: false });
                        }}
                        className="cursor-pointer text-left p-2 flex items-center gap-2 hover:bg-blue-100"
                        key={index}
                      >
                        <GoLocation color="#bebebe" />
                        {option}
                      </p>
                    );
                  }
                })}
            </div>
          )}
        </div>
        <div className="rounded-r-md">
          <button
            type="button"
            onClick={this.handleSearch}
            className="bg-blue-600 text-white py-2 md:py-4 px-8 md:px-4 capitalize font-semibold w-full md:w-auto rounded-md md:rounded-none md:rounded-r-md flex items-center text-base gap-2 justify-center md:justify-normal"
          >
            find freelancer
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBox;
