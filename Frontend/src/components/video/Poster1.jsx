import React from "react";
import Box from "@mui/material/Box";

function Poster1() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        align: "center",
      }}
    >
      <Box>다음 게임을 준비 중입니다.</Box>
    </Box>
  );
}

export default Poster1;
