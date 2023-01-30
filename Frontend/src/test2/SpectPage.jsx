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
} from "@mui/material";
import tmpmain from "../assets/tmpmain.jpg";

function SpectPage() {
  const options = ["1. 상우짱, 성현카트", "2. 의권짱짱33, 지존ㅎHzㅣㄴ"];
  // let idx = 0;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);

  const [voteA, setVoteA] = React.useState(0);
  const [voteB, setVoteB] = React.useState(0);

  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const chatRef = useRef(null);

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

  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [chats]);

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
          height: 700,
        }}
      >
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
                <h1>지존ㅎHzㅣㄴ</h1>
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
                  bgcolor: "background.paper",
                  width: "70%",
                  height: "60%",
                }}
              >
                <ListItem
                  button
                  id="lock-button"
                  // aria-haspopup="listbox"
                  // aria-controls="lock-menu"
                  // aria-label="when device is locked"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
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
                    key={option.id}
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
            height: "85%",
          }}
        >
          <Box
            component="img"
            alt="tmp"
            src={tmpmain}
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
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
          <Button
            sx={{
              height: 60,
              width: 150,
              bgcolor: "#043774",
              color: "white",
            }}
          >
            Play
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "25%",
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
          >
            버그 및 문제신고
          </Button>
        </Box>
      </Box>
    </Box>
    // <Box
    //   display="flex"
    //   sx={{
    //     justifyContent: "center",
    //     justifyItems: "center",
    //     justifyTracks: "center",
    //     justifySelf: "center",
    //     alignItems: "center",
    //     alignContent: "center",
    //     alignSelf: "center",
    //     bgcolor: "gray",
    //   }}
    // >
    //   <Grid container>
    //     <Grid
    //       item
    //       xs={9}
    //       sx={{
    //         height: 700,
    //       }}
    //     >
    //       <Stack>
    //         <Box
    //           sx={{
    //             height: 100,
    //           }}
    //         >
    //           <Grid container>
    //             <Grid
    //               item
    //               xs={8}
    //               sx={{
    //                 height: 600,
    //                 bgcolor: "red",
    //               }}
    //             >
    //               a
    //             </Grid>
    //             <Grid
    //               item
    //               xs={4}
    //               sx={{
    //                 height: 600,
    //                 bgcolor: "orange",
    //               }}
    //             >
    //               b
    //             </Grid>
    //           </Grid>
    //         </Box>
    //         <Box
    //           sx={{
    //             height: 600,
    //             bgcolor: "yellow",
    //           }}
    //         >
    //           c
    //         </Box>
    //       </Stack>
    //     </Grid>
    //     <Grid
    //       item
    //       xs={2}
    //       sx={{
    //         height: 700,
    //         bgcolor: "green",
    //       }}
    //     >
    //       d
    //     </Grid>
    //   </Grid>
    // </Box>
  );
}

export default SpectPage;
