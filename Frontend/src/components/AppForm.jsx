import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

function AppForm({ content }) {
  const [input, setInput] = useState("");
  const verifier = {
    email: () => {
      if (input === "") return false;
      // eslint-disable-next-line
      const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (input.match(regExp) != null) {
        return false;
      }
      return true;
    },
    password: () => {
      if (input === "") return false;
      if (input.length < 8) return true;
      return false;
    },
    nickname: () => {
      if (input === "") return false;
      if (input.length < 3) return true;
      return false;
    },
  };
  const msg = {
    email: "유효한 이메일 형식이 아닙니다.",
    password: "비밀번호는 8자 이상입니다.",
    nickname: "닉네임은 3자 이상입니다.",
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  switch (content) {
    case "email":
      return (
        <TextField
          sx={{
            width: "100%",
          }}
          required
          label="이메일"
          type="email"
          fullWidth
          error={verifier.email()}
          helperText={verifier.email() ? msg.email : ""}
          onChange={onChange}
        />
      );
    case "password":
      return (
        <TextField
          required
          label="비밀번호"
          type="password"
          fullWidth
          error={verifier.password()}
          helperText={verifier.password() ? msg.password : ""}
          onChange={onChange}
        />
      );
    case "passwordCheck":
      return <TextField type="password" fullWidth />;
    case "nickname":
      return <TextField />;
    default:
      return <TextField />;
  }
}

AppForm.defaultProps = {
  content: "",
};

AppForm.propTypes = {
  content: PropTypes.string,
};

export default AppForm;
