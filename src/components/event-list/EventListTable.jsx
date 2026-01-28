import { useEffect, useState } from "react";
import { useData } from "../../store/DataContext";
import { Autorenew, Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import EventListItemForm from "./EventListItemForm";
import DialogBody from "../DialogBody";

function EventListTable({ path, listId }) {
  const [itemList, setItemList] = useState({});
  const [order, setOrder] = useState([{ name: "dateTime", direction: "asc" }]);
  const [dateList, setDateList] = useState([]);
  const { setItemListSnapshot, showModal, showDialog, deleteItem } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    const getDataUnsub = setItemListSnapshot({
      path,
      listId,
      order,
      filter: [
        { name: "dateTime", rel: ">=", value: new Date().setHours(0, 0, 0, 0) },
        { name: "isRecurring", rel: "==", value: true },
      ],
      setter: (data) => {
        setItemList(data);
        const dateListWithoutSort = Object.keys(data);
        setDateList(dateListWithoutSort.toSorted());
      },
      isSetDate: true,
    });

    return () => getDataUnsub();
  }, [listId]);

  const handleUpdateItem = (id) => {
    showModal({ body: <EventListItemForm id={id}></EventListItemForm> });
  };

  const handleDeleteItem = (item) => {
    if (item.isRecurring) {
      showDialog({
        title: "Tétel törlése",
        body: (
          <DialogBody
            text="A tétel ismétlődő. Biztosan minden alkalmat törölni szeretne?"
            onOk={() => deleteItem(path, listId, item.id)}
          ></DialogBody>
        ),
      });
    } else {
      deleteItem(path, listId, item.id);
    }
  };

  return (
    <>
      {dateList.map((date, index) => {
        return (
          <div key={index}>
            <div className="text-left">
              <span>{dayjs(Number(date)).format("YYYY.MM.DD.")}</span>
              <span>
                &nbsp;
                {new Date(Number(date)).toLocaleDateString("hu", {
                  weekday: "long",
                })}
              </span>
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
                      {!item.isAllDay
                        ? dayjs(item.nextDateTime).format("HH:mm")
                        : ""}
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
          </div>
        );
      })}
    </>
  );
}

export default EventListTable;
