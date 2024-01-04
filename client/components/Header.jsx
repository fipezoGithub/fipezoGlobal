import styles from "../styles/Header.module.css";
import React from "react";
import SearchBox from "./SearchBox";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: [
        "Photographer",
        "Model",
        "Anchor",
        "Dancer",
        "DJ",
        "Influencer",
        "Lyricist",
        "Musician",
        "Painter",
        "Vocalist",
        "Actor",
        "Actress",
        "Babysitter",
        "Maid",
      ],
      backgroundImages: [
        "/photographer-header.png",
        "/web-developer-header.png",
        "/model-header.png",
      ],
      index: 0,
    };
  }
  componentDidMount() {
    setInterval(() => {
      const newIndex = (this.state.index + 1) % this.state.texts.length;
      this.setState({ index: newIndex });
    }, 4000);
  }

  render() {
    const { texts, index } = this.state;
    const currentText = texts[index];

    return (
      <div className={styles.header}>
        <div className={styles.headingText + " montserrat"}>
          Hire Freelance{" "}
          <span className={styles.AnimationText}>{currentText}</span> Nearby.
        </div>
        <SearchBox border={false} />
      </div>
    );
  }
}

export default Header;
