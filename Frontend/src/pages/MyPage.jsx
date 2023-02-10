import React from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Paper, Grid } from "@mui/material";
import RecordTable from "../components/RecordTable";

function MyPage() {
  const user = useSelector((state) => state.login.user);

  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "center",
      }}
    >
      <Grid>
        <Grid item xs={12}>
          <Box>
            <h1>My Page</h1>
          </Box>
          <Divider />
          <Paper>
            <Box>
              <h1>랭킹 & 최고기록</h1>
            </Box>
            <RecordTable address={`best/record/${user}`} />
          </Paper>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Divider />
          <Box>
            <h1>히스토리</h1>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyPage;
