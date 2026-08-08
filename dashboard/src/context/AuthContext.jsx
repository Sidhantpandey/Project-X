import React, { createContext, useContext, useEffect, useState } from "react";
import authApi from "../config/authApi";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const getStoredUser = () => {
  const stored = localStorage.getItem("user");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(!!localStorage.getItem("token"));

  const persistSession = (nextToken, nextUser) => {
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    authApi
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (cancelled) return;
        const nextUser = response.data?.data?.user;
        if (nextUser) {
          setUser(nextUser);
          localStorage.setItem("user", JSON.stringify(nextUser));
        }
      })
      .catch(() => {
        if (!cancelled) clearSession();
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = async (email, password) => {
    const response = await authApi.post("/auth/login", { email, password });
    const { token: nextToken, user: nextUser } = response.data.data;
    persistSession(nextToken, nextUser);
    return nextUser;
  };

  const register = async (name, email, password) => {
    const response = await authApi.post("/auth/register", { name, email, password });
    const { token: nextToken, user: nextUser } = response.data.data;
    persistSession(nextToken, nextUser);
    return nextUser;
  };

  const logout = () => {
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
