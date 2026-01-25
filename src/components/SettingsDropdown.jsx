import { useState } from "react";
import { useNavigate } from "react-router";
import { Dropdown } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useData } from "../store/DataContext";
import DialogBody from "./DialogBody";

function SettingsDropdown({ path, listId }) {
  const { showDialog, hideDialog, deleteList, deleteItemList } = useData();
  const navigate = useNavigate();

  const handleClickOnDeleteList = () => {
    showDialog({
      title: "Lista törlése",
      body: (
        <DialogBody
          text="Biztosan törli a listát?"
          onOk={handleDeleteList}
        ></DialogBody>
      ),
    });
  };

  const handleClickOnDeleteItems = () => {
    showDialog({
      title: "Tételek törlése",
      body: (
        <DialogBody
          text="Biztosan törli az összes kijelölt tételt?"
          onOk={handleDeleteItems}
        ></DialogBody>
      ),
    });
  };

  const handleDeleteList = async () => {
    hideDialog();
    const isDeleteSuccess = await deleteList(path, listId);
    if (isDeleteSuccess) {
      navigate("/home");
    }
  };

  const handleDeleteItems = () => {
    hideDialog();
    deleteItemList(path, listId);
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
          {/* <Dropdown.Item>Lista adatai</Dropdown.Item>
          <Dropdown.Item>Lista megosztása</Dropdown.Item> */}
          <Dropdown.Item onClick={handleClickOnDeleteList}>
            Lista törlése
          </Dropdown.Item>
          <Dropdown.Item onClick={handleClickOnDeleteItems}>
            Kijelölt tételek törlése
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default SettingsDropdown;
