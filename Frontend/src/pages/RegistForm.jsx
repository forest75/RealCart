import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppForm from "../components/AppForm";
import ArrowButton from "../components/ArrowButton";

export default function RegistForm() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState("");

  const handleRegist = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target[0].value,
      password: e.target[3].value,
      nickname: e.target[7].value,
    };

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, data)
      .then((response) => {
        alert("회원가입 성공!");
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const params = { email };
    const headers = {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "*/*",
    };
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user/checkemail`,
        { params },
        { headers }
      )
      .then((response) => {
        setEmailCheck(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  useEffect(() => {
    const params = { nickname };
    const headers = {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "*/*",
    };
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user/checknickname`,
        { params },
        { headers }
      )
      .then((response) => {
        setNicknameCheck(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const theme = createTheme({
    palette: {
      white: "#ffffff",
      gray: "#f2f2f2",
    },
  });
  return (
    <Box
      justifyContent="center"
      component="form"
      onSubmit={handleRegist}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
        marginTop: "60px",
      }}
    >
      <Box sx={{ border: "solid 1px black" }}>
        <ThemeProvider theme={theme}>
          <Grid
            sx={{
              padding: 5,
            }}
            container
            spacing={0}
            direction="column"
            alignItems="start"
            justifyContent="center"
            style={{ minHeight: "50vh" }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h1>회원가입</h1>
            </div>
            <div style={{ display: "flex" }}>
              <AppForm
                content="email"
                emailCheck={emailCheck}
                sx={{
                  width: 400,
                  maxWidth: "90%",
                  margin: 2,
                }}
                onInput={(e) => {
                  setEmail(e.target.value);
                  // setEmailCheck("");
                }}
              />
            </div>
            <AppForm
              content="password"
              sx={{
                width: 400,
                maxWidth: "90%",
                margin: 2,
              }}
              onInput={(e) => {
                setPwd(e.target.value);
              }}
            />
            <AppForm
              content="passwordCheck"
              pwd={pwd}
              sx={{
                width: 400,
                maxWidth: "90%",
                margin: 2,
              }}
            />
            <div style={{ display: "flex" }}>
              <AppForm
                content="nickname"
                nicknameCheck={nicknameCheck}
                sx={{
                  width: 400,
                  maxWidth: "90%",
                  margin: 2,
                }}
                onInput={(e) => {
                  setNickname(e.target.value);
                  setNicknameCheck("");
                }}
              />
            </div>
            <br />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowButton
                type="submit"
                sx={{
                  width: 300,
                  height: 50,
                }}
              >
                회원가입
              </ArrowButton>
            </Box>
          </Grid>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
