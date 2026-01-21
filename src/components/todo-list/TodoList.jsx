import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../../store/DataContext";
import TodoListItemForm from "./TodoListItemForm";
import PageHead from "../PageHead";
import TodoListTable from "./TodoListTable";

function TodoList() {
  const [list, setList] = useState();

  const params = useParams();
  const listId = params.id;
  const path = "todo-list";

  const { showModal, getListById } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    getListById(path, listId, setList);
  }, [listId]);

  const handleNewItem = () => {
    showModal({ body: <TodoListItemForm></TodoListItemForm> });
  };

  return (
    <>
      <div className="page">
        <PageHead
          title={list?.title}
          path={path}
          listId={listId}
          handleNewItem={handleNewItem}
        ></PageHead>
        <TodoListTable path={path} listId={listId}></TodoListTable>
      </div>
    </>
  );
}

export default TodoList;
