import "./App.css";
import "./style.css";
import { AuthContextProvider } from "./store/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import SignIn from "./components/SignIn";
import Sidebar from "./components/Sidebar";
import ShoppingList from "./components/ShoppingList";
import TodoList from "./components/TodoList";
import EventList from "./components/EventList";
import { MenuContextProvider } from "./store/MenuContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <MenuContextProvider>
          <Router>
            <Routes>
              <Route
                path="/shopping-list/:id"
                element={
                  <Sidebar>
                    <ShoppingList></ShoppingList>
                  </Sidebar>
                }
              ></Route>
              <Route
                path="/todo-list"
                element={
                  <Sidebar>
                    <TodoList></TodoList>
                  </Sidebar>
                }
              ></Route>
              <Route
                path="/event-list"
                element={
                  <Sidebar>
                    <EventList></EventList>
                  </Sidebar>
                }
              ></Route>
              <Route path="" element={<SignIn></SignIn>}></Route>
            </Routes>
          </Router>
        </MenuContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
