import SettingsDropdown from "./SettingsDropdown";

function PageHead({ title, path, listId }) {
  return (
    <>
      <div className="d-flex my-2">
        <div className="col-2"></div>
        <h2 className="col-8">{title}</h2>

        <SettingsDropdown path={path} listId={listId}></SettingsDropdown>
      </div>
    </>
  );
}

export default PageHead;
