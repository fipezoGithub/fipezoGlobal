import styles from "../styles/Header.module.css";
import SearchBar from "../components/SearchBar";
import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: ["Photographer", "Model", "Anchor", "Dancer", "DJ", "Influencer"],
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
    }, 2000);
  }

  render() {
    const { texts, index } = this.state;
    const currentText = texts[index];

    return (
      <div
        className={styles.header}
        // style={{
        //   backgroundImage: `url(${
        //     this.state.backgroundImages[Math.floor(Math.random() * 3)]
        //   })`,
        // }}
      >
        <div className={styles.headingText}>
          Hire Freelance{" "}
          <span className={styles.AnimationText}>{currentText}</span> Anywhere.
        </div>
        <SearchBar border={false} />
      </div>
    );
  }
}

export default Header;
