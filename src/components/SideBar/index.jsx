import React from "react";
import { Card, Typography } from "@material-ui/core";
import ActionBar from "../../pages/HomePage/components/ActionBar";
import RecentlyViewedItem from "./components/RecentlyViewedItem";

const styles = {
  cardContainerTop: {
    height: 400,
    width: 250,
    backgroundColor: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column"
  },
  cardHeading: {
    color: "gray",
    alignSelf: "center"
  }
};
class SideBar extends React.Component {
  render() {
    return (
      <div>
        <Card style={styles.cardContainerTop}>
          <Typography style={styles.cardHeading} variant="subheading">
            Recently Viewed
          </Typography>
          <div style={{ marginTop: 10 }}>
            <RecentlyViewedItem />
            <RecentlyViewedItem />
            <RecentlyViewedItem />
            <RecentlyViewedItem />
            <RecentlyViewedItem />
          </div>
        </Card>
      </div>
    );
  }
}

export default SideBar;
