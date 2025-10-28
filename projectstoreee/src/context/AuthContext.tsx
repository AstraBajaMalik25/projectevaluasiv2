import { createContext, useContext, useState, } from "react";
import type { ReactNode } from "react"

interface AuthContextType {
  user: string | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("username") || null
  );

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    alert("Anda telah logout!");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
