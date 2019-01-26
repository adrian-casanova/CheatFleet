import React from "react";
import { ArrowBack } from "@material-ui/icons";
import { primaryBlue } from "../../styles";
import { Card, Typography, TextField, Button } from "@material-ui/core";
import { createUser } from "../../services/UserService";
import { checkUsersSchool } from "../../services/SchoolService";

const styles = {
  arrowIcon: {
    position: "absolute",
    top: "1%",
    left: "1%",
    color: "white",
    cursor: "pointer"
  },
  cardContainer: {
    height: 500,
    width: "80%",
    maxWidth: 560,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginTop: 20,
    color: "gray"
  },
  textInput: {
    width: "77%",
    alignSelf: "center",
    marginTop: 20,
    height: 50,
    minHeight: 50,
    border: "1px solid gray",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10
  },
  textInputDisabled: {
    width: "77%",
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#f2f2f2",
    height: 50,
    minHeight: 50,
    border: "1px solid gray",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10
  },
  textInputSmall: {
    width: "43%",
    alignSelf: "center",
    marginTop: 20,
    height: 50,
    minHeight: 50,
    border: "1px solid gray",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  firstLastContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center"
  },
  button: {
    width: "78%",
    backgroundColor: primaryBlue,
    marginTop: 20,
    height: 50
  },
  buttonText: {
    color: "white"
  }
};
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: "",
      containerHeight: window.innerHeight,
      containerWidth: window.innerWidth,
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    const { location } = this.props;
    console.log("location: ", location);
    if (!location.state) {
      this.props.history.push("/");
    } else {
      window.addEventListener("resize", this.handleResize);
      this.setState({
        schoolName: location.state.schoolName
      });
    }
  }

  handleResize = () => {
    this.setState({
      containerHeight: window.innerHeight,
      containerWidth: window.innerWidth
    });
  };

  handleInputChange = ({ target }) => {
    console.log("target: ", target);
    this.setState({
      [target.id]: target.value
    });
  };

  handleBackArrowClick = () => {
    this.props.history.push("/");
  };

  handleCreateUser = () => {
    const { email, password, firstName, lastName, schoolName } = this.state;
    createUser({ email, password, firstName, lastName, school: schoolName })
      .then(resp => {
        checkUsersSchool(schoolName).then(resp =>
          this.props.history.push({
            pathname: "/group-picker",
            state: {
              schoolName
            }
          })
        );
      })
      .catch(e => console.log("error: ", e));
  };
  render() {
    const {
      containerHeight,
      containerWidth,
      schoolName,
      email,
      firstName,
      lastName,
      password
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
          <Typography style={styles.title} variant="headline">
            Sign Up for Free
          </Typography>
          <div style={styles.firstLastContainer}>
            <TextField
              InputProps={{ disableUnderline: true }}
              placeholder="First Name"
              value={firstName}
              id="firstName"
              onChange={e => this.handleInputChange(e)}
              style={styles.textInputSmall}
            />
            <TextField
              InputProps={{ disableUnderline: true }}
              placeholder="Last Name"
              value={lastName}
              id="lastName"
              onChange={e => this.handleInputChange(e)}
              style={styles.textInputSmall}
            />
          </div>
          <TextField
            InputProps={{ disableUnderline: true }}
            placeholder="E-mail Address"
            id="email"
            onChange={e => this.handleInputChange(e)}
            value={email}
            style={styles.textInput}
          />
          <TextField
            InputProps={{ disableUnderline: true }}
            placeholder="Create a Password"
            type="password"
            id="password"
            onChange={e => this.handleInputChange(e)}
            value={password}
            style={styles.textInput}
          />
          <TextField
            InputProps={{ disableUnderline: true }}
            value={schoolName}
            disabled
            style={styles.textInputDisabled}
          />
          <Button
            onClick={this.handleCreateUser}
            variant="raised"
            style={styles.button}
          >
            <Typography style={styles.buttonText}>Get Started</Typography>
          </Button>
        </Card>
      </div>
    );
  }
}

export default SignUpPage;
