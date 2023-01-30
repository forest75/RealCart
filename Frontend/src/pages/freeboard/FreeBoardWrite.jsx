import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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
        // bgcolor: "gray",
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "10%",
          display: "flex",
          // bgcolor: "red",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" flexGrow={1}>
          자유게시판
        </Typography>
      </Box>
      <Box
        sx={{
          width: "80%",
          height: "15%",
          // bgcolor: "blue",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderTop: 2,
          borderBottom: 3,
        }}
      >
        <TextField
          sx={{
            width: "100%",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "75%",
          bgcolor: "breen",
        }}
      >
        b
      </Box>
    </Box>
  );
}

export default FreeBoardWrite;
