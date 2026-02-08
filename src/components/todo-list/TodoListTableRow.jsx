import { Autorenew, Delete, Edit } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router";
import DialogBody from "../DialogBody";
import TodoListItemForm from "./TodoListItemForm";
import { useData } from "../../store/DataContext";
import dayjs from "dayjs";

function TodoListTableRow({
  item,
  path,
  listId,
  showPastDate,
  afterChange = () => {},
}) {
  const { showModal, showDialog, deleteItem, updateItem } = useData();
  const navigate = useNavigate();

  const handleCheck = (event, item) => {
    const updatedData = !item.isRecurring
      ? { checked: event.target.checked }
      : { lastTimeCompleted: event.target.checked ? item.nextDateTime : null };

    if (isPast(item.nextDateTime)) {
      showDialog({
        title: "Tétel kijelölése",
        body: (
          <DialogBody
            text="A teendő múltbéli, a kijelöléssel eltűnik a listából. Biztosan szeretné kijelölni?"
            okText="Kijelölés"
            onOk={() => {
              updateItem(path, listId || item.listId, item.id, updatedData);
              afterChange();
            }}
          ></DialogBody>
        ),
      });
    } else {
      updateItem(path, listId || item.listId, item.id, updatedData);
      afterChange();
    }
  };

  const handleUpdateItem = (id) => {
    showModal({
      body: (
        <TodoListItemForm
          id={id}
          path={path}
          listId={listId || item.listId}
          onUnmount={afterChange}
        ></TodoListItemForm>
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

  const isPast = (date) => {
    return date < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <>
      <div className="d-flex mb-3 list-row">
        <div className="col-9 text-left ml-2">
          <Checkbox
            color="success"
            checked={item.checked}
            id={item.id}
            onChange={(e) => handleCheck(e, item)}
            className="p-0 mr-2"
          ></Checkbox>
          <span
            className={
              "name" +
              (item.checked ? " checked" : "") +
              (isPast(item.nextDateTime) ? " past-date" : "")
            }
          >
            {item.name}
          </span>
          {item.isRecurring && (
            <Autorenew
              style={{ fontSize: "15px", marginBottom: "8px" }}
            ></Autorenew>
          )}

          <div className="details details-with-checkbox">{item.details}</div>
          {showPastDate && isPast(item.nextDateTime) && (
            <div className="item-date details-with-checkbox">
              {dayjs(Number(item.nextDateTime)).format("YYYY.MM.DD.")}
            </div>
          )}
          <div
            className="details details-with-checkbox"
            onClick={() => navigate(`/${path}/${item.listId}`)}
          >
            {item.listTitle}
          </div>
        </div>
        <div className="col-3 text-right">
          <Edit onClick={() => handleUpdateItem(item.id)}></Edit>
          <Delete onClick={() => handleDeleteItem(item)}></Delete>
        </div>
      </div>
    </>
  );
}

export default TodoListTableRow;
