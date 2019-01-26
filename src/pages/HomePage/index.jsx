import React from "react";
import { Grid, GridList } from "@material-ui/core";
import MainNavBar from "../../components/MainNavBar";
import AddCheatDialog from "./components/AddCheatDialog";
import { getUsersSchool } from "../../services/SchoolService";
import { AddCheat, handleGetAllCheats } from "../../services/CheatService";
import { getAllGroups } from "../../services/GroupService";
import CheatCard from "../../components/CheatCard";
import ActionBar from "./components/ActionBar";
import SideBar from "../../components/SideBar";
import OpenedCheatCard from "../../components/OpenedCheatCard";

const styles = {
  grid: {
    width: "100%",
    alignSelf: "center",
    padding: 50
    // paddingLeft: 40,
    // paddingRight: 40
  },
  gridList: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
    // height: 450
  },
  container: {
    display: "flex",
    flexDirection: "column"
  }
};
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: "",
      addCheatDialogOpen: false,
      listOfGroups: "",
      cheatsList: [],
      windowWidth: window.innerWidth,
      cardOpened: false
    };
  }
  componentDidMount() {
    this.handleCheckUsersSchool();
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };
  handleCheckUsersSchool = () => {
    const { user } = this.props;
    getUsersSchool(user.email)
      .then(resp => {
        const { school } = resp.docs[0].data();
        this.setState({
          schoolName: school
        });
        this.handleGetListOfGroups(school);
        this.handleGetCheats(school);
      })
      .catch(e => {
        console.log("e: ", e);
      });
  };

  handleGetListOfGroups = schoolName => {
    getAllGroups(schoolName)
      .then(resp => {
        const listOfGroups = [];
        Object.values(resp.data()).forEach(doc => {
          if (doc.groupName) {
            listOfGroups.push(doc);
          }
        });
        console.log("listOfGroups: ", listOfGroups);
        this.setState({
          listOfGroups,
          defaultListOfGroups: listOfGroups
        });
      })
      .catch(e => {
        console.log("e: ", e);
      });
  };

  handleOpenAddCheatDialog = () => {
    this.setState({
      addCheatDialogOpen: true
    });
  };
  handleCloseAddCheatDialog = () => {
    this.setState({
      addCheatDialogOpen: false
    });
  };

  handleAddCheat = (cheatTitle, cheatBody, groupName) => {
    const { user } = this.props;
    const { schoolName } = this.state;
    AddCheat({
      schoolName,
      groupName,
      cheatTitle,
      cheatBody,
      userId: user.email
    })
      .then(() => {
        this.setState({
          addCheatDialogOpen: false
        });
        this.handleGetCheats(this.state.schoolName);
      })
      .catch(e => {
        alert("e");
      });
  };

  handleGetCheats = schoolName => {
    handleGetAllCheats({ schoolName }).then(resp => {
      if (resp.exists) {
        const cheats = [];
        Object.values(resp.data()).forEach(doc => {
          cheats.push(doc);
        });
        this.setState({
          cheatsList: cheats
        });
      }
    });
  };

  handleCardClick = () => {
    this.setState({
      cardOpened: true
    });
  };

  render() {
    const {
      schoolName,
      addCheatDialogOpen,
      listOfGroups,
      cheatsList,
      windowWidth,
      cardOpened
    } = this.state;
    console.log("cheatsList: ", cheatsList);
    return (
      <div style={styles.container}>
        <MainNavBar
          handleOpenAddCheatDialog={this.handleOpenAddCheatDialog}
          groupName={schoolName}
        />
        <ActionBar />
        <AddCheatDialog
          handleCloseAddCheatDialog={this.handleCloseAddCheatDialog}
          dialogOpen={addCheatDialogOpen}
          listOfGroups={listOfGroups}
          handleAddCheat={this.handleAddCheat}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: 40,
            paddingBttom: 40,
            paddingLeft: 40,
            paddingRight: 10
          }}
        >
          {windowWidth > 750 && <SideBar />}
          {!cardOpened ? (
            <GridList cellHeight={160} style={styles.gridList} cols={3}>
              {cheatsList.map(item => (
                <CheatCard
                  postedBy="Adrian Casanova"
                  comments={item.comments}
                  title={item.cheatTitle}
                  description={item.cheatBody}
                  votes={item.likes}
                  date={item.postDateMs}
                  handleCardClick={this.handleCardClick}
                  groupName={item.groupName}
                />
              ))}
            </GridList>
          ) : (
            <OpenedCheatCard />
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
