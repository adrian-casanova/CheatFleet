import React, { useState } from "react";
import {
  Typography,
  TextField,
  withStyles,
  Grid,
  Button,
  Fade,
  Zoom
} from "@material-ui/core";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { primaryBlue } from "../../styles";
import { signInWithGoogle, createUser } from "../../services/UserService";

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
    height: 525,
    width: "55%",
    minWidth: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 120,
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

library.add(faGoogle);

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
const RegisterPage = ({ classes, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [allEntriesError, setAllEntriesError] = useState("");

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        return;
    }
  };
  const handleRegister = () => {
    if (!password || !confirmPassword || !name || !email) {
      setAllEntriesError("All Entries must be filled in.");
    } else if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
    } else {
      setAllEntriesError("");
      setPasswordError("");
      createUser({ email, password, name })
        .then(() => {
          history.push("/get-started");
        })
        .catch(e => console.log("e: ", e));
    }
  };

  const handleGoogleClick = () => {
    signInWithGoogle()
      .then(resp => {
        console.log("resp: ", resp);
        if (!resp.additionalUserInfo.isNewUser) {
          history.push("/");
        } else {
          history.push("/get-started");
        }
      })
      .catch(e => console.log("e: ", e));
  };
  return (
    <div style={styles.container}>
      <Zoom in>
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
                style={{ width: "100%" }}
                variant="outlined"
                placeholder="Name"
                value={name}
                onChange={handleInputChange}
                name="name"
                error={allEntriesError && !name}
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
                value={email}
                onChange={handleInputChange}
                name="email"
                error={allEntriesError && !email}
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
                value={password}
                onChange={handleInputChange}
                name="password"
                error={passwordError || (allEntriesError && !password)}
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
                value={confirmPassword}
                onChange={handleInputChange}
                name="confirmPassword"
                error={passwordError || (allEntriesError && !confirmPassword)}
                helperText={passwordError || allEntriesError}
              />
              <Button
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  marginTop: 20
                }}
                variant="raised"
                onClick={handleGoogleClick}
              >
                <FontAwesomeIcon color={primaryBlue} icon={faGoogle} />
              </Button>
              <Button
                style={{
                  width: "100%",
                  height: 50,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 40,
                  marginBottom: 40,
                  backgroundColor: primaryBlue,
                  color: "white"
                }}
                onClick={handleRegister}
              >
                Register
              </Button>
            </Grid>
          </div>
        </div>
      </Zoom>
    </div>
  );
};

export default withStyles(inputStyles)(RegisterPage);
