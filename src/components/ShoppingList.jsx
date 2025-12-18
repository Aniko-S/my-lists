function ShoppingList() {
  return (
    <>
      <div className="side-container">
        <h2>Bevásárlólista</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Termék</th>
              <th>Lelőhely</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>alma</td>
              <td>élelmiszerbolt</td>
            </tr>
            <tr>
              <td>C-vitamin</td>
              <td>gyógyszertár</td>
            </tr>
            <tr>
              <td>pelenka</td>
              <td>drogéria</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShoppingList;
