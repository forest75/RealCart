import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import ArticleBox from "../components/ArticleBox";

function NoticeBoard() {
  // const [page, setPage] = useState(0);
  // const onChangePage = (event, value) => {
  //   setPage(value - 1);
  // };
  // const articleList = [
  //   [
  //     {
  //       no: 0,
  //       title: "여기는 공지사항 게시판입니다.",
  //       author: "운영자",
  //       date: "2023.01.11",
  //       view: 356,
  //     },
  //     {
  //       no: 1,
  //       title: "적당히 적어도 줄이 맞아요",
  //       author: "운영자",
  //       date: "2023.01.11",
  //       view: 356,
  //     },
  //     {
  //       no: 2,
  //       title: "리얼카트 정.말.좋.습.니.다",
  //       author: "운영자",
  //       date: "2023.01.11",
  //       view: 356,
  //     },
  //   ],
  //   [
  //     {
  //       no: 0,
  //       title: "2페이지입니다.",
  //       author: "운영자",
  //       date: "2023.01.11",
  //       view: 356,
  //     },
  //     {
  //       no: 1,
  //       title: "페이지네이션을 구현해보았습니다.",
  //       author: "운영자",
  //       date: "2023.01.11",
  //       view: 356,
  //     },
  //     {
  //       no: 2,
  //       title: "우리모두화이팅!",
  //       author: "운영자",
  //       date: "2023.01.11",
  //       view: 356,
  //     },
  //   ],
  // ];
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
        }}
      >
        <Typography variant="h5">공지사항</Typography>
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
          {/* {articleList[page].map((article) => (
            <ArticleBox
              sx={{
                width: "80%",
                bgcolor: "#f5f5f5",
              }}
              key={article.no}
              no={article.no}
              title={article.title}
              author={article.author}
              date={article.date}
              view={article.view}
            />
          ))} */}
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            // onChange={onChangePage}
            sx={{
              margin: 2,
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default NoticeBoard;
