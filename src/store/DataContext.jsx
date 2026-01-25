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
  orderBy,
  or,
  writeBatch,
  getDocs,
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
    "other-list": "Egyéb",
  };

  const setNextDateTime = (item) => {
    item.nextDateTime = new Date(item.dateTime).getTime();

    if (!item.isRecurring) {
      return;
    }

    const today = new Date().setHours(0, 0, 0);

    while (item.nextDateTime < today) {
      let date = new Date(item.nextDateTime);

      switch (item.periodUnit) {
        case "day":
          date.setDate(date.getDate() + Number(item.periodValue));
          break;
        case "week":
          date.setDate(date.getDate() + Number(item.periodValue) * 7);
          break;
        case "month":
          date.setMonth(date.getMonth() + Number(item.periodValue));
          break;
        case "year":
          date.setFullYear(date.getFullYear() + Number(item.periodValue));
          break;
      }

      item.nextDateTime = date.getTime();
    }
  };

  const setNextDate = (item) => {
    item.nextDate = new Date(item.nextDateTime);
    item.nextDate.setHours(0, 0, 0, 0);
    item.nextDate = item.nextDate.getTime();
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

  const setItemListSnapshot = ({
    path,
    listId,
    order,
    filter = [],
    setter,
    isSetDate,
  }) => {
    const orderByArray = order.map((item) =>
      orderBy(item.name, item.direction || "asc"),
    );
    const filterArray = filter.map((item) =>
      where(item.name, item.rel, item.value),
    );
    const collectionRef = collection(db, `${path}/${listId}/items`);
    const q = query(collectionRef, ...orderByArray, or(...filterArray));

    return onSnapshot(
      q,
      (snapShot) => {
        let data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (!isSetDate) {
          setter(data);
          return;
        }

        data.forEach((item) => {
          setNextDateTime(item);
          setNextDate(item);
        });
        data = Object.groupBy(data, ({ nextDate }) => nextDate);
        setter(data);
      },
      (error) => {
        console.log(error);
        showAlert({
          title: "Hiba",
          text: error?.message || "Hiba történt a művelet során.",
        });
      },
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
    item.addedAt = new Date();
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

      setter(data);
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

  const deleteItemList = async (path, listId) => {
    const collectionRef = collection(db, `${path}/${listId}/items`);
    const q = query(collectionRef, where("checked", "==", true));
    const batch = writeBatch(db);

    try {
      const docsToDelete = await getDocs(q);

      docsToDelete.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      showAlert({
        title: "Hiba",
        text: error?.message || "Hiba történt a művelet során.",
      });
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
    deleteItemList,
  };

  return <DataContext value={ctxValue}>{children}</DataContext>;
};
