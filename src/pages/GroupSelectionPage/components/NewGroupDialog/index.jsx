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
  handleDialogSubmit
}) => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [groupColor, setGroupColor] = useState("#fafafa");

  const handleOpenColorPicker = () => {
    setColorPickerOpen(true);
  };

  const handleColorInputChange = color => {
    setGroupColor(color.color);
  };

  const handleCloseColorPicker = () => {
    setColorPickerOpen(false);
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
          <TextField variant="outlined" label="Name" helperText="required *" />
          <TextField
            variant="outlined"
            label="Description"
            helperText="required *"
          />
          <TextField
            variant="outlined"
            label="Subject"
            helperText="(optional)"
          />
          <TextField
            variant="outlined"
            label="Teacher Name"
            helperText="required *"
          />
          <TextField
            variant="outlined"
            label="Tags"
            helperText="(optional) Seperate by commas (,)"
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
          onClick={handleDialogSubmit}
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
