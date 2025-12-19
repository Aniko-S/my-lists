import {
  AppBar,
  Box,
  Collapse,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const drawerWidth = 240;

function Sidebar(props) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isShoppingListCollapseOpen, setIsShoppingListCollapseOpen] =
    useState(true);
  const [isTodoListCollapseOpen, setIsTodoListCollapseOpen] = useState(true);
  const [isEventListCollapseOpen, setIsEventListCollapseOpen] = useState(true);

  const menuList = [
    {
      id: 1,
      title: "Bevásárlólisták",
      isOpen: isShoppingListCollapseOpen,
      setIsOpen: setIsShoppingListCollapseOpen,
      lists: [
        { id: 11, title: "list 1" },
        { id: 12, title: "list 2" },
        { id: 13, title: "list 3" },
      ],
    },
    {
      id: 2,
      title: "Tennivalók",
      isOpen: isTodoListCollapseOpen,
      setIsOpen: setIsTodoListCollapseOpen,
      lists: [
        { id: 21, title: "list 1" },
        { id: 22, title: "list 2" },
        { id: 23, title: "list 3" },
      ],
    },
    {
      id: 3,
      title: "Események",
      isOpen: isEventListCollapseOpen,
      setIsOpen: setIsEventListCollapseOpen,
      lists: [
        { id: 31, title: "list 1" },
        { id: 32, title: "list 2" },
        { id: 33, title: "list 3" },
      ],
    },
  ];
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
                      <ListItemButton sx={{ pl: 4 }} key={item.id}>
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
          <Typography sx={{ marginBottom: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
