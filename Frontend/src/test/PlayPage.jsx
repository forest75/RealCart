import React from "react";
import { Box, Paper } from "@mui/material";
import car from "../assets/car.jpg";

function PlayPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "red",
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: 700,
          bgcolor: "yellow",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "15%",
            display: "flex",
            bgcolor: "pink",
          }}
        >
          <Box
            sx={{
              width: "75%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "orange",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "95%",
                height: "90%",
                display: "flex",
                bgcolor: "purple",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  bgcolor: "black",
                }}
              >
                <Box
                  sx={{
                    width: "45%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "white",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "black",
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
                      bgcolor: "black",
                    }}
                  >
                    랭킹 2위
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "black",
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
                    bgcolor: "red",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "green",
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
                      bgcolor: "blue",
                    }}
                  >
                    랭킹 3위
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
              bgcolor: "orange",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "95%",
                height: "90%",
                bgcolor: "purple",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "olive",
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
                  bgcolor: "yellow",
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
            bgcolor: "blue",
          }}
        >
          <Box
            component="img"
            alt="car"
            src={car}
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "10%",
            bgcolor: "green",
          }}
        >
          f
        </Box>
      </Box>
    </Box>
  );
}

export default PlayPage;
