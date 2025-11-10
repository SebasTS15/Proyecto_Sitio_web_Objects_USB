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
    image: "", // aquí guardamos la URL de Cloudinary
  });

  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📸 Subida automática a Cloudinary
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default"); // cambia por tu upload preset
    data.append("cloud_name", "dtecocbsi"); // cambia por tu cloud name

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dtecocbsi/image/upload`,
        { method: "POST", body: data }
      );
      const uploadRes = await res.json();
      if (uploadRes.secure_url) {
        setFormData((prev) => ({ ...prev, image: uploadRes.secure_url }));
      } else {
        alert("⚠️ No se pudo obtener la URL de la imagen");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("❌ Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      const currentUser = session?.user;

      if (!currentUser) {
        alert("⚠️ Debes iniciar sesión para publicar un objeto.");
        navigate("/login");
        return;
      }

      const newObject = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        building: formData.building,
        image: formData.image || existingObject?.image || "",
        userId: currentUser.id,
        userEmail: currentUser.email,
        userName: currentUser.name,
      };

      if (isEditing) {
        await updateObject(existingObject.id, newObject);
        alert("✅ Objeto actualizado correctamente");
      } else {
        await createObject(newObject);
        alert("✅ Objeto publicado con éxito");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar el objeto");
    }
  };

  return (
    <form className="object-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? "Editar información del objeto" : "Nuevo objeto perdido"}</h3>

      {/* Nombre */}
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

      {/* Descripción */}
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Tipo / Categoría */}
      <div className="form-group">
        <label>Tipo de objeto</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar tipo...</option>
          <option value="Electrónico">Electrónico</option>
          <option value="Ropa / Accesorio">Ropa / Accesorio</option>
          <option value="Documentos">Documentos</option>
          <option value="Llaves">Llaves</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      {/* Edificio */}
      <div className="form-group">
        <label>Edificio o ubicación</label>
        <select
          name="building"
          value={formData.building}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar edificio...</option>
          <option value="Cedro">Cedro</option>
          <option value="Lago">Lago</option>
          <option value="Ceresos">Ceresos</option>
          <option value="Cafetería Central">Cafetería Central</option>
          <option value="Cafetería Lago">Cafetería Lago</option>
          <option value="Farallones">Farallones</option>
          <option value="Higuerones 1">Higuerones 1</option>
          <option value="Higuerones 2">Higuerones 2</option>
          <option value="Parque Tecnológico">Parque Tecnológico</option>
          <option value="Cancha">Cancha</option>
          <option value="Naranjos">Naranjos</option>
        </select>
      </div>

      {/* Imagen */}
      <div className="form-group">
        <label>Subir imagen</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && <p className="uploading-text">Subiendo imagen...</p>}

        {(formData.image || existingObject?.image) && (
          <div className="image-preview">
            <img
              src={formData.image || existingObject.image}
              alt="Vista previa"
            />
          </div>
        )}
      </div>

      <button className="submit-btn" type="submit" disabled={uploading}>
        {uploading ? "Cargando..." : isEditing ? "Guardar cambios" : "Publicar objeto"}
      </button>
    </form>
  );
}
