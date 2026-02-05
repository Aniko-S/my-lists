import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useData } from "../../store/DataContext";
import EventListTableRow from "./EventListTableRow";

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
                <EventListTableRow
                  item={item}
                  key={index}
                  path={path}
                  listId={listId}
                ></EventListTableRow>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default EventListTable;
