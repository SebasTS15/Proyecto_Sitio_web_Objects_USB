import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import "../styles/register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ 1. Verificar si el usuario ya existe en JSON Server
      const res = await fetch("https://69114bc37686c0e9c20cf76f.mockapi.io/users");
      const users = await res.json();
      const exists = users.some((u) => u.email === form.email);

      if (exists) {
        setError("Este correo ya está registrado.");
        return;
      }

      // ✅ 2. Crear nuevo usuario
      const newUser = { id: Date.now(), ...form };

      await fetch("https://69114bc37686c0e9c20cf76f.mockapi.io/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      // ✅ 3. Guardar sesión automáticamente (opcional)
      localStorage.setItem(
        "session",
        JSON.stringify({
          user: newUser,
          token: crypto.randomUUID(),
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 día
        })
      );

      navigate("/login"); // o "/login" si prefieres que primero inicie sesión
    } catch (err) {
      console.error(err);
      setError("Error al registrar usuario.");
    }
  };

  return (
    <div className="register-page">
      <motion.div
        className="register-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Crear una cuenta</h2>
        <p className="subtitle">
          Únete a la comunidad USB y publica o encuentra objetos perdidos.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User className="icon" />
            <input
              name="name"
              type="text"
              placeholder="Nombre completo"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Mail className="icon" />
            <input
              name="email"
              type="email"
              placeholder="Correo institucional"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="icon" />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="register-btn"
          >
            Registrarme <ArrowRight size={18} />
          </motion.button>
        </form>

        <p className="login-redirect">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </motion.div>
    </div>
  );
}
