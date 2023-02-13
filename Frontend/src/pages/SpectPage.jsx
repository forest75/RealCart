/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import kurentoUtils from "kurento-utils";
import Stomp from "stompjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BetWindow from "../components/spect/BetWindow";
import EntryQueue from "../components/spect/EntryQueue";
import Versus from "../components/spect/Versus";
import ReceptionModal from "../components/spect/ReceptionModal";
import ConfirmModal from "../components/spect/ConfirmModal";
import EntryModal from "../components/spect/EntryModal";
import ForbidModal from "../components/spect/ForbidModal";
// import VideoScreen from "../components/spect/VideoScreen";
import Viewer1 from "../components/video/Viewer1";
import Viewer2 from "../components/video/Viewer2";
import Viewer3 from "../components/video/Viewer3";
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
import { setVideo1, setVideo2, setVideo3 } from "../store/videoSlice";
import axios from "axios";

function SpectPage() {
  const videoSlice = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);

  const [flicker, setFlicker] = useState(false);

  const text = useRef(null);
  const chatRef = useRef(null);

  const user = useSelector((state) => state.login.user);
  const queue = useSelector((state) => state.queue);
  const modal = useSelector((state) => state.modal);

  // Kurento 관련 함수 시작
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
  // Kurento 관련 함수 끝

  useEffect(() => {
    dispatch(setVideo1(true));
    dispatch(setVideo2(false));
    dispatch(setVideo3(false));
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

    setSocket(socketConst);
    setStompClient(stompClientConst);

    return () => {
      socketConst.close();
    };
  }, []);

  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [chats]);

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
                            dispatch(setVideo1(true));
                            dispatch(setVideo2(false));
                            dispatch(setVideo3(false));
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
                            dispatch(setVideo1(false));
                            dispatch(setVideo2(true));
                            dispatch(setVideo3(false));
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
                            dispatch(setVideo1(false));
                            dispatch(setVideo2(false));
                            dispatch(setVideo3(true));
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
                    {videoSlice.video1 ? <Viewer1 /> : null}
                    {videoSlice.video2 ? <Viewer2 /> : null}
                    {videoSlice.video3 ? <Viewer3 /> : null}
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
