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

function ShoppingList() {
  const [itemList, setItemList] = useState([]);
  const params = useParams();
  const id = params.id;
  const collectionRef = collection(db, `shopping-list/${id}/items`);

  useEffect(() => {
    if (!id) {
      return;
    }

    const q = query(collectionRef);
    const getDataUnsub = onSnapshot(
      q,
      (snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setItemList(data);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => getDataUnsub();
  }, [id]);

  const updateProduct = async (event, id) => {
    const docRef = doc(collectionRef, id);

    try {
      await updateDoc(docRef, { checked: event.target.checked });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const docRef = doc(collectionRef, id);

    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Bevásárlólista</h2>
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
