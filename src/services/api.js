// src/services/api.js
const BASE_URL = "http://localhost:8080/api";

// 🔹 Obtener todas las asistencias
export async function getAsistencias() {
  const res = await fetch(`${BASE_URL}/asistencias`);
  if (!res.ok) throw new Error("Error al obtener asistencias");
  return res.json();
}

// 🔹 Obtener estadísticas (puedes cambiar la ruta si tu backend tiene un endpoint específico)
export async function getEstadisticas() {
  // Si tu backend tiene /api/estadisticas, cambia "asistencias" por "estadisticas"
  const res = await fetch(`${BASE_URL}/asistencias`);
  if (!res.ok) throw new Error("Error al obtener estadísticas");
  return res.json();
}