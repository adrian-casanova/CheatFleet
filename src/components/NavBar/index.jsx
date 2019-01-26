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
  Button,
  Tooltip
} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { AccountCircle, Notifications } from "@material-ui/icons";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import { primaryBlue } from "../../styles";
import GroupSearchBar from "../../pages/ChooseGroupsPage/components/GroupSearchBar";

const styles = {
  appBar: {
    backgroundColor: primaryBlue,
    minHeight: 50,
    maxHeigth: 50
  },
  toolbar: {
    minHeight: 50,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  schoolName: {
    color: "white"
  },
  icon: {
    color: "white",
    cursor: "pointer"
  },
  button: {
    width: 100,
    height: 35,
    borderColor: "white"
  },
  buttonText: {
    color: "white"
  }
};
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      windowWidth: window.innerWidth
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
  render() {
    const { schoolName, anySelected, handleContinueClick } = this.props;
    const { menuOpen, windowWidth } = this.state;
    return (
      <div>
        <AppBar style={styles.appBar} position="sticky">
          <Toolbar style={styles.toolbar}>
            {windowWidth > 700 ? (
              <Typography style={styles.schoolName} variant="title">
                {schoolName}
              </Typography>
            ) : null}
            <GroupSearchBar />
            {anySelected && (
              <Button
                variant="outlined"
                onClick={handleContinueClick}
                style={styles.button}
              >
                <Typography style={styles.buttonText}>Continue</Typography>
              </Button>
            )}
            <div>
              <Tooltip title="Notifications">
                <IconButton style={styles.icon}>
                  <Notifications fontSize="large" style={styles.icon} />
                </IconButton>
              </Tooltip>
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
                        <MenuItem onClick={this.handleClose}>
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

export default withRouter(NavBar);
