import React from "react";
import { Box, Grid, Stack, Button, Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import tmp from "../assets/logo.png";

function SpectatingPage() {
  const options = [
    "1. 죽이는타이어준비완료 vs 목표를포착했다",
    "2. 아무도날못이겨 vs 석양이진다",
  ];
  const [value, setValue] = React.useState(options[0]);

  const [inputValue, setInputValue] = React.useState("");
  const [valA, setValA] = React.useState(0);
  const [valB, setValB] = React.useState(0);
  const [widthA, setwidthA] = React.useState(100);
  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "center",
      }}
    >
      <Grid
        container
        display="flex"
        sx={{
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={8}
          sx={{
            height: 1000,
            margin: 1,
          }}
        >
          <Stack>
            <Box
              sx={{
                height: 100,
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={8}
                  sx={{
                    height: 900,
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      height: "10%",
                      width: "95%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h1>의권짱짱33 VS 지존ㅎHzㅣㄴ</h1>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={3} sx={{ height: "10%" }}>
                    <div>
                      <br />
                      <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          <TextField {...params} label="대기 순서" />
                        )}
                      />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            <Box
              border={1}
              sx={{
                height: 700,
              }}
            >
              <Box
                component="img"
                alt="tmp"
                src={tmp}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            height: 1000,
            margin: 1,
          }}
        >
          <Stack>
            <Box
              display="flex"
              sx={{
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  height: 60,
                  width: 150,
                  bgcolor: "#043774",
                  color: "white",
                }}
              >
                Play
              </Button>
            </Box>
            <Box
              display="flex"
              sx={{
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper
                elevation={3}
                display="flex"
                sx={{
                  width: 250,
                  height: 150,
                }}
              >
                <Stack
                  display="flex"
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      height: 50,
                    }}
                  >
                    배팅상황
                  </Box>
                  <Box
                    display="flex"
                    sx={{
                      height: 50,
                      width: 200,
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        width: "30%",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setValA(valA + 1);
                          setwidthA(
                            valA + valB === 0
                              ? 100
                              : (valA / (valA + valB)) * 200
                          );
                          console.log(`valA : ${valA}`);
                          console.log(widthA);
                        }}
                      >
                        A
                      </Button>
                    </Paper>
                    <Paper
                      elevation={3}
                      sx={{
                        width: "70%",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setValB(valB + 1);
                          setwidthA(
                            valA + valB === 0
                              ? 100
                              : (valA / (valA + valB)) * 200
                          );
                          console.log(`valB : ${valB}`);

                          console.log(widthA);
                        }}
                      >
                        B
                      </Button>
                    </Paper>
                  </Box>
                  <Box
                    display="flex"
                    sx={{
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {valA}명 {valB}명
                  </Box>
                </Stack>
              </Paper>
            </Box>
            <Box
              sx={{
                height: 600,
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "skyblue",
              }}
              display="flex"
            >
              채팅
            </Box>
            <Box
              sx={{
                heigth: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              display="flex"
            >
              <Button
                sx={{
                  height: 50,
                  width: "100%",
                  bgcolor: "white",
                  color: "black",
                }}
              >
                버그 및 문제신고
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SpectatingPage;
