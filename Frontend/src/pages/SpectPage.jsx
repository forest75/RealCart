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
// import car from "../assets/car.jpg";
// import tmpmain from "../assets/map_keyboard.png";

function SpectPage() {
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const options = ["1. 상우짱, 성현카트", "2. 의권짱짱33, 지존ㅎHzㅣㄴ"];
  // let idx = 0;
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

  const onChange = (event) => setChat(event.target.value);
  const onSubmit = (event) => {
    // preve;
    event.preventDefault();
    if (chat === "") return;
    // eslint-disable-next-line prefer-template
    const newchat = `${user.nickname} : ` + chat;
    setChats((currentArray) => [...currentArray, newchat]);
    setChat("");
  };

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
    const interval = setTimeout(() => {
      setFlicker(!flicker);
      interval();
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
                <h2>A 의권짱짱33</h2>
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
                <h2>B 지존ㅎHzㅣㄴ</h2>
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
                  key={options[selectedIndex].id}
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
              <Box
                component="img"
                alt="car"
                src="http://192.168.83.21:8080/?action=stream"
                sx={{
                  width: "80%",
                  height: "90%",
                  transform: "rotate(180deg)",
                }}
              />
              {/* <Box
                component="img"
                alt="tmp"
                src={tmpmain}
                sx={{
                  width: "20%",
                  height: "20%",
                  position: "absolute",
                  bottom: "35px",
                  right: "70px",
                }}
              /> */}
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
                width: "100%",
                height: "90%",
                // maxHeight: 500,
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
                onSubmit={onSubmit}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  onChange={onChange}
                  value={chat}
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
                />
              )}
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default SpectPage;
