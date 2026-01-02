import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useParams } from "react-router";
import { Delete } from "@mui/icons-material";
import { useData } from "../store/DataContext";
import ItemModal from "./ItemModal";
import ShoppingListItem from "./ShoppingListItem";

function ShoppingList() {
  const [list, setList] = useState();
  const [itemList, setItemList] = useState([]);
  const params = useParams();
  const listId = params.id;
  const itemCollectionRef = collection(db, `shopping-list/${listId}/items`);
  const path = "shopping-list";

  const {
    setIsShowItemModal,
    setListDataSnapshot,
    setItemListSnapshot,
    deleteItem,
  } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    const onSuccess = (data) => {
      setList(data);
    };

    const getDataUnsub = setListDataSnapshot(path, listId, onSuccess);
    return () => getDataUnsub();
  }, [listId]);

  useEffect(() => {
    if (!listId) {
      return;
    }

    const onSuccess = (data) => {
      setItemList(data);
    };

    const getDataUnsub = setItemListSnapshot(path, listId, onSuccess);
    return () => getDataUnsub();
  }, [listId]);

  const deleteProduct = (itemId) => {
    deleteItem(path, listId, itemId);
  };

  const updateProduct = async (event, listId) => {
    const docRef = doc(itemCollectionRef, listId);

    try {
      await updateDoc(docRef, { checked: event.target.checked });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewItem = () => {
    setIsShowItemModal(true);
  };

  return (
    <>
      <ItemModal>
        <ShoppingListItem></ShoppingListItem>
      </ItemModal>
      <h2>{list?.title}</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Termék</th>
            <th>Lelőhely</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <input
                    id={item.id}
                    type="checkbox"
                    checked={item.checked}
                    className="form-check-input"
                    onChange={(e) => updateProduct(e, item.id)}
                  ></input>
                  <label
                    htmlFor={item.id}
                    className={
                      "form-check-label" + (item.checked ? " checked" : "")
                    }
                  >
                    {item.name}
                  </label>
                </td>
                <td>{item.store}</td>
                <td>
                  <Delete onClick={() => deleteProduct(item.id)}></Delete>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={handleNewItem}>
        Tétel hozzáadása
      </button>
    </>
  );
}

export default ShoppingList;
