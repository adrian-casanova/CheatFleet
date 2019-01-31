import React from "react";
import { Typography } from "@material-ui/core";
import { primaryBlue } from "../../../../styles";
import { formatData } from "../../../../helperFunctions";

const styles = {
  postedBy: {
    color: primaryBlue
  },
  container: {
    padding: 5,
    borderBottom: "1px solid lightgray",
    marginTop: 20
  },
  bodyText: {
    color: "gray"
  },
  footerText: {
    color: "lightgray"
  }
};
class CommentItem extends React.Component {
  calculateDate = date => {
    const currentDate = new Date().getTime();
    const timeDiff = currentDate - date;
    const formattedTime = formatData(timeDiff);
    return formattedTime;
  };
  render() {
    const { postedBy, comment, postedDate } = this.props;
    return (
      <div style={styles.container}>
        <Typography style={styles.postedBy}>{postedBy}</Typography>
        <Typography variant="body1" style={styles.bodyText}>
          {comment}
        </Typography>
        <Typography style={styles.footerText}>
          {this.calculateDate(postedDate)}
        </Typography>
      </div>
    );
  }
}

export default CommentItem;
