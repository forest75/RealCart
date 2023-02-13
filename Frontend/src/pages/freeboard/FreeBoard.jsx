import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [loading, setLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onChangePage = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/board/free`).then((res) => {
      console.log(res);
      const articles = res.data;
      if (articles.length === 0) {
        setArticleList([
          [
            {
              id: "-",
              title: "게시글이 없습니다.",
              nickname: "-",
              hit: "-",
            },
          ],
        ]);
      } else {
        const numberOfArticlesPerUnit = 10;
        const numberOfUnits = Math.ceil(
          articles.length / numberOfArticlesPerUnit
        );
        const List = [];
        for (let i = 0; i < numberOfUnits; i += 1) {
          List.push(
            articles.slice(
              i * numberOfArticlesPerUnit,
              (i + 1) * numberOfArticlesPerUnit
            )
          );
        }
        setArticleList(List);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 1000,
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
              board="freeBoard"
              key={article.id}
              no={article.id}
              title={article.title}
              author={article.nickname}
              date={new Date(article.createdTime).toLocaleDateString()}
              view={article.hit}
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
