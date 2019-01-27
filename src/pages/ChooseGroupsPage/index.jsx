import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import NavBar from "../../components/NavBar";
import CreateGroupCard from "./components/CreateGroupCard";
import GroupSearchBar from "./components/GroupSearchBar";
import GroupCard from "./components/GroupCard";
import CreateGroupDialog from "./components/CreateGroupDialog";
import { getAllGroups, addGroupsToUser } from "../../services/GroupService";
import { primaryBlue } from "../../styles";
import { getUsersSchool } from "../../services/SchoolService";

const styles = {
  grid: {
    width: "100%",
    marginTop: 50,
    alignSelf: "center"
    // paddingLeft: 40,
    // paddingRight: 40
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  titleText: {
    color: "gray",
    marginTop: 30,
    alignSelf: "center"
  },
  button: {
    width: "20%",
    height: 50,
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: primaryBlue
  },
  buttonText: {
    color: "white"
  }
};
class ChooseGroupsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: "",
      createGroupOpen: false,
      groups: [],
      anySelected: false,
      uid: ""
    };
  }
  componentDidMount() {
    const { user } = this.props;
    this.setState({
      uid: user.uid
    });
    getUsersSchool(user.email)
      .then(resp => {
        const { school } = resp.docs[0].data();
        this.handleGettingGroups(school);
      })
      .catch(e => console.log("e: ", e));
  }

  handleGettingGroups = schoolName => {
    getAllGroups(schoolName)
      .then(resp =>
        this.setState({ groups: Object.values(resp.data()), schoolName })
      )
      .catch(e => console.log("e: ", e));
  };

  handleNewGroupClick = () => {
    this.setState({
      createGroupOpen: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      createGroupOpen: false
    });
  };
  handleCardClick = index => {
    const { groups } = this.state;
    const newGroup = Object.assign(groups[index], {
      isSelected: groups[index].isSelected ? false : true
    });
    groups.slice(index, 1, newGroup);
    const anySelected = groups.find(item => item.isSelected === true);
    this.setState({
      groups,
      anySelected
    });
  };

  getSelectedGroups = () => {
    const { groups } = this.state;
    const selectedGroups = [];
    groups.forEach(group => {
      if (group.isSelected === true) {
        selectedGroups.push(group.groupId);
      }
    });
    return selectedGroups;
  };

  handleContinueClick = () => {
    const { uid } = this.state;
    const groups = this.getSelectedGroups();
    addGroupsToUser(uid, groups)
      .then(resp => {
        this.props.history.push("/");
      })
      .catch(e => alert(e));
  };

  updateGroups = () => {
    const { schoolName } = this.state;
    console.log("schoolName: ", schoolName);
    getAllGroups(schoolName, true)
      .then(resp => this.setState({ groups: Object.values(resp.data()) }))
      .catch(e => console.log("e: ", e));
  };

  render() {
    const { schoolName, createGroupOpen, groups, anySelected } = this.state;
    return (
      <div style={styles.container}>
        <CreateGroupDialog
          handleCloseDialog={this.handleCloseDialog}
          dialogOpen={createGroupOpen}
          schoolName={schoolName}
          updateGroups={this.updateGroups}
        />
        <NavBar
          handleContinueClick={this.handleContinueClick}
          schoolName={schoolName}
          anySelected={anySelected}
        />
        <Grid
          xs={12}
          justify="space-evenly"
          alignItems="flex-start"
          container
          spacing={32}
          direction="row"
          style={styles.grid}
        >
          <CreateGroupCard handleNewGroupClick={this.handleNewGroupClick} />
          {groups.map((item, index) => (
            <GroupCard
              item={item}
              schoolName={schoolName}
              description={item.description}
              teacherName={item.teacherName}
              subject={item.subject}
              index={index}
              isSelected={item.isSelected}
              groupName={item.groupName}
              handleCardClick={this.handleCardClick}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default ChooseGroupsPage;
