import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../../store/DataContext";
import EventListItemForm from "./EventListItemForm";
import PageHead from "../PageHead";
import EventListTable from "./EventListTable";
import { setPageHeight } from "../menu/Menu";

function EventList() {
  const [list, setList] = useState();

  const params = useParams();
  const listId = params.id;
  const path = "event-list";

  const { showModal, getListById } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    setPageHeight();
    getListById(path, listId, setList);
  }, [listId]);

  const handleNewItem = () => {
    showModal({ body: <EventListItemForm></EventListItemForm> });
  };

  return (
    <>
      <div className="page">
        <PageHead title={list?.title} path={path} listId={listId}></PageHead>
        <EventListTable path={path} listId={listId}></EventListTable>
        <button className="btn btn-success bottom" onClick={handleNewItem}>
          Tétel hozzáadása
        </button>
      </div>
    </>
  );
}

export default EventList;
