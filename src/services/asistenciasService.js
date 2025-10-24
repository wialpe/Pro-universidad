const API_URL = "http://localhost:8080/api/asistencias";

export async function getAsistencias() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener asistencias");
  }
  return response.json();
}