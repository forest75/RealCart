import React from "react";
import Box from "@mui/material/Box";
import ButtonAppBar from "../test/ButtonAppBar";
import FormPropsTextFields from "../test/LoginForm";
import RegistForm from "../pages/RegistForm";
import FindPassForm from "../pages/FindPassForm";

function AppHeader() {
  return (
    <Box>
      <Box>
        <ButtonAppBar />
      </Box>
      <Box
        sx={{
          padding: 25,
        }}
        bgcolor="#f2f2f2"
      >
        <FormPropsTextFields />
      </Box>
      <Box>
        <RegistForm />
      </Box>
      <FindPassForm />
    </Box>
  );
}

export default AppHeader;
