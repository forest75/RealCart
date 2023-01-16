import React from "react";
import { Button } from "@mui/material";

function MaterialButton(props) {
  const data = props;
  return <Button>{data.subject}</Button>;
}

export default MaterialButton;
