import React from "react";
import { Typography, TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons/";

const styles = {
  container: {
    width: "70%",
    maxWidth: 750,
    alignSelf: "center",
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    marginTop: 10,
    opacity: 0.7,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20
  }
};
class SearchBar extends React.Component {
  render() {
    return (
      <TextField
        InputProps={{
          disableUnderline: true,
          style: { color: "darkgray" },
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
        autoFocus
        style={styles.container}
      />
    );
  }
}

export default SearchBar;
