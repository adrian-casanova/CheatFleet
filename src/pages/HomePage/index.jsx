import React from "react";
import {
  Grid,
  GridList,
  Slide,
  Fade,
  Button,
  Typography
} from "@material-ui/core";
import MainNavBar from "../../components/MainNavBar";
import AddCheatDialog from "./components/AddCheatDialog";
import { getUsersSchool } from "../../services/SchoolService";
import {
  AddCheat,
  handleGetAllCheats,
  upVoteCheat,
  downVoteCheat
} from "../../services/CheatService";
import { getAllGroups } from "../../services/GroupService";
import CheatCard from "../../components/CheatCard";
import ActionBar from "./components/ActionBar";
import SideBar from "../../components/SideBar";
import OpenedCheatCard from "../../components/OpenedCheatCard";
import ListCard from "./components/ListCard";
import { AddComment } from "../../services/CommentService";
import { sortData } from "../../helperFunctions";
import { uploadCheatFile } from "../../services/StorageService";
import { primaryBlue } from "../../styles";
import ToolBar from "./components/ToolBar";

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
    justifyContent: "center",
    // height: "100%",
    paddingBottom: 5,
    margin: 0
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
      cardOpened: false,
      gridView: true,
      cheatOpened: "",
      commentInput: ""
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
        this.handleGetUsersGroups(listOfGroups);
        this.setState({
          listOfGroups,
          defaultListOfGroups: listOfGroups
        });
      })
      .catch(e => {
        console.log("e: ", e);
      });
  };

  handleGetUsersGroups = groups => {
    const { user } = this.props;
    const list = [];
    const userGroups = user.groups;
    groups.forEach(group => {
      if (userGroups.includes(group.groupId)) {
        list.push(group);
      }
    });
    this.setState({
      userGroups: list
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

  handleGetCheats = (schoolName, reload) => {
    this.setState({
      addCheatDialogOpen: false
    });
    handleGetAllCheats({ schoolName }, reload).then(resp => {
      if (resp.exists) {
        const cheats = [];
        Object.values(resp.data()).forEach(doc => {
          cheats.push(doc);
        });
        this.updateOpenedCheat(cheats);
        const sortedCheats = sortData(cheats, "postedTimeMs");
        this.setState({
          cheatsList: sortedCheats
        });
      }
    });
  };

  updateOpenedCheat = cheats => {
    const { cheatOpened } = this.state;
    if (cheatOpened) {
      const newCheatOpened = cheats.find(
        cheat => cheat.cheatId === cheatOpened.cheatId
      );
      this.setState({
        cheatOpened: newCheatOpened
      });
    }
  };

  handleCardClick = cheat => {
    this.setState({
      cardOpened: true,
      cheatOpened: cheat
    });
  };

  handleCloseCheatCard = () => {
    this.setState({
      cardOpened: false
    });
  };

  handleGroupClick = group => {
    const { groupId } = group;
    this.props.history.push({
      pathname: `/group/${groupId}`,
      state: {
        group
      }
    });
  };

  handleListViewClick = () => {
    this.setState({
      gridView: false
    });
  };

  handleGridViewClick = () => {
    this.setState({
      gridView: true
    });
  };

  handleCommentInputChange = ({ target }) => {
    this.setState({
      commentInput: target.value
    });
  };

  handleAddComment = () => {
    const { commentInput, cheatOpened, schoolName } = this.state;
    const { user } = this.props;
    const name = user.firstName.concat(" ", user.lastName);
    const currentDate = new Date().getTime();
    AddComment(commentInput, cheatOpened, name, schoolName, currentDate).then(
      () => {
        this.handleGetCheats(schoolName, true);
      }
    );
  };

  handleViewFile = url => {
    this.props.history.push({
      pathname: "/file-viewer",
      state: {
        url
      }
    });
  };

  handleUpVote = () => {
    const { schoolName, cheatOpened } = this.state;
    const { user } = this.props;
    upVoteCheat(schoolName, cheatOpened, user.email)
      .then(resp => {
        this.handleGetCheats(schoolName, true);
      })
      .catch(e => console.log("e: ", e));
  };

  handleDownVote = () => {
    const { schoolName, cheatOpened } = this.state;
    const { user } = this.props;
    downVoteCheat(schoolName, cheatOpened, user.email)
      .then(resp => {
        this.handleGetCheats(schoolName, true);
      })
      .catch(e => console.log("e: ", e));
  };

  render() {
    const {
      schoolName,
      addCheatDialogOpen,
      listOfGroups,
      cheatsList,
      windowWidth,
      cardOpened,
      userGroups,
      gridView,
      commentInput,
      cheatOpened
    } = this.state;
    console.log("cheatOpened: ", cheatOpened);
    const { user } = this.props;
    return (
      <div style={styles.container}>
        <MainNavBar groupName={schoolName} />
        <ActionBar
          handleGridViewClick={this.handleGridViewClick}
          handleListViewClick={this.handleListViewClick}
          gridView={gridView}
        />
        <AddCheatDialog
          handleCloseAddCheatDialog={this.handleCloseAddCheatDialog}
          dialogOpen={addCheatDialogOpen}
          listOfGroups={listOfGroups}
          handleAddCheat={this.handleAddCheat}
          schoolName={schoolName}
          user={user}
          handleGetCheats={this.handleGetCheats}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: 40,
            paddingBottom: 40,
            paddingRight: 35,
            paddingLeft: windowWidth > 750 ? 35 : 10,
            justifyContent: "space-between"
          }}
        >
          {windowWidth > 750 && (
            <SideBar
              handleGroupClick={this.handleGroupClick}
              userGroups={userGroups}
            />
          )}
          {!cardOpened ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                paddingRight: windowWidth > 750 ? 0 : 10,
                paddingLeft: windowWidth > 750 ? 0 : 10
              }}
            >
              <Slide direction="down" in>
                <ToolBar
                  handleOpenAddCheatDialog={this.handleOpenAddCheatDialog}
                />
              </Slide>
              {gridView ? (
                <GridList cellHeight={160} style={styles.gridList} cols={3}>
                  {cheatsList.map(item => (
                    <Slide
                      direction="up"
                      in={!cardOpened}
                      mountOnEnter
                      unmountOnExit
                    >
                      <CheatCard
                        postedBy={item.postedByName}
                        comments={item.comments}
                        title={item.cheatTitle}
                        cheat={item}
                        description={item.cheatBody}
                        votes={item.likes}
                        date={item.postDateMs}
                        handleCardClick={this.handleCardClick}
                        groupName={item.groupName}
                      />
                    </Slide>
                  ))}
                </GridList>
              ) : (
                <Slide direction="up" in={!gridView}>
                  <ListCard
                    cheatsList={cheatsList}
                    handleCheatClick={this.handleCardClick}
                  />
                </Slide>
              )}
            </div>
          ) : (
            <Slide direction="up" in={cardOpened} mountOnEnter unmountOnExit>
              <OpenedCheatCard
                handleCloseCheatCard={this.handleCloseCheatCard}
                cheatOpened={cheatOpened}
                user={user}
                handleUpVote={this.handleUpVote}
                handleDownVote={this.handleDownVote}
                commentInput={commentInput}
                handleAddComment={this.handleAddComment}
                handleViewFile={this.handleViewFile}
                handleCommentInputChange={this.handleCommentInputChange}
              />
            </Slide>
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
