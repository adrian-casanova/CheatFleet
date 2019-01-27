import React from "react";
import {
  TextField,
  InputAdornment,
  Popper,
  Fade,
  Paper,
  Typography
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

const styles = {
  container: {
    width: "40%",
    border: "1px solid lightgray",
    borderRadius: 25,
    height: 30,
    paddingLeft: 30,
    opacity: 0.8,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white"
  },
  icon: {
    color: "gray"
  }
};

class GroupSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { anchorEl, handleSearchInput, inGroup } = this.props;
    return (
      <>
        <TextField
          placeholder={inGroup ? "Search Cheats" : "Search Groups"}
          style={styles.container}
          onChange={e => handleSearchInput(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <Search style={styles.icon} />
              </InputAdornment>
            ),
            disableUnderline: true
          }}
        />
      </>
    );
  }
}

export default GroupSearchBar;
