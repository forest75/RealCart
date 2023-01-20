import React from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ArrowButton({
  buttonContent,
  buttonWidth,
  buttonHeight,
  bgColor,
  buttonColor,
  bMargin,
}) {
  return (
    <Button
      sx={{
        width: buttonWidth,
        height: buttonHeight,
        display: "flex",
        bgcolor: bgColor,
        color: buttonColor,
        border: 1,
        margin: bMargin,
      }}
    >
      <Box
        sx={{
          width: "33.3%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          width: "33.3%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {buttonContent}
      </Box>
      <Box
        sx={{
          width: "33.3%",
          height: "100%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <ArrowForwardIcon />
      </Box>
    </Button>
  );
}

ArrowButton.defaultProps = {
  buttonWidth: 200,
  buttonHeight: 60,
  bgColor: "white",
  buttonColor: "black",
  bMargin: 0,
};

ArrowButton.propTypes = {
  buttonContent: PropTypes.string.isRequired,
  buttonWidth: PropTypes.string,
  buttonHeight: PropTypes.string,
  bgColor: PropTypes.string,
  buttonColor: PropTypes.string,
  bMargin: PropTypes.number,
};

export default ArrowButton;
