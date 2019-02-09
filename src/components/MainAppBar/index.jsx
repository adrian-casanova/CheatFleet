import React from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { primaryBlue } from "../../styles";
import SearchBar from "../SearchBar";

const styles = {
  toolbarActions: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center"
  },
  toolbarContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#28282a",
    justifyContent: "flex-end",
    boxShadow: "0px 0px 0px 0px gray"
  },
  title: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    cursor: "pointer"
  },
  buttonText: {
    color: "white"
  },
  buttonTextSignUp: {
    color: primaryBlue,
    fontWeight: "bold"
  }
};
const MainAppBar = ({ history, onChange, items, handleBlur, windowWidth }) => {
  const handleGoToRegister = () => {
    history.push("/register");
  };
  const handleGoHome = () => {
    history.push("/");
  };
  const handleGoToLogin = () => {
    history.push("/login");
  };
  return (
    <AppBar style={{ boxShadow: "0px 0px 0px 0px" }}>
      <Toolbar style={styles.toolbarContainer}>
        {windowWidth < 750 ? (
          <React.Fragment>
            <Menu style={{ color: "white " }} />
            <SearchBar
              onChange={onChange}
              items={items}
              handleBlur={handleBlur}
              placeHolder="Search schools"
            />
          </React.Fragment>
        ) : (
          <div style={styles.toolbarActions}>
            <Typography
              onClick={handleGoHome}
              variant="title"
              style={styles.title}
            >
              CheatFleet
            </Typography>
            <SearchBar
              onChange={onChange}
              items={items}
              handleBlur={handleBlur}
              placeHolder="Search schools"
            />
            <div>
              <Button onClick={handleGoToLogin}>
                <Typography style={styles.buttonText}>Login</Typography>
              </Button>
              <Button onClick={handleGoToRegister}>
                <Typography style={styles.buttonTextSignUp}>
                  Register
                </Typography>
              </Button>
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(MainAppBar);
