import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autocontext";
import { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">🎓 Objetos USB</Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/">Inicio</Link></li>

          {user ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li className="user-info">👋 {user.name || user.email}</li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Ingresar</Link></li>
              <li><Link to="/register">Registro</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
