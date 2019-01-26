import React from "react";
import { Button, Typography } from "@material-ui/core";

const styles = {
  container: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  buttonContainer: {
    borderColor: "#a6a6a6",
    marginTop: 10,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 50
  },
  buttonText: {
    color: "#a6a6a6"
  }
};
class Suggestions extends React.Component {
  render() {
    const { suggestions, handleSchoolClick } = this.props;
    return (
      <div style={styles.container}>
        {suggestions.map(item => (
          <Button
            onClick={() => handleSchoolClick(item.institution)}
            style={styles.buttonContainer}
            variant="outlined"
          >
            <Typography style={styles.buttonText}>
              {item.institution}
            </Typography>
          </Button>
        ))}
      </div>
    );
  }
}

export default Suggestions;
