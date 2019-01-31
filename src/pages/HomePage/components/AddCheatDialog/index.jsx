import React from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  Divider,
  Button,
  Typography
} from "@material-ui/core";
import { primaryBlue } from "../../../../styles";
import GroupsSelector from "./components/GroupsSelector";

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
  },
  textFieldDescription: {
    alignSelf: "center",
    height: 100,
    width: "100%",
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
    flexDirection: "column",
    padding: 20
  },
  button: {
    backgroundColor: primaryBlue,
    width: "83%",
    marginTop: 20,
    alignSelf: "center",
    height: 50
  },
  buttonText: {
    color: "white"
  },
  addFileButton: {
    width: 200,
    marginTop: 20,
    borderColor: primaryBlue
  },
  addFileText: {
    color: primaryBlue
  },
  addFileInput: {
    display: "none"
  }
};
class AddCheatDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cheatTitle: "",
      cheatBody: "",
      suggestions: [],
      inputFocused: false,
      groupNameValue: "",
      currentFile: "",
      currentFileBlob: ""
    };
    this.groupNameRef = {};
    this.reader = new FileReader();
  }
  componentDidMount() {
    this.handleFileReadCompletion();
  }

  handleFileReadCompletion = () => {
    this.reader.addEventListener("loadend", event => {
      const file = event.srcElement.result;
      console.log("file: ", file);
      const fileObject = {
        file,
        firstRowContent: "header",
        delimiter: ","
      };
    });
  };

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleCheatInputChange = ({ target }) => {
    this.setState({
      [target.id]: target.value
    });
  };

  handleCreateCheat = () => {
    const {
      cheatBody,
      cheatTitle,
      groupNameValue,
      currentFileBlob,
      currentFile
    } = this.state;
    this.props.handleAddCheat(
      cheatTitle,
      cheatBody,
      groupNameValue,
      currentFileBlob,
      currentFile.name
    );
    this.setState({
      cheatBody: "",
      cheatTitle: "",
      groupNameValue: ""
    });
  };

  handleGroupNameChange = ({ target, currentTarget }) => {
    const { value } = target;
    this.setState({
      groupName: value,
      groupNameValue: value,
      anchorEl: currentTarget
    });
    this.getSuggestions(value);
  };

  getSuggestions = value => {
    const { inputFocused } = this.state;
    if (!inputFocused) {
      return;
    }
    const { listOfGroups } = this.props;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    if (inputLength === 0) {
      this.setState({
        suggestions: []
      });
    } else {
      const filteredList = listOfGroups.filter(item => {
        const keep =
          count < 5 &&
          item.groupName.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }
        return (
          item.groupName.slice(0, inputLength).toLowerCase() === inputValue
        );
      });
      this.setState({
        suggestions: filteredList
      });
    }
  };

  handleOnBlur = () => {
    this.setState({
      suggestions: [],
      inputFocused: false
    });
  };

  handleOnFocus = () => {
    this.setState({
      inputFocused: true
    });
  };
  handleGroupClick = (e, groupName) => {
    this.setState({
      groupNameValue: groupName
    });
  };

  handleFileInputChange = ({ target }) => {
    const key = target.name;
    const filesLength = target.files ? target.files.length : null;
    if (filesLength === 0) {
      return "";
    }
    const newValue = key === "file" ? target.files[0] : target.value;
    console.log("new Value: ", newValue);
    const blob = new Blob(target.files);
    this.setState({
      currentFileBlob: blob,
      currentFile: newValue
    });
    // remove file extension from uploaded CSV
    // if (key === 'file') {
    //   const { files } = target;
    //   if (
    //     files[0].type !== 'text/plain' &&
    //     files[0].type !== 'text/csv' &&
    //     files[0].type !== 'application/vnd.ms-excel'
    //   ) {
    //     this.setState(() => ({
    //       uploadError: 'File must be a csv or plain text',
    //       submitDisabled: true
    //     }));
    //     return false;
    //   }
    // }
  };
  render() {
    const {
      cheatTitle,
      cheatBody,
      suggestions,
      anchorEl,
      groupNameValue,
      currentFile
    } = this.state;
    const { dialogOpen, handleCloseAddCheatDialog, listOfGroups } = this.props;
    return (
      <Dialog
        style={styles.container}
        onBackdropClick={handleCloseAddCheatDialog}
        open={dialogOpen}
        PaperProps={{
          style: {
            width: 700,
            paddingBottom: 20,
            paddingLeft: 50,
            paddingRight: 50
          }
        }}
      >
        <DialogTitle style={{ paddingLeft: 0 }}>Create New Cheat</DialogTitle>
        <Divider />
        <TextField
          InputProps={{ disableUnderline: true }}
          style={styles.textField}
          id="cheatTitle"
          autoFocus
          value={cheatTitle}
          onChange={this.handleCheatInputChange}
          placeholder="Cheat title (required)"
        />
        <TextField
          InputProps={{ disableUnderline: true }}
          style={styles.textFieldDescription}
          multiline
          value={cheatBody}
          id="cheatBody"
          onChange={e => this.handleCheatInputChange(e)}
          placeholder="Enter text (optional)"
        />
        <GroupsSelector
          anchorEl={anchorEl}
          listOfGroups={listOfGroups}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
          suggestions={suggestions}
          groupNameValue={groupNameValue}
          handleGroupClick={this.handleGroupClick}
          handleInputChange={this.handleGroupNameChange}
        />
        <TextField
          label={
            <Typography variant="subheading">Upload a CSV file</Typography>
          }
          style={styles.addFileInput}
          name="file"
          id="outlined-button-file"
          type="file"
          accept=".csv"
          onChange={this.handleFileInputChange}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <label htmlFor="outlined-button-file">
            <Button
              variant="outlined"
              component="span"
              style={styles.addFileButton}
            >
              <Typography style={styles.addFileText}>Add file</Typography>
            </Button>
          </label>
          <Typography style={{ marginLeft: 10, marginTop: 10 }}>
            {currentFile.name}
          </Typography>
        </div>
        <Button
          onClick={this.handleCreateCheat}
          style={styles.button}
          variant="raised"
        >
          <Typography style={styles.buttonText}>Create Cheat</Typography>
        </Button>
      </Dialog>
    );
  }
}

export default AddCheatDialog;
