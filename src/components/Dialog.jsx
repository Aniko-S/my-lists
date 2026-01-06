import Modal from "react-bootstrap/Modal";
import { Close } from "@mui/icons-material";

function Dialog({ handleDelete, handleClose }) {
  return (
    <>
      <div className="modal">
        <Modal size="sm" show={true} onHide={handleClose}>
          <Modal.Header className="row">
            <div className="col-2"></div>
            <Modal.Title className="col-8 text-center">
              Lista törlése
            </Modal.Title>
            <button onClick={handleClose} className="col-2 p-0 closeButton">
              <Close></Close>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">Biztosan törli a listát?</div>
            <div className="mt-5 d-flex justify-content-center">
              <button className="btn btn-secondary mx-3" onClick={handleClose}>
                Mégse
              </button>
              <button className="btn btn-danger mx-3" onClick={handleDelete}>
                Törlés
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Dialog;
