import styles from "../styles/SearchBox.module.css";
import { IoSearch } from "react-icons/io5";
import React from "react";
import Link from "next/link";
import Router from "next/router";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ],
      searchTerm: "",
    };
  }

  setSearchTerm = (term) => {
    this.setState({ searchTerm: term });
  };

  handleInputClick = (event) => {
    event.stopPropagation();
    this.setState({ isInputFocused: !this.state.isInputFocused });
  };

  handleSearch = (event) => {
    this.setState({ isInputFocused: true });
    this.setSearchTerm(event.target.value);
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
      else if (value === "Anchor") value = "anchor";
      else if (value === "Web Developer") value = "web_developer";
      else if (value === "DJ") value = "dj";
      else if (value === "Dancer") value = "dancer";
      else if (value === "Influencer") value = "influencer";
      Router.push(`/explore/freelancer/${value}`);
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
      else if (value === "Anchor") value = "anchor";
      else if (value === "Web Developer") value = "web_developer";
      else if (value === "DJ") value = "dj";
      else if (value === "Dancer") value = "dancer";
      else if (value === "Influencer") value = "influencer";
      Router.push(`/explore/freelancer/${value}`);
    }
  };

  render() {
    const { options, searchTerm, isInputFocused } = this.state;
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div
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
                    else if (value === "Makeup Artist") value = "makeup_artist";
                    else if (value === "Anchor") value = "anchor";
                    else if (value === "Web Developer") value = "web_developer";
                    else if (value === "DJ") value = "dj";
                    else if (value === "Dancer") value = "dancer";
                    else if (value === "Influencer") value = "influencer";
                    return (
                      <Link
                        href={`/explore/freelancer/${value}`}
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
                    else if (value === "Makeup Artist") value = "makeup_artist";
                    else if (value === "Anchor") value = "anchor";
                    else if (value === "Web Developer") value = "web_developer";
                    else if (value === "DJ") value = "dj";
                    else if (value === "Dancer") value = "dancer";
                    else if (value === "Influencer") value = "influencer";
                    return (
                      <Link
                        href={`/explore/freelancer/${value}`}
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
    );
  }
}

export default SearchBox;
