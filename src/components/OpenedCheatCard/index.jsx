import React from "react";
import {
  Card,
  Typography,
  TextField,
  Button,
  Tooltip
} from "@material-ui/core";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Minimize
} from "@material-ui/icons";
import { primaryBlue } from "../../styles";
import CommentItem from "./components/CommentItem";

const fakeText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
vero quae dolores adipisci nisi debitis asperiores, praesentium
ipsum iste optio, culpa tempore quisquam. Quo quae dolore velit
accusamus tenetur expedita! Lorem ipsum dolor sit amet consectetur
adipisicing elit. Molestias vero quae dolores adipisci nisi debitis
asperiores, praesentium ipsum iste optio, culpa tempore quisquam.
Quo quae dolore velit accusamus tenetur expedita! Lorem ipsum dolor
sit amet consectetur adipisicing elit. Molestias vero quae dolores
adipisci nisi debitis asperiores, praesentium ipsum iste optio,
culpa tempore quisquam. Quo quae dolore velit accusamus tenetur
expedita! Lorem ipsum dolor sit amet consectetur adipisicing elit.
Molestias vero quae dolores adipisci nisi debitis asperiores,
praesentium ipsum iste optio, culpa tempore quisquam. Quo quae
dolore velit accusamus tenetur expedita! Lorem ipsum dolor sit amet
consectetur adipisicing elit. Molestias vero quae dolores adipisci
nisi debitis asperiores, praesentium ipsum iste optio, culpa tempore
quisquam. Quo quae dolore velit accusamus tenetur expedita!`;
const styles = {
  container: {
    width: "100%",
    marginLeft: 20,
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 40,
    paddingRight: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerStats: {
    display: "flex",
    flexDirection: "row"
  },
  nameHeading: {
    color: primaryBlue
  },
  titles: {
    color: "gray"
  },
  upvoteContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
    marginTop: 30
  },
  groupNameText: {
    color: "lightgray"
  },
  circle: {
    height: 40,
    width: 40,
    border: "1px solid #f2f2f2",
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    boxShadow: "0px -2.5px 0px 0px lightgray"
  },
  upvoteText: {
    color: "green"
  },
  arrowIcons: {
    color: "gray",
    cursor: "pointer"
  },
  bodyText: {
    color: "gray",
    marginTop: 20
  },
  backArrow: {
    position: "absolute",
    top: 50,
    color: "gray",
    cursor: "pointer"
  },
  textFieldContainer: {
    // backgroundColor: "white",
    // borderTop: "1px solid gray",
    // borderRight: "1px solid gray",
    // borderLeft: "1px solid gray",
    width: "100%",
    minHeight: 150,
    marginTop: 10,
    display: "flex",
    flexDirection: "column"
  }
};
class OpenedCheatCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holesArray: [],
      bodyShortened: true
    };
    this.cardRef = "";
  }
  componentDidMount() {
    this.handleGetHoleCount();
  }

  handleGetHoleCount = () => {
    const numberOfHoles = Math.floor(
      document.getElementById("card-container").offsetHeight / 150
    );
    let i = 0;
    const holesArray = [];
    for (i = 0; i < numberOfHoles; i++) {
      holesArray.push(0);
    }
    this.setState({
      holesArray
    });
  };
  handleShowMore = () => {
    this.setState({
      bodyShortened: false
    });
  };
  handleShowLess = () => {
    this.setState({
      bodyShortened: true
    });
  };
  render() {
    const { holesArray, bodyShortened } = this.state;
    const {
      handleCloseCheatCard,
      cheatOpened,
      user,
      commentInput,
      handleCommentInputChange,
      handleAddComment,
      handleUpVote,
      handleDownVote
    } = this.props;
    return (
      <Card style={styles.container} id="card-container">
        <Tooltip title="Close card" enterDelay={500}>
          <Minimize style={styles.backArrow} onClick={handleCloseCheatCard} />
        </Tooltip>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 45,
            marginRight: 10
          }}
        >
          {holesArray.map(item => (
            <div style={styles.circle} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
          <div style={styles.headerStats}>
            <Typography style={styles.nameHeading} variant="subheading">
              {cheatOpened.postedByName}
            </Typography>
            <Typography style={{ marginLeft: 10 }} variant="subheading">
              {" "}
              - {cheatOpened.comments.length} Replies
            </Typography>
          </div>
          <div style={styles.headerRow}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="title" style={styles.title}>
                {cheatOpened.cheatTitle}
              </Typography>
              <Typography style={styles.groupNameText} variant="subheading">
                {cheatOpened.groupName}
              </Typography>
            </div>
            <div style={styles.upvoteContainer}>
              <KeyboardArrowUp
                onClick={handleUpVote}
                style={styles.arrowIcons}
              />
              <Typography style={styles.upvoteText} variant="subheading">
                {cheatOpened.likes >= 0
                  ? `+ ${cheatOpened.likes}`
                  : `- ${cheatOpened.likes}`}
              </Typography>
              <KeyboardArrowDown
                onClic={handleDownVote}
                style={styles.arrowIcons}
              />
            </div>
          </div>
          <div style={styles.divider} />
          <Typography variant="body1" style={styles.bodyText}>
            {cheatOpened.cheatBody.length > 300 && bodyShortened
              ? cheatOpened.cheatBody.substring(0, 300).concat("...")
              : cheatOpened.cheatBody}
          </Typography>
          {bodyShortened && cheatOpened.cheatBody.length > 300 && (
            <Button
              onClick={this.handleShowMore}
              style={{ alignSelf: "center" }}
            >
              Show More
            </Button>
          )}
          {!bodyShortened && cheatOpened.cheatBody.length > 300 && (
            <Button
              onClick={this.handleShowLess}
              style={{ alignSelf: "center" }}
            >
              Show Less
            </Button>
          )}
          <Typography style={{ color: "green", marginTop: 20 }}>
            {user.firstName.concat(` ${user.lastName}`)}
          </Typography>
          <TextField
            InputProps={{ style: styles.textFieldContainer }}
            variant="outlined"
            multiline
            value={commentInput}
            onChange={handleCommentInputChange}
            placeholder="Add A Comment"
          />
          <Button
            variant="outlined"
            onClick={handleAddComment}
            disabled={!commentInput.length}
            style={{ alignSelf: "flex-end", marginTop: 5 }}
          >
            Comment
          </Button>
          {cheatOpened.comments.map(comment => (
            <CommentItem
              comment={comment.comment}
              postedBy={comment.postedBy}
              postedDate={comment.postedTimeMs}
            />
          ))}
        </div>
      </Card>
    );
  }
}

export default OpenedCheatCard;
