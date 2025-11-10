import { Edit3, Trash2, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 👈
import "../styles/ObjectCard.css";

export default function ObjectCard({ object, onEdit, onDelete }) {
  const session = JSON.parse(localStorage.getItem("session"));
  const currentUser = session?.user;
  const isOwner = currentUser && currentUser.id === object.userId;
  const navigate = useNavigate(); // 👈

  const handleConsult = () => {
    // Navegamos al chat pasando el ID del publicador o del objeto
    navigate(`/chat/${object.userId}`);
  };

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

        {object.category && (
          <p className="object-category">
            🏷️ Categoría: <strong>{object.category}</strong>
          </p>
        )}

        {object.building && (
          <p className="object-location">
            🏫 Edificio: <strong>{object.building}</strong>
          </p>
        )}

        <small className="object-user">
          Reportado por:{" "}
          <strong>{object.userName || "Desconocido"}</strong>
        </small>

        <div className="object-actions">
          {isOwner ? (
            <>
              <button className="edit-btn" onClick={() => onEdit(object)}>
                <Edit3 size={16} /> Editar
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(object.id)}
              >
                <Trash2 size={16} /> Eliminar
              </button>
            </>
          ) : (
            <button className="consult-btn" onClick={handleConsult}>
              <MessageCircle size={16} /> Consultar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
