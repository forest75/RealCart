import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

function MainPage() {
  const columns = [
    { field: "id", headerName: "순위", width: 150 },
    { field: "nickname", headerName: "NickName", width: 150, editable: true },
    { field: "laptime", headerName: "LapTime", width: 150, editable: true },
  ];
  const ranking = [];
  ranking.push({
    id: 1,
    nickname: "의권짱짱123",
    laptime: "01:23:59",
  });
  ranking.push({
    id: 2,
    nickname: "v스피드왕번개v",
    laptime: "01:23:59",
  });
  // const boardColumns = [
  //   { field: "id", headerName: "번호", width: 150 },
  //   { field: "subject", headerName: "NickName", width: 150, editable: true },
  //   { field: "author", headerName: "NickName", width: 150, editable: true },
  //   { field: "view", headerName: "NickName", width: 150, editable: true },
  // ]

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ marginBottom: "50px", marginTop: "30px" }}>
        <Link to="/spect" style={{ color: "black", textDecoration: "none" }}>
          <Paper elevation={3}>
            <Grid
              container
              spacing={2}
              style={{
                minWidth: "90vh",
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              a
            </Grid>
          </Paper>
        </Link>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
        }}
      >
        <Box>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              height: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              spacing={2}
              style={{
                minWidth: "100vh",
                minHeight: "5vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>공지사항</h3>
              <Box
                sx={{
                  width: 700,
                  height: 150,
                }}
              >
                <DataGrid
                  rows={ranking}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
            </Box>
            <Box
              container
              spacing={2}
              style={{
                minWidth: "100vh",
                minHeight: "5vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>게시글</h3>
              <Box
                sx={{
                  width: 700,
                  height: 150,
                }}
              >
                <DataGrid
                  rows={ranking}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box>
          <Paper elevation={3} sx={{ width: "100%", height: "500px" }}>
            <Box
              container
              spacing={2}
              style={{
                minWidth: "90vh",
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Ranking</h3>
              <Box
                sx={{
                  width: 700,
                  height: 350,
                }}
              >
                <DataGrid
                  rows={ranking}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </div>
    </Box>
  );
}

export default MainPage;
