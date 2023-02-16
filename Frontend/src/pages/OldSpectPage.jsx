/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InitialContent from "../components/InitialContent";
import kurentoUtils from "kurento-utils";
import Stomp from "stompjs";
import TransparentImg from "../assets/img/transparent-1px.png";
import WebRtcImg from "../assets/img/webrtc.png";
import Spinner from "../assets/img/spinner.gif";
import Advertise from "../assets/img/advertise.png";
import axios from "../util/axiosInstance";

function OldSpectPage() {
  const [ParticipantA, setParticipantA] = useState("의권짱짱33");
  const [ParticipantB, setParticipantB] = useState("지존ㅎHzㅣㄴ");
  const user = useSelector((state) => state.login.user);
  const [ws, setWs] = useState(null);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const video = useRef(null);
  const text = useRef(null);
  var webRtcPeer;
  var mediaId;
  1;
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

  useEffect(() => {
    const endOptionInterval = setInterval(() => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/game/queue`)
        .then((res) => {
          const queue = res.data;
          const waitList = queue.split(",");
          console.log(waitList);
          setWait(waitList.length);
          const waitQueue = [];
          for (let i = 0; i < waitList.length; i += 2) {
            waitQueue.push(
              `${i / 2 + 1} - ${waitList.slice(i, i + 2).join(", ")}`
            );
          }
          console.log(waitQueue);
          setOptions(waitQueue);
        });
    }, 2000);

    const endOrderInterval = setInterval(() => {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/game/participate?nickname=${user.nickname}`
        )
        .then((res) => {
          const participate = res.data;
          console.log(participate);
          if (participate === -1) {
            setIsReady(true);
            return;
          } else if (participate === -2) {
            setIsReady(true);
            return;
          }
          // setWait(participate.wait);
        });
    }, 2000);

    const endIndexInterval = setInterval(() => {
      setSelectedIndex((selectedIndex + 1) % options.length);
    }, 5000);

    const endParticipantInterval = setInterval(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`).then((res) => {
        const users = res.data;
        const ran1 = Math.floor(Math.random() * users.length);
        const ran2 = Math.floor(Math.random() * users.length);
        setParticipantA(users[ran1].nickname);
        setParticipantB(users[ran2].nickname);
      });
    }, 5000);

    const wsConst = new WebSocket(`${process.env.REACT_APP_MEDIA_URL}/call`);
    const socketConst = new WebSocket(
      `${process.env.REACT_APP_MEDIA_URL}/chat`
    );
    const stompClientConst = Stomp.over(socketConst);
    stompClientConst.connect({}, function () {
      stompClientConst.subscribe("/subscribe", function (greeting) {
        console.log(greeting.body);
        // const newchat = `${user.nickname} : ` + greeting.body;
        setChats((currentArray) => [...currentArray, greeting.body]);
      });
    });

    setWs(wsConst);
    setSocket(socketConst);
    setStompClient(stompClientConst);

    return () => {
      clearInterval(endOptionInterval);
      clearInterval(endIndexInterval);
      clearInterval(endOrderInterval);
      clearInterval(endParticipantInterval);
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

  const navigate = useNavigate();
  const [options, setOptions] = useState(["1 - "]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [wait, setWait] = React.useState(1);
  const open = Boolean(anchorEl);

  const [voteA, setVoteA] = React.useState(2);
  const [voteB, setVoteB] = React.useState(0);

  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const chatRef = useRef(null);

  const [modalOpen, setModalOpen] = React.useState(false);

  const totalVotes = voteA + voteB;
  let proportionA;
  let proportionB;
  if (totalVotes === 0) {
    proportionA = 0.5;
    proportionB = 0.5;
  } else {
    proportionA = voteA / totalVotes;
    proportionB = voteB / totalVotes;
  }

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const onChange = (event) => setChat(event.target.value);
  // const onSubmit = (event) => {
  //   // preve;
  //   event.preventDefault();
  //   // if (chat === "") return;
  //   // eslint-disable-next-line prefer-template
  //   console.log("서브밋");
  //   stompClient.subscribe("/subscribe", function (greeting) {
  //     console.log("대체몇번실행되는거야");
  //     const newchat = `${user.nickname} : ` + greeting.body;
  //     setChats((currentArray) => [...currentArray, newchat]);
  //     // setChat("");
  //   });
  // };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [chats]);

  // const [modalContent, setModalContent] = useState(null);
  // setModalContent(
  //   <InitialContent
  //     wait={wait}
  //     setWait={setWait}
  //     handleModalClose={handleModalClose}
  //     setModalContent={setModalContent}
  //   />
  // );

  const [isReady, setIsReady] = useState(false);
  const [flicker, setFlicker] = useState(false);
  // const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(!flicker);
      // interval();
    }, 1000);
    return () => clearTimeout(interval);
  }, [flicker]);

  // useEffect(() => {
  //   if (modalOpen) {
  //     const intervalId = setInterval(() => {
  //       setCountdown(countdown - 1);
  //       if (countdown === 0) clearInterval(intervalId);
  //     }, 1000);

  //     // const interval = setInterval(() => {
  //     //   setCountdown(countdown - 1);
  //     //   if (countdown === 0) {
  //     //     clearInterval(interval);
  //     //     // setModalOpen(false);
  //     //   }
  //     // }, 1000);
  //     // return () => clearInterval(interval);
  //   }
  //   return null;
  // }, [modalOpen, countdown]);

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
            {isReady ? (
              <Box
                sx={{
                  opacity: flicker ? 0 : 1,
                  animation: "flicker 0.5s linear infinite",
                }}
              >
                대기 중 - 현재 대기 인수 : {wait}명
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
                <h2>{ParticipantA}</h2>
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
                <h2>{ParticipantB}</h2>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            sx={{
              width: "35%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              border: "solid 1px #E8E8E8",
            }}
          >
            <Box
              elevation={3}
              sx={{
                display: "flex",
                height: "60%",
                width: "95%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <List
                component="nav"
                // aria-label="Device settings"
                sx={{
                  width: "70%",
                  height: "60%",
                }}
              >
                <ListItem
                  button
                  key={options[0].id}
                  id="lock-button"
                  // aria-haspopup="listbox"
                  // aria-controls="lock-menu"
                  // aria-label="when device is locked"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ListItemText primary={options[selectedIndex]} />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  // "aria-labelledby": "lock-button",
                  role: "listbox",
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    disabled={index === selectedIndex}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "90%",
            borderTop: "solid 1px #E8E8E8",
          }}
        >
          {/* <Box
            component="img"
            alt="tmp"
            src={tmpmain}
            sx={{
              width: "100%",
              height: "100%",
            }}
          /> */}

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
              {/* <Box
                component="img"
                alt="car"
                src="http://192.168.83.21:8080/?action=stream"
                sx={{
                  width: "80%",
                  height: "90%",
                  transform: "rotate(180deg)",
                }}
              /> */}
              {/* <header>
                <div className="navbar navbar-inverse navbar-fixed-top"></div>
                <textarea id="text"></textarea>
                <button onClick={sendChat}>sendMessage</button>
              </header> */}
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
                          <span className="glyphicon glyphicon-user"></span>{" "}
                          Viewer1
                        </button>
                        <button
                          onClick={() => {
                            viewer(2);
                          }}
                          id="viewer"
                          href="#"
                          className="btn btn-primary"
                        >
                          <span className="glyphicon glyphicon-user"></span>{" "}
                          Viewer2
                        </button>
                        <button
                          onClick={() => {
                            viewer(3);
                          }}
                          id="viewer"
                          href="#"
                          className="btn btn-primary"
                        >
                          <span className="glyphicon glyphicon-user"></span>{" "}
                          Viewer3
                        </button>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-md-7">
                    <div id="videoBig">
                      <video
                        ref={video}
                        id="video"
                        autoPlay={true}
                        width="640px"
                        height="480px"
                        poster={WebRtcImg}
                        muted={true}
                      ></video>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>

            {/* <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/p7ozHbyOQBY"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            /> */}
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
            onClick={handleModalOpen}
          >
            Play
          </Button>
        </Box>
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "25%",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              width: "90%",
              height: "90%",
            }}
          >
            <Box
              display="flex"
              sx={{
                width: "100%",
                height: "30%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              배팅상황
            </Box>
            <Box
              display="flex"
              sx={{
                width: "100%",
                height: "40%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                display="flex"
                sx={{
                  width: "80%",
                  height: "100%",
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    width: `${Math.max(proportionA * 70 + 30, 30)}%`,
                  }}
                >
                  <Button
                    onClick={() => {
                      setVoteA(voteA + 1);
                    }}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    A
                  </Button>
                </Paper>
                <Paper
                  elevation={3}
                  sx={{
                    width: `${Math.max(proportionB * 70 + 30, 30)}%`,
                    animation: "widthChange 0.5s ease-in-out",
                  }}
                >
                  <Button
                    onClick={() => {
                      setVoteB(voteB + 1);
                    }}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    B
                  </Button>
                </Paper>
              </Box>
            </Box>
            <Box
              display="flex"
              sx={{
                width: "100%",
                height: "30%",
                justifyContent: "center",
                alignItems: "center",
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
                {voteA}명
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
                {voteB}명
              </Box>
            </Box>
          </Paper>
        </Box>
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
                {chats.map((item) => (
                  <li key={item.id}>{item}</li>
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
                  // onChange={onChange}
                  // value={chat}
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
                  // onClick={sendChat}
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
            onClick={handleModalOpen}
          >
            버그 및 문제신고
          </Button>
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            // BackdropProps={{
            //   style: {
            //     backgroundColor: "transparent",
            //     boxShadow: "none",
            //   },
            // }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              {isReady ? (
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
                      bgcolor: "white",
                      color: "#333333",
                      width: "100%",
                      height: "55%",
                      justifyContent: "center",
                      alignItems: "end",
                    }}
                  >
                    <Stack
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">
                        당신의 차례가 되었습니다.
                      </Typography>
                      <Typography variant="h5">입장해주세요.</Typography>
                    </Stack>
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
                        width: "100%",
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
                          navigate("/play");
                          // handleModalClose();
                          // setIsReady(true);
                        }}
                      >
                        입장
                      </Button>
                      {/* 남은 시간 : {countdown} */}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <InitialContent
                  wait={wait}
                  setWait={setWait}
                  handleModalOpen={handleModalOpen}
                  handleModalClose={handleModalClose}
                  setIsReady={setIsReady}
                  setSelectedIndex={setSelectedIndex}
                  options={options}
                  setOptions={setOptions}
                  nickname={user.nickname}
                />
              )}
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default OldSpectPage;
