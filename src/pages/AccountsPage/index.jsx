import React from "react";
import { Card, Tabs, Tab, Typography } from "@material-ui/core";
import MainNavBar from "../../components/MainNavBar";
import ProfileTab from "./components/ProfileTab";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  cardContainer: {
    height: 600,
    width: "100%",
    padding: 50
  },
  pageContainer: {
    display: "flex",
    padding: 50
  },
  tabs: {
    marginTop: 20,
    borderBottom: "1px solid gray"
  }
};
class AccountsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };
  }

  handleTabChange = (_, value) => {
    this.setState({
      currentTab: value
    });
  };

  render() {
    const { currentTab } = this.state;
    const { user } = this.props;
    console.log("user: ", user);
    return (
      <div style={styles.container}>
        <MainNavBar groupName="Cheat Fleet" />
        <div style={styles.pageContainer}>
          <Card style={styles.cardContainer}>
            <Typography variant="title">My Account</Typography>
            <Tabs
              style={styles.tabs}
              value={currentTab}
              onChange={this.handleTabChange}
            >
              <Tab value={0} label="Profile" />
              <Tab value={1} label="Settings" />
              <Tab value={2} label="Notifications" />
              <Tab value={3} label="Preferences" />
            </Tabs>
            {currentTab === 0 && (
              <ProfileTab
                firstName={user.firstName}
                lastName={user.lastName}
                schoolName={user.school}
                email={user.email}
              />
            )}
          </Card>
        </div>
      </div>
    );
  }
}

export default AccountsPage;
