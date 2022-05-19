import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ signOut }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (location) => {
    setAnchorElNav(null);
    navigate(location);
  };

  return (
    <AppBar position="static" sx={{ zIndex: "100", width: "100vw", mb: 3 }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
        >
          Students Showcase
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuItem onClick={() => handleCloseNavMenu("/seniors")}>
              <Typography textAlign="center">Seniors</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleCloseNavMenu("/juniors")}>
              <Typography textAlign="center">Juniors</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleCloseNavMenu("/alumni")}>
              <Typography textAlign="center">Alumni</Typography>
            </MenuItem>
            {location.pathname.split("/")[1] === "admin" ? (
              <MenuItem onClick={signOut}>
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>
            ) : (
              <MenuItem onClick={() => handleCloseNavMenu("/form")}>
                <Typography textAlign="center">Fill Form</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
        >
          Students Showcase
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
          }}
        >
          <Button component={Link} to="/seniors" color="inherit">
            Seniors
          </Button>
          <Button component={Link} to="/juniors" color="inherit">
            Juniors
          </Button>
          <Button component={Link} to="/alumni" color="inherit">
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  signOut: PropTypes.func,
};
