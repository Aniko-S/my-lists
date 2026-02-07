import { useEffect, useState } from "react";
import { useData } from "../../store/DataContext";
import { Warning } from "@mui/icons-material";
import dayjs from "dayjs";
import TodoListTableRow from "./TodoListTableRow";

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
        { name: "checked", rel: "==", value: false },
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

  const isPast = (date) => {
    return date < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <>
      {dateList.map((date, index) => {
        return (
          <div key={index}>
            <div className="text-left">
              {date == "noDate" && <div>Dátum nélkül</div>}
              {date != "noDate" && (
                <div className={isPast(date) ? "past-date" : ""}>
                  <span>{dayjs(Number(date)).format("YYYY.MM.DD.")}</span>
                  <span>
                    &nbsp;
                    {new Date(Number(date)).toLocaleDateString("hu", {
                      weekday: "long",
                    })}
                  </span>
                  {isPast(date) && (
                    <Warning color="warning" className="ml-2"></Warning>
                  )}
                </div>
              )}
            </div>
            <hr></hr>

            {itemList[date].map((item, index) => {
              return (
                <TodoListTableRow
                  key={index}
                  item={item}
                  path={path}
                  listId={listId}
                ></TodoListTableRow>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default TodoListTable;
