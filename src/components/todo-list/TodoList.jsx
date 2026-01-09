import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../../store/DataContext";
import TodoListItemForm from "./TodoListItemForm";
import PageHead from "../PageHead";
import TodoListTable from "./TodoListTable";
import { setPageHeight } from "../menu/Menu";

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

    setPageHeight();
    getListById(path, listId, setList);
  }, [listId]);

  const handleNewItem = () => {
    showModal({ body: <TodoListItemForm></TodoListItemForm> });
  };

  return (
    <>
      <div className="page">
        <PageHead title={list?.title} path={path} listId={listId}></PageHead>
        <TodoListTable path={path} listId={listId}></TodoListTable>
        <button className="btn btn-success bottom" onClick={handleNewItem}>
          Tétel hozzáadása
        </button>
      </div>
    </>
  );
}

export default TodoList;
