import "./App.css";
import "./style.css";
import SignIn from "./components/SignIn";
import { AuthContextProvider } from "./store/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <SignIn></SignIn>
      </AuthContextProvider>
    </>
  );
}

export default App;
