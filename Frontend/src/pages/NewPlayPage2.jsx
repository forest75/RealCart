/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AppButton from "../components/AppButton";
import SendIcon from "@mui/icons-material/Send";
import Stomp from "stompjs";
import tutorial from "../assets/toturial1.png";
import RaceTime from "../components/RaceTime";
import rhombusLap from "../assets/rhombus_lab.png";
import rhombusPlace from "../assets/rhombus_place.png";
import RectangleBest from "../assets/Rectangle_Best.png";
import RectangleRace from "../assets/Rectangle_Racetime.png";
import TransparentImg from "../assets/img/transparent-1px.png";
import TransparentImg2 from "../assets/img/transparent-copy.png";
import CountdownOne from "../assets/count_1.png";
import CountdownTwo from "../assets/count_2.png";
import CountdownThree from "../assets/count_3.png";
import CountdownStart from "../assets/START.png";
import CarHandle from "../assets/car_handle.png";
import PlayVersus from "../components/play/PlayVersus";
import Viewer2 from "../components/video/Viewer2";
import SmallViewer3 from "../components/video/SmallViewer3";

function NewPlayPage2() {
  const [chats, setChats] = useState([]);
  const chatRef = useRef(null);

  const imgRef = useRef(null);

  const [carSpeed, setCarSpeed] = useState(0);
  const [lap, setLap] = useState(1);
  const [totalLap, setTotalLap] = useState(2);
  const [isBoost, setIsBoost] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isTutorial, setIsTutorial] = useState(true);
  const user = useSelector((state) => state.login.user);

  const [socket, setSocket] = useState(null);
  const [wss, setWss] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const text = useRef(null);

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

  useEffect(() => {
    // RACE TIME 5초 후에 시작
    const endRunInterval = setTimeout(() => {
      setIsRunning(true);
    }, 5000);

    // 미디어 websocket 연결
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

    // 중계 websocket 연결
    const wssConst = new WebSocket("wss://i8a403.p.ssafy.io:8582");

    setSocket(socketConst);
    setStompClient(stompClientConst);
    setWss(wssConst);

    // 종료 시
    return () => {
      clearTimeout(endRunInterval);
      clearInterval(endParticipantInterval);
      socketConst.close();
      wssConst.close();
    };
  }, []);

  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [chats]);

  useEffect(() => {
    if (wss) {
      wss.onmessage = function incoming(data) {
        console.log("get 1", data);
        if (data === "1") {
          console.log("중계 서버에서 1 받는 데 성공");
          wss.send(user.nickname);
          const intervalId = setInterval(() => {
            setCurrentImage(
              (currentImage) => (currentImage + 1) % images.length
            );
          }, 1000);
          setTimeout(() => {
            clearInterval(intervalId);
          }, 5500);
        }
      };

      wss.onclose = function close() {
        console.log("disconnected");
      };

      window.addEventListener(
        "keyup",
        (e) => {
          if (e.keyCode === 37 || e.keyCode === 39) {
            setTimeout(() => {
              console.log("stop");
              wss.send(41);
            }, 200);
          }
          setKeyState((prevState) => ({
            ...prevState,
            [e.keyCode || e.which]: false,
          }));
        },
        true
      );
    }
  }, [wss]);

  const images = [
    TransparentImg2,
    CountdownThree,
    CountdownTwo,
    CountdownOne,
    CountdownStart,
    TransparentImg,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const [keyState, setKeyState] = useState({});
  const [inputSwitch, setInputSwitch] = useState({
    16: false,
    17: false,
    37: false,
    38: false,
    39: false,
    40: false,
  });
  useEffect(() => {
    setTimeout(() => {
      setIsTutorial(false);
    }, 10000);
    window.addEventListener(
      "keydown",
      (e) => {
        setKeyState((prevState) => ({
          ...prevState,
          [e.keyCode || e.which]: true,
        }));
        if (e.keyCode === 86) {
          console.log(isTutorial);
          setIsTutorial((prevState) => !prevState);
        }
        if (e.keyCode === 66) {
          setIsBoost((prevState) => !prevState);
        }
      },
      true
    );
  }, []);

  useEffect(() => {
    const totalLength = 200;
    const eachInterval = 90;
    if (keyState[16] && inputSwitch[16] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        16: true,
      }));
      const interval = setInterval(() => {
        console.log("stop");
        wss.send(31);
      }, eachInterval);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          16: false,
        }));
      }, totalLength);
    }
    if (keyState[17] && inputSwitch[17] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        17: true,
      }));
      const interval = setInterval(() => {
        console.log("ctrl");
        wss.send(17);
      }, eachInterval);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          17: false,
        }));
      }, totalLength);
    }
    if (keyState[37] && inputSwitch[37] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        37: true,
      }));
      const interval = setInterval(() => {
        console.log("left");
        wss.send(37);
      }, eachInterval);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          37: false,
        }));
      }, totalLength);
    }
    if (keyState[38] && inputSwitch[38] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        38: true,
      }));
      const interval = setInterval(() => {
        console.log("up");
        wss.send(38);
      }, eachInterval);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          38: false,
        }));
      }, totalLength);
    }
    if (keyState[39] && inputSwitch[39] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        39: true,
      }));
      const interval = setInterval(() => {
        console.log("right");
        wss.send(39);
      }, eachInterval);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          39: false,
        }));
      }, totalLength);
    }
    if (keyState[40] && inputSwitch[40] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        40: true,
      }));
      const interval = setInterval(() => {
        console.log("down");
        wss.send(40);
      }, eachInterval);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          40: false,
        }));
      }, totalLength);
    }
  }, [keyState]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 950,
      }}
      tabIndex={0}
      ref={imgRef}
    >
      <Box
        sx={{
          width: "80%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PlayVersus />
        <Paper
          elevation={3}
          sx={{
            width: "1003px",
            height: "753px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            elevation={3}
            sx={{
              width: "90%",
              height: "90%",
              position: "relative",
              bgcolor: "black",
            }}
          >
            <Box
              component="img"
              alt="RectangleRacetime"
              src={RectangleRace}
              sx={{
                width: "25%",
                height: "13%",
                opacity: "92%",
                top: "3%",
                position: "absolute",
                zIndex: 1,
              }}
            />
            <Box
              component="h4"
              sx={{
                width: "25%",
                height: "13%",
                top: "2%",
                left: "7.5%",
                color: "white",
                position: "absolute",
                zIndex: 1,
              }}
            >
              RACE TIME
              <RaceTime isRunning={isRunning} />
            </Box>
            <Box
              component="img"
              alt="RectangleBest"
              src={RectangleBest}
              sx={{
                width: "20%",
                height: "9%",
                opacity: "85%",
                top: "20%",
                position: "absolute",
                zIndex: 1,
              }}
            />
            <Box
              // component="h5"
              sx={{
                width: "20%",
                height: "9%",
                top: "14%",
                left: "7.5%",
                color: "white",
                position: "absolute",
                zIndex: 1,
              }}
            >
              <h3>BEST</h3>
            </Box>
            {isBoost && (
              <Alert
                // icon={false}
                severity="error"
                sx={{
                  top: "-1.5%",
                  right: "40%",
                  position: "absolute",
                  zIndex: 1,
                }}
              >
                부스터 사용 중
              </Alert>
            )}
            <Box
              component="img"
              alt="rhombusLap"
              src={rhombusLap}
              sx={{
                width: "17%",
                height: "13%",
                top: "3%",
                right: "0",
                opacity: "50%",
                position: "absolute",
                zIndex: 1,
              }}
            />
            <Box
              component="h4"
              sx={{
                color: "white",
                position: "absolute",
                top: "1%",
                right: "7%",
                zIndex: 1,
              }}
            >
              LAP
              <p>{`${lap} / ${totalLap}`}</p>
            </Box>
            <Box
              component="img"
              alt="rhombusPlace"
              src={rhombusPlace}
              sx={{
                width: "20%",
                height: "11%",
                top: "17%",
                right: "0",
                opacity: "50%",
                position: "absolute",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
              }}
            />
            <Box
              component="img"
              alt="rhombusPlace"
              src={CarHandle}
              sx={{
                width: "35%",
                height: "40%",
                top: "58%",
                right: "0%",
                position: "absolute",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                position: "absolute",
                top: "73%",
                right: "16%",
                zIndex: 1,
              }}
            >
              {carSpeed}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                top: "79.5%",
                right: "14%",
                zIndex: 1,
              }}
            >
              km/h
            </Typography>
            <AppButton
              sx={{
                width: "13%",
                height: "6%",
                top: "84%",
                right: "10.5%",
                position: "absolute",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              BOOST
            </AppButton>
            <Box
              component="h4"
              sx={{
                top: "15%",
                right: "7%",
                color: "white",
                position: "absolute",
                zIndex: 1,
              }}
            >
              PLACE
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "20%",
                top: "30%",
                right: "-1%",
                position: "absolute",
                // bgcolor: "yellow",
                zIndex: 1,
              }}
            >
              {/* <video
                ref={videoOutlook}
                id="video"
                autoPlay
                width="100%"
                height="100%"
                poster={WebRtcImg}
              /> */}
              <SmallViewer3 />
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "50%",
                bottom: "0",
                position: "absolute",
                bgcolor: "black",
                color: "white",
                opacity: "0.5",
                zIndex: 1,
              }}
            >
              <Box
                id="chat"
                sx={{
                  width: "100%",
                  height: "87%",
                  maxHeight: 300,
                  overflow: "auto",
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
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <form
                  onSubmit={sendChat}
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    // onChange={onChange}
                    // value={chat}
                    ref={text}
                    style={{
                      width: "100%",
                      padding: "10px 30px",
                    }}
                    type="text"
                    placeholder="채팅을 입력하세요"
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "10px",
                      width: "80px",
                    }}
                  >
                    <SendIcon
                      sx={{
                        width: "50px",
                      }}
                    />
                  </button>
                </form>
              </Box>
            </Box>

            {/* <div onKeyDown={handleKeyPress}> */}
            {isTutorial && (
              <Box
                component="img"
                alt="tutorial"
                src={tutorial}
                sx={{
                  width: "40%",
                  height: "50%",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  opacity: "60%",
                  zIndex: 1,
                }}
              />
            )}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                // top: "0%",
                // left: "0%",
                bottom: "10px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      zIndex: 1,
                      width: "30%",
                      height: "50%",
                    }}
                    component="img"
                    alt="slide"
                    src={images[currentImage]}
                  />
                </Box>
                {/* <div>
                  <video
                    ref={video}
                    id="video"
                    autoPlay
                    width="100%"
                    height="100%"
                    poster={WebRtcImg}
                  />
                </div> */}
                <Viewer2 />
              </Box>
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            width: "100%",
            height: "10%",
            // bgcolor: "orange",
            borderTop: "solid 1px #E8E8E8",
            marginTop: "30px",
          }}
        />
      </Box>
    </Box>
  );
}

export default NewPlayPage2;
