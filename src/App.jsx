import "./App.css";
import "./style.css";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import { AuthContextProvider } from "./store/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import ShoppingList from "./components/ShoppingList";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route
              path="/shopping-list"
              element={<ShoppingList></ShoppingList>}
            ></Route>
            <Route path="" element={<SignIn></SignIn>}></Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
