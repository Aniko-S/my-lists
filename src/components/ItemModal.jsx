import { useState } from "react";
import { useData } from "../store/DataContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

function ItemModal({ children }) {
  const { isShowItemModal, setIsShowItemModal, itemModalTitle } = useData();

  const handleClose = () => {
    setIsShowItemModal(false);
  };

  return (
    <>
      <div className="modal">
        <Modal size="lg" show={isShowItemModal} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title className="text-align-center">
              {itemModalTitle}
            </Modal.Title>
            <CloseButton onClick={handleClose} aria-label="Hide" />
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ItemModal;
