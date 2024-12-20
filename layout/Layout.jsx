import { useTheme } from "@mui/material/styles";
//ICONS
import MenuIcon from "@mui/icons-material/Menu";

//
//MUI Components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Button, Tooltip, Typography } from "@mui/material";
//
// From nextJS
import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
//
// From React & Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
//
// Custom Components
// import { AppBar, Drawer, DrawerHeader } from "./layout_helpers";
//import ProfileMenu from "@/components/menus/ProfileMenu";
import MenuListItems from "@/components/MenuListItems";
//FROM MUI
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { blueGrey } from "@mui/material/colors";
import useAuthCalls from "@/hooks/useAuthCalls";

const drawerWidth = 250;

export default function Layout({ window, children, toggleTheme }) {
  const theme = useTheme();
  const { logout } = useAuthCalls();
  //! const { user } = useSelector((state) => state.settings);
  const user = {};
  const dispatch = useDispatch();

  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <MenuListItems />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            CapTracker{" "}
          </Typography>
          {user && (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: blueGrey[900],
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: blueGrey[900],
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
}
