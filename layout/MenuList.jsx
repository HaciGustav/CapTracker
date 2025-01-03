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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MoreIcon from "@mui/icons-material/More";
import { useRouter } from "next/router";
import MenuListItem from "./MenuListItem";
import { useSelector } from "react-redux";

const navigationItems = [
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
const navigationAdmin = {
  title: "Admin Panel",
  icon: <AdminPanelSettingsIcon />,
  url: "/admin",
};

const MenuList = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <List>
        {navigationItems?.map((item) => (
          <MenuListItem key={item.url} navigationItem={item} />
        ))}
        {user?.userRole === 1 && (
          <MenuListItem navigationItem={navigationAdmin} />
        )}{" "}
      </List>
    </div>
  );
};

export default MenuList;
