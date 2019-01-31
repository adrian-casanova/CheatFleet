import React from "react";
import { Card, Typography } from "@material-ui/core";
import ListItem from "./components/ListItem";

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: 20
  }
};
class ListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cheatsList, handleCheatClick } = this.props;
    return (
      <Card style={styles.container}>
        {cheatsList.map(cheat => (
          <ListItem
            comments={cheat.comments}
            title={cheat.cheatTitle}
            cheat={cheat}
            handleCheatClick={handleCheatClick}
            description={cheat.cheatBody}
            votes={cheat.likes}
            date={cheat.postDateMs}
            groupName={cheat.groupName}
            postedBy={cheat.postedByName}
          />
        ))}
      </Card>
    );
  }
}

export default ListCard;
