import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useData } from "../store/DataContext";
import EventListTableRow from "./event-list/EventListTableRow";
import TodoListTableRow from "./todo-list/TodoListTableRow";
import { useAuth } from "../store/AuthContext";

function TodosAndEventsToday() {
  const [eventList, setEventList] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const { setItemListSnapshotForToday, setSelectedGroup } = useData();
  const { user } = useAuth();

  const setEventData = () => {
    setItemListSnapshotForToday({
      path: "event-list",
      setter: (data) => setEventList(data),
    });
  };

  const setTodoData = () => {
    setItemListSnapshotForToday({
      path: "todo-list",
      getItemsFromPast: true,
      setChecked: true,
      setter: (data) => {
        setTodoList(data);
      },
    });
  };

  useEffect(() => {
    if (user) {
      setEventData();
      setTodoData();
      setSelectedGroup("Tennivalók és események ma");
    }
  }, [user]);

  return (
    <>
      <div className="page">
        <h3 className="pt-2">
          <span>{dayjs().format("YYYY.MM.DD.")}</span>
          <span>
            &nbsp;
            {new Date().toLocaleDateString("hu", {
              weekday: "long",
            })}
          </span>
        </h3>
        <div className="text-left mt-3">Események</div>
        <hr></hr>
        {(!eventList || eventList.length == 0) && (
          <div>Nincs esemény a mai napon.</div>
        )}
        {eventList.map((item, index) => {
          return (
            <EventListTableRow
              item={item}
              key={index}
              path="event-list"
              afterChange={setEventData}
            ></EventListTableRow>
          );
        })}

        <div className="text-left mt-3">Teendők</div>
        <hr></hr>
        {(!todoList || todoList.length == 0) && (
          <div>Nincs teendő a mai napon.</div>
        )}
        {todoList.map((item, index) => {
          return (
            <TodoListTableRow
              item={item}
              path="todo-list"
              key={index}
              afterChange={setTodoData}
              showPastDate={true}
            ></TodoListTableRow>
          );
        })}
      </div>
    </>
  );
}

export default TodosAndEventsToday;
