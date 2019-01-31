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
class SubscribedGroup extends React.Component {
  render() {
    const { group, handleGroupClick } = this.props;
    return (
      <div style={styles.container}>
        <Typography
          onClick={() => handleGroupClick(group)}
          variant="body1"
          style={styles.title}
        >
          {group.groupName}
        </Typography>
        <Typography variant="body1" style={styles.subheading}>
          1 member (s) - last post 2 minutes ago
        </Typography>
      </div>
    );
  }
}

export default SubscribedGroup;
