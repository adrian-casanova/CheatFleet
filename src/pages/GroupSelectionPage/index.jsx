import React from "react";
import { Typography, Card } from "@material-ui/core";
import SearchBar from "../../components/SearchBar";

const styles = {
  mainBar: {
    backgroundColor: "rgba(82,82,84,0.9)",
    height: 250,
    width: "100%",
    padding: 40,
    marginTop: 55
  },
  welcomeText: {
    color: "white",
    maxWidth: "90%",
    paddingLeft: 20,
    paddingRight: 20
  },
  subTitle: {
    color: "white",
    marginTop: 15,
    maxWidth: "85%",
    paddingLeft: 20,
    paddingRight: 20
  },
  groupsChosenCard: {
    height: 150,
    width: "90%",
    alignSelf: "center",
    position: "absolute",
    top: 280,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  }
};
const GroupSelectionPage = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={styles.mainBar}>
        <Typography variant="display1" style={styles.welcomeText}>
          Welcome to CheatFleet!
        </Typography>
        <Typography variant="subheading" style={styles.subTitle}>
          Let's begin by choosing groups that you want to be a part of. (Don't
          worry you can join more later whenever you want!)
        </Typography>
      </div>
      <Card style={styles.groupsChosenCard} />
    </div>
  );
};

export default GroupSelectionPage;
