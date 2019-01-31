import React from "react";
import { AddBox, Send, Create, Drafts } from "@material-ui/icons";
import { Typography, ButtonBase } from "@material-ui/core";
import { primaryBlue } from "../../../../styles";

class ToolBar extends React.Component {
  render() {
    const { handleOpenAddCheatDialog } = this.props;
    return (
      <div
        style={{
          height: 100,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          boxShadow: "1px 1px 6px 0px lightgray"
        }}
      >
        <ButtonBase
          style={{
            height: "100%",
            width: 100,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={handleOpenAddCheatDialog}
        >
          <Create style={{ color: primaryBlue }} />
          <Typography
            style={{ color: "gray", textAlign: "center", marginTop: 10 }}
          >
            New Cheat
          </Typography>
        </ButtonBase>
        <ButtonBase
          style={{
            height: "100%",
            width: 100,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <AddBox style={{ color: primaryBlue }} />
          <Typography
            style={{ color: "gray", textAlign: "center", marginTop: 10 }}
          >
            New Group
          </Typography>
        </ButtonBase>
        <ButtonBase
          style={{
            height: "100%",
            width: 100,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Drafts style={{ color: primaryBlue }} />
          <Typography
            style={{ color: "gray", textAlign: "center", marginTop: 10 }}
          >
            My Cheats
          </Typography>
        </ButtonBase>
      </div>
    );
  }
}

export default ToolBar;
