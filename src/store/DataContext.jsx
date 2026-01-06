import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export const DataContextProvider = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState(<></>);

  const { user } = useAuth();

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

    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  const createItem = async (path, listId, item) => {
    const collectionRef = collection(db, `${path}/${listId}/items`);
    try {
      await addDoc(collectionRef, item);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (path, listId, itemId, updatedItem) => {
    const docRef = doc(collection(db, `${path}/${listId}/items`), itemId);

    try {
      await updateDoc(docRef, updatedItem);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemById = async (path, listId, itemId, setter = () => {}) => {
    const docRef = doc(collection(db, `${path}/${listId}/items`), itemId);

    try {
      const snapShot = await getDoc(docRef);
      setter(snapShot.data());
    } catch (error) {
      console.log(error);
    }
  };

  const createList = async (path, title) => {
    const collectionRef = collection(db, path);
    const item = {
      title: title,
      creatorId: user?.uid,
      type: path,
    };
    try {
      const newDoc = await addDoc(collectionRef, item);
      setIsShowModal(false);
      return newDoc.id;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteList = async (path, listId) => {
    const docRef = doc(collection(db, path), listId);

    try {
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const ctxValue = {
    isShowModal,
    setIsShowModal,
    modalTitle,
    setModalTitle,
    modalBody,
    setModalBody,
    setListDataSnapshot,
    setItemListSnapshot,
    deleteItem,
    createItem,
    updateItem,
    getItemById,
    createList,
    deleteList,
  };

  return <DataContext value={ctxValue}>{children}</DataContext>;
};
