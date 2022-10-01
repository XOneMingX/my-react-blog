import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../Config/Firebase";
import { isAdmin } from "@firebase/util";

const AuthContext = React.createContext({
  userData: {},
  isLoggedIn: false,
  isAdmin: false,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          setIsAdmin(idTokenResult.claims.admin);
        });
        setUserData(user);
        setIsLoggedIn(true);
      } else {
        setUserData("");
      }
    });
  }, [isLoggedIn]);

  const logoutHandler = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      window.location.reload(false);
    });
  };

  const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        setIsLoggedIn(true);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        userData: userData,
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
