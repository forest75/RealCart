import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import Logo from "../../assets/logo.png";
import AppButton from "../../components/AppButton";

function NoticeBoardDetail() {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [searchParams] = useSearchParams();
  const no = Number(searchParams.get("no"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/board/notice/${no}`)
      .then((res) => {
        let resContent = res.data.content;
        try {
          resContent = JSON.parse(resContent);
          resContent = draftToHtml(resContent);
        } finally {
          setTitle(res.data.title);
          setContent(resContent);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/board/notice/${no}`, {})
      .then((response) => {
        navigate("/noticeboard");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <Box
              component="h1"
              sx={{
                marginBottom: "10px",
                fontWeight: "400",

                marginLeft: "100px",
              }}
            >
              {title}
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
            }}
          >
            <Box
              component="img"
              alt="logo"
              src={Logo}
              sx={{
                height: 120,
                width: 120,
                marginLeft: "60px",
                marginBottom: "5px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            height: "30%",
            width: "100%",
          }}
        >
          <Box component="h3" sx={{ fontWeight: "300", padding: "20px" }}>
            <Box
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
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
          <Link
            to="/noticeBoard"
            sx={{ textDecoration: "none", color: "black" }}
          >
            <AppButton sx={{ border: "solid 1px black", marginRight: "10px" }}>
              목록
            </AppButton>
          </Link>
          <Link
            to={`/noticeBoard/modify?no=${no}`}
            sx={{ textDecoration: "none", color: "black" }}
          >
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
          </Link>
          <AppButton
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "solid 1px black",
              marginRight: "10px",
            }}
            onClick={handleDelete}
          >
            삭제
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
}

export default NoticeBoardDetail;
