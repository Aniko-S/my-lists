import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../../store/DataContext";
import ShoppingListItemForm from "./ShoppingListItemForm";
import PageHead from "../PageHead";
import ShoppingListTable from "./ShoppingListTable";

function ShoppingList() {
  const [list, setList] = useState();
  const [itemList, setItemList] = useState([]);

  const params = useParams();
  const listId = params.id;
  const path = "shopping-list";

  const {
    showModal,
    getListById,
    setItemListSnapshot,
    deleteItem,
    updateItem,
  } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    getListById(path, listId, setList);
  }, [listId]);

  useEffect(() => {
    if (!listId) {
      return;
    }

    const getDataUnsub = setItemListSnapshot(path, listId, (data) => {
      setItemList(data);
    });
    return () => getDataUnsub();
  }, [listId]);

  const handleDeleteItem = (itemId) => {
    deleteItem(path, listId, itemId);
  };

  const handleNewItem = () => {
    showModal({ body: <ShoppingListItemForm></ShoppingListItemForm> });
  };

  const handleUpdateItem = (id) => {
    showModal({ body: <ShoppingListItemForm id={id}></ShoppingListItemForm> });
  };

  const handleCheck = (event, id) => {
    updateItem(path, listId, id, { checked: event.target.checked });
  };

  return (
    <>
      <div className="page">
        <PageHead title={list?.title} path={path} listId={listId}></PageHead>
        <ShoppingListTable
          itemList={itemList}
          handleUpdateItem={handleUpdateItem}
          handleCheck={handleCheck}
          handleDeleteItem={handleDeleteItem}
        ></ShoppingListTable>
        <button className="btn btn-success bottom" onClick={handleNewItem}>
          Tétel hozzáadása
        </button>
      </div>
    </>
  );
}

export default ShoppingList;
