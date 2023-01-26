<<<<<<< HEAD
import React, { useState, useRef } from "react";
import { Box, Paper } from "@mui/material";
import car from "../assets/car.jpg";
import toturial from "../assets/toturial.png";

function PlayPage() {
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
  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "c") {
      console.log("haha");
    }
  };

  // useEffect(() => {
  //   imgRef.current.focus();
  // }, []);

  window.addEventListener("keydown", handleKeyPress);
=======
import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
// import car from "../assets/car.jpg";

function PlayPage() {
  const [imgSrc, setImgSrc] = useState("");
  const ws = new WebSocket("ws://43.201.27.53:8081");

  ws.onopen = function () {
    console.log("on open1");
  };

  ws.onmessage = function ({ data }) {
    const url = `data:image/jpeg;base64,${data}`;
    setImgSrc(url);
  };

  window.addEventListener("keydown", (event) => {
    ws.send(event.keyCode);
    console.log(event.keyCode);
  });
>>>>>>> dbf2a5ad1a5055b162064072534336fb590fb5f7

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      tabIndex={0}
      ref={imgRef}
    >
      <Box
        sx={{
          width: "80%",
          height: 900,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "7%",
            display: "flex",
            // bgcolor: "red",
            borderTop: "solid 2px #E8E8E8",
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
                    <h1>A 의권짱짱33</h1>
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
                  <h1>vs</h1>
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
                    <h1>B 지존ㅎHzㅣㄴ</h1>
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
                <h1>배팅현황</h1>
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
                <Paper
                  sx={{
                    width: "90%",
                    height: "90%",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "80%",
            height: "80%",
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
            }}
          >
            <h2>RACE TIME</h2>
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
            }}
          >
            <h2> BEST</h2>
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
            }}
          >
            <h2>LAP</h2>
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
            }}
          >
            <h2> PLACE</h2>
          </Box>
          <Box
            sx={{
              width: "17%",
              height: "40%",
              bottom: "0",
              position: "absolute",
              bgcolor: "black",
              color: "white",
              opacity: "0.5",
            }}
          >
            <Box
              id="chat"
              sx={{
                width: "100%",
                height: "90%",
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
              <form onSubmit={onSubmit}>
                <input
                  onChange={onChange}
                  value={chat}
                  type="text"
                  placeholder="채팅을 입력하세요"
                />
                <button type="submit">전송</button>
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
            }}
          />
          {/* </div> */}
          <Box
            component="img"
            alt="car"
            src={imgSrc}
            sx={{
              width: "40%",
              height: "70%",
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "10%",
            // bgcolor: "orange",
            borderTop: "solid 1px gray",
          }}
        />
      </Box>
    </Box>
  );
}

// export { handleKeyPress };
export default PlayPage;
