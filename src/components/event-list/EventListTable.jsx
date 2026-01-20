import { useEffect, useState } from "react";
import EventListItemForm from "./EventListItemForm";
import { useData } from "../../store/DataContext";
import { Autorenew, Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";

function EventListTable({ path, listId }) {
  const [itemList, setItemList] = useState({});
  const [order, setOrder] = useState([{ name: "dateTime", direction: "asc" }]);
  const [dateList, setDateList] = useState([]);
  const { setItemListSnapshot, showModal, deleteItem } = useData();

  useEffect(() => {
    if (!listId) {
      return;
    }

    const getDataUnsub = setItemListSnapshot(
      path,
      listId,
      order,
      (data) => {
        setItemList(data);
        const dateListWithoutSort = Object.keys(data);
        setDateList(dateListWithoutSort.toSorted());
      },
      true
    );

    return () => getDataUnsub();
  }, [listId]);

  const handleUpdateItem = (id) => {
    showModal({ body: <EventListItemForm id={id}></EventListItemForm> });
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(path, listId, itemId);
  };

  return (
    <>
      {dateList.map((date, index) => {
        return (
          <div key={index}>
            <div className="text-left">
              {dayjs(Number(date)).format("YYYY.MM.DD.")}
            </div>

            <table className="table table hover">
              <tbody>
                {itemList[date].map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="name">
                          <span>{item.name}</span>
                          {item.isRecurring && (
                            <Autorenew
                              style={{ fontSize: "15px", marginBottom: "8px" }}
                            ></Autorenew>
                          )}
                        </div>
                        <div className="details">{item.details}</div>
                      </td>

                      <td style={{ width: "120px" }}>
                        <Edit onClick={() => handleUpdateItem(item.id)}></Edit>
                        <Delete
                          onClick={() => handleDeleteItem(item.id)}
                        ></Delete>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

export default EventListTable;
