import { useEffect, useState } from "react";
import { useData } from "../../store/DataContext";
import { useParams } from "react-router";

function ShoppingListItemForm({ id, onUnmount = () => {} }) {
  const [item, setItem] = useState({ name: "", details: "" });
  const [itemId, setItemId] = useState();

  const { setModalTitle, hideModal, createItem, getItemById, updateItem } =
    useData();

  const params = useParams();
  const listId = params.id;
  const path = "shopping-list";

  useEffect(() => {
    if (id) {
      getItemById(path, listId, id, setItem);
      setItemId(id);
      setModalTitle("Tétel módosítása");
    } else {
      setModalTitle("Új tétel létrehozása");
    }

    return onUnmount;
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (itemId) {
      updateItem(path, listId, itemId, item);
    } else {
      item.checked = false;
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
          <label htmlFor="name">Termék megnevezése</label>
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
          <label htmlFor="details">Részletek</label>
          <textarea
            id="details"
            className="form-control"
            rows={4}
            defaultValue={item.details}
            placeholder="Például mennyiség, márka, hol található, stb."
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

export default ShoppingListItemForm;
