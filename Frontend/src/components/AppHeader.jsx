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
        height: 130,
      }}
    >
      <AppBar
        elevation={0}
        sx={{
          borderBottom: "solid 1px  #E2E2E2",
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
                height: 70,
                margin: 2,
              }}
            />
          </Link>
          <Box flexGrow={1} />
          <Link to="/spect" style={{ color: "black", textDecoration: "none" }}>
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
                  borderTop: "solid 1px #f2f2f2",
                }}
              >
                공지사항
              </MenuItem>
            </Link>
            <Link
              to="/freeBoard"
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  borderBottom: "solid 1px  #f2f2f2",
                  borderTop: "solid 1px  #f2f2f2",
                  width: 150,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                자유게시판
              </MenuItem>
            </Link>
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
                  borderBottom: "solid 1px  #f2f2f2",
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
