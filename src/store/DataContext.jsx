import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../config/firebase";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export const DataContextProvider = ({ children }) => {
  const [isShowItemModal, setIsShowItemModal] = useState(false);
  const [itemModalTitle, setItemModalTitle] = useState("");

  const setListDataSnapshot = (path, id, onSuccess) => {
    const docRef = doc(collection(db, path), id);
    const q = query(docRef);
    return onSnapshot(
      q,
      (snapShot) => {
        const data = snapShot.data();
        onSuccess(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const setItemListSnapshot = (path, id, onSuccess) => {
    const collectionRef = collection(db, `${path}/${id}/items`);
    const q = query(collectionRef);

    return onSnapshot(
      q,
      (snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        onSuccess(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const deleteItem = async (path, listId, itemId) => {
    const docRef = doc(collection(db, `${path}/${listId}/items`), itemId);
    console.log(docRef);

    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  const createItem = async (path, item, listId) => {
    const collectionRef = collection(db, `${path}/${listId}/items`);
    try {
      addDoc(collectionRef, item);
      console.log(collectionRef, item);
    } catch (error) {
      console.log(error);
    }
  };

  const ctxValue = {
    isShowItemModal,
    setIsShowItemModal,
    itemModalTitle,
    setItemModalTitle,
    setListDataSnapshot,
    setItemListSnapshot,
    deleteItem,
    createItem,
  };

  return <DataContext value={ctxValue}>{children}</DataContext>;
};
