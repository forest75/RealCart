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
import ReportBoard from "./pages/reportboard/ReportBoard";
import ReportBoardWrite from "./pages/reportboard/ReportBoardWrite";
import ReportBoardModify from "./pages/reportboard/ReportBoardModify";
import ReportBoardDetail from "./pages/reportboard/ReportBoardDetail";
import AuthPage from "./pages/AuthPage";
import PlayRoom2 from "./test/PlayRoom2";

function App() {
  return (
    <Box>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<PlayRoom2 />} />
        <Route path="/regist" element={<RegistForm />} />
        <Route path="/findPass" element={<FindPassForm />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/spect" element={<SpectPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/freeBoard" element={<FreeBoard />} />
        <Route path="/freeBoard/detail" element={<FreeBoardDetail />} />
        <Route path="/freeBoard/write" element={<FreeBoardWrite />} />
        <Route path="/freeBoard/modify" element={<FreeBoardModify />} />
        <Route path="/reportBoard" element={<ReportBoard />} />
        <Route path="/reportBoard/write" element={<ReportBoardWrite />} />
        <Route path="/reportBoard/modify" element={<ReportBoardModify />} />
        <Route path="/reportBoard/detail" element={<ReportBoardDetail />} />
        <Route path="/noticeBoard" element={<NoticeBoard />} />
        <Route path="/noticeBoard/detail" element={<NoticeBoardDetail />} />
        <Route path="/noticeBoard/write" element={<NoticeBoardWrite />} />
        <Route path="/noticeBoard/modify" element={<NoticeBoardModify />} />
        <Route path="/oauth/redirect" element={<AuthPage />} />
      </Routes>
      <AppFooter />
    </Box>
  );
}

export default App;
