import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

function ArticleBox({ sx, content, author, date, ...otherProps }) {
  const mergedSx = {
    ...{ bgcolor: "white", color: "black", borderBottom: 1 },
    ...sx,
  };
  return (
    <Box
      sx={mergedSx}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
        }}
      >
        <Box
          sx={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {author}
        </Box>
        <Box
          style={{
            textDecoration: "none",
            width: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
        >
          {content}
        </Box>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {date}
        </Box>
      </Box>
    </Box>
  );
}

ArticleBox.defaultProps = {
  sx: {},
};

ArticleBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
  no: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ArticleBox;
