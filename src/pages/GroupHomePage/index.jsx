import React from "react";
import MainNavBar from "../../components/MainNavBar";
import ActionBar from "../HomePage/components/ActionBar";
import { Card, Typography } from "@material-ui/core";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  },
  sidebarContainer: {
    display: "flex",
    flexDirection: "column",
    width: "30%"
  },
  listContainer: {
    dispaly: "flex",
    flexDirection: "column",
    width: "65%"
  }
};
class GroupHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {}
    };
  }

  componentDidMount() {
    const { location } = this.props.history;
    const { state } = location;
    if (state) {
      this.setState({
        group: state.group
      });
      console.log("state.group: ", state.group);
    }
  }

  render() {
    const { group } = this.state;
    return (
      <div style={styles.container}>
        <MainNavBar inGroup={true} groupName={group.groupName} />
        <ActionBar />
        <div style={styles.subContainer}>
          <div style={styles.sidebarContainer}>
            <Card>
              <Typography>Hello</Typography>
            </Card>
          </div>
          <div style={styles.listContainer}>
            <Card>
              <Typography>Hello</Typography>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupHomePage;
