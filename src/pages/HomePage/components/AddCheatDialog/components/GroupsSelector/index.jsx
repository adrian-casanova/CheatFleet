import React from "react";
import {
  TextField,
  Popper,
  Fade,
  Paper,
  Typography,
  MenuItem
} from "@material-ui/core";

const styles = {
  textField: {
    alignSelf: "center",
    height: 50,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    border: "1px solid lightgray",
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10
  }
};
class GroupsSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      listOfGroups,
      suggestions,
      anchorEl,
      handleInputChange,
      onBlur,
      onFocus,
      handleGroupClick,
      groupNameValue
    } = this.props;
    return (
      <React.Fragment>
        <TextField
          InputProps={{ disableUnderline: true }}
          style={styles.textField}
          id="groupNameValue"
          onChange={e => handleInputChange(e)}
          onBlur={onBlur}
          onFocus={onFocus}
          value={groupNameValue}
          placeholder="Enter group"
        />
        <Popper
          style={{ zIndex: 1500, marginTop: 20 }}
          anchorEl={anchorEl}
          open={!!suggestions.length}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                style={{ position: "absolute", left: -305, minWidth: 600 }}
              >
                {suggestions.map(item => (
                  <MenuItem
                    onMouseDown={e => handleGroupClick(e, item.groupName)}
                    value={item.groupName}
                  >
                    {item.groupName}
                  </MenuItem>
                ))}
              </Paper>
            </Fade>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}

export default GroupsSelector;
