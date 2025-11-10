import { Edit3, Trash2 } from "lucide-react";
import "../styles/ObjectCard.css";

export default function ObjectCard({ object, onEdit, onDelete }) {
  return (
    <div className="object-card">
      <div className="object-image">
        {object.image ? (
          <img src={object.image} alt={object.name} />
        ) : (
          <div className="no-image">Sin imagen</div>
        )}
      </div>

      <div className="object-content">
        <h3 className="object-title">{object.name}</h3>
        <p className="object-description">{object.description}</p>
        <small className="object-user">
          Reportado por: <strong>{object.user || "Desconocido"}</strong>
        </small>

        <div className="object-actions">
          <button className="edit-btn" onClick={() => onEdit(object)}>
            <Edit3 size={16} /> Editar
          </button>
          <button
            className="delete-btn"
            onClick={() => onDelete(object.id)}
          >
            <Trash2 size={16} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
