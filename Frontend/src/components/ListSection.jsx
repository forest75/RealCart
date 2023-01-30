import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import PropTypes from "prop-types";

function ListSection({ category, subcategorys }) {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const { subs } = subcategorys;
  // const subLength = subArrays.length;

  const makeList = ({ subs }) => {
    return (
      <div>
        {subs.map((sub) => (
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={sub} />
            </ListItemButton>
          </List>
        ))}
      </div>
    );
  };
  return (
    <Box>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={category} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {makeList}
      </Collapse>
    </Box>
  );
}
ListSection.defaultProps = {
  category: "",
  subcategorys: [],
};

ListSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  category: PropTypes.string,
  subcategorys: PropTypes.arrayOf(PropTypes.string),
};
export default ListSection;
