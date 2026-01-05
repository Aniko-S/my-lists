import { useEffect, useState } from "react";
import { useData } from "../store/DataContext";
import { useParams } from "react-router";

function ShoppingListItem({ id, onUnmount = () => {}, onReset = () => {} }) {
  const [item, setItem] = useState({ name: "", store: "" });
  const [itemId, setItemId] = useState();

  const { createItem, getItemById, updateItem } = useData();

  const params = useParams();
  const listId = params.id;
  const path = "shopping-list";

  useEffect(() => {
    if (id) {
      getItemById(path, listId, id, setItem);
      setItemId(id);
    }

    return onUnmount;
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

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
        <div>{id}</div>
        <div className="form-group">
          <label htmlFor="name">Termék megnevezése</label>
          <input
            id="name"
            type="text"
            className="form-control"
            defaultValue={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="store">Milyen üzletben lehet beszerezni?</label>
          <input
            id="store"
            type="text"
            className="form-control"
            defaultValue={item.store}
            onChange={(e) => setItem({ ...item, store: e.target.value })}
          ></input>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button
            type="reset"
            className="btn btn-secondary mx-3"
            onClick={() => onReset()}
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

export default ShoppingListItem;
