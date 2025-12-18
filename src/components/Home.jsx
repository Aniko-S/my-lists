import { Logo, Menu, MenuItem, Sidebar, Submenu } from "react-mui-sidebar";
import ShoppingList from "./ShoppingList";

function Home() {
  return (
    <>
      <Sidebar themeColor="#118505ff" showProfile={false} width="400px">
        <Menu subHeading="">
          <Submenu title="Bevásárlólisták" textFontSize="20px">
            <MenuItem icon={<></>} textFontSize="20px">
              lista1
            </MenuItem>
            <MenuItem icon={<></>} textFontSize="20px">
              lista2
            </MenuItem>
            <MenuItem icon={<></>} textFontSize="20px">
              lista3
            </MenuItem>
          </Submenu>
          <Submenu title="Teendők" textFontSize="20px">
            <MenuItem icon={<></>} textFontSize="20px">
              lista1
            </MenuItem>
            <MenuItem icon={<></>} textFontSize="20px">
              lista2
            </MenuItem>
            <MenuItem icon={<></>} textFontSize="20px">
              lista3
            </MenuItem>
          </Submenu>
          <Submenu title="Események" textFontSize="20px">
            <MenuItem icon={<></>} textFontSize="20px">
              lista1
            </MenuItem>
            <MenuItem icon={<></>} textFontSize="20px">
              lista2
            </MenuItem>
            <MenuItem icon={<></>} textFontSize="20px">
              lista3
            </MenuItem>
          </Submenu>
        </Menu>
      </Sidebar>
    </>
  );
}

export default Home;
