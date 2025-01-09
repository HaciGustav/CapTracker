import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const MenuListItem = ({ navigationItem }) => {
  const iconStyle = {
    color: "#eee",
    "& .MuiSvgIcon-root": { color: "#eee" },
    "&:hover": { color: "#E57373" },
    "&:hover .MuiSvgIcon-root": { color: "#E57373" },
  };

  const router = useRouter();
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

export default MenuListItem;
