import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WelcomePage from "../pages/WelcomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ChooseGroupsPage from "../pages/ChooseGroupsPage";
import firebase from "firebase";
import AccountsPage from "../pages/AccountsPage";
import FileViewer from "../pages/FileViewer";
import { getUser } from "../services/UserService";
import GroupHomePage from "../pages/GroupHomePage";
import LandingPage from "../pages/LandingPage";
import MainAppBar from "../components/MainAppBar";
import RegisterPage from "../pages/RegisterPage";
import NewLoginPage from "../pages/NewLoginPage";
import { CircularProgress } from "@material-ui/core";
import { schools } from "../datasets/colleges";
import GroupSelectionPage from "../pages/GroupSelectionPage";
import Footer from "../components/Footer";

const AppRouter = ({ history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [showSpinner, setSpinner] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => handleWindowResize());
    firebase.auth().onAuthStateChanged(user => {
      console.log("user: ", user);
      if (!user) {
        setIsLoggedIn(false);
        setSpinner(false);
      } else {
        handleGetUserObject(user);
      }
    });
  });

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

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

  const handleInputChange = value => {
    const suggestions = getSuggestions(value);
    setSearchSuggestions(suggestions);
  };

  const handleGetUserObject = user => {
    getUser(user.email)
      .then(resp => {
        setIsLoggedIn(true);
        setUser(resp.docs[0].data());
        setSpinner(false);
      })
      .catch(e => console.log(e));
  };

  const handleBlur = () => {
    setSearchSuggestions([]);
  };

  return (
    <Router>
      <React.Fragment>
        <Route
          path="/"
          render={() => (
            <MainAppBar
              onChange={handleInputChange}
              items={searchSuggestions}
              handleBlur={handleBlur}
              windowWidth={windowWidth}
            />
          )}
        />
        {showSpinner ? (
          <div
            style={{
              height: 700,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress size={120} />
          </div>
        ) : (
          <Switch>
            {isLoggedIn ? (
              <div>
                <Route
                  exact
                  path="/"
                  render={props => <HomePage user={user} {...props} />}
                />
                <Route
                  exact
                  path="/group-picker"
                  render={props => <ChooseGroupsPage user={user} {...props} />}
                />
                <Route
                  exact
                  path="/account"
                  render={() => <AccountsPage user={user} />}
                />
                <Route
                  exact
                  path="/group/:groupId?"
                  component={GroupHomePage}
                />
                <Route exact path="/file-viewer" component={FileViewer} />
              </div>
            ) : (
              <div>
                <Route exact path="/" component={GroupSelectionPage} />
                <Route exact path="/login" component={NewLoginPage} />
                <Route exact path="/register" component={RegisterPage} />
              </div>
            )}
          </Switch>
        )}
        <Footer />
      </React.Fragment>
    </Router>
  );
};

export default AppRouter;
