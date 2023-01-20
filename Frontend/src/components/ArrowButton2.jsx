import React from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ArrowButton2({ content }) {
  return (
    <Button
      sx={{
        bgcolor: "white",
        color: "black",
        border: 1,
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
        }}
      >
        {content}
      </Box>
      <Box
        sx={{
          width: "33.3%",
          height: "100%",
        }}
      >
        <ArrowForwardIcon />
      </Box>
      {content}
    </Button>
  );
}

// ArrowButton2.defaultProps = {
//   buttonWidth: 200,
//   buttonHeight: 60,
//   bgColor: "white",
//   buttonColor: "black",
//   bMargin: 0,
// };

ArrowButton2.propTypes = {
  content: PropTypes.string.isRequired,
  // buttonWidth: PropTypes.string,
  // buttonHeight: PropTypes.string,
  // bgColor: PropTypes.string,
  // buttonColor: PropTypes.string,
  // bMargin: PropTypes.number,
};

export default ArrowButton2;
