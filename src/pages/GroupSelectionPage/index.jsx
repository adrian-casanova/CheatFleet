import React, { useState } from "react";
import { Typography, Card, Button, Grid } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import { primaryBlue } from "../../styles";
import SimpleDropDown from "../../components/SimpleDropDown";
import GroupCard from "./components/GroupCard";
import Footer from "../../components/Footer";
import NewGroupDialog from "./components/NewGroupDialog";
import GenericDialog from "../../components/GenericDialog";

const sample = [
  {
    value: 1,
    headerColor: "#e7a047"
  },
  {
    value: 2,
    headerColor: "#3b5998"
  },
  {
    value: 3,
    headerColor: "#f79489"
  },
  {
    value: 4,
    headerColor: "#9b6b8e"
  },
  {
    value: 5,
    headerColor: "#c5919d"
  },
  {
    value: 6,
    headerColor: "#434a3f"
  }
];

const styles = {
  mainBar: {
    backgroundColor: "rgba(82,82,84,0.9)",
    height: 250,
    width: "100%",
    paddingTop: 40,
    marginTop: 55
  },
  welcomeText: {
    color: "white",
    maxWidth: "90%",
    paddingLeft: 20,
    paddingRight: 20
  },
  subTitle: {
    color: "white",
    marginTop: 15,
    maxWidth: "85%",
    paddingLeft: 20,
    paddingRight: 20
  },
  groupsChosenCard: {
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    top: 280,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 65,
    paddingRight: 65,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-between"
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between"
  },
  cardSubContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  continueButton: {
    color: "white",
    width: 150,
    height: 40
  },
  subheading: {
    fontSize: 22,
    color: "gray",
    maxWidth: 500
  },
  toolbarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addBoxIcon: {
    color: "white",
    height: 50,
    width: 50,
    cursor: "pointer"
  },
  groupsList: {
    width: "100%",
    marginTop: 150,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40
  }
};
const GroupSelectionPage = () => {
  const [groupsSelected, setGroupsSelected] = useState([]);
  const [groups, setGroups] = useState(sample);
  const [sortedBy, setSortedBy] = useState("Most Cheaters");
  const [newGroupDialogOpen, setNewGroupDialogOpen] = useState(false);
  const [noGroupsDialogOpen, setNoGroupsDialogOpen] = useState(false);

  const handleSortedByChange = ({ target }) => {
    setSortedBy(target.value);
  };

  const handleContinueClick = () => {
    if (!groupsSelected.length) {
      setNoGroupsDialogOpen(true);
    }
  };

  const handleCloseNoGroupsDialog = () => {
    setNoGroupsDialogOpen(false);
  };

  const handleGroupsSelected = () => {
    setNoGroupsDialogOpen(false);
  };

  const handleOpenNewGroupDialog = () => {
    setNewGroupDialogOpen(true);
  };
  const handleCloseNewGroupDialog = () => {
    setNewGroupDialogOpen(false);
  };

  const handleCardClick = index => {
    const newGroup = Object.assign(groups[index], {
      isSelected: groups[index].isSelected ? false : true
    });
    groups.slice(index, 1, newGroup);
    const numberSelected = groups.filter(item => item.isSelected === true);
    setGroupsSelected(numberSelected);
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <NewGroupDialog
        handleDialogClose={handleCloseNewGroupDialog}
        handleDialogSubmit={handleCloseNewGroupDialog}
        dialogOpen={newGroupDialogOpen}
      />
      <GenericDialog
        dialogOpen={noGroupsDialogOpen}
        outlinedButtonText="Go back and join group(s)"
        raisedButtonText="Yes, I'm sure"
        onRaisedClick={handleGroupsSelected}
        onOutlinedClick={handleCloseNoGroupsDialog}
        dialogTitle="Hey there! We see you haven't joined any groups."
      >
        <Typography variant="body1">
          Are you sure you want to continue without joining any groups?
        </Typography>
      </GenericDialog>
      <div style={styles.mainBar}>
        <div style={styles.titleContainer}>
          <Typography variant="display1" style={styles.welcomeText}>
            Welcome to CheatFleet!
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 10
            }}
          >
            <AddBox
              onClick={handleOpenNewGroupDialog}
              style={styles.addBoxIcon}
            />
            <Typography
              variant="subheading"
              style={{ color: "white", marginTop: 10, textAlign: "center" }}
            >
              Create a new group
            </Typography>
          </div>
        </div>
        <Typography variant="subheading" style={styles.subTitle}>
          Now that you've signed up, go ahead and pick out a few groups you'd
          like to be a part of (Don't worry you can join more later whenever you
          want!)
        </Typography>
      </div>
      <Card style={styles.groupsChosenCard}>
        <Typography variant="headline">
          {groupsSelected.length} Group(s) Selected
        </Typography>
        <div style={styles.cardSubContainer}>
          <Typography style={styles.subheading} variant="subheading">
            Once you're finished choosing your groups, click here to continue.
          </Typography>
          <Button
            color="primary"
            variant="raised"
            onClick={handleContinueClick}
            style={styles.continueButton}
          >
            Continue
          </Button>
        </div>
        <div style={styles.toolbarContainer}>
          <Typography style={{ marginRight: 10 }} variant="body1">
            Sort by
          </Typography>
          <SimpleDropDown
            items={["Most Cheaters", "Least Cheaters", "Newest", "Oldest"]}
            value={sortedBy}
            handleChange={handleSortedByChange}
          />
        </div>
      </Card>
      <Grid
        spacing={16}
        justify="center"
        container
        style={styles.groupsList}
        direction="row"
      >
        {groups.map((item, idx) => (
          <Grid item>
            <GroupCard
              item={item}
              index={idx}
              handleCardClick={handleCardClick}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GroupSelectionPage;
