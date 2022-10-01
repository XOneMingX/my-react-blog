import React, { useState, useEffect, useContext } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../Config/Firebase";
import AuthContext from "../store/auth-context";

const Login = () => {
  //   const [username, setUsername] = useState();
  //   const [isLoadedUser, setIsLoadedUser] = useState(false);

  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUsername(user.displayName);
  //         setIsLoadedUser(true);
  //       } else {
  //         setUsername("");
  //       }
  //     });
  //   }, [isLoadedUser]);

  //   const signInWithGoogle = () => {
  //     const provider = new GoogleAuthProvider();
  //     signInWithPopup(auth, provider)
  //       .then((result) => {
  //         setUsername(result.user.displayName);
  //       })
  //       .catch((er) => {
  //         console.log(er);
  //       });
  //   };

  //   const signOutHandler = () => {
  //     signOut(auth).then(() => {
  //       setIsLoadedUser(false);
  //     });
  //   };
  const authContext = useContext(AuthContext);

  return (
    <div>
      {authContext.isLoggedIn ? (
        <div>
          {authContext.userData.displayName}
          <button onClick={authContext.onLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={authContext.onLogin}>Login</button>
      )}
    </div>
  );
};

export default Login;
