import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MenuList from "@/layout/MenuList";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { blueGrey } from "@mui/material/colors";
import { setUser } from "@/redux/slices/authSlice";
import ProfileMenu from "@/components/menus/ProfileMenu";

const drawerWidth = 200;

export default function Layout({ window, children, toggleTheme }) {
  const { user } = useSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <MenuList />
    </div>
  );

  const getSessionData = async () => {
    const session = await getSession();
    const user = session?.user?.user;
    const credentials = {
      avatar: user?.avatar,
      userRole: user?.user_role,
      token: session?.user?.token,
      userId: user.id,
      firstname: user?.firstname,
      lastname: user?.lastname,
    };
    dispatch(setUser({ user: credentials }));
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const userAvatar = user?.avatar;

  const avatar = userAvatar
    ? userAvatar?.url + "?" + userAvatar?.lastEdited
    : "/assets/emptyAvatar.jpg";

  useEffect(() => {
    getSessionData();
  }, []);

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
          <Typography variant="h5" noWrap component="div"
            sx={{
              flexGrow: 1,
              color: "white", 
              fontWeight: "bold"
            }}
          >
          CapTracker
          </Typography>
          <div
            style={{
              display: "flex",
              columnGap: "15px",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "white", 
                textTransform: "capitalize",
                fontSize: "1rem",
              }}
            >
              {`${user?.firstname} ${user?.lastname}`}
            </Typography>{" "}
            <Image
              onClick={handleClick}
              src={avatar}
              width={50}
              height={50}
              alt="profilePicture"
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
            <ProfileMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              toggleTheme={toggleTheme}
            />
          </div>
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
              backgroundColor: "#4C6663",
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
              backgroundColor: "#4C6663",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
