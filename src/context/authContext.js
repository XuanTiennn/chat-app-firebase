import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const history = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { accessToken, reloadUserInfo } = user;
        setUser({
          accessToken,
          ...reloadUserInfo,
          userId: user.uid,
        });
        history("/chat");
      } else {
        setUser({});
        history("/login");
      }
    });
    return unsubscribed();
  }, [history]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
