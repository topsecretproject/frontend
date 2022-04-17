import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ signOut }) {
  const location = useLocation();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {location.pathname.split("/")[1] === "alumni" ? "Alumni" : "Students"}
          {location.pathname.split("/")[1] === "admin" ? "Queue" : undefined}
        </Typography>
        <Button component={Link} to="/seniors" color="inherit">
          Seniors
        </Button>
        <Button component={Link} to="/juniors" color="inherit">
          Juniors
        </Button>
        <Button component={Link} to="/juniors" color="inherit">
          Alumni
        </Button>
        {location.pathname.split("/")[1] === "admin" ? (
          <Button onClick={signOut} color="inherit">
            Sign Out
          </Button>
        ) : (
          <Button component={Link} to="/form" color="inherit">
            Fill Form
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
};
