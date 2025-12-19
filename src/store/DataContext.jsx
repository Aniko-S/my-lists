import { collection, query, where, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export const DataContextProvider = ({ children }) => {
  const [isShoppingListCollapseOpen, setIsShoppingListCollapseOpen] =
    useState(true);
  const [isTodoListCollapseOpen, setIsTodoListCollapseOpen] = useState(true);
  const [isEventListCollapseOpen, setIsEventListCollapseOpen] = useState(true);

  const [shoppingLists, setShoppingLists] = useState([]);

  const collectionRef = collection(db, "shopping-list");
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collectionRef, where("creatorId", "==", user?.uid || ""));
    const getDataUnsub = onSnapshot(
      q,
      (snapShot) => {
        console.log(snapShot);
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setShoppingLists(data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => getDataUnsub();
  }, [user]);

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
      lists: [
        { id: 21, title: "list 1", type: "todo-list" },
        { id: 22, title: "list 2", type: "todo-list" },
        { id: 23, title: "list 3", type: "todo-list" },
      ],
    },
    {
      id: 3,
      title: "Események",
      isOpen: isEventListCollapseOpen,
      setIsOpen: setIsEventListCollapseOpen,
      lists: [
        { id: 31, title: "list 1", type: "event-list" },
        { id: 32, title: "list 2", type: "event-list" },
        { id: 33, title: "list 3", type: "event-list" },
      ],
    },
  ];

  const ctxValue = { menuList };

  return <DataContext value={ctxValue}>{children}</DataContext>;
};
