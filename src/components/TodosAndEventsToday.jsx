import { useEffect, useState } from "react";
import { useData } from "../store/DataContext";
import EventListTableRow from "./event-list/EventListTableRow";

function TodosAndEventsToday() {
  const [lists, setLists] = useState({});
  const [itemList, setItemList] = useState([]);
  const [order, setOrder] = useState([{ name: "dateTime", direction: "asc" }]);
  const [dateList, setDateList] = useState([]);
  const { setItemListSnapshotForTodayEvents } = useData();

  const setData = () =>
    setItemListSnapshotForTodayEvents((data) => setItemList(data));

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      <h2>Események</h2>
      {itemList.map((item, index) => {
        return (
          <EventListTableRow
            item={item}
            key={index}
            path="event-list"
            afterChange={setData}
          ></EventListTableRow>
        );
      })}
    </>
  );
}

export default TodosAndEventsToday;
