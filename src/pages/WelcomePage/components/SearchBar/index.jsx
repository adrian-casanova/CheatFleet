import React from "react";
import { Typography, TextField, InputAdornment } from "@material-ui/core";
import { Search, CloseRounded } from "@material-ui/icons/";

const styles = {
  container: {
    width: "70%",
    maxWidth: 750,
    alignSelf: "center",
    height: 50,
    minHeight: 50,
    backgroundColor: "white",
    borderRadius: 25,
    marginTop: 10,
    opacity: 0.7,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  clearButton: {
    cursor: "pointer"
  }
};
class SearchBar extends React.Component {
  render() {
    const { searchValue, handleSearchTextChange, handleClearText } = this.props;
    return (
      <TextField
        autoComplete="off"
        value={searchValue}
        onChange={handleSearchTextChange}
        placeholder="Enter your school"
        InputProps={{
          disableUnderline: true,
          style: { color: "darkgray" },
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <CloseRounded
                style={styles.clearButton}
                onClick={handleClearText}
              />
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
