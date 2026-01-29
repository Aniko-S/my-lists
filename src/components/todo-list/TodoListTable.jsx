import { useEffect, useState } from "react";
import { useData } from "../../store/DataContext";
import { Autorenew, Delete, Edit } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import TodoListItemForm from "./TodoListItemForm";
import DialogBody from "../DialogBody";

function TodoListTable({ path, listId }) {
  const [itemList, setItemList] = useState({});
  const [order, setOrder] = useState([{ name: "addedAt", direction: "asc" }]);
  const [dateList, setDateList] = useState([]);
  const { setItemListSnapshot, showModal, showDialog, deleteItem, updateItem } =
    useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    const getDataUnsub = setItemListSnapshot({
      path,
      listId,
      order,
      isSetDate: true,
      everyItemHasDate: false,
      setChecked: true,
      filter: [
        { name: "hasDate", rel: "==", value: false },
        { name: "isRecurring", rel: "==", value: true },
        { name: "dateTime", rel: ">=", value: new Date().setHours(0, 0, 0, 0) },
      ],
      setter: (data) => {
        setItemList(data);
        const keys = Object.keys(data);

        let sortedDateList = keys.filter((key) => key !== "noDate").toSorted();

        setDateList(
          keys.includes("noDate")
            ? ["noDate", ...sortedDateList]
            : sortedDateList,
        );
      },
    });

    return () => getDataUnsub();
  }, [listId]);

  const handleUpdateItem = (id) => {
    showModal({ body: <TodoListItemForm id={id}></TodoListItemForm> });
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

  const handleCheck = (event, item) => {
    const updatedData = !item.isRecurring
      ? { checked: event.target.checked }
      : { lastTimeCompleted: event.target.checked ? item.nextDateTime : null };
    updateItem(path, listId, item.id, updatedData);
  };

  return (
    <>
      {dateList.map((date, index) => {
        return (
          <div key={index}>
            <div className="text-left">
              {date == "noDate" && <div>Dátum nélkül</div>}
              {date != "noDate" && (
                <div>
                  <span>{dayjs(Number(date)).format("YYYY.MM.DD.")}</span>
                  <span>
                    &nbsp;
                    {new Date(Number(date)).toLocaleDateString("hu", {
                      weekday: "long",
                    })}
                  </span>
                </div>
              )}
            </div>
            <hr></hr>

            {itemList[date].map((item, index) => {
              return (
                <div className="d-flex mb-3 list-row" key={index}>
                  <div className="col-9 text-left ml-2">
                    <Checkbox
                      color="success"
                      checked={item.checked}
                      id={item.id}
                      onChange={(e) => handleCheck(e, item)}
                      className="p-0 mr-2"
                    ></Checkbox>
                    <span className={"name" + (item.checked ? " checked" : "")}>
                      {item.name}
                    </span>
                    {item.isRecurring && (
                      <Autorenew
                        style={{ fontSize: "15px", marginBottom: "8px" }}
                      ></Autorenew>
                    )}

                    <div className="details details-with-checkbox">
                      {item.details}
                    </div>
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

export default TodoListTable;
