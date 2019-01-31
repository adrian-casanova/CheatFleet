import React from "react";
import { Typography, TableRow } from "@material-ui/core";
import { primaryBlue } from "../../../../../../styles";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { formatData } from "../../../../../../helperFunctions";

const styles = {
  headerRow: {
    display: "flex",
    flexDirection: "row"
  },
  container: {
    display: "flex",
    cursor: "pointer",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    paddingBottom: 10,
    borderBottom: "1px solid lightgray"
  },
  userName: {
    color: primaryBlue
  },
  replies: {
    color: "gray",
    marginLeft: 20
  },
  cheatTitle: {
    color: "gray"
  },
  upvoteContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  arrowIcons: {
    color: "gray"
  }
};
class ListItem extends React.Component {
  calculateDate = date => {
    const currentDate = new Date().getTime();
    const timeDiff = currentDate - date;
    const formattedTime = formatData(timeDiff);
    return formattedTime;
  };
  render() {
    const {
      title,
      comments,
      votes,
      date,
      postedBy,
      groupName,
      handleCheatClick,
      cheat
    } = this.props;
    return (
      <TableRow
        style={styles.container}
        hover
        onClick={() => handleCheatClick(cheat)}
      >
        <div style={styles.headerRow}>
          <Typography style={styles.userName}>{postedBy}</Typography>
          <Typography style={styles.replies}>
            - {comments.length} Replies
          </Typography>
        </div>
        <div style={styles.headerRow}>
          <Typography variant="subheading" style={styles.cheatTitle}>
            {title}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography style={{ color: "lightgray" }}>{groupName}</Typography>
          <Typography style={{ color: "lightgray" }}>
            {this.calculateDate(date)}
          </Typography>
        </div>
      </TableRow>
    );
  }
}

export default ListItem;
