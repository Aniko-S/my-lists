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

const drawerWidth = 240;

function Menu({ children }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setIsMobileDrawerOpen(!isMobileDrawerOpen);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline></CssBaseline>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
          color="success"
        >
          <Toolbar>
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
              Lista címe
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <DrawerOnMobile
            setIsClosing={setIsClosing}
            isMobileDrawerOpen={isMobileDrawerOpen}
            setIsMobileDrawerOpen={setIsMobileDrawerOpen}
          >
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
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
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
