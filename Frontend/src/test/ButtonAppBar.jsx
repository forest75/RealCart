import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="secondary">
          <Toolbar>
            <img src={logo} alt="logo" sx={{ flexGrow: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              &nbsp;
            </Typography>
            <Button color="inherit" sx={{ width: 200, height: 100 }}>
              <h1>Race</h1>
            </Button>
            <Button color="inherit" sx={{ width: 200, height: 100 }}>
              <h1>Board</h1>
            </Button>
            <Button color="inherit" sx={{ width: 200, height: 100 }}>
              <h1>About</h1>
            </Button>
            <Button color="inherit" sx={{ width: 200, height: 100 }}>
              <h1>Login</h1>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
