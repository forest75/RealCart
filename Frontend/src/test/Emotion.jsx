import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

function Emotion() {
  return (
    <Box>
      test component
      <StyledBox
        sx={{
          bgcolor: "red",
        }}
      >
        <h1>Emotion</h1>
        <p>StyledBox</p>
      </StyledBox>
    </Box>
  );
}

export default Emotion;
