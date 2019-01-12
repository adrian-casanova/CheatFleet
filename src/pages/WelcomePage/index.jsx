import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { Spring } from "react-spring";
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
      containerWidth: window.innerWidth,
      searchValue: ""
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

  handleSearchTextChange = ({ target }) => {
    this.setState({
      searchValue: target.value
    });
  };

  handleClearText = () => {
    this.setState({
      searchValue: ""
    });
  };

  render() {
    const { containerHeight, containerWidth, searchValue } = this.state;
    return (
      <Spring
        config={{ duration: 1500 }}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        {props => (
          <div
            style={{
              height: containerHeight,
              width: containerWidth,
              backgroundImage: `linear-gradient(${primaryBlue}, #fff)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              ...props
            }}
          >
            <Typography variant="display3" style={styles.title}>
              CheatFleet
            </Typography>
            <Typography style={styles.subheading} variant="subheading">
              Unite with classmates to find a better future...
            </Typography>
            <SearchBar
              searchValue={searchValue}
              handleSearchTextChange={this.handleSearchTextChange}
              handleClearText={this.handleClearText}
            />
            <Typography style={styles.footer} variant="caption">
              CheatFleet 2019. all rights reserved.
            </Typography>
          </div>
        )}
      </Spring>
    );
  }
}

export default WelcomePage;
