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
  and,
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

  const setNextDateTime = (item, setChecked) => {
    item.nextDateTime = new Date(item.dateTime).getTime();

    if (!item.isRecurring || (setChecked && !item.lastTimeCompleted)) {
      return;
    }

    if (item.lastTimeCompleted >= new Date().setHours(0, 0, 0, 0)) {
      item.nextDateTime = new Date(item.lastTimeCompleted).getTime();
      return;
    }

    const getCondition = () => {
      return setChecked
        ? item.nextDateTime <= item.lastTimeCompleted
        : item.nextDateTime < new Date().setHours(0, 0, 0, 0);
    };

    while (getCondition()) {
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
    everyItemHasDate = true,
    setChecked,
  }) => {
    return onSnapshot(
      getQueryForItemList(order, filter, path, listId),
      (snapShot) => {
        let data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (!isSetDate) {
          setter(data);
          return;
        }

        const { itemsWithDate, itemsWithoutDate } = setItems(
          data,
          everyItemHasDate,
          setChecked,
        );

        setter(
          itemsWithoutDate.length == 0
            ? itemsWithDate
            : { noDate: itemsWithoutDate, ...itemsWithDate },
        );
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

  const setItems = (data, everyItemHasDate, setChecked) => {
    const itemsWithoutDate = everyItemHasDate
      ? []
      : data.filter((item) => !item.hasDate);

    let itemsWithDate = everyItemHasDate
      ? data
      : data.filter((item) => item.hasDate);

    itemsWithDate.forEach((item) => {
      setNextDateTime(item, setChecked);
      setNextDate(item);

      if (setChecked && item.isRecurring) {
        item.checked = item.lastTimeCompleted == item.nextDateTime;
      }
    });

    itemsWithDate = Object.groupBy(itemsWithDate, ({ nextDate }) => nextDate);

    if (setChecked) {
      Object.values(itemsWithDate).forEach((itemList) => {
        sortByChecked(itemList);
      });

      sortByChecked(itemsWithoutDate);
    }

    return { itemsWithDate, itemsWithoutDate };
  };

  const getQueryForItemList = (order, filter, path, listId) => {
    const orderByArray = order.map((item) =>
      orderBy(item.name, item.direction || "asc"),
    );
    const filterArray = filter.map((item) =>
      where(item.name, item.rel, item.value),
    );
    const collectionRef = collection(db, `${path}/${listId}/items`);
    return query(collectionRef, ...orderByArray, or(...filterArray));
  };

  const sortByChecked = (itemList) => {
    itemList.sort((a, b) => {
      if (a.checked && !b.checked) {
        return 1;
      }

      if (!a.checked && b.checked) {
        return -1;
      }

      return b.addedAt - a.addedAt;
    });
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
    item.addedAt = new Date().getTime();
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

  const copyList = async ({ newTitle, listId, path }) => {
    const newListId = await createList(path, newTitle);
    await copyItems(path, listId, newListId);
    return newListId;
  };

  const copyItems = async (path, fromId, toId) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, `${path}/${fromId}/items`);
    const snapshot = await getDocs(collectionRef);
    const items = snapshot.docs.map((item) => {
      return { ...item.data(), addedAt: new Date().getTime(), checked: false };
    });

    await items.forEach((item) => {
      const docRef = doc(collection(db, `${path}/${toId}/items`));
      batch.set(docRef, item);
    });

    let isSuccess = false;

    await batch
      .commit()
      .then(() => (isSuccess = true))
      .catch((error) =>
        showAlert({
          title: "Hiba",
          text: error?.message || "Hiba történt a művelet során.",
        }),
      );
  };

  const getListsByType = (path, setter) => {
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
      (error) =>
        showAlert({
          title: "Hiba",
          text: error?.message || "Hiba történt az adatok lekérése során.",
        }),
    );
    return () => getDataUnsub();
  };

  const setItemListSnapshotForTodayEvents = (setter) => {
    let collectionRef = collection(db, "event-list");
    const q = query(collectionRef, where("creatorId", "==", user?.uid || ""));
    const getDataUnsub = onSnapshot(
      q,
      async (snapShot) => {
        const lists = snapShot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }));

        let items = await getItemsFromLists(lists);

        setter(items);
      },
      (error) =>
        showAlert({
          title: "Hiba",
          text: error?.message || "Hiba történt az adatok lekérése során.",
        }),
    );

    return () => getDataUnsub();
  };

  const getItemsFromLists = async (lists) => {
    let items = [];

    await Promise.all(
      lists.map(async (list) => {
        let collectionRef = collection(db, `event-list/${list.id}/items`);
        let snapshot = await getDocs(
          query(
            collectionRef,
            or(
              where("isRecurring", "==", true),
              and(
                where("dateTime", ">=", new Date().setHours(0, 0, 0, 0)),
                where("dateTime", "<=", new Date().setHours(23, 59, 59, 59)),
              ),
            ),
          ),
        );
        items = items.concat(
          snapshot.docs.map((doc) => {
            let item = {
              ...doc.data(),
              id: doc.id,
              listId: list.id,
              listTitle: list.title,
            };

            setNextDateTime(item);
            setNextDate(item);

            return item;
          }),
        );
      }),
    );

    return items.filter(
      (item) => item.nextDate == new Date().setHours(0, 0, 0, 0),
    );
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
    copyList,
    getListsByType,
    copyItems,
    setItemListSnapshotForTodayEvents,
  };

  return <DataContext value={ctxValue}>{children}</DataContext>;
};
