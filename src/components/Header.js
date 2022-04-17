import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";

export default function Header({ signOut }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Student Queue
        </Typography>
        <Button onClick={signOut} color="inherit">
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
};
