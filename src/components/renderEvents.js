export async function renderEvents(container) {
  container.innerHTML = `<h3> Lista de Events</h3>`;

  try {
    // Obtener los cursos del backend
    const res = await fetch("http://localhost:3000/events");
    const courses = await res.json();

    // Si no hay cursos, mostrar mensaje
    if (courses.length === 0) {
      container.innerHTML = `<p>No hay eventos disponibles.</p>`;
      return;
    }

    //  Crear tarjetas de cada curso
    const courseList = document.createElement("div");
    courseList.classList.add("course-list");

    // Recorrer cursos y crear el HTML
    courses.forEach((course) => {
      const card = document.createElement("div");
      card.classList.add("course-card");

      card.innerHTML = `
        <h4>${course.title}</h4>
        <p><strong>Descripción:</strong> ${course.description}</p>
        <p><strong>Categoría:</strong> ${course.category}</p>
        <p><strong>Capacidad:</strong> ${course.students?.length || 0} / ${
        course.maxCapacity
      }</p>
        <p><strong>Instructor:</strong> ${course.instructor}</p>
        <div class="course-actions">
          <button class="edit-btn" data-id="${course.id}">✏️ Editar</button>
          <button class="delete-btn" data-id="${course.id}">🗑️ Eliminar</button>
        </div>
      `;

      courseList.appendChild(card);
    });

    //  Limpiar contenedor y renderizar
    container.innerHTML = "";
    container.appendChild(courseList);

    // Eliminar curso
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
          await fetch(`http://localhost:3000/events/${id}`, {
            method: "DELETE",
          });
          renderEvents(container); // recargar
        }
      });
    });

    // Editar curso (básico - puedes expandir luego)
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const res = await fetch(`http://localhost:3000/events/${id}`);
        const course = await res.json();

        container.innerHTML = `
          <section class="course-creator">
            <h2>✏️ Editar Curso</h2>
            <form id="editCourseForm">
              <input id="title" type="text" value="${course.title}" required />
              <textarea id="description" required>${course.description}</textarea>
              <input id="category" type="text" value="${course.category}" required />
              <input id="maxCapacity" type="number" value="${course.maxCapacity}" required />
              <input id="instructor" type="text" value="${course.instructor}" required />
              <button type="submit" class="btn">Guardar Cambios</button>
            </form>
          </section>
        `;

        const form = document.getElementById("editCourseForm");
        //  Guardar cambios del curso editado
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const updated = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            maxCapacity: Number(form.maxCapacity.value),
            instructor: form.instructor.value,
            students: course.students, // se mantienen los inscritos actuales
          };

          await fetch(`http://localhost:3000/events/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
          });

          alert("Curso actualizado");
          renderEvents(container); // recargar lista
        });
      });
    });
  } catch (error) {
    console.error("Error al cargar cursos:", error);
    container.innerHTML = `<p>Error al cargar los cursos.</p>`;
  }
}
