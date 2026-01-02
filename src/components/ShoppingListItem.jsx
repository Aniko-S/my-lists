import { useEffect, useState } from "react";
import { useData } from "../store/DataContext";
import { useParams } from "react-router";

function ShoppingListItem({ id }) {
  const [name, setName] = useState("");
  const [store, setStore] = useState();

  const { setItemModalTitle, createItem, setIsShowItemModal } = useData();
  const params = useParams();
  const listId = params.id;
  const path = "shopping-list";

  useEffect(() => {
    if (!id) {
      setItemModalTitle("Új tétel létrehozása");
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    createItem(path, { name, store }, listId);
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
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="store">Milyen üzletben lehet beszerezni?</label>
          <input
            id="store"
            type="text"
            className="form-control"
            onChange={(e) => setStore(e.target.value)}
          ></input>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button
            className="btn btn-secondary mx-3"
            onClick={() => setIsShowItemModal(false)}
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
