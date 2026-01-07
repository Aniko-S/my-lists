import { Drawer } from "@mui/material";
import { useData } from "../../store/DataContext";

function DrawerOnMobile({ children, drawerWidth, setIsClosing }) {
  const { isMobileDrawerOpen, setIsMobileDrawerOpen } = useData();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setIsMobileDrawerOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <>
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
        {children}
      </Drawer>
    </>
  );
}

export default DrawerOnMobile;
