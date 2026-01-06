import { useState } from "react";
import { useNavigate } from "react-router";
import { Dropdown } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useData } from "../store/DataContext";
import Dialog from "./Dialog";

function SettingsDropdown({ path, listId }) {
  const [isShowDialog, setIsShowDialog] = useState(false);

  const { deleteList } = useData();
  const navigate = useNavigate();

  const handleClickOnDelete = () => {
    setIsShowDialog(true);
  };

  const handleDeleteList = async () => {
    setIsShowDialog(false);
    const isDeleteSuccess = await deleteList(path, listId);
    if (isDeleteSuccess) {
      navigate("/home");
    }
  };

  return (
    <>
      {isShowDialog && (
        <Dialog
          handleClose={() => setIsShowDialog(false)}
          handleDelete={handleDeleteList}
        ></Dialog>
      )}
      <Dropdown className="col-2 p-0">
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          className="px-2"
        >
          <Settings sx={{ fontSize: "20px", marginBottom: "3px" }}></Settings>
          <Typography
            noWrap
            component="div"
            sx={{
              display: { xs: "none", md: "inline" },
              fontFamily: "cursive",
            }}
            className="ml-1"
          >
            Műveletek
          </Typography>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Lista adatai</Dropdown.Item>
          <Dropdown.Item>Lista megosztása</Dropdown.Item>
          <Dropdown.Item onClick={handleClickOnDelete}>
            Lista törlése
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default SettingsDropdown;
