import React from "react";
import { Dialog, DialogTitle, Typography, Button } from "@material-ui/core";
import { primaryBlue } from "../../../../styles";

class FileActionDialog extends React.Component {
  render() {
    const {
      dialogOpen,
      downloadUrl,
      handleCloseFileActionDialog,
      handleViewFile
    } = this.props;
    return (
      <Dialog
        open={dialogOpen}
        onBackdropClick={handleCloseFileActionDialog}
        PaperProps={{
          style: {
            height: 150,
            display: "flex",
            width: 500,
            padding: 20,
            flexDirection: "column",
            justifyContent: "space-between"
          }
        }}
      >
        <DialogTitle>File Action</DialogTitle>
        <Typography
          variant="subheading"
          style={{ color: "gray", marginLeft: 20, marginBottom: 20 }}
        >
          What would you like to do with the file?
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "center"
          }}
        >
          <Button
            onClick={() => handleViewFile(downloadUrl)}
            style={{ borderColor: primaryBlue, width: 200 }}
            variant="outlined"
          >
            <Typography style={{ color: primaryBlue }}>View</Typography>
          </Button>
          <a href={downloadUrl} download style={{ textDecoration: "none" }}>
            <Button
              style={{
                backgroundColor: primaryBlue,
                width: 200,
                marginLeft: 20
              }}
              variant="raised"
              onClick={handleCloseFileActionDialog}
            >
              <Typography style={{ color: "white" }}>Download</Typography>
            </Button>
          </a>
        </div>
      </Dialog>
    );
  }
}

export default FileActionDialog;
