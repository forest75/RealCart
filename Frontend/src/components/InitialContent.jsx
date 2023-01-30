import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import NewContent from "./NewContent";

function InitialContent({
  wait,
  setWait,
  handleModalOpen,
  handleModalClose,
  setIsReady,
}) {
  const [isInitial, setIsInitial] = useState(true);
  return (
    <Box>
      {isInitial ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            width: "25%",
            height: "25%",
          }}
        >
          <Box
            display="flex"
            sx={{
              width: "100%",
              height: "55%",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <h2>현재 대기자 수는 {wait} 명입니다.</h2>
          </Box>
          <Box
            display="flex"
            sx={{
              width: "100%",
              height: "45%",
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
              <Button
                variant="contained"
                sx={{
                  width: "50%",
                  height: "35%",
                  bgcolor: "white",
                  color: "black",
                }}
                onClick={() => {
                  setWait(wait + 1);
                  setIsInitial(false);
                }}
              >
                대기하기
              </Button>
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
              <Button
                variant="contained"
                sx={{
                  width: "50%",
                  height: "35%",
                  bgcolor: "white",
                  color: "black",
                }}
                onClick={handleModalClose}
              >
                취소
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <NewContent
          setWait={setWait}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          setIsReady={setIsReady}
        />
      )}
    </Box>
  );
}

InitialContent.propTypes = {
  wait: PropTypes.number.isRequired,
  setWait: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  setIsReady: PropTypes.func.isRequired,
};

export default InitialContent;
