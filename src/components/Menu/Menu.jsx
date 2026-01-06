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

function Menu({ children }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { selectedGroup } = useData();

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setIsMobileDrawerOpen(!isMobileDrawerOpen);
    }
  };

  return (
    <>
      <Modal></Modal>
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
              {selectedGroup}
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
            p: 1,
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
