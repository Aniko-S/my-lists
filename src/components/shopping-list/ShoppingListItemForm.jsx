import { useEffect, useState } from "react";
import { useData } from "../../store/DataContext";
import { useParams } from "react-router";
import FormInput from "../FormInput";

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
        <div className="mb-3 d-flex justify-content-center">
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

        <div className="modal-form-body">
          <FormInput
            id="name"
            label="Tétel rövid megnevezése"
            required
            autoFocus
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          ></FormInput>
          <FormInput
            id="details"
            label="Részletek"
            multiline
            rows={4}
            value={item.details}
            onChange={(e) => setItem({ ...item, details: e.target.value })}
          ></FormInput>
        </div>
      </form>
    </>
  );
}

export default ShoppingListItemForm;
