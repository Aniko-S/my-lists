import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { FormControlLabel, Checkbox } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { useData } from "../../store/DataContext";
import DateSetter from "../DateSetter";
import FormInput from "../FormInput";

function TodoListItemForm({ id, onUnmount = () => {} }) {
  const [item, setItem] = useState({
    name: "",
    details: "",
    hasDate: false,
    isRecurring: false,
    periodUnit: "day",
    periodValue: 1,
  });
  const [itemId, setItemId] = useState();
  const [date, setDate] = useState(dayjs(new Date().setHours(0, 0, 0, 0)));

  const { setModalTitle, hideModal, createItem, getItemById, updateItem } =
    useData();

  const params = useParams();
  const listId = params.id;
  const path = "todo-list";
  const unitList = {
    day: "Nap",
    week: "Hét",
    month: "Hónap",
    year: "Év",
  };

  useEffect(() => {
    if (id) {
      getItemById(path, listId, id, (data) => {
        setItem(data);
        setDate(dayjs(data.dateTime));
      });

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
      deleteUnnecessaryProps();
      updateItem(path, listId, itemId, item);
      return;
    }

    item.checked = false;
    item.dateTime = item.hasDate ? new Date(date).getTime() : null; // this property is needed because of the filter
    deleteUnnecessaryProps();
    createItem(path, listId, item);
  };

  const deleteUnnecessaryProps = () => {
    if (!item.hasDate) {
      delete item.isRecurring;
    }

    if (!item.isRecurring) {
      delete item.periodUnit;
      delete item.periodValue;
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
            label="Megnevezés"
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

          <div className="my-3">
            <FormControlLabel
              control={
                <Switch
                  checked={item.hasDate}
                  onChange={(e) =>
                    setItem({ ...item, hasDate: e.target.checked })
                  }
                  slotProps={{ input: { "aria-label": "controlled" } }}
                  color="success"
                />
              }
              label="Időzített"
            ></FormControlLabel>
          </div>

          {item.hasDate && (
            <div>
              <div className="my-3">
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.isRecurring}
                      onChange={(e) =>
                        setItem({ ...item, isRecurring: e.target.checked })
                      }
                      slotProps={{ input: { "aria-label": "controlled" } }}
                      color="success"
                    />
                  }
                  label="Ismétlődő"
                ></FormControlLabel>
              </div>
              <div className="my-3">
                <DateSetter
                  value={date}
                  setValue={setDate}
                  label={item.isRecurring ? "Kezdő dátum" : "Dátum"}
                ></DateSetter>
              </div>

              {item.isRecurring && (
                <div>
                  <FormInput
                    id="periodValue"
                    label="Periódus értéke"
                    required
                    type="number"
                    inputProps={{ min: 1 }}
                    value={item.periodValue}
                    onChange={(e) =>
                      setItem({
                        ...item,
                        periodValue: e.target.value
                          ? Number(e.target.value)
                          : "",
                      })
                    }
                  ></FormInput>

                  <div className="my-3">
                    <ToggleButtonGroup
                      aria-label="Period unit"
                      fullWidth
                      value={item.periodUnit}
                      onChange={(e) =>
                        setItem({ ...item, periodUnit: e.target.value })
                      }
                    >
                      {Object.keys(unitList).map((key) => {
                        return (
                          <ToggleButton
                            value={key}
                            sx={{
                              "&.MuiToggleButton-root:hover": {
                                color: "green",
                              },
                            }}
                          >
                            {unitList[key]}
                          </ToggleButton>
                        );
                      })}
                    </ToggleButtonGroup>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default TodoListItemForm;
