import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FullWidthTextField from "./FullWidthTextField";

export default function FormPropsTextFields() {
  const theme = createTheme({
    palette: {
      white: "#ffffff",
      gray: "#f2f2f2",
    },
  });
  return (
    <Box
      justifyContent="center"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
        height: 200,
      }}
    >
      <Paper elevation={3}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          <ThemeProvider theme={theme}>
            <FullWidthTextField
              error
              id="outlined-error-helper-text"
              label="Error"
              defaultValue="Hello World"
              helperText="Incorrect entry."
              content="이메일"
            />
            <br />
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { t: 10, m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <Button
                  variant="contained"
                  size="large"
                  color="white"
                  sx={{
                    width: 300,
                    margin: 1,
                  }}
                >
                  <div style={{ width: "33%" }}>&nbsp;</div>
                  <span style={{ width: "33%" }}>메일 전송</span>
                  <div
                    style={{
                      width: "33%",
                      textAlign: "right",
                      color: "gray",
                    }}
                  >
                    <ArrowForwardIcon />
                  </div>
                </Button>
              </div>
            </Box>
          </ThemeProvider>
        </Grid>
      </Paper>
    </Box>
  );
}
