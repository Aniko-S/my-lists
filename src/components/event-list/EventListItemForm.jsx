import { useEffect, useState } from "react";
import { useData } from "../../store/DataContext";
import { useParams } from "react-router";
import dayjs from "dayjs";
import DateSetter from "../DateSetter";
import TimeSetter from "../TimeSetter";

function EventListItemForm({ id, onUnmount = () => {} }) {
  const [item, setItem] = useState({ name: "", details: "" });
  const [itemId, setItemId] = useState();
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs(new Date().setHours(0, 0, 0)));

  const { setModalTitle, hideModal, createItem, getItemById, updateItem } =
    useData();

  const params = useParams();
  const listId = params.id;
  const path = "event-list";

  useEffect(() => {
    if (id) {
      getItemById(path, listId, id, (data) => {
        setItem(data);
        setDateTimeFromItem(data);
      });

      setItemId(id);
      setModalTitle("Tétel módosítása");
    } else {
      setModalTitle("Új tétel létrehozása");
    }

    return onUnmount;
  }, []);

  const setItemDateTime = () => {
    const dateInDateFormat = new Date(date);
    const hours = new Date(time).getHours();
    const minutes = new Date(time).getMinutes();
    dateInDateFormat.setHours(hours, minutes, 0);

    item.date = dateInDateFormat.getTime();
  };

  const setDateTimeFromItem = (data) => {
    setDate(dayjs(data.date));
    setTime(dayjs(data.date));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setItemDateTime();

    if (itemId) {
      updateItem(path, listId, itemId, item);
    } else {
      createItem(path, listId, item);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSave(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Esemény rövid megnevezése</label>
          <input
            id="name"
            type="text"
            className="form-control"
            defaultValue={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            autoFocus
          ></input>
        </div>
        <div className="form-group">
          <div>Ideje</div>
          <div className="my-2">
            <DateSetter value={date} setValue={setDate}></DateSetter>
          </div>
          <div className="my-2">
            <TimeSetter value={time} setValue={setTime}></TimeSetter>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="details">Részletek</label>
          <textarea
            id="details"
            className="form-control"
            rows={4}
            defaultValue={item.details}
            placeholder="Például helyszín, résztvevők, stb."
            onChange={(e) => setItem({ ...item, details: e.target.value })}
          ></textarea>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button
            type="reset"
            className="btn btn-secondary mx-3"
            onClick={hideModal}
          >
            Mégse
          </button>
          <button type="submit" className="btn btn-success mx-3">
            Mentés
          </button>
        </div>
      </form>
    </>
  );
}

export default EventListItemForm;
