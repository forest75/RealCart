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
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InitialContent from "../components/InitialContent";
import car from "../assets/car.jpg";
import tmpmain from "../assets/map_keyboard.png";

function SpectPage() {
  const navigate = useNavigate();
  const options = ["1. 상우짱, 성현카트", "2. 의권짱짱33, 지존ㅎHzㅣㄴ"];
  // let idx = 0;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [wait, setWait] = React.useState(1);
  const open = Boolean(anchorEl);

  const [voteA, setVoteA] = React.useState(0);
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
    setChats((currentArray) => [...currentArray, chat]);
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

  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: 800,
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
            {isReady ? <Box>대기 중 - 현재 대기 인수 : {wait}명</Box> : null}
          </Box>
        </Box>
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "15%",
          }}
        >
          <Box
            display="flex"
            sx={{
              width: "65%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={3}
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
                <h1>A 의권짱짱33</h1>
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
                <h1>vs</h1>
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
                <h1>B 지존ㅎHzㅣㄴ</h1>
              </Box>
            </Paper>
          </Box>
          <Box
            display="flex"
            sx={{
              width: "35%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
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
            </Paper>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "80%",
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
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            >
              <Box
                component="img"
                alt="tmp"
                src={tmpmain}
                sx={{
                  width: "10%",
                  height: "10%",
                  position: "absolute",
                  top: "100%",
                  left: "100%",
                  transform: "translate(-100%, -100%)",
                }}
              />
            </Box>
            <Box
              component="img"
              alt="car"
              src={car}
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
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
          height: 700,
        }}
      >
        <Box
          display="flex"
          sx={{
            width: "100%",
            height: "15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Link to="/play" style={{ textDecoration: "none" }}> */}
          <Button
            sx={{
              height: 60,
              width: 150,
              bgcolor: "#043774",
              color: "white",
            }}
            onClick={handleModalOpen}
          >
            Play
          </Button>
          {/* </Link> */}
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
              width: "80%",
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
                border: 1,
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
