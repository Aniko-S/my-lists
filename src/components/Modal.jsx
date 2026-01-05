import { useData } from "../store/DataContext";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

function MyModal() {
  const { isShowModal, setIsShowModal, modalTitle, modalBody } = useData();

  const handleClose = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <div className="modal">
        <Modal size="lg" show={isShowModal} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title className="text-align-center">
              {modalTitle}
            </Modal.Title>
            <CloseButton onClick={handleClose} aria-label="Hide" />
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default MyModal;
