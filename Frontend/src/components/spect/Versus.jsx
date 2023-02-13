import React from "react";
import propTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Versus({ queue }) {
  return (
    <Box
      display="flex"
      sx={{
        width: "65%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        border: "solid 1px #E8E8E8",
      }}
    >
      <Box
        elevation={0}
        sx={{
          display: "flex",
          height: "60%",
          width: "95%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          display="flex"
          sx={{
            height: "100%",
            width: "45%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
          {/* <h2>{queue.player1}</h2> */}
        </Box>
        <Box
          display="flex"
          sx={{
            height: "100%",
            width: "10%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>vs</h2>
        </Box>
        <Box
          display="flex"
          sx={{
            height: "100%",
            width: "45%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
          {/* <h2>{queue.player2}</h2> */}
        </Box>
      </Box>
    </Box>
  );
}

Versus.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  queue: propTypes.object.isRequired,
};

export default Versus;
