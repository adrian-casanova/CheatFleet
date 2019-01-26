import React from "react";
import { Card, Typography } from "@material-ui/core";

const styles = {
  container: {
    minHeight: 300,
    maxHeight: 300,
    minWidth: 300,
    maxWidth: 300,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    cursor: "pointer"
  },
  plusIcon: {
    fontSize: 100,
    fontWeigth: "bold",
    color: "#999999"
  },
  createText: {
    color: "#999999"
  }
};
class CreateGroupCard extends React.Component {
  render() {
    const { handleNewGroupClick } = this.props;
    return (
      <Card onClick={handleNewGroupClick} style={styles.container}>
        <Typography style={styles.plusIcon}>+</Typography>
        <Typography variant="subheading" style={styles.createText}>
          Create your own group
        </Typography>
      </Card>
    );
  }
}

export default CreateGroupCard;
