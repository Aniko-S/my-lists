import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import DrawerOnMobile from "./DrawerOnMobile";
import DrawerOnDesktop from "./DrawerOnDesktop";
import MenuData from "./MenuData";
import Modal from "../Modal";
import { useData } from "../../store/DataContext";

const drawerWidth = 240;
const appBarHeight = 55;

function Menu({ children }) {
  const [isClosing, setIsClosing] = useState(false);
  const { selectedGroup, isMobileDrawerOpen, setIsMobileDrawerOpen } =
    useData();

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setIsMobileDrawerOpen(!isMobileDrawerOpen);
    }
  };

  return (
    <>
      <Modal></Modal>
      <Box sx={{ display: "flex", height: "100%" }}>
        <CssBaseline></CssBaseline>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            height: `${appBarHeight}px`,
          }}
          color="success"
        >
          <Toolbar
            sx={{
              minHeight: "100% !important",
              height: "100%",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon></MenuIcon>
            </IconButton>
            <Typography variant="h5" noWrap component="div">
              {selectedGroup}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <DrawerOnMobile setIsClosing={setIsClosing}>
            <MenuData></MenuData>
          </DrawerOnMobile>

          <DrawerOnDesktop drawerWidth={drawerWidth}>
            <MenuData></MenuData>
          </DrawerOnDesktop>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            maxWidth: "100%",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}

export default Menu;
