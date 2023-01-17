import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
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
      }}
      height="500"
    >
      <Paper elevation={3}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh", minWidth: "60vh" }}
        >
          <h1>로그인</h1>
          <ThemeProvider theme={theme}>
            <FullWidthTextField
              error
              id="outlined-error-helper-text"
              label="Error"
              defaultValue="Hello World"
              helperText="Incorrect entry."
              content="이메일"
            />
            <FullWidthTextField content="비밀번호" />
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
                    <span style={{ width: "33%" }}>로그인</span>
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
                <Link
                  to="/findPass"
                  style={{ textDecoration: "none", color: "black" }}
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
                      <div style={{ width: "29%" }}> </div>

                      <span style={{ width: "40%" }}>비밀번호 찾기</span>
                      <div
                        style={{
                          width: "30%",
                          textAlign: "right",
                          color: "gray",
                        }}
                      >
                        <ArrowForwardIcon />
                      </div>
                    </Button>
                  </div>
                </Link>
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
                    <div style={{ width: "15%" }}>&nbsp;</div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "64%",
                        flex: "1",
                      }}
                    >
                      <GoogleIcon color="primary" sx={{ margin: 1 }} />
                      <span>구글로 시작하기</span>
                    </div>
                    <div
                      style={{
                        width: "20%",
                        textAlign: "right",
                        color: "gray",
                      }}
                    >
                      <ArrowForwardIcon />
                    </div>
                  </Button>
                </div>
                <div>
                  <Link
                    to="/regist"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      color="white"
                      sx={{
                        width: 300,
                        margin: 1,
                      }}
                    >
                      <div style={{ width: "33%" }}> </div>

                      <span style={{ width: "33%" }}>회원가입</span>
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
                  </Link>
                </div>
              </div>
            </Box>
          </ThemeProvider>
        </Grid>
      </Paper>
    </Box>
  );
}
