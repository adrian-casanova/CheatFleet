import React, { useState } from "react";
import { Card, Typography, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { schools } from "../../datasets/colleges";
import SearchBar from "../../components/SearchBar";
import { patchUser } from "../../services/UserService";

const GetStartedPage = ({ user, history }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [schoolName, setSchoolName] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const getSuggestions = value => {
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

  const handleContinue = () => {
    if (!schools.find(item => item.institution === schoolName)) {
      console.log("schoolName: ", schoolName);
      setErrorMessage("Please enter a valid school.");
    } else {
      console.log("email: ", user);
      const { email } = user;
      setErrorMessage("");
      patchUser({ school: schoolName }, email)
        .then(resp => {
          history.push("/group-picker");
        })
        .catch(e => alert(e));
    }
  };

  const handleInputChange = value => {
    setSchoolName(value);
    const suggestions = getSuggestions(value);
    setSuggestions(suggestions);
  };

  const handleBlur = () => {
    setSuggestions([]);
  };

  const onItemClick = item => {
    setSchoolName(item);
  };
  return (
    <div
      style={{
        height: 600,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Card
        style={{
          height: 250,
          padding: 40,
          marginTop: 50,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography variant="display1">Welcome to CheatFleet!</Typography>
        <Typography variant="subheading">
          Before we select your groups, lets get started by choosing your
          school!
        </Typography>
        <div style={{ alignSelf: "center", marginTop: 30 }}>
          <SearchBar
            handleBlur={handleBlur}
            onChange={handleInputChange}
            items={suggestions}
            onItemClick={onItemClick}
            errorMessage={errorMessage}
          />
        </div>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
          onClick={handleContinue}
        >
          <Button style={{ color: "white" }} variant="raised" color="primary">
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(GetStartedPage);
