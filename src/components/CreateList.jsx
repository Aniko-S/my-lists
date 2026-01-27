import { useEffect, useState } from "react";
import { useData } from "../store/DataContext";
import { useNavigate } from "react-router";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import FormInput from "./FormInput";

function CreateList({ defaultType }) {
  const [selectedType, setSelectedType] = useState({ value: "" });
  const [title, setTitle] = useState();

  const { hideModal, createList } = useData();
  const navigate = useNavigate();

  const listTypes = [
    {
      value: "shopping-list",
      label: "bevásárlólista",
    },
    {
      value: "todo-list",
      label: "teendőlista",
    },
    {
      value: "event-list",
      label: "eseménylista",
    },
    {
      value: "other-list",
      label: "egyéb",
    },
  ];

  useEffect(() => {
    const defaultValue = listTypes.find((item) => item.value == defaultType);
    setSelectedType(defaultValue);
  }, [defaultType]);

  const handleSave = async (e) => {
    e.preventDefault();
    const path = selectedType.value || "";
    const newListId = await createList(path, title);
    if (newListId) {
      navigate(`/${path}/${newListId}`);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSave(e);
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="type-label">Lista típusa</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={selectedType ? selectedType.value : ""}
            label="Lista típusa"
            onChange={(selectedItem) => {
              setSelectedType(selectedItem);
            }}
          >
            {listTypes.map((type, index) => (
              <MenuItem id={index} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormInput
          id="name"
          label="Lista címe"
          required
          autoFocus
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
            Mentés
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateList;
