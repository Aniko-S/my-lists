import { useEffect, useState } from "react";
import { useData } from "../store/DataContext";
import { Autorenew, Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";

function TodosAndEventsToday() {
  const [lists, setLists] = useState({});
  const [itemList, setItemList] = useState([]);
  const [order, setOrder] = useState([{ name: "dateTime", direction: "asc" }]);
  const [dateList, setDateList] = useState([]);
  const { setItemListSnapshotForTodayEvents } = useData();
  //  const { setItemListSnapshot, showModal, showDialog, deleteItem } = useData();

  useEffect(() => {
    setItemListSnapshotForTodayEvents((data) => setItemList(data));
  }, []);

  return (
    <>
      {itemList.map((item, index) => {
        return (
          <div className="d-flex mb-3 list-row" key={index}>
            <div className="col-9 text-left ml-2">
              <div className="name">
                <span>{item.name}</span>
                {item.isRecurring && (
                  <Autorenew
                    style={{ fontSize: "15px", marginBottom: "8px" }}
                  ></Autorenew>
                )}
              </div>
              <div className="item-date">
                {!item.isAllDay ? dayjs(item.nextDateTime).format("HH:mm") : ""}
              </div>
              <div className="details">{item.details}</div>
            </div>
            <div className="col-3 text-right">
              <Edit onClick={() => handleUpdateItem(item.id)}></Edit>
              <Delete onClick={() => handleDeleteItem(item)}></Delete>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TodosAndEventsToday;
