import { Autorenew, Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import EventListItemForm from "./EventListItemForm";
import DialogBody from "../DialogBody";
import { useData } from "../../store/DataContext";

function EventListTableRow({ item, path, listId, afterChange = () => {} }) {
  const { showModal, showDialog, deleteItem } = useData();

  const handleUpdateItem = (id) => {
    showModal({
      body: (
        <EventListItemForm
          id={id}
          path={path}
          listId={listId || item.listId}
          onUnmount={afterChange}
        ></EventListItemForm>
      ),
    });
  };

  const handleDeleteItem = (item) => {
    if (item.isRecurring) {
      showDialog({
        title: "Tétel törlése",
        body: (
          <DialogBody
            text="A tétel ismétlődő. Biztosan minden alkalmat törölni szeretne?"
            onOk={() => {
              deleteItem(path, listId || item.listId, item.id);
              afterChange();
            }}
          ></DialogBody>
        ),
      });
    } else {
      deleteItem(path, listId || item.listId, item.id);
      afterChange();
    }
  };

  return (
    <>
      <div className="d-flex mb-3 list-row">
        <div className="col-9 text-left ml-2">
          <div className="name">
            <span>{item.name}</span>
            {item.isRecurring && (
              <Autorenew
                style={{ fontSize: "15px", marginBottom: "8px" }}
              ></Autorenew>
            )}
          </div>
          <div className="item-date">
            {!item.isAllDay ? dayjs(item.nextDateTime).format("HH:mm") : ""}
          </div>
          <div className="details">{item.details}</div>
          <div className="details">{item.listTitle}</div>
        </div>
        <div className="col-3 text-right">
          <Edit onClick={() => handleUpdateItem(item.id)}></Edit>
          <Delete onClick={() => handleDeleteItem(item)}></Delete>
        </div>
      </div>
    </>
  );
}

export default EventListTableRow;
