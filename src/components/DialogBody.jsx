import { useData } from "../store/DataContext";

function DialogBody({ text, onOk }) {
  const { hideDialog } = useData();

  const handleClose = () => {
    hideDialog();
  };

  return (
    <>
      <div className="text-center">{text}</div>
      <div className="mt-5 d-flex justify-content-center">
        <button className="btn btn-secondary mx-3" onClick={handleClose}>
          Mégse
        </button>
        <button className="btn btn-danger mx-3" onClick={onOk}>
          Törlés
        </button>
      </div>
    </>
  );
}

export default DialogBody;
