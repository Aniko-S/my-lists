import { Drawer } from "@mui/material";

function DrawerOnDesktop({ children, drawerWidth }) {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#cce7c9",
          },
        }}
        open
      >
        {children}
      </Drawer>
    </>
  );
}

export default DrawerOnDesktop;
