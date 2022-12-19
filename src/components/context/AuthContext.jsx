import { createContext, useContext, useEffect, useState } from "react";
import {
  getBasket,
  login,
  logout,
  onUserStateChange,
} from "../../config/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const [count, setCount] = useState(
    getBasket(1).then((data) => data.length) || 0
  );

  return (
    <AuthContext.Provider value={{ user, count, setCount, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
