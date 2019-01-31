import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Popper,
  Grow,
  Paper,
  MenuItem,
  MenuList,
  IconButton,
  Tooltip
} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { AccountCircle, Add, MoreHoriz } from "@material-ui/icons";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import { primaryBlue } from "../../styles";
import GroupSearchBar from "../../pages/ChooseGroupsPage/components/GroupSearchBar";

const styles = {
  appBar: {
    backgroundColor: "white",
    minHeight: 50,
    maxHeigth: 50,
    boxShadow: "0px 0px 0px 0px white",
    borderBottom: "1px solid",
    borderBottomColor: "#f2f2f2"
  },
  toolbar: {
    minHeight: 50,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  schoolName: {
    color: "gray",
    cursor: "pointer"
  },
  icon: {
    color: primaryBlue,
    cursor: "pointer"
  },
  button: {
    width: 100,
    height: 35,
    borderColor: primaryBlue
  },
  buttonText: {
    color: primaryBlue
  }
};
class MainNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      windowWidth: window.innerWidth,
      anchorEl: ""
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };
  handleOpenMenu = () => {
    this.setState({
      menuOpen: true
    });
  };

  handleCloseMenu = () => {
    this.setState({
      menuOpen: false
    });
  };

  handleUserSignOut = () => {
    firebase.auth().signOut();
    this.props.history.push("/");
  };

  handleSearchInput = (e, currentTarget) => {
    this.setState({
      searchInputVal: e.target.value,
      anchorEl: currentTarget
    });
  };

  handleAccountClick = () => {
    this.props.history.push("/account");
  };

  handleTitleClick = () => {
    this.props.history.push("/");
  };
  render() {
    const { groupName, handleOpenAddCheatDialog, inGroup } = this.props;
    const { menuOpen, windowWidth, anchorEl } = this.state;
    return (
      <div>
        <AppBar style={styles.appBar} position="sticky">
          <Toolbar style={styles.toolbar}>
            {windowWidth > 700 ? (
              <Typography
                onClick={this.handleTitleClick}
                style={styles.schoolName}
                variant="title"
              >
                {groupName}
              </Typography>
            ) : null}
            <GroupSearchBar
              handleSearchInput={this.handleSearchInput}
              anchorEl={anchorEl}
              inGroup={inGroup}
            />
            <div>
              <Tooltip title="User">
                <IconButton
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  style={styles.icon}
                >
                  <AccountCircle
                    fontSize="large"
                    onClick={this.handleOpenMenu}
                    style={styles.icon}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="More">
                <IconButton style={styles.icon}>
                  <MoreHoriz fontSize="large" style={styles.icon} />
                </IconButton>
              </Tooltip>
            </div>
            <Popper
              open={menuOpen}
              anchorEl={this.anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper style={{ marginTop: 20 }}>
                    <ClickAwayListener onClickAway={this.handleCloseMenu}>
                      <MenuList>
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleAccountClick}>
                          My account
                        </MenuItem>
                        <MenuItem onClick={this.handleUserSignOut}>
                          Logout
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(MainNavBar);
