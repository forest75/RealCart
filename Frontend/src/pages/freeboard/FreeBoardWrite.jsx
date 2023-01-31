import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";

function FreeBoardWrite() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 700,
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "10%",
          display: "flex",
        }}
      >
        <Typography variant="h4" flexGrow={1}>
          자유게시판
        </Typography>
        <Box
          sx={{
            width: "35%",
            height: "100%",
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          a
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
        }}
      >
        b
      </Box>
    </Box>
  );
}

export default FreeBoardWrite;
