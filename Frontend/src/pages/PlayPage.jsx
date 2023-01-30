import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
// import car from "../assets/car.jpg";

function PlayPage() {
  const [imgSrc, setImgSrc] = useState("");
  const ws = new WebSocket("ws://3.35.3.27:3001");

  ws.onopen = function () {
    console.log("on open1");
  };

  ws.onmessage = function ({ data }) {
    const url = `data:image/jpeg;base64,${data}`;
    setImgSrc(url);
  };

  window.addEventListener("keydown", (event) => {
    ws.send(event.keyCode);
    console.log(event.keyCode);
  });


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: 700,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "15%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "75%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "95%",
                height: "90%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    width: "45%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h1>A 의권짱짱33</h1>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "orange",
                    }}
                  >
                    <h2>랭킹 2위</h2>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1>vs</h1>
                </Box>
                <Box
                  sx={{
                    width: "45%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h1>B 지존ㅎHzㅣㄴ</h1>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "orange",
                    }}
                  >
                    <h2>랭킹 3위</h2>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
          <Box
            sx={{
              width: "25%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "95%",
                height: "90%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h1>배팅현황</h1>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "40%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Paper
                  sx={{
                    width: "90%",
                    height: "90%",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    A 25명
                  </Box>
                  <Box
                    sx={{
                      width: "50%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    B 17명
                  </Box>
                </Paper>
              </Box>
            </Paper>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "75%",
          }}
        >
          <Box
            component="img"
            alt="car"
            src={imgSrc}
            sx={{
              width: "40%",
              height: "70%",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "10%",
          }}
        />
      </Box>
    </Box>
  );
}

export default PlayPage;
