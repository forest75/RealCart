import { Box, Grid, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

function MainPage() {
  // const webcamRef = useRef(null);
  const [inp, setInput] = useState("");
  // const handleCam = (stream) => {
  //   webcamRef.current.focus();
  //   webcamRef.current.srcObject = stream;
  //   webcamRef.current.addEventListener("keydown", (event) => {
  //     // setInput(event.key);
  //     console.log(event.key);
  //   });
  // };
  useEffect(() => {
    console.log(inp);
  }, [inp]);
  const onChange = (event) => {
    setInput(event.target.value);
  };
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
      <div container style={{ marginBottom: "100px" }}>
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
            <form>
              <input type="text" value={inp} onChange={onChange} />
            </form>
            <Box
              component="img"
              alt="play"
              tabIndex={-1}
              src="http://172.30.192.150:8080/?action=stream"
              onKeyDown={(event) => {
                console.log(event.key);
              }}
            />
            {/* <img
              role="presentation"
              src="http://172.30.192.150:8080/?action=stream"
              alt="play"
              tabIndex={-1}
              onKeyDown={(event) => {
                console.log(event.key);
              }}
            /> */}
          </Grid>
        </Paper>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0px 100px 100px 100px",
        }}
      >
        <Box sx={{ width: 1000 }}>
          <Paper elevation={3}>
            <Grid
              container
              spacing={2}
              style={{
                minWidth: "50vh",
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "30px",
              }}
            >
              <h1>공지사항</h1>
              <h1>게시글</h1>
            </Grid>
          </Paper>
        </Box>
        <Box sx={{ width: 1000, marginLeft: 10 }}>
          <Paper elevation={3}>
            <Grid
              container
              spacing={2}
              style={{
                minWidth: "50vh",
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1>Ranking</h1>
              <Box
                sx={{
                  width: 600,
                  height: 300,
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
            </Grid>
          </Paper>
        </Box>
      </div>
    </Box>
  );
}

export default MainPage;
