import { useEffect, useState } from "react";
import {
  getObjects,
  createObject,
  updateObject,
  deleteObject,
} from "../services/ObjectServices";
import ObjectCard from "../components/ObjectCars";
import ObjectForm from "../components/ObjectForm";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [objects, setObjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session || Date.now() > session.expiresAt) {
      localStorage.removeItem("session");
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
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

  const handleCreate = async (objectData) => {
    try {
      await createObject(objectData);
      fetchObjects();
    } catch {
      alert("Error al crear el objeto.");
    }
  };

  const handleUpdate = async (objectData) => {
    try {
      await updateObject(editing.id, objectData);
      setEditing(null);
      fetchObjects();
    } catch {
      alert("Error al actualizar el objeto.");
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


  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Panel de Objetos Perdidos</h1>
      </header>

      <section className="form-section">
        <ObjectForm
          onSubmit={editing ? handleUpdate : handleCreate}
          existingObject={editing}
        />
      </section>

      <section className="object-section">
        <h2 className="section-title">Objetos publicados</h2>
        <div className="object-list">
          {objects.length > 0 ? (
            objects.map((obj) => (
              <ObjectCard
                key={obj.id}
                object={obj}
                onEdit={(o) => setEditing(o)}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="empty-state">No hay objetos publicados todavía.</p>
          )}
        </div>
      </section>
    </div>
  );
}
