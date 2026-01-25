import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../../store/DataContext";
import OtherListItemForm from "./OtherListItemForm";
import PageHead from "../PageHead";
import OtherListTable from "./OtherListTable";

function OtherList() {
  const [list, setList] = useState();

  const params = useParams();
  const listId = params.id;
  const path = "other-list";

  const { showModal, getListById } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    getListById(path, listId, setList);
  }, [listId]);

  const handleNewItem = () => {
    showModal({ body: <OtherListItemForm></OtherListItemForm> });
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
        <OtherListTable path={path} listId={listId}></OtherListTable>
      </div>
    </>
  );
}

export default OtherList;
