const API_URL = "https://69114bc37686c0e9c20cf76f.mockapi.io/objects";

export const getObjects = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addObject = async (object) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  });
  return await res.json();
};

// 🟡 Crear objeto
export const createObject = async (objectData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objectData),
  });
  if (!res.ok) throw new Error("Error al crear el objeto");
  return await res.json();
};

// 🔵 Actualizar objeto
export const updateObject = async (id, newData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  if (!res.ok) throw new Error("Error al actualizar el objeto");
  return await res.json();
};

// 🔴 Eliminar objeto
export const deleteObject = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el objeto");
  return true;
};

