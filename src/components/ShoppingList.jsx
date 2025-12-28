import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useParams } from "react-router";
import { Delete } from "@mui/icons-material";
import { useData } from "../store/DataContext";

function ShoppingList() {
  const [list, setList] = useState();
  const [itemList, setItemList] = useState([]);
  const params = useParams();
  const id = params.id;
  const itemCollectionRef = collection(db, `shopping-list/${id}/items`);
  const path = "shopping-list";

  const { setListSnapshot, setItemListSnapshot } = useData();

  useEffect(() => {
    if (!id) {
      return;
    }

    const onSuccess = (data) => {
      setList(data);
    };

    const getDataUnsub = setListSnapshot(path, id, onSuccess);
    return () => getDataUnsub();
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const onSuccess = (data) => {
      setItemList(data);
    };

    const getDataUnsub = setItemListSnapshot(path, id, onSuccess);
    return () => getDataUnsub();
  }, [id]);

  const updateProduct = async (event, id) => {
    const docRef = doc(itemCollectionRef, id);

    try {
      await updateDoc(docRef, { checked: event.target.checked });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const docRef = doc(itemCollectionRef);

    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>{list?.title}</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Termék</th>
            <th>Lelőhely</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <input
                    id={item.id}
                    type="checkbox"
                    checked={item.checked}
                    className="form-check-input"
                    onChange={(e) => updateProduct(e, item.id)}
                  ></input>
                  <label
                    htmlFor={item.id}
                    className={
                      "form-check-label" + (item.checked ? " checked" : "")
                    }
                  >
                    {item.name}
                  </label>
                </td>
                <td>{item.store}</td>
                <td>
                  <Delete onClick={() => deleteProduct(item.id)}></Delete>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ShoppingList;
