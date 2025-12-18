import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Navigate } from "react-router";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleSignIn, isUserLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isUserLoggedIn && <Navigate to="/home"></Navigate>}
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <div className="box">
          <h2 className="pb-5">Bejelentkezés</h2>
          <form onSubmit={(e) => handleSignIn(e, email, password)}>
            <div className="form-group">
              <label htmlFor="email">E-mail cím</label>
              <input
                id="email"
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Jelszó</label>
              <input
                id="password"
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button type="submit" className="btn btn-success mt-5">
              Bejelentkezés
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
