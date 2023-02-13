import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import WebRtcImg from "../../assets/img/webrtc.png";

function VideoScreen({ videoRef }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        borderTop: "solid 1px #E8E8E8",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "95%",
            height: "95%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div>
            <div className="row">
              {/* <div className="col-md-5">
                <div className="row">
                  <div className="col-md-12">
                    <button
                      onClick={() => {
                        presenter(1);
                      }}
                      id="presenter1"
                      href="#"
                      className="btn btn-success"
                    >
                      <span className="glyphicon glyphicon-play"></span>{" "}
                      Presenter1{" "}
                    </button>
                    <button
                      onClick={() => {
                        presenter(2);
                      }}
                      id="presenter2"
                      href="#"
                      className="btn btn-success"
                    >
                      <span className="glyphicon glyphicon-play"></span>{" "}
                      Presenter2{" "}
                    </button>
                    <button
                      onClick={() => {
                        presenter(3);
                      }}
                      id="presenter3"
                      href="#"
                      className="btn btn-success"
                    >
                      <span className="glyphicon glyphicon-play"></span>{" "}
                      Presenter3{" "}
                    </button>
                    <button
                      onClick={() => {
                        viewer(1);
                      }}
                      id="viewer"
                      href="#"
                      className="btn btn-primary"
                    >
                      <span className="glyphicon glyphicon-user"></span> Viewer1
                    </button>
                    <button
                      onClick={() => {
                        viewer(2);
                      }}
                      id="viewer"
                      href="#"
                      className="btn btn-primary"
                    >
                      <span className="glyphicon glyphicon-user"></span> Viewer2
                    </button>
                    <button
                      onClick={() => {
                        viewer(3);
                      }}
                      id="viewer"
                      href="#"
                      className="btn btn-primary"
                    >
                      <span className="glyphicon glyphicon-user"></span> Viewer3
                    </button>
                  </div>
                </div>
              </div> */}
              <div className="col-md-7">
                <div id="videoBig">
                  <video
                    ref={videoRef}
                    id="video"
                    autoPlay
                    width="640px"
                    height="480px"
                    poster={WebRtcImg}
                    muted
                  />
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Box>
    </Box>
  );
}

VideoScreen.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  videoRef: PropTypes.object.isRequired,
};

export default VideoScreen;
