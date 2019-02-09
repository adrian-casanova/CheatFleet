import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import {
  PeopleOutline,
  BackupOutlined,
  MonetizationOnOutlined
} from "@material-ui/icons";
import { primaryBlue } from "../../styles";
import Footer from "../../components/Footer";
import MainAppBar from "../../components/MainAppBar";

const paperBG = require("../../assets/paper.png");

const styles = {
  firstBoxContainer: {
    display: "flex",
    width: "100%",
    height: 650,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
    // backgroundColor: "darkgray"
  },
  secondBoxContainer: {
    display: "flex",
    width: "100%",
    height: 475,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  divider: {
    height: 2,
    width: "10%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: primaryBlue
  },
  subheading: {
    color: "white"
  },
  registerButton: {
    height: 70,
    width: 150,
    marginTop: 20,
    backgroundColor: "#28282a"
  },
  registerButtonText: {
    color: "white"
  },
  title: {
    textAlign: "center"
  }
};
const LandingPage = props => {
  const handleGoToRegister = () => {
    props.history.push("/register");
  };
  return (
    <div>
      <img
        src={paperBG}
        alt=""
        style={{
          width: "100%",
          height: 650,
          filter: "brightness(0.9)",
          position: "absolute",
          zIndex: -10
        }}
      />
      <div style={styles.firstBoxContainer}>
        <Typography variant="display2" style={styles.title}>
          Improve Your Studying
        </Typography>
        <div style={styles.divider} />
        <Typography variant="subheading" style={styles.subheading}>
          Collaborate with classmates to beat the system
        </Typography>
        <Button
          onClick={handleGoToRegister}
          variant="raised"
          style={styles.registerButton}
        >
          <Typography style={styles.registerButtonText}>Register</Typography>
        </Button>
      </div>
      <div style={styles.secondBoxContainer}>
        <Grid
          container
          xs={12}
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 50,
            marginBottom: 50
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 300,
              marginBottom: 10
            }}
          >
            <PeopleOutline style={{ color: "gray", height: 50, width: 50 }} />
            <Typography variant="subheading" style={{ textAlign: "center" }}>
              Unite with students from your school in order to achieve the
              perfect study guide for every exam, quiz, homework, etc...
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 300,
              marginBottom: 10
            }}
          >
            <BackupOutlined style={{ color: "gray", height: 50, width: 50 }} />
            <Typography variant="subheading" style={{ textAlign: "center" }}>
              Upload all of your files to the cloud and share with your
              classmates. No more sending low quality notes, instead send high
              definition files.
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 300,
              marginBottom: 10
            }}
          >
            <MonetizationOnOutlined
              style={{ color: "gray", height: 50, width: 50 }}
            />
            <Typography variant="subheading" style={{ textAlign: "center" }}>
              Membership allows you to create groups and post cheats for
              everyone to see at no cost whatsoever!
            </Typography>
          </div>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
