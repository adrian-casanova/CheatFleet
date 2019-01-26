import React from "react";
import { Typography } from "@material-ui/core";
import { primaryBlue } from "../../../../styles";

const styles = {
  container: {
    width: "100%",
    borderTop: "1px solid lightgray",
    height: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    color: primaryBlue,
    cursor: "pointer"
  },
  subheading: {
    color: "lightgray"
  }
};
class RecentlyViewedItem extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Typography variant="body1" style={styles.title}>
          This is my cheat title
        </Typography>
        <Typography variant="body1" style={styles.subheading}>
          0 comments - 0 votes - 2 minutes ago
        </Typography>
      </div>
    );
  }
}

export default RecentlyViewedItem;
