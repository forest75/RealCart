import React from "react";
import Box from "@mui/material/Box";
import Logo from "../../assets/logo.png";
import AppButton from "../../components/AppButton";

function FreeBoardDetail() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          height: "80vh",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "20%",
            width: "100%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              borderTop: "solid 1px black",
              borderBottom: "solid 1px black",
              height: "100%",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box component="h2" sx={{ marginLeft: "100px", fontWeight: "400" }}>
              여기가 자유게시판인가요?
            </Box>
            <Box component="span" sx={{ marginLeft: "100px" }}>
              2023.03.11
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: "solid 1px black",
              borderBottom: "solid 1px black",
              borderLeft: "solid 1px black",
              height: "100%",
              width: "20%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              alt="logo"
              src={Logo}
              sx={{
                height: 100,
                width: 100,
              }}
            />
            <Box>의권짱짱33</Box>

            <Box>[랭킹 2위] </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "30%",
            width: "100%",
          }}
        >
          <Box component="h3" sx={{ fontWeight: "300", padding: "20px" }}>
            여기는 자유게시판인데 소정캡짱이 랭킹 1위 실화냐?
          </Box>
        </Box>
        <Box
          sx={{
            height: "5%",
            width: "100%",

            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AppButton sx={{ border: "solid 1px black", marginRight: "10px" }}>
            목록
          </AppButton>
          <AppButton
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "solid 1px black",
              marginRight: "10px",
            }}
          >
            수정
          </AppButton>
          <AppButton
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "solid 1px black",
              marginRight: "10px",
            }}
          >
            삭제
          </AppButton>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box component="h3" sx={{ fontWeight: "400", marginLeft: "20px" }}>
            댓글 :
          </Box>
          <Box component="h3" sx={{ fontWeight: "500", marginLeft: "20px" }}>
            2개
          </Box>
        </Box>
        <Box
          sx={{
            border: "solid 1px black",
            height: "15%",
            width: "100%",
            backgroundColor: "green",
          }}
        >
          메롱
        </Box>
        <Box
          sx={{
            border: "solid 1px black",
            height: "20%",
            width: "100%",
            backgroundColor: "yellow",
          }}
        >
          댓글
        </Box>
      </Box>
    </Box>
  );
}

export default FreeBoardDetail;
