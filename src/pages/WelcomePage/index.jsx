import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { primaryBlue } from "../../styles";
import SearchBar from "./components/SearchBar";

const styles = {
  title: {
    color: "white",
    marginBottom: 20
  },
  subheading: {
    color: "white"
  },
  footer: {
    color: "lightgray",
    position: "absolute",
    bottom: "0%",
    right: "0%",
    whiteSpace: "nowrap",
    fontStyle: "italic"
  }
};
class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerHeight: window.innerHeight,
      containerWidth: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeCanvas);
  }

  resizeCanvas = () => {
    console.log("resizing");
    this.setState({
      containerHeight: window.innerHeight,
      containerWidth: window.innerWidth
    });
  };

  render() {
    const { containerHeight, containerWidth } = this.state;
    return (
      <div
        style={{
          height: containerHeight,
          width: containerWidth,
          backgroundImage: `linear-gradient(${primaryBlue}, #fff)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography variant="display3" style={styles.title}>
          CheatFleet
        </Typography>
        <Typography style={styles.subheading} variant="subheading">
          Unite with classmates to find a better future...
        </Typography>
        <SearchBar />
        <Typography style={styles.footer} variant="caption">
          CheatFleet 2019. all rights reserved.
        </Typography>
      </div>
    );
  }
}

export default WelcomePage;
