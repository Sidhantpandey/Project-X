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
  const [loading, setLoading] = useState(true);

  const persistSession = (nextUser) => {
    if (nextUser) {
      localStorage.setItem("user", JSON.stringify(nextUser));
      setUser(nextUser);
    }
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    let cancelled = false;

    const hydrateSession = async () => {
      try {
        const response = await authApi.get("/auth/me");
        if (cancelled) return;

        const nextUser = response.data?.data?.user;
        if (nextUser) {
          persistSession(nextUser);
        } else {
          clearSession();
        }
      } catch {
        if (!cancelled) clearSession();
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setLoading(false);
      return;
    }

    hydrateSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email, password) => {
    const response = await authApi.post("/auth/login", { email, password });
    const nextUser = response.data?.data?.user ?? response.data?.user;
    persistSession(nextUser);
    setToken("session");
    return nextUser;
  };

  const register = async (name, email, password) => {
    const response = await authApi.post("/auth/register", { name, email, password });
    const nextUser = response.data?.data?.user ?? response.data?.user;
    persistSession(nextUser);
    setToken("session");
    return nextUser;
  };

  const logout = async () => {
    try {
      await authApi.post("/auth/logout");
    } catch {
      // Ignore logout errors and clear local state anyway.
    } finally {
      clearSession();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
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
