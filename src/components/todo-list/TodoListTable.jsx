import { useEffect, useState } from "react";
import TodoListItemForm from "./TodoListItemForm";
import { useData } from "../../store/DataContext";
import { Autorenew, Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";

function TodoListTable({ path, listId }) {
  const [itemList, setItemList] = useState({});
  const [order, setOrder] = useState([{ name: "addedAt", direction: "asc" }]);
  const [dateList, setDateList] = useState([]);
  const { setItemListSnapshot, showModal, deleteItem } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    const getDataUnsub = setItemListSnapshot({
      path,
      listId,
      order,
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
      isSetDate: true,
      everyItemHasDate: false,
      hasTime: false,
    });

    return () => getDataUnsub();
  }, [listId]);

  const handleUpdateItem = (id) => {
    showModal({ body: <TodoListItemForm id={id}></TodoListItemForm> });
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
                    <div className="name">
                      <span>{item.name}</span>
                      {item.isRecurring && (
                        <Autorenew
                          style={{ fontSize: "15px", marginBottom: "8px" }}
                        ></Autorenew>
                      )}
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

export default TodoListTable;
