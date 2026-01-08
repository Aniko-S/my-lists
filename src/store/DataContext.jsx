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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState(<></>);
  const [modalSize, setModalSize] = useState("lg");
  const [selectedGroup, setSelectedGroup] = useState();

  const { user } = useAuth();

  const groupList = {
    "shopping-list": "Bevásárlólisták",
    "todo-list": "Tennivalók",
    "event-list": "Események",
  };

  const showModal = ({ title, body }) => {
    setIsShowModal(true);
    setModalTitle(title);
    setModalBody(body);
    setModalSize("lg");
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  const showDialog = ({ title, body }) => {
    setIsShowModal(true);
    setModalTitle(title);
    setModalBody(body);
    setModalSize("sm");
  };

  const hideDialog = () => {
    setIsShowModal(false);
  };

  const showAlert = ({ title, text }) => {
    setIsShowModal(true);
    setModalTitle(title);
    setModalBody(<div className="text-center my-3">{text}</div>);
    setModalSize("sm");
  };

  const getListById = async (path, listId, setter = () => {}) => {
    const docRef = doc(collection(db, path), listId);

    try {
      const snapShot = await getDoc(docRef);
      const data = snapShot.data();
      if (!data) {
        throw { message: "A lista nem található." };
      }

      setter(snapShot.data());
      if (data?.type) {
        setSelectedGroup(groupList[data.type]);
      }
    } catch (error) {
      showAlert({
        title: "Hiba",
        text: error?.message || "Hiba történt a művelet során.",
      });
    }
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
        showAlert({
          title: "Hiba",
          text: error?.message || "Hiba történt a művelet során.",
        });
      }
    );
  };

  const deleteItem = async (path, listId, itemId) => {
    const docRef = doc(collection(db, `${path}/${listId}/items`), itemId);

    try {
      await deleteDoc(docRef);
    } catch (error) {
      showAlert({
        title: "Hiba",
        text: error?.message || "Hiba történt a művelet során.",
      });
    }
  };

  const createItem = async (path, listId, item) => {
    const collectionRef = collection(db, `${path}/${listId}/items`);
    try {
      await addDoc(collectionRef, item);
      hideModal();
    } catch (error) {
      showAlert({
        title: "Hiba",
        text: error?.message || "Hiba történt a művelet során.",
      });
    }
  };

  const updateItem = async (path, listId, itemId, updatedItem) => {
    const docRef = doc(collection(db, `${path}/${listId}/items`), itemId);

    try {
      await updateDoc(docRef, updatedItem);
      hideModal();
    } catch (error) {
      showAlert({
        title: "Hiba",
        text: error?.message || "Hiba történt a művelet során.",
      });
    }
  };

  const getItemById = async (path, listId, itemId, setter = () => {}) => {
    const docRef = doc(collection(db, `${path}/${listId}/items`), itemId);

    try {
      const snapShot = await getDoc(docRef);
      const data = snapShot.data();
      if (!data) {
        throw { message: "A tétel nem található." };
      }

      setter(snapShot.data());
    } catch (error) {
      showAlert({
        title: "Hiba",
        text: error?.message || "Hiba történt a művelet során.",
      });
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
      if (!newDoc?.id) {
        throw { message: "Hiba történt a művelet során." };
      }

      return newDoc.id;
    } catch (error) {
      showAlert({
        title: "Hiba",
        text: error?.message || "Hiba történt a művelet során.",
      });
    }
  };

  const deleteList = async (path, listId) => {
    const docRef = doc(collection(db, path), listId);

    try {
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      showAlert({
        title: "Hiba",
        text: error?.message || "Hiba történt a művelet során.",
      });
      return false;
    }
  };

  const ctxValue = {
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    showModal,
    hideModal,
    isShowModal,
    modalTitle,
    setModalTitle,
    modalBody,
    showDialog,
    hideDialog,
    selectedGroup,
    getListById,
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
