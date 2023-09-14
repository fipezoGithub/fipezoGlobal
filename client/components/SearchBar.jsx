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

  render() {
    return (
      <div>
        <div className={styles.searchMain}>
          <div className={styles.location}>
            <IoLocationSharp
              className={styles.locationIcon}
              style={{ color: "red" }}
            />{" "}
            <span id={styles.span} onClick={this.toggle} className="cursor-pointer">
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
              <p
                className={styles.p}
                onClick={() => this.changeCity("Amritsar")}
              >
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
              <p
                className={styles.p}
                onClick={() => this.changeCity("Chandigarh")}
              >
                Chandigarh
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Chennai")}
              >
                Chennai
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Coimbatore")}
              >
                Coimbatore
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Dehradun")}
              >
                Dehradun
              </p>
              <p className={styles.p} onClick={() => this.changeCity("Delhi")}>
                Delhi
              </p>
              <p className={styles.p} onClick={() => this.changeCity("Dhanbad")}>Dhanbad</p>
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
              <p
                className={styles.p}
                onClick={() => this.changeCity("Guwahati")}
              >
                Guwahati
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Gwalior")}
              >
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
              <p
                className={styles.p}
                onClick={() => this.changeCity("Jodhpur")}
              >
                Jodhpur
              </p>
              <p className={styles.p} onClick={() => this.changeCity("Kanpur")}>
                Kanpur
              </p>
              <p className={styles.p} onClick={() => this.changeCity("Kochi")}>
                Kochi
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Kolkata")}
              >
                Kolkata
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Ludhiana")}
              >
                Ludhiana
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Lucknow")}
              >
                Lucknow
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Madurai")}
              >
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
              <p
                className={styles.p}
                onClick={() => this.changeCity("Udaipur")}
              >
                Udaipur
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Vadodara")}
              >
                Vadodara
              </p>
              <p
                className={styles.p}
                onClick={() => this.changeCity("Varanasi")}
              >
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
              <p
                className={styles.p}
                onClick={() => this.changeCity("Warangal")}
              >
                Warangal
              </p>
            </div>
          </div>
          <SearchBox border={this.props.border} />
        </div>
        {/* <div className={styles.suggestions}>
          <Link className={styles.link} href='/photographer'>Photographer, </Link> &nbsp;
          <Link className={styles.link} href='/cinematographer'>Cinematographer, </Link> &nbsp;
          <Link className={styles.link} href='/droneOperator'>Drone Operator</Link>
        </div> */}
      </div>
    );
  }
}

export default SearchBar;
