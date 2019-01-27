import React from "react";
import { Card, Typography, Collapse } from "@material-ui/core";
import ActionBar from "../../pages/HomePage/components/ActionBar";
import RecentlyViewedItem from "./components/RecentlyViewedItem";
import SubscribedGroup from "./components/SubscribedGroup";
import {
  KeyboardArrowDown,
  DragHandle,
  KeyboardArrowUp
} from "@material-ui/icons";

const styles = {
  cardContainerTop: {
    height: 400,
    width: 250,
    backgroundColor: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    marginTop: 20
  },
  groupsSubscribed: {
    height: 400,
    width: 250,
    backgroundColor: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column"
  },
  groupsSubscribedClosed: {
    height: 5,
    width: 250,
    backgroundColor: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column"
  },
  cardHeading: {
    color: "gray",
    alignSelf: "center"
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icons: {
    color: "gray",
    cursor: "pointer"
  },
  handleIcon: {
    color: "gray",
    cursor: "grab"
  }
};
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOpened: false,
      recentlyViewedOpen: false
    };
  }

  componentDidMount() {
    this.setState({
      cardOpened: true
    });
  }

  handleCardClose = () => {
    this.setState({
      cardOpened: false
    });
  };

  handleCardOpen = () => {
    this.setState({
      cardOpened: true
    });
  };

  handleRecentlyClose = () => {
    this.setState({
      recentlyViewedOpen: false
    });
  };

  handleRecentlyOpen = () => {
    this.setState({
      recentlyViewedOpen: true
    });
  };
  render() {
    const { cardOpened, recentlyViewedOpen } = this.state;
    const { userGroups, handleGroupClick } = this.props;
    return (
      <div>
        <Collapse in={cardOpened} collapsedHeight="55px">
          <Card style={styles.groupsSubscribed}>
            <div style={styles.headerRow}>
              {cardOpened ? (
                <KeyboardArrowDown
                  onClick={this.handleCardClose}
                  style={styles.icons}
                />
              ) : (
                <KeyboardArrowUp
                  onClick={this.handleCardOpen}
                  style={styles.icons}
                />
              )}
              <Typography style={styles.cardHeading} variant="subheading">
                Subscribed Groups
              </Typography>
              <DragHandle style={styles.handleIcon} />
            </div>
            <div
              style={{
                marginTop: 10,
                overflow: "scroll"
              }}
            >
              {userGroups
                ? userGroups.map(group => (
                    <SubscribedGroup
                      handleGroupClick={handleGroupClick}
                      group={group}
                      key={group.groupId}
                    />
                  ))
                : null}
            </div>
          </Card>
        </Collapse>
        <Collapse in={!recentlyViewedOpen} collapsedHeight="76px">
          <Card style={styles.cardContainerTop}>
            <div style={styles.headerRow}>
              {recentlyViewedOpen ? (
                <KeyboardArrowDown
                  onClick={this.handleRecentlyClose}
                  style={styles.icons}
                />
              ) : (
                <KeyboardArrowUp
                  onClick={this.handleRecentlyOpen}
                  style={styles.icons}
                />
              )}
              <Typography style={styles.cardHeading} variant="subheading">
                Recently Viewed
              </Typography>
              <DragHandle style={styles.handleIcon} />
            </div>
            <div style={{ marginTop: 10 }}>
              <RecentlyViewedItem />
              <RecentlyViewedItem />
              <RecentlyViewedItem />
              <RecentlyViewedItem />
              <RecentlyViewedItem />
            </div>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default SideBar;
