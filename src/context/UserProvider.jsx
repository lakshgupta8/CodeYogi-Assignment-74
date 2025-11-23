import { useState, useEffect } from "react";
import { UserContext } from "./UserContext.js";
import axios from "axios";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get("https://r5ftltl6sj.execute-api.us-east-1.amazonaws.com/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          setLoading(false);
        });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setLoading(true);
    if (user) {
      setUser(user);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
