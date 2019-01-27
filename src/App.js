import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import AppRouter from "./AppRouter";
import { primaryBlue } from "./styles";
import { theme } from "./themes/AppTheme";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBCUiIsgkraGyEb_L6J96nYXObFtu6mD2k",
  authDomain: "cheatfleet-14626.firebaseapp.com",
  databaseURL: "https://cheatfleet-14626.firebaseio.com",
  projectId: "cheatfleet-14626",
  storageBucket: "cheatfleet-14626.appspot.com",
  messagingSenderId: "766909737735"
};
firebase.initializeApp(config);
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppRouter />
      </MuiThemeProvider>
    );
  }
}

export default App;
