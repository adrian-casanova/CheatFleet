import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  withStyles,
  Popper,
  Fade,
  Paper,
  Typography
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { PropTypes } from "prop-types";
import { primaryBlue } from "../../styles";
// import { themeMediumBlue } from '../../styles/variables';

const styles = {
  root: {
    height: 35,
    width: 300,
    backgroundColor: "#FBFBFB",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#FFFFFF"
    },
    "&$focused": {
      backgroundColor: "#FFFFFF"
    },
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: primaryBlue,
      borderWidth: 2
    },
    "&$focused $notchedOutline": {
      borderColor: primaryBlue,
      borderWidth: 2
    }
  },
  disabled: {},
  focused: {},
  error: {},
  notchedOutline: {},
  iconBlur: {
    color: "#758491"
  },
  typography: {
    paddingTop: 5,
    paddingBottom: 5,
    "&:hover": {
      color: primaryBlue,
      cursor: "pointer"
    }
  },
  iconFocus: {
    color: "#00A0B4"
  }
};

const SearchBar = ({
  placeHolder,
  classes,
  items,
  onChange,
  handleBlur,
  onItemClick,
  errorMessage
}) => {
  const [textFieldFocused, setTextFieldFocused] = useState(false);
  const [mouseIn, setMouseIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleTextFieldFocus = () => {
    setTextFieldFocused(true);
    setMouseIn(true);
  };
  const handleTextFieldBlur = () => {
    setTextFieldFocused(false);
    setMouseIn(false);
    handleBlur();
  };

  const handleItemClick = (e, item) => {
    setSearchValue(item);
    if (onItemClick) {
      onItemClick(item);
    }
    // e.stopPropagation()
  };

  const handleMouseEnter = () => {
    if (textFieldFocused) {
      return;
    }
    setMouseIn(true);
  };

  const handleMouseLeave = () => {
    if (textFieldFocused) {
      return;
    }
    setMouseIn(false);
  };

  const handleInputChange = ({ target, currentTarget }) => {
    setSearchValue(target.value);
    setAnchorEl(currentTarget);
    onChange(target.value);
  };
  return (
    <div>
      <TextField
        onFocus={handleTextFieldFocus}
        onBlur={handleTextFieldBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        error={errorMessage}
        helperText={errorMessage}
        value={searchValue}
        InputProps={{
          classes,
          endAdornment: (
            <InputAdornment>
              <Search
                classes={{
                  root:
                    textFieldFocused || mouseIn
                      ? classes.iconFocus
                      : classes.iconBlur
                }}
              />
            </InputAdornment>
          )
        }}
        variant="outlined"
        placeholder={placeHolder}
        onChange={handleInputChange}
      />
      <Popper
        style={{ zIndex: 1200 }}
        open={items.length}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              style={{
                width: 310,
                marginLeft: 40,
                height: "100%",
                padding: 20
              }}
            >
              {items.map(item => (
                <Typography
                  variant="subheading"
                  classes={{ root: classes.typography }}
                  onMouseDown={e => handleItemClick(e, item.institution)}
                >
                  {item.institution}
                </Typography>
              ))}
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

SearchBar.propTypes = {
  /** string that defines the placeholder text * */
  placeHolder: PropTypes.string,
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
};

SearchBar.defaultProps = {
  placeHolder: "Search",
  items: []
};

export default withStyles(styles)(SearchBar);
