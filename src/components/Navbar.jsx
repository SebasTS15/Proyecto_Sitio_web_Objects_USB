import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autocontext";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { getUnreadCount, getLastUnreadChat } from "../services/chatUtils";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  // 🔄 Actualiza cada 2 segundos la cantidad de mensajes no leídos
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        setUnread(getUnreadCount(user.id));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // 📩 Si tiene mensajes sin leer, lleva al último chat pendiente
  const handleMessagesClick = () => {
    const chat = getLastUnreadChat(user.id);
    if (chat) {
      const otherUser = chat.participants.find((p) => p !== user.id);
      navigate(`/chat/${otherUser}`);
    } else {
      alert("No tienes mensajes nuevos.");
    }
  };

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

              {/* 💬 Icono de mensajes */}
              <li className="messages-icon" onClick={handleMessagesClick}>
                <MessageCircle size={22} />
                {unread > 0 && <span className="badge">{unread}</span>}
              </li>

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
