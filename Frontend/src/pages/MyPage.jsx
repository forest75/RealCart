import { React, useRef } from "react";
// useState,
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import AppButton from "../components/AppButton";
import RecordTable from "../components/RecordTable";

function MyPage() {
  const user = useSelector((state) => state.login.user);
  const nickRef = useRef();
  console.log(user.email);
  console.log(user.nickname);
  // const [nick, setNick] = useState(user.nickname);

  const handleModifyNick = () => {
    const data = {
      nickname: nickRef.current.value,
    };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/user/${user.email}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: 0,
            username: null,
            email: "sj@naver.com",
            nickname: res.data.nickname,
            password: null,
            salt: null,
            intro: null,
            profileImageUrl: null,
            refreshToken: null,
            providerType: null,
          })
        );
        console.log(res);
        // alert("변경이 완료되었습니다.");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        //   console.log({ user });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      display="flex"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 800,
      }}
    >
      <Box
        sx={{
          width: "80%",
        }}
      >
        <Typography variant="h5" flexGrow={1}>
          My Page
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "50px",
        }}
      >
        <Box>
          <Box component="h3">랭킹&최고기록</Box>
          <RecordTable
            address={`record/best/${user.nickname}`}
            user={user.nickname}
          />
        </Box>
        <Box>
          <Box component="h3">히스토리</Box>
          <RecordTable
            address={`record/${user.nickname}`}
            user={user.nickname}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "80%",
          marginTop: "60px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <KeyboardArrowRightIcon />
          <Typography
            variant="h5"
            flexGrow={1}
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "25px",
            }}
          >
            나의 정보 수정하기
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "30px 0px 0px 50px",
          }}
        >
          <Box
            sx={{
              marginRight: "44px",
              fontSize: "25px",
            }}
          >
            닉네임
          </Box>
          <TextField
            id="standard-basic"
            placeholder={user.nickname}
            variant="standard"
            inputRef={nickRef}
          />
          <AppButton
            sx={{
              fontSize: "15px",
              border: "solid 1px gray",
              borderRadius: "20px",
              marginLeft: "20px",
            }}
          >
            중복확인
          </AppButton>
          <AppButton
            sx={{
              fontSize: "15px",
              border: "solid 1px gray",
              borderRadius: "20px",
              marginLeft: "20px",
            }}
            onClick={handleModifyNick}
          >
            변경
          </AppButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "30px 0px 0px 50px",
          }}
        >
          <Box
            sx={{
              marginRight: "20px",
              fontSize: "25px",
            }}
          >
            비밀번호
          </Box>
          <TextField
            id="standard-basic"
            placeholder="＊*******"
            variant="standard"
          />

          <AppButton
            sx={{
              fontSize: "15px",
              border: "solid 1px gray",
              borderRadius: "20px",
              marginLeft: "20px",
            }}
          >
            변경
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
}

export default MyPage;
