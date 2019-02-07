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

const AppRouter = ({ history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log("user: ", user);
      if (!user) {
        setIsLoggedIn(false);
      } else {
        handleGetUserObject(user);
      }
    });
  });

  const handleGetUserObject = user => {
    getUser(user.email)
      .then(resp => {
        setIsLoggedIn(true);
        setUser(resp.docs[0].data());
      })
      .catch(e => console.log(e));
  };

  return (
    <Router>
      <React.Fragment>
        <Route path="/" render={() => <MainAppBar />} />
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
              <Route exact path="/group/:groupId?" component={GroupHomePage} />
              <Route exact path="/file-viewer" component={FileViewer} />
            </div>
          ) : (
            <div>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
            </div>
          )}
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default AppRouter;
