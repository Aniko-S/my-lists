import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/hu";

function DateSetter({ value, setValue }) {
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
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Dátum"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}

export default DateSetter;
