import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link, useSearchParams } from "react-router-dom";
import AppButton from "../../components/AppButton";

function FreeBoardModify() {
  const titleRef = useRef();

  const [searchParams] = useSearchParams();
  const no = Number(searchParams.get("no"));

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    axios
      .get(`http://3.34.23.91:8080/board/free/${no}`)
      .then((res) => {
        titleRef.current.value = res.data.title;
        let { content } = res.data;
        try {
          content = JSON.parse(content);
        } catch (e) {
          content = {
            blocks: [
              {
                text: content,
                type: "unstyled",
                entityRanges: [],
              },
            ],
            entityMap: {},
          };
        }
        content = convertFromRaw(content);
        setEditorState(EditorState.createWithContent(content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onEditorStateChange = (eState) => {
    setEditorState(eState);
  };

  const user = useSelector((state) => state.login.user);

  const handleSubmit = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const data = {
      title: titleRef.current.value,
      content: JSON.stringify(rawContentState),
      nickname: user.nickname,
    };
    axios
      .put(`http://3.34.23.91:8080/board/free/${no}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          alignItems: "center",
        }}
      >
        <Typography variant="h4" flexGrow={1}>
          자유게시판
        </Typography>
      </Box>
      <Box
        sx={{
          width: "80%",
          height: "15%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderTop: 2,
          borderBottom: 3,
        }}
      >
        <TextField
          placeholder="수정"
          inputRef={titleRef}
          sx={{
            width: "100%",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              border: 1,
              padding: "2px",
              minHeight: "400px",
            }}
          >
            <Editor
              wrapperStyle={{ margin: "10px" }}
              placeholder="내용을 작성해주세요."
              localization={{ locale: "ko" }}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "20%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "80%",
              height: "30%",
              display: "flex",
              justifyContent: "end",
              alignContent: "end",
              marginTop: "30px",
            }}
          >
            <Box flexGrow={1} />
            <Link
              to="/FreeBoard"
              style={{ color: "black", textDecoration: "none" }}
            >
              <AppButton
                sx={{
                  width: "100px",
                  height: "40px",
                  marginRight: "10px",
                  border: 1,
                }}
              >
                취소
              </AppButton>
            </Link>
            <AppButton
              sx={{
                width: "100px",
                height: "40px",
                bgcolor: "black",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              수정
            </AppButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FreeBoardModify;
