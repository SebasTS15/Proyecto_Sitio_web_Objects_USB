import { useState, useEffect } from "react";
import "../styles/ObjectForm.css";

export default function ObjectForm({ onSubmit, existingObject }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (existingObject) {
      setForm(existingObject);
      setPreview(existingObject.image);
    }
  }, [existingObject]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🧠 Obtener el usuario autenticado desde la sesión
    const session = JSON.parse(localStorage.getItem("session"));
    const currentUser = session?.user;

    if (!currentUser) {
      alert("⚠️ No hay sesión activa. Inicia sesión para publicar un objeto.");
      return;
    }

    // 🧩 Agregar el usuario al objeto antes de enviarlo
    const newObject = {
      ...form,
      user: currentUser.name, // Guarda el nombre (podrías usar email si prefieres)
    };

    onSubmit(newObject);

    // Resetear formulario
    setForm({ name: "", description: "", image: "" });
    setPreview("");
  };

  return (
    <form className="object-form" onSubmit={handleSubmit}>
      <h3>{existingObject ? "Editar objeto" : "Publicar nuevo objeto"}</h3>

      <div className="form-group">
        <label>Nombre del objeto</label>
        <input
          name="name"
          placeholder="Ej: USB Kingston negra"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="description"
          placeholder="Describe brevemente el objeto..."
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Subir imagen</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {preview && (
          <img src={preview} alt="Vista previa" className="preview-image" />
        )}
      </div>

      <button type="submit" className="submit-btn">
        {existingObject ? "Actualizar objeto" : "Publicar objeto"}
      </button>
    </form>
  );
}
