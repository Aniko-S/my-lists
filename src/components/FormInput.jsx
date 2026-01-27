import { TextField } from "@mui/material";

function FormInput(props) {
  return (
    <>
      <TextField
        sx={{ marginTop: "25px" }}
        size="small"
        fullWidth
        {...props}
      ></TextField>
    </>
  );
}

export default FormInput;
