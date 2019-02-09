import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";

const GenericDialog = ({
  dialogTitle,
  dialogOpen,
  children,
  outlinedButtonText,
  raisedButtonText,
  onOutlinedClick,
  onRaisedClick
}) => {
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onOutlinedClick} variant="outlined" color="primary">
          {outlinedButtonText}
        </Button>
        <Button
          onClick={onRaisedClick}
          style={{ color: "white" }}
          variant="raised"
          color="primary"
        >
          {raisedButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
