import React from "react";
import Box from "@mui/material/Box";

function Poster1() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        color: "#171717",
        display: "flex",
        justifyContent: "center",
        align: "center",
        fontSize: "40px",
      }}
    >
      다음 게임을 준비 중입니다...
      <Box sx={{ fontSize: "100px" }}>🚗</Box>
    </Box>
  );
}

export default Poster1;
