import { useEffect, useState } from "react";
import { useData } from "../store/DataContext";
import { useNavigate } from "react-router";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ImportItemsForm({ path, listId }) {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState({ id: "" });
  const { copyItems, hideModal, getListsByType } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    getListsByType(path, setLists);
  }, []);

  const handleImport = async (e) => {
    e.preventDefault();
    await copyItems(path, selectedList.id, listId);
    hideModal();
  };

  return (
    <>
      <form onSubmit={(e) => handleImport(e)}>
        <div className="mb-3 d-flex justify-content-center">
          <button
            type="reset"
            className="btn btn-secondary mx-3"
            onClick={hideModal}
          >
            Mégse
          </button>
          <button type="submit" className="btn btn-success mx-3">
            Importálás
          </button>
        </div>

        <div className="modal-form-body">
          <div className="text-center my-3">
            A kiválasztott lista elemeit átmásoljuk erre a listára, kijelölés
            nélkül. A lista jelenlegi tételei változatlanok maradnak.
          </div>
          <FormControl fullWidth size="small" sx={{ marginTop: "25px" }}>
            <InputLabel id="list-label">A másolni kívánt lista</InputLabel>
            <Select
              labelId="list-label"
              id="list"
              value={selectedList ? selectedList.id : ""}
              label="A másolni kívánt lista"
              onChange={(e) => {
                setSelectedList({ id: e.target.value });
              }}
            >
              {lists.map((list, index) => (
                <MenuItem id={index} value={list.id}>
                  {list.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </form>
    </>
  );
}

export default ImportItemsForm;
