import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import PersonIcon from "@mui/icons-material/Person";

import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuListItem from "./MenuListItem";

const adminNavigationList = [
  {
    title: "Logs",
    icon: <DisplaySettingsIcon />,
    url: "/admin/logs",
  },
  {
    title: "Users",
    icon: <PersonIcon />,
    url: "/admin/users",
  },
];

const iconStyle = {
  color: "#eee",
  "& .MuiSvgIcon-root": { color: "#eee" },
  "&:hover": { color: "#E57373" },
  "&:hover .MuiSvgIcon-root": { color: "#E57373" },
};

const NestedListItem = ({ navigationItem }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => router.push(navigationItem.url)}
        sx={iconStyle}
      >
        <ListItemIcon>{navigationItem.icon}</ListItemIcon>
        <ListItemText primary={navigationItem.title} />
      </ListItemButton>
    </ListItem>
  );
};

const NestedList = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ overflowY: "auto" }} role="presentation">
      <ListItemButton onClick={handleClick} sx={iconStyle}>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>

        <ListItemText primary={"Admin"} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 4 }}>
          {adminNavigationList.map((item) => (
            <MenuListItem key={item.url} navigationItem={item} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default NestedList;
