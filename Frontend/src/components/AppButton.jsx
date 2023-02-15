import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

function AppButton({ children, sx, ...otherProps }) {
  const mergedSx = {
    ...{ bgcolor: "white", color: " black", textDecoration: "none" },
    ...sx,
  };
  return (
    <Button
      sx={mergedSx}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </Button>
  );
}

AppButton.defaultProps = {
  sx: {
    bgcolor: "white",
    color: " black",
  },
  children: "",
};

AppButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
  children: PropTypes.string,
};

export default AppButton;
