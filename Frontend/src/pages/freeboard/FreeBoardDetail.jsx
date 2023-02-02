import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Textarea from "@mui/joy/Textarea";
import { useSearchParams, Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import AppButton from "../../components/AppButton";

function FreeBoardDetail() {
  // const chatRef = useRef();
  const [title, setTitle] = useState();
  const [comments, setComments] = useState();
  const [searchParams] = useSearchParams();
  const no = Number(searchParams.get("no"));
  const [chat, setChat] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/board/free/${no}`)
      .then((res) => {
        setTitle(res.data.title);
        setComments(res.data.coments);
        // console.log(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const [chats, setChats] = useState([]);
  // const chatRef = useRef(null);

  const onChange = (event) => {
    setChat(event.target.value);
    setCount(chat.replace(/<br\s*\/?>/gm, "\n").length);
    if (count > 200) {
      alert("200자까지만 작성할 수 있습니다.");
      setChat(chat.substring(0, 200));
    }
  };
  const user = useSelector((state) => state.login.user);
  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(chat);
    // console.log(e);
    if (chat === "") return;
    const data = {
      comments: [
        {
          content: e.target[0].value,
          nickname: user.nickname,
        },
      ],
    };
    console.log(data);

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/board/free`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // const data = {};

    setChat("");
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
          <Link to="/freeBoard" sx={{ textDecoration: "none", color: "black" }}>
            <AppButton sx={{ border: "solid 1px black", marginRight: "10px" }}>
              목록
            </AppButton>
          </Link>
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
            marginBottom: "20px",
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
            height: "15%",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              height: "20%",
              width: "100%",
            }}
          >
            <Box
              display="flex"
              sx={{
                height: "10%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onSubmit={onSubmit}
              >
                <Textarea
                  onChange={onChange}
                  value={chat}
                  type="text"
                  maxLength="200"
                  style={{
                    width: "98%",
                    height: "100px",
                    border: "solid 1px #E8E8E8",
                    marginTop: "70px",
                    padding: " 5px",
                  }}
                  placeholder="저작권 등 다른 사람의 권리를 침해하거나 명예를 훼손하는 게시물은 이용약관 및 관련 법률에 의해 제재를 받을 수 있습니다.&#13;&#10;건전한 토론 문화와 양질의 댓글 문화를 위해, 타인에게 불쾌감을 주는 욕설 또는 특정 계측/민족, 종교 등을 비하하는 단어들은 신고의 대상이 될 수 있습니다."
                />

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "95%",
                    }}
                  >
                    {count}/200
                  </Box>
                  <AppButton type="submit">등록</AppButton>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
        <Box>{comments}</Box>
      </Box>
    </Box>
  );
}

export default FreeBoardDetail;
