import React from "react";
import { Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import ButtonAppBar from "./test/ButtonAppBar";
import LoginForm from "./test/LoginForm";
import RegistForm from "./test/RegistForm";
import FindPassForm from "./test/FindPassForm";
import AppFooter from "./test/AppFooter";
import MainScreen from "./test/MainScreen";

function App() {
  return (
    <Box>
      <Box
        sx={{
          height: 300,
        }}
      >
        <ButtonAppBar />
      </Box>
      <Box
        sx={{
          bgcolor: "#f2f2f2",
        }}
      >
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/regist" element={<RegistForm />} />
          <Route path="/findPass" element={<FindPassForm />} />
        </Routes>
      </Box>
      <Box>
        <AppFooter />
      </Box>
    </Box>
  );
}

export default App;
