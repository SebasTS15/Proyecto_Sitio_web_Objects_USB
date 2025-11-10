import { useLocation } from "react-router-dom";
import ObjectForm from "../components/ObjectForm";

export default function ObjectFormPage({ isEditing = false }) {
  const { state } = useLocation();
  const objectToEdit = state?.object;

  return (
    <div className="form-page-container">
      <h2>{isEditing ? "Editar objeto" : "Publicar nuevo objeto"}</h2>
      <ObjectForm isEditing={isEditing} existingObject={objectToEdit} />
    </div>
  );
}
