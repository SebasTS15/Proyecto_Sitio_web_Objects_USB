import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autocontext";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔹 1. Traer los usuarios del servidor JSON
      const res = await fetch("https://69114bc37686c0e9c20cf76f.mockapi.io/users");
      if (!res.ok) throw new Error("Error al conectar con el servidor");
      const users = await res.json();

      // 🔹 2. Buscar coincidencia
      const userFound = users.find(
        (u) => u.email === email.trim() && u.password === password
      );

      if (userFound) {
        // 🔹 3. Generar token y sesión igual que antes
        const token = btoa(`${userFound.email}-${Date.now()}`);
        const session = {
          user: userFound,
          token,
          expiresAt: Date.now() + 3600 * 1000, // 1 hora
        };

        // 🔹 4. Guardar sesión en localStorage
        localStorage.setItem("session", JSON.stringify(session));
        login(userFound);

        // 🔹 5. Redirigir al dashboard
        navigate("/dashboard");
      } else {
        setError("⚠️ Credenciales incorrectas. Verifica tu correo o contraseña.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <p className="subtitle">
          Bienvenido de nuevo 👋<br />
          Ingresa tus credenciales para continuar
        </p>

        <form onSubmit={handleLogin} className="login-form" noValidate>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@usb.edu.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta?{" "}
          <span onClick={() => navigate("/register")}>Regístrate aquí</span>
        </p>
      </div>
    </div>
  );
}
