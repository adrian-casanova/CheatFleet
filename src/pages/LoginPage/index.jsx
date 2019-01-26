import React from "react";
import { primaryBlue } from "../../styles";
import {
  Card,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Link
} from "@material-ui/core";
import { loginUser } from "../../services/UserService";
import { Person, Security, ArrowBack } from "@material-ui/icons";
import { getUsersSchool } from "../../services/SchoolService";
import { checkUserGroups } from "../../services/GroupService";

const styles = {
  cardContainer: {
    height: 300,
    width: "80%",
    maxWidth: 560,
    display: "flex",
    flexDirection: "column"
  },
  title: {
    color: "white",
    fontWeight: "bold",
    padding: 20,
    fontStyle: "italic"
  },
  textInput: {
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    height: 50,
    minHeight: 50,
    border: "1px solid gray",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 20
  },
  titleContainer: {
    height: 60,
    width: "100%",
    backgroundColor: "lightgray"
  },
  icon: {
    color: "lightgray"
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: primaryBlue,
    alignSelf: "center",
    width: "83%"
  },
  loginText: {
    color: "white"
  },
  link: {
    marginTop: 10,
    paddingLeft: "8%"
  },
  arrowIcon: {
    position: "absolute",
    top: "1%",
    left: "1%",
    color: "white",
    cursor: "pointer"
  }
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerHeight: window.innerHeight,
      containerWidth: window.innerWidth,
      searchValue: "",
      suggestions: [],
      email: "",
      password: "",
      error: ""
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.resizeCanvas);
  }

  handleLogin = () => {
    const { email, password } = this.state;
    loginUser(email, password)
      .then(resp => {
        checkUserGroups(resp.user.uid).then(userDoc => {
          if (userDoc.data().groups) {
            this.props.history.push("/");
          } else {
            getUsersSchool(email).then(snpashot => {
              snpashot.forEach(doc => {
                const { school } = doc.data();
                this.props.history.push({
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
      .catch(e => this.setState({ error: e.message }));
  };

  resizeCanvas = () => {
    this.setState({
      containerHeight: window.innerHeight,
      containerWidth: window.innerWidth
    });
  };

  handleBackArrowClick = () => {
    this.props.history.push("/");
  };

  handleInputChange = ({ target }) => {
    this.setState({
      [target.id]: target.value
    });
  };
  render() {
    const {
      containerHeight,
      containerWidth,
      email,
      password,
      error
    } = this.state;
    return (
      <div
        style={{
          height: containerHeight,
          width: containerWidth,
          backgroundImage: `linear-gradient(${primaryBlue}, #fff)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ArrowBack
          onClick={this.handleBackArrowClick}
          style={styles.arrowIcon}
        />
        <Card style={styles.cardContainer}>
          <div style={styles.titleContainer}>
            <Typography style={styles.title} variant="title">
              CheetFleet
            </Typography>
          </div>
          <TextField
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Person style={styles.icon} />
                </InputAdornment>
              )
            }}
            value={email}
            onChange={this.handleInputChange}
            id="email"
            style={styles.textInput}
            placeholder="E-mail"
          />
          <TextField
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Security style={styles.icon} />
                </InputAdornment>
              )
            }}
            value={password}
            id="password"
            onChange={this.handleInputChange}
            type="password"
            style={styles.textInput}
            placeholder="Password"
          />
          {error && (
            <Typography
              variant="body2"
              style={{ color: "red", alignSelf: "center" }}
            >
              {error}
            </Typography>
          )}
          <Button
            onClick={this.handleLogin}
            variant="raised"
            style={styles.loginButton}
          >
            <Typography style={styles.loginText}>Login</Typography>
          </Button>
          <Link variant="caption" style={styles.link}>
            Forgot password?
          </Link>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
