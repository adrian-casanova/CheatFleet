import React, { useState } from "react";
import {
  Typography,
  TextField,
  withStyles,
  Grid,
  Button,
  Zoom,
  CircularProgress
} from "@material-ui/core";
import Footer from "../../components/Footer";
import { primaryBlue } from "../../styles";
import { loginUser } from "../../services/UserService";
import { checkUserGroups } from "../../services/GroupService";
import { getUsersSchool } from "../../services/SchoolService";

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
    width: "55%",
    minWidth: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "rgba(223,243,253,0.85)"
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
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
const NewLoginPage = ({ classes, history }) => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSpinner, setSpinner] = useState(false);

  const handleEmailChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };
  const handlePasswordChange = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const handleLogin = () => {
    setSpinner(true);
    loginUser(userEmail, userPassword)
      .then(resp => {
        checkUserGroups(resp.user.uid).then(userDoc => {
          if (userDoc.data().groups) {
            history.push("/");
          } else {
            getUsersSchool(userEmail).then(snpashot => {
              snpashot.forEach(doc => {
                const { school } = doc.data();
                setSpinner(false);
                history.push({
                  pathname: "/group-picker",
                  state: {
                    schoolName: school,
                    uid: resp.user.uid
                  }
                });
              });
            });
          }
        });
      })
      .catch(e => setErrorMessage(e));
  };
  return (
    <div style={styles.container}>
      <Zoom in>
        <div style={styles.firstBox}>
          <div style={styles.signUpBox}>
            <Typography variant="display1" style={styles.signUpText}>
              Log In
            </Typography>
            <div style={styles.divider} />
            {showSpinner ? (
              <CircularProgress size={120} style={{ marginTop: 150 }} />
            ) : (
              <React.Fragment>
                <Typography variant="subheading" style={styles.alreadyAccount}>
                  Don't have an account? Click Here
                </Typography>
                <Grid container xs={12} style={styles.nameContainers}>
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
                    onChange={handleEmailChange}
                    value={userEmail}
                  />
                  <TextField
                    InputProps={{
                      classes
                    }}
                    style={{
                      width: "100%",
                      minWidth: 200
                    }}
                    onChange={handlePasswordChange}
                    value={userPassword}
                    variant="outlined"
                    type="password"
                    placeholder="Password"
                  />
                  <Button
                    onClick={handleLogin}
                    style={{
                      width: "100%",
                      height: 50,
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 40,
                      marginBottom: 10,
                      backgroundColor: primaryBlue,
                      color: "white"
                    }}
                  >
                    Login
                  </Button>
                </Grid>
                <Typography variant="subheading" style={styles.alreadyAccount}>
                  Forgot password?
                </Typography>
              </React.Fragment>
            )}
          </div>
        </div>
      </Zoom>
    </div>
  );
};

export default withStyles(inputStyles)(NewLoginPage);
