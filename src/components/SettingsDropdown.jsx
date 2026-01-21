import { useState } from "react";
import { useNavigate } from "react-router";
import { Dropdown } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useData } from "../store/DataContext";
import DeleteList from "./DeleteList";

function SettingsDropdown({ path, listId }) {
  const { deleteList, showDialog, hideDialog } = useData();
  const navigate = useNavigate();

  const handleClickOnDelete = () => {
    showDialog({
      title: "Lista törlése",
      body: <DeleteList handleDelete={handleDeleteList}></DeleteList>,
    });
  };

  const handleDeleteList = async () => {
    hideDialog();
    const isDeleteSuccess = await deleteList(path, listId);
    if (isDeleteSuccess) {
      navigate("/home");
    }
  };

  return (
    <>
      <Dropdown className="col-2 p-0">
        <Dropdown.Toggle
          variant="secondary"
          id="settings-button"
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
