import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useAuth } from "../../store/AuthContext";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { Add, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router";
import { useData } from "../../store/DataContext";
import CreateList from "../CreateList";

function MenuData() {
  const [isShoppingListCollapseOpen, setIsShoppingListCollapseOpen] =
    useState(true);
  const [isTodoListCollapseOpen, setIsTodoListCollapseOpen] = useState(true);
  const [isEventListCollapseOpen, setIsEventListCollapseOpen] = useState(true);

  const [shoppingLists, setShoppingLists] = useState([]);
  const [todoLists, setTodoLists] = useState([]);
  const [eventLists, setEventLists] = useState([]);

  const { user } = useAuth();
  const { showModal, setIsMobileDrawerOpen } = useData();

  useEffect(() => {
    return getLists("shopping-list", setShoppingLists);
  }, [user]);

  useEffect(() => {
    return getLists("todo-list", setTodoLists);
  }, [user]);

  useEffect(() => {
    return getLists("event-list", setEventLists);
  }, [user]);

  const handleCreateList = (type) => {
    showModal({
      title: "Új lista létrehozása",
      body: <CreateList defaultType={type}></CreateList>,
    });
  };

  const getLists = (path, setter) => {
    const collectionRef = collection(db, path);
    const q = query(collectionRef, where("creatorId", "==", user?.uid || ""));
    const getDataUnsub = onSnapshot(
      q,
      (snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setter(data);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => getDataUnsub();
  };

  const menuList = [
    {
      id: 1,
      title: "Bevásárlólisták",
      isOpen: isShoppingListCollapseOpen,
      setIsOpen: setIsShoppingListCollapseOpen,
      lists: shoppingLists,
      path: "shopping-list",
    },
    {
      id: 2,
      title: "Tennivalók",
      isOpen: isTodoListCollapseOpen,
      setIsOpen: setIsTodoListCollapseOpen,
      lists: todoLists,
      path: "todo-list",
    },
    {
      id: 3,
      title: "Események",
      isOpen: isEventListCollapseOpen,
      setIsOpen: setIsEventListCollapseOpen,
      lists: eventLists,
      path: "event-list",
    },
  ];

  return (
    <>
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
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key="new"
                      component={Link}
                      onClick={() => handleCreateList(listGroup.path)}
                    >
                      <Add
                        color="success"
                        style={{
                          stroke: "green",
                          strokeWidth: "2",
                          margin: "0px 5px 5px 0px",
                        }}
                      ></Add>
                      <ListItemText primary="Új lista"></ListItemText>
                    </ListItemButton>
                    {listGroup.lists.map((item) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4 }}
                          key={item.id}
                          component={Link}
                          to={`/${item.type}/${item.id}`}
                        >
                          <ListItemText
                            primary={item.title}
                            onClick={() => setIsMobileDrawerOpen(false)}
                          ></ListItemText>
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
    </>
  );
}

export default MenuData;
