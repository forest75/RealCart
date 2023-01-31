import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AppButton from "../../components/AppButton";

function FreeBoardWrite() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    // console.log(editorState.getCurrentContent().getPlainText());
    // console.log(convertFromRaw(editorState.getCurrentContent()));
    convertFromRaw(editorState.getCurrentContent());
  }, [editorState]);
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
            <AppButton
              sx={{
                width: "100px",
                height: "40px",
                bgcolor: "black",
                color: "white",
              }}
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
