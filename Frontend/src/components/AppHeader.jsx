import React, { useState, useEffect } from "react";
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
  // const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  // const handleClick2 = (event) => {
  //   setAnchorEl2(event.currentTarget);
  // };

  // const handleClose2 = () => {
  //   setAnchorEl2(null);
  // };

  const [loginComp, setLoginComp] = useState(
    <Link to="/login" style={{ textDecoration: "none" }}>
      <AppButton sx={{ width: 150, height: 70 }}>LOGIN</AppButton>
    </Link>
  );

  useEffect(() => {
    if (user) {
      setLoginComp(
        // <AppButton
        //   sx={{ width: 150, height: 70 }}
        //   onClick={() => {
        //     handleLogout();
        //   }}
        // >
        //   {user.nickname}
        // </AppButton>
        // <Box>
        <AppButton sx={{ width: 150, height: 70 }} onClick={handleLogout}>
          {user.nickname}
        </AppButton>
      );
    } else {
      setLoginComp(
        <Link to="/login" style={{ textDecoration: "none" }}>
          <AppButton sx={{ width: 150, height: 70 }}>LOGIN</AppButton>
        </Link>
      );
    }
  }, [user]);

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
<<<<<<< HEAD
                자유게시판
              </MenuItem>
            </Link>
=======
                <MenuItem
                  onClick={handleClose1}
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
>>>>>>> dbf2a5ad1a5055b162064072534336fb590fb5f7
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
          <AppButton sx={{ width: 150, height: 70 }}>ABOUT</AppButton>
          {loginComp}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader;
