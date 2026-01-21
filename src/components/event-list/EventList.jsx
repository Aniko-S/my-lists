import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../../store/DataContext";
import EventListItemForm from "./EventListItemForm";
import PageHead from "../PageHead";
import EventListTable from "./EventListTable";

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

    getListById(path, listId, setList);
  }, [listId]);

  const handleNewItem = () => {
    showModal({ body: <EventListItemForm></EventListItemForm> });
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
        <EventListTable path={path} listId={listId}></EventListTable>
      </div>
    </>
  );
}

export default EventList;
