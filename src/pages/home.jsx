import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Objetos Perdidos USB</h1>
        <p className="subtitle">
          Bienvenido a la plataforma de la Universidad de San Buenaventura para que estudiantes publiquen y encuentren los objetos que se pierden en el campus.
        </p>
        <div className="cta-buttons">
          <Link to="/login" className="btn-primary">
            Iniciar sesión
          </Link>
          <Link to="/register" className="btn-secondary">
            Crear cuenta
          </Link>
        </div>
      </div>

      <section className="info-section">
        <h2>¿Cómo funciona?</h2>
        <div className="cards-container">
          <div className="card">
            <div className="card-icon">📝</div>
            <h3>1. Regístrate</h3>
            <p>Crea tu cuenta con correo institucional para acceder al sistema.</p>
          </div>
          <div className="card">
            <div className="card-icon">📦</div>
            <h3>2. Publica</h3>
            <p>Publica un objeto perdido o encontrado con descripción y foto.</p>
          </div>
          <div className="card">
            <div className="card-icon">🔍</div>
            <h3>3. Encuentra</h3>
            <p>Busca en el listado o revisa tu publicación y actúa rápido para recuperar.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Universidad de San Buenaventura – Plataforma Objetos USB</p>
      </footer>
    </div>
  );
}
