import React from "react";
import { Typography, Card, withStyles } from "@material-ui/core";
import { primaryBlue } from "../../../../styles";

const listOfColors = [
  "#e7a047",
  "#3b5998",
  "#f79489",
  "#9b6b8e",
  "#c5919d",
  "#434a3f",
  "#404040",
  "#468499",
  "#885fcd"
];

const styles = {
  cardContainer: {
    height: 250,
    width: 250,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer"
  },
  selectedCardContainer: {
    height: 255,
    width: 255,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    boxShadow: `0px 0px 1px 5px ${primaryBlue}`
  },
  cardBody: {
    padding: 5
  },
  cardTitle: {
    color: "white"
  },
  cardBodyText: {
    color: "gray",
    padding: 5
  }
};

const muiStyles = {
  cardContainer: {
    height: 250,
    width: 250,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    "&:hover": {
      boxShadow: `0px 0px 7px 2px ${primaryBlue}`
    }
  },
  selectedCardContainer: {
    height: 265,
    width: 265,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    boxShadow: `0px 0px 5px 2px ${primaryBlue}`
  }
};
const GroupCard = ({ classes, handleCardClick, index, item }) => {
  return (
    <Card
      onClick={() => handleCardClick(index)}
      classes={{
        root: item.isSelected
          ? classes.selectedCardContainer
          : classes.cardContainer
      }}
    >
      <div
        style={{
          height: 75,
          width: "100%",
          padding: 5,
          backgroundColor: item.groupColor,
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        <Typography style={styles.cardTitle} variant="title">
          {item.name}
        </Typography>
      </div>
      <Typography variant="body1" style={styles.cardBodyText}>
        {item.description}
      </Typography>
    </Card>
  );
};

export default withStyles(muiStyles)(GroupCard);
