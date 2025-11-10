import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session && session.user && session.token) {
      // Verificamos si la sesión sigue vigente
      if (session.expiresAt > Date.now()) {
        setUser(session.user);
      } else {
        // Si expiró, limpiar localStorage
        localStorage.removeItem("session");
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // También actualizamos localStorage (por si el login se llama sin guardarlo)
    const token = btoa(`${userData.email}-${Date.now()}`);
    const session = {
      user: userData,
      token,
      expiresAt: Date.now() + 3600 * 1000, // 1 hora
    };
    localStorage.setItem("session", JSON.stringify(session));
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder fácilmente
export const useAuth = () => useContext(AuthContext);
