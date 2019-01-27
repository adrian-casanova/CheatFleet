import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WelcomePage from "../pages/WelcomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ChooseGroupsPage from "../pages/ChooseGroupsPage";
import firebase from "firebase";
import AccountsPage from "../pages/AccountsPage";
import { getUser } from "../services/UserService";
import GroupHomePage from "../pages/GroupHomePage";

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("user: ", user);
      if (!user) {
        this.setState({
          isLoggedIn: false
        });
      } else {
        this.handleGetUserObject(user);
      }
    });
  }

  handleGetUserObject = user => {
    getUser(user.email)
      .then(resp => {
        this.setState({
          isLoggedIn: true,
          user: resp.docs[0].data()
        });
      })
      .catch(e => console.log(e));
  };
  render() {
    const { isLoggedIn, user } = this.state;
    return (
      <Router>
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
          </div>
        ) : (
          <div>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signUp" component={SignUpPage} />
          </div>
        )}
      </Router>
    );
  }
}

export default AppRouter;
