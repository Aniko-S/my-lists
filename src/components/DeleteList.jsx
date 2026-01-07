import { useData } from "../store/DataContext";

function DeleteList({ handleDelete }) {
  const { hideDialog } = useData();

  const handleClose = () => {
    hideDialog();
  };

  return (
    <>
      <div className="text-center">Biztosan törli a listát?</div>
      <div className="mt-5 d-flex justify-content-center">
        <button className="btn btn-secondary mx-3" onClick={handleClose}>
          Mégse
        </button>
        <button className="btn btn-danger mx-3" onClick={handleDelete}>
          Törlés
        </button>
      </div>
    </>
  );
}

export default DeleteList;
