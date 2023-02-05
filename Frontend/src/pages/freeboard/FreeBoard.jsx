import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AppButton from "../../components/AppButton";
import ArticleBox from "../../components/ArticleBox";
import ArticleBoxTitle from "../../components/ArticleBoxTitle";

function FreeBoard() {
  const [page, setPage] = useState(0);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onChangePage = (event, value) => {
    setPage(value - 1);
  };
  const articleList = [
    [
      {
        no: 0,
        title: "여기가 자유 게시판인가요?.",
        author: "SSAFY1",
        date: "2023.01.11",
        view: 356,
      },
      {
        no: 1,
        title: "리얼카트 너무 재밌어요.",
        author: "김싸피",
        date: "2023.01.11",
        view: 356,
      },
      {
        no: 2,
        title: "골드 미만 글 작성 금지",
        author: "웅니",
        date: "2023.01.11",
        view: 356,
      },
    ],
    [
      {
        no: 0,
        title: "2페이지입니다.",
        author: "운영자",
        date: "2023.01.11",
        view: 356,
      },
      {
        no: 1,
        title: "3페이지는 없어요.",
        author: "운영자",
        date: "2023.01.11",
        view: 356,
      },
      {
        no: 2,
        title: "만들면 생겨요",
        author: "운영자",
        date: "2023.01.11",
        view: 356,
      },
    ],
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 700,
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "10%",
          display: "flex",
        }}
      >
        <Typography variant="h4" flexGrow={1}>
          자유게시판
        </Typography>
        <Box
          sx={{
            width: "35%",
            height: "100%",
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <FormControl
            sx={{
              width: "30%",
            }}
          >
            <InputLabel id="demo-simple-select-label">검색 조건</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>회원명</MenuItem>
              <MenuItem value={20}>제목</MenuItem>
              <MenuItem value={30}>내용</MenuItem>
            </Select>
          </FormControl>
          <InputBase />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArticleBoxTitle
            sx={{
              width: "80%",
            }}
            no="번호"
            title="제목"
            author="작성자"
            date="등록일"
            view="조회수"
          />
          {articleList[page].map((article) => (
            <ArticleBox
              sx={{
                width: "80%",
              }}
              board="freeboard"
              key={article.no}
              no={article.no}
              title={article.title}
              author={article.author}
              date={article.date}
              view={article.view}
            />
          ))}
          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/freeBoard/write">
              <AppButton
                sx={{
                  border: 1,
                  bgcolor: "black",
                  color: "white",
                }}
              >
                글쓰기
              </AppButton>
            </Link>
          </Box>
          <Pagination
            count={articleList.length}
            variant="outlined"
            shape="rounded"
            onChange={onChangePage}
            sx={{
              margin: 2,
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default FreeBoard;
