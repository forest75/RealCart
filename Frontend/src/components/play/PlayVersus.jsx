import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { setPlayer, setRank1, setRank2 } from "../../store/queueSlice";

function PlayVersus() {
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.queue);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/game`).then((res) => {
      dispatch(setPlayer(res.data));
    });
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/record/best/${queue.player1}`)
      .then((res) => {
        dispatch(setRank1(res.data));
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/record/best/${queue.player2}`)
      .then((res) => {
        dispatch(setRank2(res.data));
      });
  }, [queue, dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "7%",
        display: "flex",
        border: "solid 2px #E8E8E8",
        marginBottom: "30px",
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
        <Box
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
                {/* <h2>A {queue.player1}</h2> */}
                <Box
                  display="flex"
                  sx={{
                    height: "100%",
                    width: "30%",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Red
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  sx={{
                    height: "100%",
                    width: "70%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {queue.player1}
                  </Typography>
                </Box>
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
                <h2>랭킹 {queue.rank1}위</h2>
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
              <h2>vs</h2>
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
                {/* <h2>B {queue.player2}</h2> */}
                <Box
                  display="flex"
                  sx={{
                    height: "100%",
                    width: "30%",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "blue",
                      fontWeight: "bold",
                    }}
                  >
                    Blue
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  sx={{
                    height: "100%",
                    width: "70%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {queue.player2}
                  </Typography>
                </Box>
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
                <h2>랭킹 {queue.rank2}위</h2>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderLeft: "solid 2px #E8E8E8",
        }}
      >
        <Box
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
            <h3>배팅현황</h3>
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
            <Box
              sx={{
                width: "90%",
                height: "90%",
                display: "flex",
                border: "solid 2px #E8E8E8",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: "solid 2px #E8E8E8",
                }}
              >
                Red 25명
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
                Blue 17명
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PlayVersus;
