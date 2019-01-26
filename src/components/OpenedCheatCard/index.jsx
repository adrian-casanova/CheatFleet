import React from "react";
import { Card, Typography } from "@material-ui/core";

const styles = {
  container: {
    width: "60%",
    position: "absolute",
    right: 50,
    height: 800,
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 40,
    paddingRight: 40
  },
  headerStats: {
    width: 250,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
};
class OpenedCheatCard extends React.Component {
  render() {
    return (
      <Card style={styles.container}>
        <div style={styles.headerStats}>
          <Typography variant="subheading">Adrian Casanova</Typography>
          <Typography variant="subheading"> - 50 Replies</Typography>
        </div>
      </Card>
    );
  }
}

export default OpenedCheatCard;
