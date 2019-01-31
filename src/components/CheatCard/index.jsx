import React from "react";
import { Card, Typography, Grid } from "@material-ui/core";
import { primaryBlue } from "../../styles";
import { formatData } from "../../helperFunctions";

const styles = {
  container: {
    minWidth: 300,
    maxWidth: 300,
    maxHeight: 200,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white",
    cursor: "pointer",
    marginLeft: 10,
    marginRight: 10,
    height: "100%"
  },
  cardHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  postedBy: {
    color: primaryBlue
  },
  comments: {
    color: "lightgray",
    marginLeft: 10
  },
  upVotes: {
    color: "green"
  },
  downVotes: { color: "red" },
  name: {
    display: "flex",
    flexDirection: "row"
  },
  title: {
    color: "gray",
    marginTop: 10
  },
  groupName: {
    color: "lightgray",
    marginTop: 10
  },
  footer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
};

class CheatCard extends React.Component {
  calculateDate = date => {
    const currentDate = new Date().getTime();
    const timeDiff = currentDate - date;
    const formattedTime = formatData(timeDiff);
    return formattedTime;
  };

  render() {
    const {
      title,
      description,
      groupName,
      postedBy,
      datePosted,
      comments,
      votes,
      date,
      cheat,
      handleCardClick
    } = this.props;
    return (
      <Card style={styles.container} onClick={() => handleCardClick(cheat)}>
        <div style={styles.cardHeader}>
          <div style={styles.name}>
            <Typography variant="subheading" style={styles.postedBy}>
              {postedBy}
            </Typography>
            <Typography variant="subheading" style={styles.comments}>
              - {comments.length} replies
            </Typography>
          </div>
          <Typography
            variant="subheading"
            style={votes > 0 ? styles.upVotes : styles.downVotes}
          >
            {votes >= 0 ? `+ ${votes}` : votes}
          </Typography>
        </div>
        <Typography variant="title" style={styles.title}>
          {title}
        </Typography>
        <div style={styles.footer}>
          <Typography variant="subheading" style={styles.groupName}>
            {groupName}
          </Typography>
          <Typography variant="subheading" style={styles.groupName}>
            {this.calculateDate(date)}
          </Typography>
        </div>
      </Card>
    );
  }
}

export default CheatCard;
