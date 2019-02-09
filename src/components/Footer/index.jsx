import React from "react";
import { Typography } from "@material-ui/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { primaryBlue } from "../../styles";

library.add(faInstagram);
library.add(faTwitter);
const styles = {
  container: {
    height: 150,
    padding: 50,
    backgroundColor: "rgba(99,199,246, 0.8)",
    display: "flex",
    flexDirection: "row"
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row"
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    height: 100,
    marginLeft: 20,
    justifyContent: "space-between"
  },
  icons: {
    height: 50,
    width: 50,
    color: "white",
    marginRight: 10
  },
  copyrightText: {
    color: "white",
    cursor: "pointer"
  }
};
const Footer = () => {
  return (
    <React.Fragment>
      <div style={styles.container}>
        <div style={styles.subContainer}>
          <div style={styles.iconContainer}>
            <FontAwesomeIcon style={styles.icons} icon={faTwitter} />
            <FontAwesomeIcon style={styles.icons} icon={faInstagram} />
          </div>
          <Typography variant="subheading" style={styles.copyrightText}>
            @CheatFleet 2019.
          </Typography>
        </div>
        <div style={styles.subContainer}>
          <Typography variant="title" style={styles.copyrightText}>
            Legal
          </Typography>

          <Typography variant="subheading" style={styles.copyrightText}>
            Privacy
          </Typography>
          <Typography variant="subheading" style={styles.copyrightText}>
            Terms
          </Typography>
        </div>
        <div style={styles.subContainer}>
          <Typography
            variant="title"
            style={{ marginLeft: 10, color: "white", cursor: "pointer" }}
          >
            About Us
          </Typography>
          <Typography
            variant="subheading"
            style={{ marginLeft: 10, color: "white", cursor: "pointer" }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="subheading"
            style={{ marginLeft: 10, color: "white", cursor: "pointer" }}
          >
            Carreers
          </Typography>
        </div>
      </div>
      <div
        style={{
          height: 75,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography style={{ color: "gray" }} variant="subheading">
          Powered <span role="img">🚀</span>by CheatFleet.
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Footer;
