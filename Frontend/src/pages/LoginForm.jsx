import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import cookie from "js-cookie";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { login } from "../store/loginSlice";
import RegistForm from "../components/AppForm";
import ArrowButton from "../components/ArrowButton";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(process.env.REACT_APP_BACKEND_URL);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email: e.target[0].value, password: e.target[2].value };

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user`, data)
      .then((response) => {
        cookie.set("refreshToken", response.data.refreshToken, {
          secure: true,
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(login(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleSumbit = async (e) => {
  //   e.preventDefault();
  //   const data = { email: e.target[0].value, password: e.target[2].value };

  //   await axios
  //     .post("http://3.34.23.91:8080/user", data)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "grid",
          height: 700,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            width: 500,
            height: 550,
            justifyContent: "center",
            alignItems: "center",
            border: 1,
          }}
        >
          <Box
            sx={{
              height: 30,
            }}
          />
          <h1>로그인</h1>
          <Box
            sx={{
              height: 10,
            }}
          />
          <Stack
            spacing={3}
            sx={{
              width: "80%",
            }}
          >
            <RegistForm content="email" />
            <RegistForm content="password" />
          </Stack>
          <Box
            sx={{
              height: 10,
            }}
          />
          <Stack
            spacing={1}
            sx={{
              width: "80%",
              height: "50%",
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
              로그인
            </ArrowButton>
            <Link to="/findPass" style={{ textDecoration: "none" }}>
              <ArrowButton
                sx={{
                  width: 300,
                  height: 50,
                }}
              >
                비밀번호 찾기
              </ArrowButton>
            </Link>
            <Button
              sx={{
                width: 300,
                height: 50,
                color: "black",
                bgcolor: "white",
                border: 1,
              }}
              onClick={() => {
                window.open(
                  "https://i8a403.p.ssafy.io/api/oauth2/authorization/google?redirect_uri=https://i8a403.p.ssafy.io/oauth/redirect"
                );
              }}
            >
              <Box
                sx={{
                  width: "31%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    marginRight: 1,
                    color: "primary",
                  }}
                >
                  <GoogleIcon />
                </Box>
              </Box>
              {/* <a href="http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth/redirect"> */}
              <Box
                sx={{
                  width: "38%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>구글로 시작하기</Box>
              </Box>
              {/* </a> */}
              <Box
                sx={{
                  width: "31%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ArrowForwardIcon />
              </Box>
            </Button>
            <Link to="/regist" style={{ textDecoration: "none" }}>
              <ArrowButton
                sx={{
                  width: 300,
                  height: 50,
                }}
              >
                회원가입
              </ArrowButton>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginForm;
