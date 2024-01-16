import styles from "../styles/SearchBar.module.css";
import SearchBox from "../components/SearchBox";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
      isInputFocused: false,
      cityname: "New_Delhi",
    };
  }

  componentDidMount() {
    const city = localStorage.getItem("city");
    if (city) this.setState({ cityname: city });
    else localStorage.setItem("city", "New_Delhi");
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

  render() {
    return (
      <div>
        <div className={styles.searchMain}>
          <SearchBox border={this.props.border} />
        </div>
      </div>
    );
  }
}

export default SearchBar;
