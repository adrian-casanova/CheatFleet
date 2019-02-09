import React from "react";
import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  withStyles
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import { primaryBlue } from "../../styles";

const styles = {
  root: {
    // backgroundColor: '#FBFBFB',
    // border: '0.5px solid #758491',
    height: 40,
    width: 170,
    textAlign: "start",
    // borderRadius: 5,
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
  menuItem: {
    "&$selected:hover": {
      backgroundColor: "#FFFFFF"
    },
    "&:hover:not($selected)": {
      color: primaryBlue,
      backgroundColor: "#FFFFFF"
    }
  },
  selectFocused: {
    "&:focus": {
      backgroundColor: "rgba(0,0,0,0)"
    }
  }
};

class SimpleDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: ""
    };
  }
  handleRef = e => {
    console.log("e.cuurentTarget", e.currentTarget);
    this.setState({
      anchorEl: e.currentTarget
    });
  };
  render() {
    const { classes, value, items, handleChange, disabled } = this.props;
    const { anchorEl } = this.state;
    return (
      <FormControl variant="outlined">
        <Select
          value={value}
          autoFocus={false}
          onChange={handleChange}
          classes={{ select: classes.selectFocused }}
          MenuProps={{
            anchorEl,
            transformOrigin: { vertical: -55, horizontal: "left" },
            anchorReference: "anchorEl"
          }}
          onClick={this.handleRef}
          input={
            <OutlinedInput disabled={disabled} classes={classes} name="age" />
          }
        >
          {items.map(item => (
            <MenuItem
              classes={{ root: classes.menuItem }}
              style={{ backgroundColor: "white" }}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

SimpleDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
  /** current value for select */
  value: PropTypes.any,
  /** array of menu items available */
  items: PropTypes.array,
  /** function that handle input change */
  handleChange: PropTypes.func,
  /** bool to determine if select is disabled */
  disabled: PropTypes.bool
};

SimpleDropDown.defaultProps = {
  value: "hello",
  items: [],
  handleChange: () => {},
  disabled: false
};

export default withStyles(styles)(SimpleDropDown);
