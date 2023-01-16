import React from "react";
import Box from "@mui/material/Box";
import ButtonAppBar from "./test/ButtonAppBar";
import FormPropsTextFields from "./test/LoginForm";
import RegistForm from "./test/RegistForm";
import FindPassForm from "./test/FindPassForm";

function AppHeader() {
  return (
    <Box>
      <Box>
        <ButtonAppBar />
      </Box>
      <Box
        sx={{
          padding: 35,
        }}
        bgcolor="#f2f2f2"
      >
        <FormPropsTextFields />
      </Box>
      <Box>
        <RegistForm />
      </Box>
      <Box>
        <FindPassForm />
      </Box>
    </Box>
  );
}

export default AppHeader;
