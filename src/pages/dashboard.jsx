import { useEffect, useState } from "react";
import { getObjects, deleteObject } from "../services/ObjectServices";
import ObjectCard from "../components/ObjectCars";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [objects, setObjects] = useState([]);
  const [myObjects, setMyObjects] = useState(false);
  const navigate = useNavigate();

  const session = JSON.parse(localStorage.getItem("session"));
  const currentUser = session?.user;

  useEffect(() => {
    if (!session || Date.now() > session.expiresAt) {
      localStorage.removeItem("session");
      navigate("/login");
      return;
    }
    fetchObjects();
  }, []);

  const fetchObjects = async () => {
    try {
      const data = await getObjects();
      setObjects(data);
    } catch (err) {
      console.error("Error al cargar objetos:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este objeto?")) {
      try {
        await deleteObject(id);
        fetchObjects();
      } catch {
        alert("Error al eliminar el objeto.");
      }
    }
  };
  const handleEdit = (object) => {
  navigate(`/editar-objeto/${object.id}`, { state: { object } });
  };


  // ✅ Filtramos correctamente según el correo del usuario logueado
  const filteredObjects = myObjects
    ? objects.filter((obj) => obj.userEmail === currentUser?.email)
    : objects;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Panel de Objetos Perdidos</h1>

        <div className="dashboard-actions">
          <button className="btn" onClick={() => navigate("/nuevo-objeto")}>
            ➕ Publicar nuevo objeto
          </button>
          <button className="btn" onClick={() => setMyObjects(!myObjects)}>
            {myObjects ? "👀 Ver todos los objetos" : "📦 Mis objetos"}
          </button>
        </div>
      </header>

      <section className="object-section">
        <h2 className="section-title">
          {myObjects ? "Mis objetos publicados" : "Objetos perdidos"}
        </h2>

        <div className="object-list">
          {filteredObjects.length > 0 ? (
            filteredObjects.map((obj) => (
              <ObjectCard
                key={obj.id}
                object={obj}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="empty-state">
              {myObjects
                ? "❌ No has publicado objetos aún."
                : "😔 No hay objetos perdidos publicados."}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
