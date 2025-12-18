import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const { handleSignIn } = useContext(AuthContext);

  return (
    <>
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
    </>
  );
}

export default SignIn;
