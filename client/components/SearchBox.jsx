import React from "react";
import Router from "next/router";
import { RiStore2Line } from "react-icons/ri";
import { GoLocation } from "react-icons/go";

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
      cityname: "New Delhi",
    };
  }

  componentDidMount() {
    const city = localStorage.getItem("city");
    if (city) this.setState({ cityname: city });
    else localStorage.setItem("city", "New Delhi");
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
      <div className="flex flex-col lg:flex-row my-4 bg-white lg:bg-inherit px-2 lg:px-0 py-2 lg:py-0 z-[900] shadow-md lg:shadow-none border-b lg:border-b-0 rounded-md lg:rounded-none gap-3 lg:gap-0">
        <div className="relative flex flex-col items-start">
          <div className="flex items-center bg-white px-2 lg:rounded-l-md border lg:border-0 rounded-md lg:rounded-none">
            <RiStore2Line color="#000000" />
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
              className="py-4 px-2 focus:outline-none lg:border-r placeholder:text-black"
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
          <div className="flex items-center bg-white border lg:border-0 rounded-md lg:rounded-none px-2 lg:px-0">
            <GoLocation color="#000000" />
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
              className="py-4 px-2 focus:outline-none placeholder:text-black"
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
        <div className="rounded-r-md">
          <button
            type="button"
            onClick={this.handleSearch}
            className="bg-blue-600 text-white py-2 lg:py-4 px-2 capitalize font-semibold w-full lg:w-auto rounded-md lg:rounded-none lg:rounded-r-md"
          >
            find freelancer &gt;
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBox;
