import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import AppButton from "./AppButton";
import logo from "../assets/logo.png";

function AppHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        height: 160,
      }}
    >
      <AppBar
        sx={{
          bgcolor: "white",
        }}
      >
        <Toolbar>
          <Link to="/">
            <Box
              component="img"
              alt="logo"
              src={logo}
              sx={{
                height: 90,
                margin: 1,
              }}
            />
          </Link>
          <Box flexGrow={1} />
          <Link to="/spect" style={{ textDecoration: "none" }}>
            <AppButton sx={{ width: 150, height: 70 }}>RACE</AppButton>
          </Link>
          <AppButton sx={{ width: 150, height: 70 }} onClick={handleClick}>
            BOARD
          </AppButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link
              to="/noticeBoard"
              style={{ color: "black", textDecoration: "none" }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  width: 150,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                공지사항
              </MenuItem>
            </Link>
            <Box
              sx={{
                height: 60,
                display: "flex",
                alignItems: "center",
                borderTop: 1,
                borderColor: "grey.500",
              }}
            >
              <Link
                to="/freeBoard"
                style={{ color: "black", textDecoration: "none" }}
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    width: 150,
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  자유게시판
                </MenuItem>
              </Link>
            </Box>
            <Link
              to="/reportBoard"
              style={{ color: "black", textDecoration: "none" }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  width: 150,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  borderTop: 1,
                  borderColor: "grey.500",
                }}
              >
                문의
              </MenuItem>
            </Link>
          </Menu>
          <AppButton sx={{ width: 150, height: 70 }}>ABOUT</AppButton>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <AppButton sx={{ width: 150, height: 70 }}>LOGIN</AppButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader;
