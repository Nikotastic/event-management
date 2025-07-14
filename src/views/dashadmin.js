// Importa los módulos que se mostrarán en el panel

import { createEvents } from "../components/createEvents";
import { renderEvents } from "../components/renderEvents";


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

  // Cerrar sesión
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    location.hash = "/";
  });

  // Eventos para los botones
  document
    .getElementById("createCourseBtn")
    .addEventListener("click", () => createEvents(content));

    document
      .getElementById("viewCoursesBtn")
      .addEventListener("click", () => renderEvents(content));
}
