import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";

const icons = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Purchase",
    icon: <ShoppingCartIcon />,
    url: "/purchases",
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    url: "/sales",
  },

  {
    title: "Brands",
    icon: <StarsIcon />,
    url: "/brands",
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    url: "/products",
  },
];

const iconStyle = {
  color: "#eee",
  "& .MuiSvgIcon-root": { color: "#eee" },
  "&:hover": { color: "red" },
  "&:hover .MuiSvgIcon-root": { color: "red" },
};

const MenuListItems = () => {
  const router = useRouter();
  return (
    <div>
      <List>
        {icons?.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => router.push(item.url)}
              sx={iconStyle}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuListItems;
