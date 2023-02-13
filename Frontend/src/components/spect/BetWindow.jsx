import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { betOnA, betOnB } from "../../store/betSlice";

// 배팅 창 컴포넌트
function BetWindow() {
  // redux store에서 배팅 정보를 가져옴
  const bet = useSelector((state) => state.bet);
  const dispatch = useDispatch();
  // 배팅 비율을 계산하여 저장
  const [proportionA, setProportionA] = useState(0.5);
  const [proportionB, setProportionB] = useState(0.5);
  useEffect(() => {
    if (bet.betA + bet.betB !== 0) {
      setProportionA(bet.betA / (bet.betA + bet.betB));
      setProportionB(bet.betB / (bet.betA + bet.betB));
    }
  }, [bet]);
  return (
    <Box
      display="flex"
      sx={{
        width: "100%",
        height: "25%",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: "90%",
          height: "90%",
        }}
      >
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          배팅상황
        </Box>
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "40%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            display="flex"
            sx={{
              width: "80%",
              height: "100%",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: `${Math.max(proportionA * 70 + 30, 30)}%`,
              }}
            >
              <Button
                onClick={() => {
                  dispatch(betOnA());
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "red",
                  color: "black",
                }}
              >
                Red
              </Button>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                width: `${Math.max(proportionB * 70 + 30, 30)}%`,
                animation: "widthChange 0.5s ease-in-out",
              }}
            >
              <Button
                onClick={() => {
                  dispatch(betOnB());
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "blue",
                  color: "black",
                }}
              >
                Blue
              </Button>
            </Paper>
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            sx={{
              width: "50%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {bet.betA}명
          </Box>
          <Box
            display="flex"
            sx={{
              width: "50%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {bet.betB}명
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default BetWindow;
