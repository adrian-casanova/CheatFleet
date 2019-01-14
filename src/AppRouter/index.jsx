import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WelcomePage from "../pages/WelcomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ChooseGroupsPage from "../pages/ChooseGroupsPage";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signUp" component={SignUpPage} />
          <Route exact path="/group-picker" component={ChooseGroupsPage} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;
