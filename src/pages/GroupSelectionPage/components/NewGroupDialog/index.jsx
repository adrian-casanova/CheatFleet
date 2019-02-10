import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { Panel as ColorPickerPanel } from "material-ui-rc-color-picker";
import "material-ui-rc-color-picker/assets/index.css";
import { primaryBlue } from "../../../../styles";
import { createGroup } from "../../../../services/GroupService";

const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 400,
    marginTop: 20
  },
  container: {
    height: 650,
    width: 600
  }
};
/**
 *
 * @param dialogOpen boolean dictates if dialog is open or not
 */
const NewGroupDialog = ({
  dialogOpen,
  handleDialogClose,
  handleDialogSubmit,
  school
}) => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [groupColor, setGroupColor] = useState("#fafafa");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [subject, setSubject] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenColorPicker = () => {
    setColorPickerOpen(true);
  };

  const handleCreateGroup = () => {
    if (!name || !subject || !teacherName || !tags || !description) {
      setErrorMessage("All fields are required.");
    } else {
      setErrorMessage("");
      createGroup({
        name,
        subject,
        teacherName,
        tags,
        description,
        groupColor,
        school
      })
        .then(() => {
          handleDialogSubmit();
        })
        .catch(e => alert(e));
    }
  };

  const handleColorInputChange = color => {
    setGroupColor(color.color);
  };

  const handleCloseColorPicker = () => {
    setColorPickerOpen(false);
  };
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "teacherName":
        setTeacherName(value);
        break;
      case "tags":
        setTags(value);
        break;
      case "subject":
        setSubject(value);
        break;
      default:
        return null;
    }
  };
  return (
    <Dialog PaperProps={{ style: styles.container }} open={dialogOpen}>
      <Dialog open={colorPickerOpen} onBackdropClick={handleCloseColorPicker}>
        <ColorPickerPanel
          color={groupColor}
          mode="RGB"
          onChange={handleColorInputChange}
        />
      </Dialog>
      <DialogTitle style={{ backgroundColor: groupColor }}>
        Create A New Group
      </DialogTitle>
      <DialogContent>
        <div style={styles.content}>
          <TextField
            name="name"
            onChange={handleInputChange}
            variant="outlined"
            label="Name"
            error={errorMessage}
          />
          <TextField
            variant="outlined"
            name="description"
            error={errorMessage}
            onChange={handleInputChange}
            label="Description"
          />
          <TextField
            variant="outlined"
            name="subject"
            error={errorMessage}
            onChange={handleInputChange}
            label="Subject"
          />
          <TextField
            variant="outlined"
            name="teacherName"
            onChange={handleInputChange}
            error={errorMessage}
            label="Teacher Name"
          />
          <TextField
            variant="outlined"
            name="tags"
            onChange={handleInputChange}
            label="Tags"
            error={errorMessage}
            helperText={errorMessage}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15
          }}
        >
          <div
            style={{
              height: 25,
              width: 25,
              border: "1px solid lightgray",
              borderRadius: 5,
              backgroundColor: groupColor
            }}
          />
          <Button
            onClick={handleOpenColorPicker}
            style={{ marginLeft: 10 }}
            variant="outlined"
            color="primary"
          >
            Choose Group Color
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleCreateGroup}
          style={{ color: "white" }}
          variant="raised"
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGroupDialog;
