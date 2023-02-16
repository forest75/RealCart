/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import kurentoUtils from "kurento-utils";
import axios from "../util/axiosInstance";
import Stomp from "stompjs";
import TransparentImg from "../assets/img/transparent-1px.png";
import WebRtcImg from "../assets/img/webrtc.png";
import Spinner from "../assets/img/spinner.gif";
import Advertise from "../assets/img/advertise.png";
import BoardTable from "../components/BoardTable";
import { Link } from "react-router-dom";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import MainPoster from "../components/video/MainPoster";
import { login } from "../store/loginSlice";

function MainPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const video = useRef(null);
  const text = useRef(null);
  // const [loading, setLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);
  var webRtcPeer;
  var mediaId;

  const [isVideo, setIsVideo] = useState(false);

  function presenterResponse(message) {
    if (message.response != "accepted") {
      var errorMsg = message.message ? message.message : "Unknow error";
      console.info("Call not accepted for the following reason: " + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  function viewerResponse(message) {
    if (message.response != "accepted") {
      var errorMsg = message.message ? message.message : "Unknow error";
      console.info("Call not accepted for the following reason: " + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  function presenter(num) {
    if (!webRtcPeer) {
      showSpinner(video.current);
    }
    var options = {
      localVideo: video.current,
      onicecandidate: onIceCandidate,
    };
    mediaId = num;
    webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        webRtcPeer.generateOffer(onOfferPresenter);
      }
    );
  }

  function onOfferPresenter(error, offerSdp) {
    if (error) return console.error("Error generating the offer");
    console.info("Invoking SDP offer callback function " + mediaId);
    var message = {
      id: "presenter",
      sdpOffer: offerSdp,
      mediaId: mediaId,
    };
    sendMessage(message);
  }
  function viewer(num) {
    if (!webRtcPeer) {
      showSpinner(video.current);
    }
    mediaId = num;
    console.log(num);
    var options = {
      remoteVideo: video.current,
      onicecandidate: onIceCandidate,
    };
    webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(onOfferViewer);
      }
    );
  }

  function onOfferViewer(error, offerSdp) {
    if (error) return console.error("Error generating the offer");
    console.info("Invoking SDP offer callback function " + mediaId);
    var message = {
      id: "viewer",
      sdpOffer: offerSdp,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function onIceCandidate(candidate) {
    console.log("Local candidate" + JSON.stringify(candidate));

    var message = {
      id: "onIceCandidate",
      candidate: candidate,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function stop() {
    var message = {
      id: "stop",
    };
    sendMessage(message);
    dispose();
  }

  function dispose() {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
    }
    hideSpinner(video.current);
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log("Sending message: " + jsonMessage);
    ws.send(jsonMessage);
  }

  function showSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].poster = TransparentImg;
      arguments[
        i
      ].style.background = `center transparent url(${Spinner}) no-repeat`;
    }
  }

  function hideSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].src = "";
      arguments[i].poster = Advertise;
      arguments[i].style.background = "";
    }
  }

  useEffect(() => {
    setInterval(() => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/game`)
        .then((res) => {
          if (res.data.player1 === "" || res.data.player2 === "") {
            setIsVideo(false);
          } else {
            setIsVideo(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 10000);

    if (!user) {
      console.log("user 없음");
      const token = localStorage.getItem("access-token");
      console.log(token);
      if (token) {
        axios
          .get(`https://i8a403.p.ssafy.io/api/user`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            dispatch(login(response.data.body.user));
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.body.user)
            );
            navigate("/");
          })
          .catch((error) => {
            console.log("에러뜸0-----------------");
            console.log(error);
          });
      }
    }

    const wsConst = new WebSocket(`${process.env.REACT_APP_MEDIA_URL}/call`);
    const socketConst = new WebSocket(
      `${process.env.REACT_APP_MEDIA_URL}/chat`
    );
    const stompClientConst = Stomp.over(socketConst);
    stompClientConst.connect({}, function () {
      stompClientConst.subscribe("/subscribe", function (greeting) {
        console.log(greeting.body);
      });
    });

    setWs(wsConst);
    setSocket(socketConst);
    setStompClient(stompClientConst);

    return () => {
      wsConst.close();
      socketConst.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = function (message) {
        var parsedMessage = JSON.parse(message.data);
        console.info("Received message: " + message.data);

        switch (parsedMessage.id) {
          case "presenterResponse":
            presenterResponse(parsedMessage);
            break;
          case "viewerResponse":
            viewerResponse(parsedMessage);
            break;
          case "iceCandidate":
            webRtcPeer.addIceCandidate(
              parsedMessage.candidate,
              function (error) {
                if (error)
                  return console.error("Error adding candidate: " + error);
              }
            );
            break;
          case "stopCommunication":
            dispose();
            break;
          default:
            console.error("Unrecognized message", parsedMessage);
        }
      };

      ws.onopen = () => {
        // setTimeout(() => {
        viewer(1);
        // }, 1000);
      };
    }
  }, [ws]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 1600,
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "45%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              width: "1300px",
              height: "700px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isVideo ? (
              <video
                ref={video}
                id="video"
                autoPlay={true}
                width="800px"
                height="600px"
                poster={WebRtcImg}
                onClick={() => {
                  navigate("/spect");
                }}
                muted={true}
              />
            ) : (
              <MainPoster />
            )}
          </Paper>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "90%",
                editable: "false",
              }}
            >
              <Box
                sx={{
                  height: "5%",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontWeight: "bold",
                    color: " black",
                  }}
                >
                  공지사항
                </Typography>
              </Box>
              <BoardTable address="board/notice" link="/noticeBoard" />

              <Box
                sx={{
                  height: "5%",
                  margin: "20px 0px",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontWeight: "bold",
                    color: " black",
                  }}
                >
                  게시글
                </Typography>
              </Box>
              <BoardTable address="board/free" link="/freeBoard" />
            </Box>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "90%",
              }}
            >
              <Box
                sx={{
                  height: "5%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    width: "50%",
                    fontWeight: "bold",
                    textAlign: "Left",
                    color: " black",
                  }}
                >
                  Ranking
                </Typography>
                <Typography
                  variant="h7"
                  sx={{
                    width: "50%",
                    textAlign: "Right",
                  }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/myPage"
                  >
                    <MilitaryTechIcon />
                    나의 랭킹 보러가기
                  </Link>
                </Typography>
              </Box>

              <BoardTable address="record" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
