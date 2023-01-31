import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function ButtonAppBar() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ border: 1 }}>
        <AppBar color="secondary">
          <Toolbar>
            <Link to="/">
              <Box
                component="img"
                alt="logo"
                src={logo}
                sx={{
                  height: 90,
                  margin: 1,
                }}
              />
            </Link>
            {/* <img src={logo} alt="logo" sx={{ flexGrow: 1 }} /> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              &nbsp;
            </Typography>
            <Link
              to="/spect"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Button color="inherit" sx={{ width: 150, height: 70 }}>
                <span>RACE</span>
              </Button>
            </Link>
            <Link to="/play" style={{ color: "black", textDecoration: "none" }}>
              <Button color="inherit" sx={{ width: 150, height: 70 }}>
                <span>Board</span>
              </Button>
            </Link>
            <Link
              to="/myPage"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Button color="inherit" sx={{ width: 150, height: 70 }}>
                <span>About</span>
              </Button>
            </Link>
            <Link
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Button color="inherit" sx={{ width: 150, height: 70 }}>
                <span>Login</span>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
