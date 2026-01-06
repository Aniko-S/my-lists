import "./App.css";
import "./style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { AuthContextProvider } from "./store/AuthContext";
import { DataContextProvider } from "./store/DataContext";
import SignIn from "./components/SignIn";
import ShoppingList from "./components/shopping-list/ShoppingList";
import TodoList from "./components/TodoList";
import EventList from "./components/EventList";
import Menu from "./components/menu/Menu";
import TodosEventsToday from "./components/TodosEventsToday";

function App() {
  return (
    <>
      <AuthContextProvider>
        <DataContextProvider>
          <Router>
            <Routes>
              <Route
                path="/home"
                element={
                  <Menu>
                    <TodosEventsToday></TodosEventsToday>
                  </Menu>
                }
              ></Route>
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
        </DataContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
