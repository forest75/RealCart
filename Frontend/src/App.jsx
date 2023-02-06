import React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import AppHeader from "./components/AppHeader";
import LoginForm from "./pages/LoginForm";
import RegistForm from "./pages/RegistForm";
import FindPassForm from "./pages/FindPassForm";
import AppFooter from "./components/AppFooter";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SpectPage from "./pages/SpectPage";
import PlayPage from "./pages/PlayPage";
import NoticeBoard from "./pages/noticeboard/NoticeBoard";
import NoticeBoardDetail from "./pages/noticeboard/NoticeBoardDetail";
import NoticeBoardWrite from "./pages/noticeboard/NoticeBoardWrite";
import NoticeBoardModify from "./pages/noticeboard/NoticeBoardModify";
import FreeBoard from "./pages/freeboard/FreeBoard";
import FreeBoardDetail from "./pages/freeboard/FreeBoardDetail";
import FreeBoardWrite from "./pages/freeboard/FreeBoardWrite";
import FreeBoardModify from "./pages/freeboard/FreeBoardModify";
import ReportBoard from "./test2/ReportBoard";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Box>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/regist" element={<RegistForm />} />
        <Route path="/findPass" element={<FindPassForm />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/spect" element={<SpectPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/noticeBoard" element={<NoticeBoard />} />
        <Route path="/freeBoard" element={<FreeBoard />} />
        <Route path="/freeBoard/detail" element={<FreeBoardDetail />} />
        <Route path="/freeBoard/write" element={<FreeBoardWrite />} />
        <Route path="/freeBoard/modify" element={<FreeBoardModify />} />
        <Route path="/noticeBoard" element={<NoticeBoard />} />
        <Route path="/noticeBoard/detail" element={<NoticeBoardDetail />} />
        <Route path="/noticeBoard/write" element={<NoticeBoardWrite />} />
        <Route path="/noticeBoard/modify" element={<NoticeBoardModify />} />
        <Route path="/oauth/redirect" element={<AuthPage />} />
        <Route path="/reportBoard" element={<ReportBoard />} />
      </Routes>
      <AppFooter />
    </Box>
  );
}

export default App;
