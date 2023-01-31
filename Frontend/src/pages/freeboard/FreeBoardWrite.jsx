import React, { useState } from "react";
// import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import AppButton from "../../components/AppButton";

function FreeBoardWrite() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // const [html, setHtml] = useState("");
  // useEffect(() => {
  //   // console.log(editorState.getCurrentContent().getPlainText());
  //   // console.log(convertFromRaw(editorState.getCurrentContent()));
  //   // convertFromRaw(editorState.getCurrentContent());
  //   setHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  // }, [editorState]);
  const handleSubmit = () => {
    // console.log(editorState.getCurrentContent());
    // const contentState = convertFromRaw(editorState);
    // console.log(contentState);
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    // const data = JSON.stringify(rawContentState);

    // console.log(rawContentState, typeof rawContentState);
    // const contentState = convertFromRaw(rawContentState);
    // console.log(contentState, typeof contentState);
    console.log(JSON.stringify(rawContentState));
    // console.log(JSON.stringify(contentState));
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
        // bgcolor: "gray",
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "10%",
          display: "flex",
          // bgcolor: "red",
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
          // bgcolor: "blue",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderTop: 2,
          borderBottom: 3,
        }}
      >
        <TextField
          placeholder="제목을 입력하세요"
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
              editorState={editorState}
              onEditorStateChange={setEditorState}
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
              등록
            </AppButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FreeBoardWrite;
