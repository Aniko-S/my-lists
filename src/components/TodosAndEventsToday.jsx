import { useEffect, useState } from "react";
import { useData } from "../store/DataContext";
import { Autorenew, Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import EventListTableRow from "./event-list/EventListTableRow";

function TodosAndEventsToday() {
  const [lists, setLists] = useState({});
  const [itemList, setItemList] = useState([]);
  const [order, setOrder] = useState([{ name: "dateTime", direction: "asc" }]);
  const [dateList, setDateList] = useState([]);
  const { setItemListSnapshotForTodayEvents } = useData();

  useEffect(() => {
    const getDataUnsub = setItemListSnapshotForTodayEvents((data) =>
      setItemList(data),
    );

    return () => getDataUnsub();
  }, []);

  return (
    <>
      {itemList.map((item, index) => {
        return (
          <EventListTableRow
            item={item}
            key={index}
            path="event-list"
          ></EventListTableRow>
        );
      })}
    </>
  );
}

export default TodosAndEventsToday;
