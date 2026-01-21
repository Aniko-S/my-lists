import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function TimeSetter({
  value,
  setValue,
  label = "Idő",
  required = true,
  disabled,
}) {
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
            label={label}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slotProps={{
              textField: {
                required: required,
                fullWidth: true,
              },
            }}
            disabled={disabled}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}

export default TimeSetter;
