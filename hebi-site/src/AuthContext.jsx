import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loadMe = async () => {
    const token = localStorage.getItem("hebi_token");
    if (!token) return setUser(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data.user);
    } catch {
      localStorage.removeItem("hebi_token");
      setUser(null);
    }
  };

  useEffect(() => { loadMe(); }, []);

  const login = (token) => {
    localStorage.setItem("hebi_token", token);
    loadMe();
  };
  const logout = () => {
    localStorage.removeItem("hebi_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
