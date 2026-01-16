import { useEffect, useState } from "react";
import EventListItemForm from "./EventListItemForm";
import { useData } from "../../store/DataContext";
import { Delete, Edit } from "@mui/icons-material";

function EventListTable({ path, listId }) {
  const [itemList, setItemList] = useState([]);
  const [order, setOrder] = useState([{ name: "date", direction: "asc" }]);
  const { setItemListSnapshot, showModal, deleteItem } = useData();

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
    showModal({ body: <EventListItemForm id={id}></EventListItemForm> });
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(path, listId, itemId);
  };

  return (
    <>
      <div className="table-wrapper">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Megnevezés</th>
              <th style={{ width: "120px" }}>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="name">{item.name}</div>
                    <div className="details">{item.details}</div>
                    <div className="date">
                      {new Date(item.date).toLocaleString()}
                    </div>
                  </td>

                  <td>
                    <Edit onClick={() => handleUpdateItem(item.id)}></Edit>
                    <Delete onClick={() => handleDeleteItem(item.id)}></Delete>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EventListTable;
