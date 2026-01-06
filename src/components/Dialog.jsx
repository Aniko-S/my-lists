import { useData } from "../store/DataContext";

function Dialog({ handleDelete }) {
  const { setIsShowModal } = useData();

  return (
    <>
      <div>Biztosan törli a listát?</div>
      <div className="mt-5 d-flex justify-content-center">
        <button
          type="reset"
          className="btn btn-secondary mx-3"
          onClick={() => setIsShowModal(false)}
        >
          Mégse
        </button>
        <button className="btn btn-danger mx-3" onClick={handleDelete}>
          Törlés
        </button>
      </div>
    </>
  );
}

export default Dialog;
