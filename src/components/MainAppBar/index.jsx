import React from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { primaryBlue } from "../../styles";

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
const MainAppBar = ({ history }) => {
  const handleGoToRegister = () => {
    history.push("/register");
  };
  const handleGoHome = () => {
    history.push("/");
  };
  return (
    <AppBar style={{ boxShadow: "0px 0px 0px 0px" }}>
      <Toolbar style={styles.toolbarContainer}>
        <div style={styles.toolbarActions}>
          <Typography
            onClick={handleGoHome}
            variant="title"
            style={styles.title}
          >
            CheatFleet
          </Typography>
          <div>
            <Button>
              <Typography style={styles.buttonText}>Login</Typography>
            </Button>
            <Button onClick={handleGoToRegister}>
              <Typography style={styles.buttonTextSignUp}>Register</Typography>
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(MainAppBar);
