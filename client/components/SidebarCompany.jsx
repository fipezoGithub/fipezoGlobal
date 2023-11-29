import styles from "../styles/Sidebar.module.css";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";

class SidebarCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: true,
      showDropDownSearch: true,
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
    const response = await fetch(`${process.env.SERVER_URL}/company/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: search }),
    });
    const data = await response.json();
    this.props.setCompanies(data);
    this.props.setCurrentPage(1);
  };
  render() {
    return (
      <div className={styles.sidebar}>
        <div
          className="flex flex-col snap-y py-4 overflow-hidden overflow-y-scroll justify-start"
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
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowAdvertisingAgency(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="advertising_agency"
                  checked={this.props.showAdvertisingAgency}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="advertising_agency"
                >
                  Advertising Agency
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  id="eCommerce"
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowECommerce(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  checked={this.props.showECommerce}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="eCommerce"
                >
                  ECommerce
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowPhotography(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="photography"
                  checked={this.props.showphotography}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="photography"
                >
                  Photography
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowPhotographyInstitute(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="photography_institute"
                  checked={this.props.showPhotographyInstitute}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="photography_institute"
                >
                  Photography Institute
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowProductionHouse(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="productionHouse"
                  checked={this.props.showProductionHouse}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="productionHouse"
                >
                  Production House
                </label>
              </div>
              <div className={styles.inputs + " snap-center"}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={(e) => {
                    this.props.setShowOther(e.target.checked);
                    this.props.setCurrentPage(1);
                  }}
                  id="other"
                  checked={this.props.showOther}
                />
                <label
                  className={styles.label + " cursor-pointer"}
                  htmlFor="other"
                >
                  Other
                </label>
              </div>
            </div>
          )}
        </div>

        <hr className={styles.divider} />

        <div className={styles.filter}>
          <div className={styles.title}>
            Search Company{" "}
            <MdKeyboardArrowDown
              style={{ fontSize: "20" }}
              onClick={this.toggleSearch}
              className={styles.arrow}
            />
          </div>
          {this.state.showDropDownSearch && (
            <div>
              <input
                type="search"
                placeholder="type company name here"
                className="p-2 placeholder:capitalize w-full focus:outline-none border border-solid text-xs sm:text-base"
                value={this.props.searchQuery}
                onChange={(e) => {
                  this.props.setSearchQuery(e.target.value);
                  this.handleSearch(e.target.value);
                }}
              />
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
                onChange={() =>
                  this.changeCity(document.getElementById("locations").value)
                }
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

export default SidebarCompany;
