import React, { useState, useRef, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// import WebSocket from "isomorphic-ws";
import toturial from "../assets/toturial.png";
// import car from "../assets/car.jpg";

function PlayPage() {
  const [imgSrc] = useState("");

  const ws = new WebSocket("ws://i8a403.p.ssafy.io:8581");

  ws.onopen = function open() {
    console.log("connected");
    ws.send(Date.now());
  };

  ws.onclose = function close() {
    console.log("disconnected");
  };

  ws.onmessage = function incoming(data) {
    console.log(`Roundtrip time: ${Date.now() - data.data} ms`);

    setTimeout(function timeout() {
      ws.send(Date.now());
    }, 500);
  };

  const [keyState, setKeyState] = useState({});
  const [inputSwitch, setInputSwitch] = useState({
    16: false,
    37: false,
    38: false,
    39: false,
    40: false,
  });
  useEffect(() => {
    window.addEventListener(
      "keydown",
      (e) => {
        setKeyState((prevState) => ({
          ...prevState,
          [e.keyCode || e.which]: true,
        }));
      },
      true
    );
    window.addEventListener(
      "keyup",
      (e) => {
        if (e.keyCode === 37 || e.keyCode === 39) {
          setTimeout(() => {
            console.log("stop");
            ws.send(41);
          }, 100);
        }
        setKeyState((prevState) => ({
          ...prevState,
          [e.keyCode || e.which]: false,
        }));
      },
      true
    );
  }, []);

  useEffect(() => {
    if (keyState[16] && inputSwitch[16] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        16: true,
      }));
      const interval = setInterval(() => {
        console.log(16);
        ws.send("stop");
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          16: false,
        }));
      }, 100);
    }
    if (keyState[37] && inputSwitch[37] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        37: true,
      }));
      const interval = setInterval(() => {
        console.log("left");
        ws.send(37);
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          37: false,
        }));
      }, 100);
    }
    if (keyState[38] && inputSwitch[38] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        38: true,
      }));
      const interval = setInterval(() => {
        console.log("up");
        ws.send(38);
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          38: false,
        }));
      }, 100);
    }
    if (keyState[39] && inputSwitch[39] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        39: true,
      }));
      const interval = setInterval(() => {
        console.log("right");
        ws.send(39);
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          39: false,
        }));
      }, 100);
    }
    if (keyState[40] && inputSwitch[40] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        40: true,
      }));
      const interval = setInterval(() => {
        console.log("down");
        ws.send(40);
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          40: false,
        }));
      }, 100);
    }
  }, [keyState]);

  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const chatRef = useRef(null);

  const imgRef = useRef(null);

  const onChange = (event) => setChat(event.target.value);
  const onSubmit = (event) => {
    // preve;
    event.preventDefault();
    if (chat === "") return;
    setChats((currentArray) => [...currentArray, chat]);
    setChat("");
  };

  // const handleKeyPress = (e) => {
  //   e.preventDefault();
  //   if (e.key === "c") {
  //     console.log("haha");
  //   }
  // };

  // useEffect(() => {
  //   imgRef.current.focus();
  // }, []);

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
        <Box
          sx={{
            width: "100%",
            height: "7%",
            display: "flex",
            border: "solid 2px #E8E8E8",
            marginBottom: "30px",
          }}
        >
          <Box
            sx={{
              width: "75%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "95%",
                height: "90%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    width: "45%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h2>A 의권짱짱33</h2>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "orange",
                    }}
                  >
                    <h2>랭킹 2위</h2>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h2>vs</h2>
                </Box>
                <Box
                  sx={{
                    width: "45%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h2>B 지존ㅎHzㅣㄴ</h2>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "orange",
                    }}
                  >
                    <h2>랭킹 3위</h2>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "25%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderLeft: "solid 2px #E8E8E8",
            }}
          >
            <Box
              sx={{
                width: "95%",
                height: "90%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3>배팅현황</h3>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "40%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    height: "90%",
                    display: "flex",
                    border: "solid 2px #E8E8E8",
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRight: "solid 2px #E8E8E8",
                    }}
                  >
                    A 25명
                  </Box>
                  <Box
                    sx={{
                      width: "50%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    B 17명
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Paper
          elevation={3}
          sx={{
            width: "75%",
            height: "65%",
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
            }}
          >
            <Box
              sx={{
                width: "15%",
                height: "13%",
                top: "5%",
                bgcolor: "black",
                color: "white",
                opacity: "50%",
                position: "absolute",
                zIndex: 1,
              }}
            >
              <h3> &nbsp;RACE TIME</h3>
            </Box>
            <Box
              sx={{
                width: "20%",
                height: "13%",
                top: "20%",
                bgcolor: "black",
                color: "white",
                opacity: "50%",
                position: "absolute",
                zIndex: 1,
              }}
            >
              <h3> &nbsp;BEST</h3>
            </Box>
            <Box
              sx={{
                width: "15%",
                height: "13%",
                top: "5%",
                right: "0",
                bgcolor: "black",
                color: "white",
                opacity: "50%",
                position: "absolute",
                zIndex: 1,
              }}
            >
              <h3> &nbsp;LAP</h3>
            </Box>
            <Box
              sx={{
                width: "15%",
                height: "8%",
                top: "20%",
                right: "0",
                bgcolor: "black",
                color: "white",
                opacity: "50%",
                position: "absolute",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3> &nbsp;PLACE</h3>
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
                  // maxHeight: 500,
                  overflow: "auto",
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
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <form
                  onSubmit={onSubmit}
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    onChange={onChange}
                    value={chat}
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
            <Box
              component="img"
              alt="toturial"
              src={toturial}
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
            {/* </div> */}
            <Box
              component="img"
              alt="car"
              src={imgSrc}
              sx={{
                width: "100%",
                height: "100%",
                transform: "rotate(180deg)",
                zIndex: -1,
              }}
            />
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

// export { handleKeyPress };
export default PlayPage;
