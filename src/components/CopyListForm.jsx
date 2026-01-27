import { useState } from "react";
import { useData } from "../store/DataContext";
import { useNavigate } from "react-router";
import FormInput from "./FormInput";

function CopyListForm({ path, listId }) {
  const [title, setTitle] = useState("");
  const { copyList, hideModal } = useData();
  const navigate = useNavigate();

  const handleClickOnCreate = async (e) => {
    e.preventDefault();
    const newListId = await copyList({ path, listId, newTitle: title });
    if (newListId) {
      navigate(`/${path}/${newListId}`);
    }
  };

  return (
    <>
      <div className="text-center my-3">
        Létrehozunk egy új listát a másolt lista összes tételével. Az új lista
        tételei nem lesznek kijelölve.
      </div>
      <form onSubmit={(e) => handleClickOnCreate(e)}>
        <FormInput
          id="name"
          label="Az új lista címe"
          required
          onChange={(e) => setTitle(e.target.value)}
        ></FormInput>

        <div className="mt-5 d-flex justify-content-center">
          <button
            type="reset"
            className="btn btn-secondary mx-3"
            onClick={hideModal}
          >
            Mégse
          </button>
          <button type="submit" className="btn btn-success mx-3">
            Létrehozás
          </button>
        </div>
      </form>
    </>
  );
}

export default CopyListForm;
