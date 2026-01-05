import { useEffect, useState } from "react";
import Select from "react-select";
import { useData } from "../store/DataContext";
import { useNavigate } from "react-router";

function CreateList({ defaultType }) {
  const [selectedType, setSelectedType] = useState({ value: "" });
  const [title, setTitle] = useState();

  const { setModalTitle, createList } = useData();
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
  ];

  useEffect(() => {
    setModalTitle("Új lista létrehozása");
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
        <div className="form-group">
          <label htmlFor="name">Lista típusa</label>
          <Select
            options={listTypes}
            isSearchable={false}
            value={selectedType ? selectedType : ""}
            onChange={(selectedItem) => {
              setSelectedType(selectedItem);
            }}
          ></Select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Lista címe</label>
          <input
            id="name"
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button
            type="reset"
            className="btn btn-secondary mx-3"
            onClick={() => setIsShowModal(false)}
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
