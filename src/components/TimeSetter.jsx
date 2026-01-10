import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function TimeSetter({ value, setValue }) {
  const customLocalText = {
    okButtonLabel: "Ok",
    cancelButtonLabel: "Mégse",
  };

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="hu"
        localeText={customLocalText}
      >
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            label="Idő"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}

export default TimeSetter;
