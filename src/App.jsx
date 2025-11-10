import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ObjectFormPage from "./pages/ObjectFormPage"; // 👈 importar la nueva página
import PrivateRoute from "./components/PrivateRouts";
import { AuthProvider } from "./context/Autocontext";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* 🔒 Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/nuevo-objeto"
            element={
              <PrivateRoute>
                <ObjectFormPage />
              </PrivateRoute>
            }
          />
          
          <Route
          path="/editar-objeto/:id"
          element={
            <PrivateRoute>
              <ObjectFormPage isEditing={true} />
            </PrivateRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          {/* 🏠 Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔁 Redirección por defecto */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
