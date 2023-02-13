import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { logout } from "../store/loginSlice";
import AppButton from "./AppButton";
import logo from "../assets/logo.png";

function AppHeader() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  const user = useSelector((state) => state.login.user);

  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [displayMenu, setDisplayMenu] = useState("none");

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
    setDisplayMenu("none");
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // const [loginComp, setLoginComp] = useState(
  //   <Link to="/login" style={{ textDecoration: "none" }}>
  //     <AppButton sx={{ width: 150, height: 70 }}>LOGIN</AppButton>
  //   </Link>
  // );

  const useb = () => {
    if (user) {
      return (
        <Box>
          <AppButton sx={{ width: 150, height: 70 }} onClick={handleClick2}>
            {user.nickname}
          </AppButton>
          <Menu
            sx={{ display: { displayMenu } }}
            id="basic-menu"
            anchorEl={anchorEl2}
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link
              to="/myPage"
              style={{ color: "black", textDecoration: "none" }}
            >
              <MenuItem
                display={displayMenu}
                onClick={handleClose2}
                sx={{
                  width: 150,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  borderTop: "solid 1px #f2f2f2",
                }}
              >
                마이페이지
              </MenuItem>
            </Link>
            <Link
              to="/mainPage"
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              <MenuItem
                // onClick={handleClose}
                sx={{
                  borderBottom: "solid 1px  #f2f2f2",
                  borderTop: "solid 1px  #f2f2f2",
                  width: 150,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={handleLogout}
              >
                로그아웃
              </MenuItem>
            </Link>
          </Menu>
        </Box>
      );
      // eslint-disable-next-line no-else-return
    } else {
      return (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <AppButton sx={{ width: 150, height: 70 }}>LOGIN</AppButton>
        </Link>
      );
    }
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
                height: 90,
                margin: 2,
              }}
            />
          </Link>
          <Box flexGrow={1} />
          <Link to="/spect" style={{ color: "black", textDecoration: "none" }}>
            <AppButton sx={{ width: 150, height: 70 }}>RACE</AppButton>
          </Link>
          <AppButton sx={{ width: 150, height: 70 }} onClick={handleClick1}>
            BOARD
          </AppButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl1}
            open={Boolean(anchorEl1)}
            onClose={handleClose1}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link
              to="/noticeBoard"
              style={{ color: "black", textDecoration: "none" }}
            >
              <MenuItem
                onClick={handleClose1}
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
                onClick={handleClose1}
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
                onClick={handleClose1}
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
          <Box>{useb()}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader;
