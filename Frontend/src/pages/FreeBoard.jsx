import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ArticleBox from "../components/ArticleBox";

function FreeBoard() {
  const [page, setPage] = useState(0);
  const [option, setOption] = React.useState("정렬 조건");

  const handleChange = (event) => {
    setOption(event.target.value);
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
          bgcolor: "red",
          display: "flex",
        }}
      >
        <Typography variant="h4" flexGrow={1}>
          자유게시판
        </Typography>
        <Box
          sx={{
            width: "30%",
            height: "100%",
            bgcolor: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          <FormControl
            sx={{
              width: "30%",
              height: "60%",
              bgcolor: "green",
            }}
          >
            <InputLabel id="demo-simple-select-label" />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={option}
              // label="Age"
              onChange={handleChange}
            >
              <MenuItem value="회원명">회원명</MenuItem>
              <MenuItem value="제목">제목</MenuItem>
              <MenuItem value="내용">내용</MenuItem>
            </Select>
          </FormControl>
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
          <ArticleBox
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
              key={article.no}
              no={article.no}
              title={article.title}
              author={article.author}
              date={article.date}
              view={article.view}
            />
          ))}
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
