/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import kurentoUtils from "kurento-utils";
import Stomp from "stompjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import BetWindow from "../components/spect/BetWindow";
import EntryQueue from "../components/spect/EntryQueue";
import Versus from "../components/spect/Versus";
import ReceptionModal from "../components/spect/ReceptionModal";
import ConfirmModal from "../components/spect/ConfirmModal";
import EntryModal from "../components/spect/EntryModal";
import ForbidModal from "../components/spect/ForbidModal";
import WebRtcImg from "../assets/img/webrtc.png";
import Spinner from "../assets/img/spinner.gif";
import TransparentImg from "../assets/img/transparent-1px.png";
import Advertise from "../assets/img/advertise.png";
import SendIcon from "@mui/icons-material/Send";
import {
  setReceptionOpen,
  setEntryOpen,
  setEntryClose,
  setRoomId,
  setIsWait,
  setIsPlay,
} from "../store/modalSlice";
import axios from "axios";
import { Typography } from "@mui/material";

function SpectPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ws, setWs] = useState(null);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);

  const [flicker, setFlicker] = useState(false);

  const video = useRef(null);
  const text = useRef(null);
  const chatRef = useRef(null);
  var webRtcPeer;
  var mediaId;

  const user = useSelector((state) => state.login.user);
  const queue = useSelector((state) => state.queue);
  const modal = useSelector((state) => state.modal);

  // Kurento 관련 함수 시작
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

  function connect() {
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
      stompClient.subscribe("/subscribe", function (greeting) {
        console.log(greeting.body);
      });
    });
  }

  function sendChat(e) {
    e.preventDefault();
    if (text.current.value === "") return;
    if (text.current.value.length > 100)
      return alert("댓글은 100자 이내로 입력해주세요");
    stompClient.send(
      "/publish/messages",
      {},
      JSON.stringify({
        message: `${user.nickname} : ${text.current.value}`,
        senderId: 7,
        receiverId: 14,
      })
    );
    text.current.value = "";
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

  // Kurento 관련 함수 끝

  useEffect(() => {
    const wsConst = new WebSocket(`${process.env.REACT_APP_MEDIA_URL}/call`);
    const socketConst = new WebSocket(
      `${process.env.REACT_APP_MEDIA_URL}/chat`
    );
    const stompClientConst = Stomp.over(socketConst);
    stompClientConst.connect({}, function () {
      stompClientConst.subscribe("/subscribe", function (greeting) {
        console.log(greeting.body);
        setChats((currentArray) => [...currentArray, greeting.body]);
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
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [chats]);

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
        setTimeout(() => {
          viewer(1);
        }, 1000);
      };
    }
  }, [ws]);

  useEffect(() => {
    let endFlicker;
    let endParticipate;
    if (modal.isWait) {
      endFlicker = setInterval(() => {
        setFlicker((prev) => !prev);
      }, 1000);
      endParticipate = setInterval(() => {
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/game/participate?nickname=${user.nickname}`
          )
          .then((res) => {
            console.log(res.data);
            if (res.data === -1) {
              clearInterval(endParticipate);
              dispatch(setIsWait(false));
              dispatch(setRoomId(1));
              dispatch(setEntryOpen());
              dispatch(setIsPlay(true));
              setTimeout(() => {
                navigate(`/play/1`);
                dispatch(setEntryClose());
                dispatch(setRoomId(null));
              }, 10000);
            }
            if (res.data === -2) {
              clearInterval(endParticipate);
              dispatch(setIsWait(false));
              dispatch(setRoomId(2));
              dispatch(setEntryOpen());
              dispatch(setIsPlay(true));
              setTimeout(() => {
                navigate(`/play/2`);
                dispatch(setEntryClose());
                dispatch(setRoomId(null));
              }, 10000);
            }
            if (res.data === -100) {
              alert("오류가 발생했습니다. 재접속해주세요.");
              clearInterval(endParticipate);
              dispatch(setIsWait(false));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2000);
    }
    return () => {
      if (endFlicker) {
        clearInterval(endFlicker);
      }
    };
  }, [modal.isWait]);

  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "center",
        marginBottom: "50px",
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: 700,
          marginRight: "50px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "5%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "65%",
              height: "100%",
            }}
          />
          <Box
            sx={{
              width: "35%",
              height: "100%",
              color: "#FFA114",
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            {modal.isWait ? (
              <Box
                sx={{
                  opacity: flicker ? 0 : 1,
                  animation: "flicker 0.5s linear infinite",
                }}
              >
                대기 중 - 현재 대기 인수 : {queue.queueLength}명
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "10%",
          }}
        >
          <Versus queue={queue} />
          <EntryQueue queue={queue} />
        </Box>
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
                  <div className="col-md-5">
                    <div className="row">
                      <div className="col-md-12">
                        <Typography variant="h6">Camera</Typography>
                        <Button
                          onClick={() => {
                            viewer(1);
                          }}
                          sx={{
                            bgcolor: "tomato",
                            color: "white",
                          }}
                        >
                          <span className="glyphicon glyphicon-user"></span> Red
                        </Button>
                        &nbsp;
                        <Button
                          onClick={() => {
                            viewer(2);
                          }}
                          sx={{
                            bgcolor: "tomato",
                            color: "white",
                          }}
                        >
                          <span className="glyphicon glyphicon-user"></span>{" "}
                          Blue
                        </Button>
                        &nbsp;
                        <Button
                          onClick={() => {
                            viewer(3);
                          }}
                          sx={{
                            bgcolor: "tomato",
                            color: "white",
                          }}
                        >
                          <span className="glyphicon glyphicon-user"></span>{" "}
                          관전
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div id="videoBig">
                      <video
                        ref={video}
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
      </Box>
      <Box
        sx={{
          width: "20%",
          height: "700",
          borderLeft: "solid 1px #E8E8E8",
          paddingLeft: "30px",
        }}
      >
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "15%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <Button
            sx={{
              height: 80,
              width: 250,
              bgcolor: "#043774",
              color: "white",
            }}
            onClick={() => {
              dispatch(setReceptionOpen());
            }}
          >
            Play
          </Button>
        </Box>
        <BetWindow />
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              height: "100%",
            }}
          >
            <Box
              id="chat"
              sx={{
                width: "99.2%",
                height: "90%",
                maxHeight: 315,
                overflow: "auto",
                border: "solid 1px #E8E8E8",
              }}
              ref={chatRef}
            >
              <ul style={{ listStyleType: "none" }}>
                {chats.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Box>
            <Box
              display="flex"
              sx={{
                height: "10%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form
                onSubmit={sendChat}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  ref={text}
                  type="text"
                  style={{
                    width: "70%",
                    padding: "15px 30px",
                    border: "solid 1px #E8E8E8",
                  }}
                  placeholder="채팅을 입력하세요"
                />
                <button
                  type="submit"
                  style={{
                    width: "40%",
                    padding: "10px",
                    border: "solid 1px #E8E8E8",
                  }}
                >
                  <SendIcon />
                </button>
              </form>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              height: 50,
              width: "50%",
              bgcolor: "white",
              color: "black",
              marginTop: "20px",
            }}
          >
            버그 및 문제신고
          </Button>
          <ReceptionModal />
          <ConfirmModal />
          <EntryModal />
          <ForbidModal />
        </Box>
      </Box>
    </Box>
  );
}

export default SpectPage;
