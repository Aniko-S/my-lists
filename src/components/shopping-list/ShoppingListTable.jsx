import { Delete, Edit } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useData } from "../../store/DataContext";
import ShoppingListItemForm from "./ShoppingListItemForm";

function ShoppingListTable({ path, listId }) {
  const [itemList, setItemList] = useState([]);
  const [order, setOrder] = useState([
    { name: "checked", direction: "asc" },
    { name: "name", direction: "asc" },
  ]);
  const { setItemListSnapshot, showModal, updateItem, deleteItem } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    const getDataUnsub = setItemListSnapshot(path, listId, order, (data) => {
      setItemList(data);
    });
    return () => getDataUnsub();
  }, [listId]);

  const handleUpdateItem = (id) => {
    showModal({ body: <ShoppingListItemForm id={id}></ShoppingListItemForm> });
  };

  const handleCheck = (event, id) => {
    updateItem(path, listId, id, { checked: event.target.checked });
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(path, listId, itemId);
  };

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th style={{ width: "60px" }}>Kész</th>
            <th>Termék</th>
            <th>Lelőhely</th>
            <th style={{ width: "100px" }}>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <Checkbox
                    color="success"
                    checked={item.checked}
                    id={item.id}
                    onChange={(e) => handleCheck(e, item.id)}
                    className="p-0"
                  ></Checkbox>
                </td>
                <td>{item.name}</td>
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
    </>
  );
}

export default ShoppingListTable;
