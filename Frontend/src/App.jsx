import React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import ButtonAppBar from "./test/ButtonAppBar";
import LoginForm from "./test/LoginForm";
import RegistForm from "./test/RegistForm";
import FindPassForm from "./test/FindPassForm";
import AppFooter from "./test/AppFooter";
import MainPage from "./test/MainPage";
import MyPage from "./test/MyPage";
import SpectPage from "./SpectPage";
import PlayPage from "./PlayPage";

function App() {
  return (
    <Box>
      <Box
        sx={{
          height: 130,
        }}
      >
        <ButtonAppBar />
      </Box>
      <Box>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/regist" element={<RegistForm />} />
          <Route path="/findPass" element={<FindPassForm />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/spect" element={<SpectPage />} />
          <Route path="/play" element={<PlayPage />} />
        </Routes>
      </Box>
      <Box>
        <AppFooter />
      </Box>
    </Box>
  );
}

export default App;
