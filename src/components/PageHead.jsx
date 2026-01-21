import { Add } from "@mui/icons-material";
import SettingsDropdown from "./SettingsDropdown";
import { Typography } from "@mui/material";

function PageHead({ title, path, listId, handleNewItem }) {
  return (
    <>
      <div className="d-flex pt-2 pb-4 sticky">
        <div className="col-2 pl-0">
          <button
            className="btn btn-success"
            id="add-item-button"
            onClick={handleNewItem}
          >
            <Add
              style={{
                stroke: "white",
                strokeWidth: "2",
                marginBottom: "5px",
                fontSize: "20px",
              }}
            ></Add>
            <Typography
              noWrap
              component="div"
              sx={{
                display: { xs: "none", md: "inline" },
                fontFamily: "cursive",
              }}
              className="ml-1"
            >
              Új tétel
            </Typography>
          </button>
        </div>
        <h2 className="col-8">{title}</h2>
        <SettingsDropdown path={path} listId={listId}></SettingsDropdown>
      </div>
    </>
  );
}

export default PageHead;
