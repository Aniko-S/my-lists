import { useEffect, useState } from "react";
import { useData } from "../../store/DataContext";
import { useParams } from "react-router";
import dayjs from "dayjs";
import DateSetter from "../DateSetter";
import TimeSetter from "../TimeSetter";

function EventListItemForm({ id, onUnmount = () => {} }) {
  const [item, setItem] = useState({
    name: "",
    details: "",
    isRecurring: false,
  });
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
        setDateAndTimeFromItem(data);
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

    item.dateTime = dateInDateFormat.getTime();
  };

  const setDateAndTimeFromItem = (data) => {
    setDate(dayjs(data.dateTime));
    setTime(dayjs(data.dateTime));
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

        <div className="form-check">
          <input
            id="name"
            type="checkbox"
            className="form-check-input"
            defaultValue={item.isRecurring}
            onChange={(e) =>
              setItem({ ...item, isRecurring: e.target.checked })
            }
          ></input>
          <label htmlFor="name">Ismétlődő</label>
        </div>

        <div className="form-group">
          <div>{item.isRecurring ? "Első alkalom ideje" : "Ideje"}</div>
          <div className="my-2">
            <DateSetter value={date} setValue={setDate}></DateSetter>
          </div>
          <div className="my-2">
            <TimeSetter value={time} setValue={setTime}></TimeSetter>
          </div>
        </div>

        {item.isRecurring && (
          <div className="form-group">
            <label htmlFor="periodValue">Periódus</label>
            <input
              id="periodValue"
              type="number"
              className="form-control"
              defaultValue={item.periodValue}
              onChange={(e) =>
                setItem({ ...item, periodValue: e.target.value })
              }
              placeholder="Érték"
            ></input>
            <label htmlFor="period">Periódus</label>
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue={"day"}
              onChange={(e) => setItem({ ...item, periodUnit: e.target.value })}
            >
              <option value="day">nap</option>
              <option value="week">hét</option>
              <option value="month">hónap</option>
              <option value="year">év</option>
            </select>
          </div>
        )}

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
