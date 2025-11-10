import { useState, useEffect } from "react";
import { createObject, updateObject } from "../services/ObjectServices";
import { useNavigate } from "react-router-dom";
import "../styles/ObjectForm.css";

export default function ObjectForm({ isEditing = false, existingObject = null }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    building: "",
    image: "",
  });

  const navigate = useNavigate();

  // 🧠 Rellenar datos si estamos editando
  useEffect(() => {
    if (existingObject) {
      setFormData({
        name: existingObject.name || "",
        description: existingObject.description || "",
        category: existingObject.category || "",
        building: existingObject.building || "",
        image: existingObject.image || "",
      });
    }
  }, [existingObject]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateObject(existingObject.id, formData);
        alert("✅ Objeto actualizado correctamente");
      } else {
        await createObject(formData);
        alert("✅ Objeto publicado con éxito");
      }
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Error al guardar el objeto");
    }
  };

  return (
    <form className="object-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? "Editar información del objeto" : "Nuevo objeto perdido"}</h3>

      <div className="form-group">
        <label>Nombre del objeto</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Edificio</label>
        <input
          type="text"
          name="building"
          value={formData.building}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>URL de imagen</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <button className="submit-btn" type="submit">
        {isEditing ? "Guardar cambios" : "Publicar objeto"}
      </button>
    </form>
  );
}
