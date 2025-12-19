import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext({
  user: null,
  isUserLoggedIn: false,
  handleSignIn: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser = async (user) => {
    if (user) {
      setUser(user);
      setIsUserLoggedIn(true);
    } else {
      setUser(null);
      setIsUserLoggedIn(false);
    }
  };

  const handleSignIn = (e, email, password) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => console.log(userCredentials))
        .catch((error) => console.log(error));
    }
  };

  const ctxValue = { user, isUserLoggedIn, handleSignIn };

  return <AuthContext value={ctxValue}>{children}</AuthContext>;
};
