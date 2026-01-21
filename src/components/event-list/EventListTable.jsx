import { useEffect, useState } from "react";
import EventListItemForm from "./EventListItemForm";
import { useData } from "../../store/DataContext";
import { Autorenew, Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";

function EventListTable({ path, listId }) {
  const [itemList, setItemList] = useState({});
  const [order, setOrder] = useState([{ name: "dateTime", direction: "asc" }]);
  const [dateList, setDateList] = useState([]);
  const { setItemListSnapshot, showModal, deleteItem } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    const getDataUnsub = setItemListSnapshot(
      path,
      listId,
      order,
      (data) => {
        setItemList(data);
        const dateListWithoutSort = Object.keys(data);
        setDateList(dateListWithoutSort.toSorted());
      },
      true
    );

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
      {dateList.map((date, index) => {
        return (
          <div key={index}>
            <div className="text-left">
              {dayjs(Number(date)).format("YYYY.MM.DD.")}
            </div>
            <hr></hr>

            {itemList[date].map((item, index) => {
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
                      {dayjs(item.nextDateTime).format("HH:mm")}
                    </div>
                    <div className="details">{item.details}</div>
                  </div>
                  <div className="col-3 text-right">
                    <Edit onClick={() => handleUpdateItem(item.id)}></Edit>
                    <Delete onClick={() => handleDeleteItem(item.id)}></Delete>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default EventListTable;
