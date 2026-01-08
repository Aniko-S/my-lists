import { Delete, Edit } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

function ShoppingListTable({
  itemList,
  handleUpdateItem,
  handleCheck,
  handleDeleteItem,
}) {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th style={{ width: "60px" }}>Kész</th>
            <th>Termék</th>
            <th>Lelőhely</th>
            <th style={{ width: "100px" }}>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <Checkbox
                    color="success"
                    checked={item.checked}
                    id={item.id}
                    onChange={(e) => handleCheck(e, item.id)}
                    className="p-0"
                  ></Checkbox>
                </td>
                <td>{item.name}</td>
                <td>{item.store}</td>
                <td>
                  <Edit onClick={() => handleUpdateItem(item.id)}></Edit>
                  <Delete onClick={() => handleDeleteItem(item.id)}></Delete>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ShoppingListTable;
