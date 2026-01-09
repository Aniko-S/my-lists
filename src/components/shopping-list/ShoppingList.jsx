import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../../store/DataContext";
import ShoppingListItemForm from "./ShoppingListItemForm";
import PageHead from "../PageHead";
import ShoppingListTable from "./ShoppingListTable";
import { setPageHeight } from "../menu/Menu";

function ShoppingList() {
  const [list, setList] = useState();

  const params = useParams();
  const listId = params.id;
  const path = "shopping-list";

  const { showModal, getListById } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    setPageHeight();
    getListById(path, listId, setList);
  }, [listId]);

  const handleNewItem = () => {
    showModal({ body: <ShoppingListItemForm></ShoppingListItemForm> });
  };

  return (
    <>
      <div className="page">
        <PageHead title={list?.title} path={path} listId={listId}></PageHead>
        <ShoppingListTable path={path} listId={listId}></ShoppingListTable>
        <button className="btn btn-success bottom" onClick={handleNewItem}>
          Tétel hozzáadása
        </button>
      </div>
    </>
  );
}

export default ShoppingList;
