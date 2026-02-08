import { useEffect, useState } from "react";
import { useData } from "../store/DataContext";
import EventListTableRow from "./event-list/EventListTableRow";
import TodoListTableRow from "./todo-list/TodoListTableRow";

function TodosAndEventsToday() {
  const [eventList, setEventList] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [order, setOrder] = useState([{ name: "dateTime", direction: "asc" }]);
  const { setItemListSnapshotForToday } = useData();

  const setData = () => {
    setItemListSnapshotForToday({
      path: "event-list",
      setter: (data) => setEventList(data),
    });
    setItemListSnapshotForToday({
      path: "todo-list",
      getItemsFromPast: true,
      setChecked: true,
      setter: (data) => {
        data.sort((a, b) => a.nextDateTime - b.nextDateTime);
        setTodoList(data);
        console.log(data);
      },
    });
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      <h2>Események</h2>
      {eventList.map((item, index) => {
        return (
          <EventListTableRow
            item={item}
            key={index}
            path="event-list"
            afterChange={setData}
          ></EventListTableRow>
        );
      })}

      <h2>Teendők</h2>
      {todoList.map((item, index) => {
        return (
          <TodoListTableRow
            item={item}
            path="todo-list"
            key={index}
            afterChange={setData}
          ></TodoListTableRow>
        );
      })}
    </>
  );
}

export default TodosAndEventsToday;
