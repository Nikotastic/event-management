// Importa funciones necesarias
import { renderAvailableEvents } from "../components/renderAvailableEvents.JS";
import { renderMyEvents } from "../components/renderMyEvents";

export function visitors(app) {
  const session = JSON.parse(localStorage.getItem("currentUser"));
  const userId = session?.id;

  app.innerHTML = `
    <section class="dashboard student-dashboard">
      <div class="student-header">
        <h2>🎟️ Bienvenido, ${session?.name || "Estudiante"}</h2>
        <div class="student-buttons">
          <button id="btn-available">🎇 Ver Eventos Disponibles</button>
          <button id="btn-my-courses">✅ Mis Eventos</button>
          <button id="logoutBtn">🚪 Cerrar Sesión</button>
        </div>
      </div>
      <div id="student-content" class="student-content">
        <p>Selecciona una opción para comenzar.</p>
      </div>
    </section>
  `;

  const content = document.getElementById("student-content");

  // Eventos
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    location.hash = "/";
  });

  document.getElementById("btn-available").addEventListener("click", () => {
    renderAvailableEvents(content, userId);
  });

   document.getElementById("btn-my-courses").addEventListener("click", () => {
    renderMyEvents(content, userId);
  }); 
}
