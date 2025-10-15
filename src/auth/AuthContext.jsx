import { createContext, useContext, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return { token: null, username: null, role: null };
    try {
      const d = jwtDecode(token);
      const role = (d.roles?.[0] || "").replace("ROLE_", "");
      return { token, username: d.sub, role };
    } catch {
      return { token: null, username: null, role: null };
    }
  });

  const login = async (username, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Credenciales inválidas");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    const d = jwtDecode(data.token);
    const role = (d.roles?.[0] || "").replace("ROLE_", "");
    setState({ token: data.token, username: data.username, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ token: null, username: null, role: null });
  };

  const value = useMemo(() => ({ ...state, login, logout }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
