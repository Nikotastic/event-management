

// main function of displaying all available events
export async function renderEvents(container) {
  container.innerHTML = `<h3> Lista de Eventos</h3>`;

  try {
    // Query events from the local API
    const res = await fetch("http://localhost:3000/events");
    const events = await res.json();

    if (events.length === 0) {
      container.innerHTML = `<p>No hay eventos disponibles.</p>`;
      return;
    }

    const list = document.createElement("div");
    list.classList.add("course-list");

    // Scroll through and display each event on a card
    events.forEach((event) => {
      const card = document.createElement("div");
      card.classList.add("course-card");

      card.innerHTML = `
        <h4>${event.title}</h4>
        <p><strong>Descripción:</strong> ${event.description}</p>
        <p><strong>Categoría:</strong> ${event.category}</p>
        <p><strong>Capacidad:</strong> ${event.visitors?.length || 0} / ${
        event.maxCapacity
      }</p>
        <p><strong>Instructor:</strong> ${event.instructor}</p>
        <div class="course-actions">
          <button class="edit-btn" data-id="${event.id}">✏️ Editar</button>
          <button class="delete-btn" data-id="${event.id}">🗑️ Eliminar</button>
        </div>
      `;

      list.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(list);

    // Configure delete buttons
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
          await fetch(`http://localhost:3000/events/${id}`, {
            method: "DELETE",
          });
          renderEvents(container);
        }
      });
    });

    // Configure edit buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const res = await fetch(`http://localhost:3000/events/${id}`);
        const event = await res.json();

        container.innerHTML = `
          <section class="course-creator">
            <h2>✏️ Editar Curso</h2>
            <form id="editCourseForm">
              <input id="title" type="text" value="${event.title}" required />
              <textarea id="description" required>${event.description}</textarea>
              <input id="category" type="text" value="${event.category}" required />
              <input id="maxCapacity" type="number" value="${event.maxCapacity}" required />
              <input id="instructor" type="text" value="${event.instructor}" required />
              <button type="submit" class="btn">Guardar Cambios</button>
            </form>
          </section>
        `;

        // Process edit form
        const form = document.getElementById("editCourseForm");
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const updated = {
            ...event,
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            maxCapacity: Number(form.maxCapacity.value),
            instructor: form.instructor.value,
          };

          // Send update
          await fetch(`http://localhost:3000/events/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
          });

          alert("Curso actualizado");
          renderEvents(container);
        });
      });
    });
  } catch (error) {
    console.error("Error al cargar cursos:", error);
    container.innerHTML = `<p>Error al cargar los cursos.</p>`;
  }
}
