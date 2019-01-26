import React from "react";
import { Typography } from "@material-ui/core";
import { Dashboard, List } from "@material-ui/icons";

const styles = {
  container: {
    width: "98%",
    display: "flex",
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },
  headerText: {
    color: "gray"
  },
  viewIconsInactive: {
    color: "#d8d8d8",
    cursor: "pointer"
  },
  viewIconsActive: {
    color: "gray",
    cursor: "pointer"
  },
  divider: {
    width: 1,
    backgroundColor: "lightgray",
    height: 20
  }
};
class ActionBar extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: 120,
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography style={styles.headerText}>View</Typography>
          <List style={styles.viewIconsInactive} />
          <Dashboard style={styles.viewIconsActive} />
          <div style={styles.divider} />
        </div>
        <div>
          <Typography style={styles.headerText}>Sort</Typography>
        </div>
      </div>
    );
  }
}

export default ActionBar;
