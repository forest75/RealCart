import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import car from "../assets/car.jpg";

function MainPage() {
  const navigate = useNavigate();

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

  const boardcolumns = [
    { field: "id", headerName: "번호", width: 150 },
    { field: "title", headerName: "제목", width: 300, editable: true },
    { field: "date", headerName: "등록일", width: 150, editable: true },
  ];

  const notice = [];
  notice.push({
    id: 1,
    title: "여기는 공지사항 게시판입니다.",
    date: "2023.01.27",
  });
  notice.push({
    id: 2,
    title: "리얼카트 곧 출시 예정!",
    date: "2023.01.27",
  });
  notice.push({
    id: 3,
    title: "많은 사랑 부탁드립니다.",
    date: "2023.01.27",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 1400,
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "45%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "solid 1px #E8E8E8",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              width: "60%",
              height: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              alt="mainspect"
              src={car}
              sx={{
                width: "90%",
                height: "90%",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/spect");
              }}
            />
          </Paper>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "90%",
              }}
            >
              <Box
                sx={{
                  height: "5%",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  공지사항
                </Typography>
              </Box>
              <DataGrid
                sx={{
                  height: "42.5%",
                }}
                rows={notice}
                columns={boardcolumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
              <Box
                sx={{
                  height: "5%",
                }}
              />
              <Box
                sx={{
                  height: "5%",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  게시글
                </Typography>
              </Box>
              <DataGrid
                sx={{
                  height: "42.5%",
                }}
                rows={ranking}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "90%",
              }}
            >
              <Box
                sx={{
                  height: "5%",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Ranking
                </Typography>
              </Box>
              <DataGrid
                sx={{
                  height: "95%",
                }}
                rows={ranking}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
