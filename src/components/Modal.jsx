import { useData } from "../store/DataContext";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { Close } from "@mui/icons-material";

function MyModal() {
  const { isShowModal, setIsShowModal, modalTitle, modalBody } = useData();

  const handleClose = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <div className="modal">
        <Modal size="lg" show={isShowModal} onHide={handleClose}>
          <Modal.Header className="row">
            <div className="col-1"></div>
            <Modal.Title className="col-10 text-center">
              {modalTitle}
            </Modal.Title>
            <button onClick={handleClose} className="col-1 p-0 closeButton">
              <Close></Close>
            </button>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default MyModal;
