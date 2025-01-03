import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import { signOut } from "next-auth/react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { signOut } from "next-auth/react";
import useAuthCalls from "@/hooks/useAuthCalls";
const ProfileMenu = ({ anchorEl, setAnchorEl, toggleTheme }) => {
  const { logout } = useAuthCalls();
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            toggleTheme();
          }}
          sx={{
            display: "flex",
            justifyContent: "start",

            // border: "2px solid red",
            pt: 0,
            pb: 0,
            // paddingInlineStart: 0,
          }}
        >
          <IconButton
            sx={{
              color: "toggleBtn.main",
            }}
          >
            <PowerSettingsNewIcon color="inherit" fontSize="small" />
          </IconButton>
          {/* <DarkModeSwitch toggleTheme={toggleTheme} />{" "} */}
          <p style={{ fontSize: "0.8rem" }}>Darkmode</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
          sx={{
            display: "flex",
            justifyContent: "start",
            pt: 0,
            pb: 0,
          }}
        >
          <IconButton>
            <Logout fontSize="small" />
          </IconButton>
          <p style={{ fontSize: "0.8rem" }}>Ausloggen</p>
        </MenuItem>
      </Menu>
    </>
  );
};
export default ProfileMenu;
