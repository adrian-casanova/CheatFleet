import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import { Spring } from "react-spring";
import { primaryBlue } from "../../styles";
import SearchBar from "./components/SearchBar";
import Suggestions from "./components/Suggestions";
import { schools } from "../../datasets/colleges";

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
  },
  loginButton: {
    position: "absolute",
    top: "1%",
    right: "1%",
    borderColor: "white"
  },
  loginText: {
    color: "white"
  },
  logoLetter: {
    position: "absolute",
    top: "1%",
    left: "1%",
    height: 40,
    width: 40
  }
};
const logoLetter = require("../../assets/logoLetter.png");
class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerHeight: window.innerHeight,
      containerWidth: window.innerWidth,
      searchValue: "",
      suggestions: []
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
    const suggestions = this.getSuggestions(target.value);
    this.setState({
      searchValue: target.value,
      suggestions
    });
  };

  handleClearText = () => {
    this.setState({
      searchValue: ""
    });
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : schools.filter(item => {
          const keep =
            count < 5 &&
            item.institution.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  render() {
    const {
      containerHeight,
      containerWidth,
      searchValue,
      suggestions
    } = this.state;
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
            <Button variant="outlined" style={styles.loginButton}>
              <Typography style={styles.loginText}>Log In</Typography>
            </Button>
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
            <Suggestions suggestions={suggestions} />
            <Typography style={styles.footer} variant="caption">
              CheatFleet 2019. all rights reserved.
            </Typography>
            <img src={logoLetter} alt="CheatFleet" style={styles.logoLetter} />
          </div>
        )}
      </Spring>
    );
  }
}

export default WelcomePage;
