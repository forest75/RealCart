import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../assets/logo.png";
import PrimarySearchAppBar from "./HeaderTest1";

function ButtonAppBar() {
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
      <AppBar color="secondary">
        <Toolbar>
          <img src={logo} alt="logo" />
          <Typography
            variant="h7"
            component="div"
            color="secondary"
            sx={{ flexGrow: 1 }}
          >
            <p>&nbsp;</p>
          </Typography>
          <Button
            color="inherit"
            transformOrigin={{
              horizontal: "right",
            }}
          >
            <p id="HeaderMenu">Board</p>
          </Button>
          <Button
            color="inherit"
            transformOrigin={{
              horizontal: "right",
            }}
          >
            Race
          </Button>
          {/* <Menu>
            <MenuItem>Login</MenuItem>
            <MenuItem>Regist</MenuItem>
          </Menu> */}
        </Toolbar>
      </AppBar>
      <PrimarySearchAppBar />
    </ThemeProvider>
  );
}

export default ButtonAppBar;
