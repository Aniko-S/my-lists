import { Dropdown } from "react-bootstrap";
import { Settings } from "@mui/icons-material";
import { Typography } from "@mui/material";

function PageHead({ title }) {
  return (
    <>
      <div className="row">
        <div className="col-2"></div>
        <h2 className="col-8">{title}</h2>

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
            <Dropdown.Item href="#/action-1">Lista adatai</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Lista megosztása</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Lista törlése</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default PageHead;
