const API_URL = "http://localhost:5000/users";

// Obtener todos los usuarios
export const getUsers = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

// Crear usuario (registro)
export const createUser = async (user) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
};
