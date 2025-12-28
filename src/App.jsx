import "./App.css";
import "./style.css";
import { AuthContextProvider } from "./store/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import SignIn from "./components/SignIn";
import ShoppingList from "./components/ShoppingList";
import TodoList from "./components/TodoList";
import EventList from "./components/EventList";
import Menu from "./components/Menu/Menu";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route
              path="/shopping-list/:id"
              element={
                <Menu>
                  <ShoppingList></ShoppingList>
                </Menu>
              }
            ></Route>
            <Route
              path="/todo-list"
              element={
                <Menu>
                  <TodoList></TodoList>
                </Menu>
              }
            ></Route>
            <Route
              path="/event-list"
              element={
                <Menu>
                  <EventList></EventList>
                </Menu>
              }
            ></Route>
            <Route path="" element={<SignIn></SignIn>}></Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
