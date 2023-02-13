import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import RecordTable from "../components/RecordTable";

function MyPage() {
  const user = useSelector((state) => state.login.user);

  return (
    <Box
      display="flex"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 550,
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
    </Box>
  );
}

export default MyPage;
