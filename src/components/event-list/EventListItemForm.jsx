import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import { FormControlLabel, Checkbox } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { useData } from "../../store/DataContext";
import DateSetter from "../DateSetter";
import TimeSetter from "../TimeSetter";

function EventListItemForm({ id, onUnmount = () => {} }) {
  const [item, setItem] = useState({
    name: "",
    details: "",
    isRecurring: false,
    periodValue: 0,
    periodUnit: "day",
    isAllDay: false,
  });
  const [itemId, setItemId] = useState();
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs(new Date().setHours(0, 0, 0)));

  const { setModalTitle, hideModal, createItem, getItemById, updateItem } =
    useData();

  const params = useParams();
  const listId = params.id;
  const path = "event-list";
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

    if (!item.isRecurring) {
      delete item.periodUnit;
      delete item.periodValue;
    }

    if (itemId) {
      updateItem(path, listId, itemId, item);
    } else {
      createItem(path, listId, item);
    }
  };

  const handleIsAllDayCheck = (e, item) => {
    setItem({ ...item, isAllDay: e.target.checked });
    setTime(dayjs(new Date().setHours(0, 0, 0)));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSave(e);
        }}
      >
        <TextField
          required
          id="name"
          label="Megnevezés"
          fullWidth
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          value={item.name}
        ></TextField>

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
        <div className="my-3">
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                checked={item.isAllDay}
                id="isAllDay"
                slotProps={{ input: { "aria-label": "controlled" } }}
                onChange={(e) => handleIsAllDayCheck(e, item)}
              ></Checkbox>
            }
            label="Egész nap"
          ></FormControlLabel>
        </div>
        <div className="my-3">
          <TimeSetter
            value={time}
            setValue={setTime}
            label={item.isRecurring ? "Kezdő idő" : "Idő"}
            required={!item.isAllDay}
            disabled={item.isAllDay}
          ></TimeSetter>
        </div>
        {item.isRecurring && (
          <div>
            <TextField
              required
              id="periodValue"
              label="Periódus értéke"
              type="number"
              fullWidth
              margin="normal"
              value={item.periodValue}
              onChange={(e) =>
                setItem({ ...item, periodValue: Number(e.target.value) })
              }
            ></TextField>

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
                          color: "green", //use the color you want
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
