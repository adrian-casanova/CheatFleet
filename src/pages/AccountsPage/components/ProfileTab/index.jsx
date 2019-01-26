import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { primaryBlue } from "../../../../styles";

const styles = {
  containerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%"
  },
  containerColumn: {
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
    height: 350,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  textFieldContainer: {
    backgroundColor: "white",
    borderTop: "1px solid gray",
    borderRight: "1px solid gray",
    borderLeft: "1px solid gray",
    width: 300
  },
  textFieldMargin: {
    marginLeft: 20,
    marginTop: 20
  },
  button: {
    marginTop: 40,
    marginLeft: 20,
    borderColor: primaryBlue
  }
};
class ProfileTab extends React.Component {
  render() {
    const { firstName, lastName, description, email, schoolName } = this.props;
    return (
      <React.Fragment>
        <div style={styles.containerRow}>
          <div style={styles.containerColumn}>
            <TextField
              InputProps={{ style: styles.textFieldContainer }}
              style={styles.textFieldMargin}
              variant="filled"
              label="First name"
              value={firstName}
            />
            <TextField
              InputProps={{ style: styles.textFieldContainer }}
              style={styles.textFieldMargin}
              variant="filled"
              label="Last name"
              value={lastName}
            />
            <TextField
              style={styles.textFieldMargin}
              InputProps={{ style: styles.textFieldContainer }}
              variant="filled"
              label="Short description"
              value={description}
            />
            <Button style={styles.button} variant="outlined">
              Save
            </Button>
          </div>
          <div style={styles.containerColumn}>
            <TextField
              style={styles.textFieldMargin}
              // InputProps={{ style: styles.textFieldContainer }}
              disabled
              InputProps={{ style: { width: 300 } }}
              variant="filled"
              label="Email"
              value={email}
            />
            <TextField
              style={styles.textFieldMargin}
              disabled
              InputProps={{ style: { width: 300 } }}
              // InputProps={{ style: styles.textFieldContainer }}
              variant="filled"
              label="School"
              value={schoolName}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileTab;
