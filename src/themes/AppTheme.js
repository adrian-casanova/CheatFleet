import { createMuiTheme } from "@material-ui/core";
import { primaryBlue } from "../styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#63c7f6"
    },
    secondary: {
      main: "#63c7f6"
    }
  },
  typography: {
    fontFamily: "Montserrat",
    title: {
      fontSize: "24px"
    }
  },
  overrides: {
    MuiTab: {
      textColorPrimary: {
        color: "#63c7f6"
      }
    }
  }
});
