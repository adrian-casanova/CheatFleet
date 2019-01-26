import React, { Component } from "react";
import { Card, Typography, Divider } from "@material-ui/core";
import { primaryBlue } from "../../../../styles";

const styles = {
  title: {
    color: "gray"
  },
  description: {
    color: "gray",
    marginTop: 10
  }
};
class GroupGrad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      description,
      teacherName,
      subject,
      groupName,
      isSelected,
      index,
      handleCardClick,
      item,
      schoolName
    } = this.props;
    return (
      <React.Fragment>
        {item === schoolName ? null : (
          <Card
            onClick={() => handleCardClick(index)}
            style={{
              minHeight: 260,
              maxHeight: 260,
              minWidth: 280,
              maxWidth: 280,
              marginTop: 20,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              boxShadow: isSelected ? `0px 1px 10px 1px ${primaryBlue}` : null
            }}
          >
            <Typography variant="subheading" style={styles.title}>
              {groupName}
            </Typography>
            <Divider style={{ backgroundColor: primaryBlue }} />
            {description ? (
              <Typography variant="caption" style={styles.description}>
                {description}
              </Typography>
            ) : (
              <Typography variant="caption" style={styles.description}>
                {" "}
                No description...
              </Typography>
            )}
          </Card>
        )}
      </React.Fragment>
    );
  }
}

export default GroupGrad;
