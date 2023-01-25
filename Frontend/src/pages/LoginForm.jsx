import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RegistForm from "../components/AppForm";
import ArrowButton from "../components/ArrowButton";

function LoginForm() {
  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[2].value);
    const data = { email: e.target[0].value, password: e.target[2].value };
    console.log(data);

    await axios
      .post("http://3.34.23.91:8080/user", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSumbit}
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
