
import { createEvents } from "../components/createEvents";
import { renderEvents } from "../components/renderEvents";

// Dashboard Admin
export function admin(app) {
  app.innerHTML = `
    <section class="dashboard">
      <div class="admin-panel">
        <h2>🗄️ Panel de Administración</h2>
        <div class="admin-buttons">
          <button id="createCourseBtn">➕ Crear Evento</button>
          <button id="viewCoursesBtn">🎇 Ver Eventos</button>
          <button id="logoutBtn">🚪 Cerrar Sesión</button>
        </div>
        <div id="admin-content" class="admin-content">
          <p>Selecciona una opción para comenzar.</p>
        </div>
      </div>
    </section>
  `;

  const content = document.getElementById("admin-content");

  // Sign out
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    location.hash = "/";
  });

  // Events for buttons
  document
    .getElementById("createCourseBtn")
    .addEventListener("click", () => createEvents(content));

  document
    .getElementById("viewCoursesBtn")
    .addEventListener("click", () => renderEvents(content));
}
