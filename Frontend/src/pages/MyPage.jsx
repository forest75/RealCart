import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import RecordTable from "../components/RecordTable";

function MyPage() {
  const user = useSelector((state) => state.login.user);

  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "center",
        flexDirection: "column",
        height: "65vh",
        marginBottom: "40px",
      }}
    >
      <Box component="h1" sx={{ marginLeft: "40px" }}>
        My Page
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
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
