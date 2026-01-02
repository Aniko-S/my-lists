import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Delete, Edit } from "@mui/icons-material";
import { useData } from "../store/DataContext";
import ItemModal from "./ItemModal";
import ShoppingListItem from "./ShoppingListItem";

function ShoppingList() {
  const [list, setList] = useState();
  const [itemList, setItemList] = useState([]);
  const [editItemId, setEditItemId] = useState("");

  const params = useParams();
  const listId = params.id;
  const path = "shopping-list";

  const {
    setIsShowItemModal,
    setListDataSnapshot,
    setItemListSnapshot,
    deleteItem,
    updateItem,
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

  const handleDeleteItem = (itemId) => {
    deleteItem(path, listId, itemId);
  };

  const handleNewItem = () => {
    setIsShowItemModal(true);
  };

  const handleUpdateItem = (id) => {
    setEditItemId(id);
    setIsShowItemModal(true);
  };

  const handleCheck = (event, id) => {
    updateItem(path, listId, id, { checked: event.target.checked });
  };

  return (
    <>
      <ItemModal>
        <ShoppingListItem
          id={editItemId}
          onUnmount={() => {
            setEditItemId(null);
          }}
        ></ShoppingListItem>
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
                    onChange={(e) => handleCheck(e, item.id)}
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
                  <Edit onClick={() => handleUpdateItem(item.id)}></Edit>
                  <Delete onClick={() => handleDeleteItem(item.id)}></Delete>
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
