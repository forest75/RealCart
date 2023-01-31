import React from "react";
import { Box, Divider, Paper, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function MyPage() {
  const columns = [
    { field: "id", headerName: "순위", width: 150 },
    { field: "nickname", headerName: "NickName", width: 150, editable: true },
    { field: "laptime", headerName: "LapTime", width: 150, editable: true },
    { field: "date", headerName: "Date", width: 150, editable: true },
  ];
  const ranking = [];
  ranking.push({
    id: 1,
    nickname: "의권짱짱123",
    laptime: "01:23:59",
    date: "2023.01.13",
  });
  ranking.push({
    id: 2,
    nickname: "v스피드왕번개v",
    laptime: "01:23:59",
    date: "2023.01.13",
  });
  const history = [];
  history.push({
    id: 1,
    nickname: "의권짱짱123",
    laptime: "01:23:59",
    date: "2023.01.13",
  });
  history.push({
    id: 2,
    nickname: "의권짱짱123",
    laptime: "01:24:59",
    date: "2023.01.13",
  });
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
          <Paper container>
            <Box>
              <h1>실시간 랭킹</h1>
            </Box>
            <Box sx={{ height: 400, width: 1500 }} justifyItems="center">
              <DataGrid
                rows={ranking}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Paper>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Divider />
          <Paper container>
            <Box>
              <h1>히스토리</h1>
            </Box>
            <Box sx={{ height: 400, width: 1500 }} justifyItems="center">
              <DataGrid
                rows={history}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyPage;
