import {
  AppBar,
  Box,
  Collapse,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router";
import { useMenu } from "../store/MenuContext";

const drawerWidth = 240;

function Sidebar({ children }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const { menuList } = useMenu();

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setIsMobileDrawerOpen(!isMobileDrawerOpen);
    }
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setIsMobileDrawerOpen(false);
  };

  const drawer = (
    <div style={{ backgroundColor: "#cce7c9", height: "100%" }}>
      <List>
        {menuList.map((listGroup) => {
          return (
            <div key={listGroup.id}>
              <ListItemButton
                onClick={() => listGroup.setIsOpen(!listGroup.isOpen)}
              >
                <ListItemText primary={listGroup.title}></ListItemText>
                {listGroup.isOpen ? (
                  <ExpandLess></ExpandLess>
                ) : (
                  <ExpandMore></ExpandMore>
                )}
              </ListItemButton>
              <Collapse in={listGroup.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {listGroup.lists.map((item) => {
                    return (
                      <ListItemButton
                        sx={{ pl: 4 }}
                        key={item.id}
                        component={Link}
                        to={`/${item.type}`}
                      >
                        <ListItemText primary={item.title}></ListItemText>
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </div>
  );

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
          {/* Drawer on mobile */}
          <Drawer
            variant="temporary"
            open={isMobileDrawerOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            slotProps={{
              root: {
                keepMounted: true, // Better open performance on mobile.
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* Drawer on desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
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
    </>
  );
}

export default Sidebar;
