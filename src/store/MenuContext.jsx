import { collection, query, where, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";

const MenuContext = createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export const MenuContextProvider = ({ children }) => {
  const [isShoppingListCollapseOpen, setIsShoppingListCollapseOpen] =
    useState(true);
  const [isTodoListCollapseOpen, setIsTodoListCollapseOpen] = useState(true);
  const [isEventListCollapseOpen, setIsEventListCollapseOpen] = useState(true);

  const [shoppingLists, setShoppingLists] = useState([]);
  const [todoLists, setTodoLists] = useState([]);
  const [eventLists, setEventLists] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    return getLists("shopping-list", setShoppingLists);
  }, [user]);

  useEffect(() => {
    return getLists("todo-list", setTodoLists);
  }, [user]);

  useEffect(() => {
    return getLists("event-list", setEventLists);
  }, [user]);

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
    },
    {
      id: 2,
      title: "Tennivalók",
      isOpen: isTodoListCollapseOpen,
      setIsOpen: setIsTodoListCollapseOpen,
      lists: todoLists,
    },
    {
      id: 3,
      title: "Események",
      isOpen: isEventListCollapseOpen,
      setIsOpen: setIsEventListCollapseOpen,
      lists: eventLists,
    },
  ];

  const ctxValue = { menuList };

  return <MenuContext value={ctxValue}>{children}</MenuContext>;
};
