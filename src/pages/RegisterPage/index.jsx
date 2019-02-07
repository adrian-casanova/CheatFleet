import React from "react";
import {
  Typography,
  TextField,
  withStyles,
  Grid,
  Button
} from "@material-ui/core";
import Footer from "../../components/Footer";
import { primaryBlue } from "../../styles";

const styles = {
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column"
  },
  firstBox: {
    heigth: 600,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 50
  },
  signUpBox: {
    height: 500,
    width: "35%",
    minWidth: 350,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "rgba(99,199,246, 0.1)"
  },
  signUpText: {
    color: "#4c4c4c",
    fontWeight: "bold"
  },
  divider: {
    width: 40,
    height: 5,
    backgroundColor: "pink",
    marginTop: 10
  },
  alreadyAccount: {
    borderBottom: "1px solid gray",
    color: "gray",
    marginTop: 20,
    cursor: "pointer"
  },
  nameContainers: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    flexBasis: "auto",
    alignSelf: "center",
    paddingLeft: 10,
    paddingRight: 10
  }
};

const inputStyles = {
  root: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    margin: 10,
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: primaryBlue,
      borderWidth: 2
    }
  },
  disabled: {},
  focused: {},
  error: {},
  notchedOutline: {}
};
const RegisterPage = ({ classes }) => {
  return (
    <div style={styles.container}>
      <div style={styles.firstBox}>
        <div style={styles.signUpBox}>
          <Typography variant="display1" style={styles.signUpText}>
            Register
          </Typography>
          <div style={styles.divider} />
          <Typography variant="subheading" style={styles.alreadyAccount}>
            Already have an account?
          </Typography>
          <Grid container xs={12} style={styles.nameContainers}>
            <TextField
              InputProps={{
                classes
              }}
              style={{ width: "50%" }}
              variant="outlined"
              placeholder="First Name"
            />
            <TextField
              InputProps={{
                classes
              }}
              style={{ width: "50%" }}
              variant="outlined"
              placeholder="Last Name"
            />
            <TextField
              InputProps={{
                classes
              }}
              style={{
                width: "100%",
                minWidth: 200
              }}
              variant="outlined"
              placeholder="E-mail"
            />
            <TextField
              InputProps={{
                classes
              }}
              style={{
                width: "100%",
                minWidth: 200
              }}
              variant="outlined"
              type="password"
              placeholder="Password"
            />
            <TextField
              InputProps={{
                classes
              }}
              style={{
                width: "100%",
                minWidth: 200
              }}
              variant="outlined"
              type="password"
              placeholder="Confirm Password"
            />
            <Button
              style={{
                width: "100%",
                height: 50,
                margin: 10,
                backgroundColor: primaryBlue,
                color: "white"
              }}
            >
              Register
            </Button>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withStyles(inputStyles)(RegisterPage);
