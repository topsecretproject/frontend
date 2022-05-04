import React from "react";
import { Icon, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1976D2",
        color: "white",
        paddingTop: "20px",
        paddingBottom: "20px",
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
      }}
    >
      <Typography variant="body1" textAlign="center">
        Made with <FavoriteIcon /> by Andrea Habib, Gianna Galard & Kristi
        Brescia
      </Typography>
    </footer>
  );
}
