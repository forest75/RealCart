import React from "react";
import { Box, Stack } from "@mui/material";
import ArrowButton2 from "./components/ArrowButton2";

function LoginForm() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "30%",
          height: 700,
          border: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "50%",
          }}
        >
          aad
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={1}
            sx={{
              width: "50%",
              height: "90%",
            }}
          >
            <ArrowButton2 content="버튼" />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
