import React from "react";
import {
  Dialog,
  DialogTitle,
  Divider,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import { primaryBlue } from "../../../../styles";
import { createGroup } from "../../../../services/GroupService";

const styles = {
  textField: {
    alignSelf: "center",
    height: 50,
    width: "80%",
    display: "flex",
    justifyContent: "center",
    border: "1px solid lightgray",
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10
  },
  textFieldDescription: {
    alignSelf: "center",
    height: 100,
    width: "80%",
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: 10,
    border: "1px solid lightgray",
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    backgroundColor: primaryBlue,
    width: "83%",
    marginTop: 10,
    alignSelf: "center",
    height: 50
  },
  buttonText: {
    color: "white"
  }
};
class CreateGroupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      teacherName: "",
      subject: "",
      description: ""
    };
  }
  handleInputChange = ({ target }) => {
    this.setState({
      [target.id]: target.value
    });
  };

  handleCreateGroup = () => {
    const { schoolName, handleCloseDialog, updateGroups } = this.props;
    const { groupName, teacherName, subject, description } = this.state;
    createGroup({
      groupName,
      teacherName,
      subject,
      description,
      schoolName
    })
      .then(resp => {
        updateGroups();
        handleCloseDialog();
      })
      .catch(e => console.log("e: ", e));
  };
  render() {
    const { dialogOpen, handleCloseDialog } = this.props;
    const { groupName, teacherName, subject, description } = this.state;
    return (
      <Dialog
        style={styles.container}
        onBackdropClick={handleCloseDialog}
        open={dialogOpen}
        PaperProps={{ style: { width: 700, paddingBottom: 20 } }}
      >
        <DialogTitle>Create a New Group</DialogTitle>
        <Divider />
        <TextField
          InputProps={{ disableUnderline: true }}
          style={styles.textField}
          id="groupName"
          value={groupName}
          onChange={this.handleInputChange}
          placeholder="Enter group name (required)"
        />
        <TextField
          InputProps={{ disableUnderline: true }}
          style={styles.textField}
          id="teacherName"
          value={teacherName}
          onChange={this.handleInputChange}
          placeholder="Teacher name (required)"
        />
        <TextField
          InputProps={{ disableUnderline: true }}
          style={styles.textField}
          id="subject"
          value={subject}
          onChange={this.handleInputChange}
          placeholder="Subject (required)"
        />
        <TextField
          InputProps={{ disableUnderline: true }}
          style={styles.textFieldDescription}
          multiline
          id="description"
          value={description}
          onChange={this.handleInputChange}
          placeholder="Enter description (optional)"
        />
        <Button
          onClick={this.handleCreateGroup}
          style={styles.button}
          variant="raised"
        >
          <Typography style={styles.buttonText}>Create Group</Typography>
        </Button>
      </Dialog>
    );
  }
}

export default CreateGroupDialog;
