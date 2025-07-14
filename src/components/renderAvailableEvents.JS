export async function renderAvailableEvents(container, userId) {
  container.innerHTML = `<h3> Eventos Disponibles</h3>`;

  try {
    //  Obtener cursos del servidor
    const res = await fetch("http://localhost:3000/events");
    const events = await res.json();

    // Crear contenedor para mostrar los cursos
    const list = document.createElement("div");
    list.classList.add("student-courses");

    // Recorrer todos los cursos y mostrarlos
    events.forEach((event) => {
      const inscrito = event.visitors.includes(userId); // si el usuario ya está en el array de students
      const cupoLleno = event.visitors.length >= event.maxCapacity; // si ya se alcanzó el número máximo de estudiantes

      // Mostrar mensaje si no está inscrito en ningún curso
      if (list.length === 0) {
        container.innerHTML = `<p>No hay ningun evento disponible.</p>`;
        return;
      }

      // Crear tarjeta (card) del curso
      const card = document.createElement("div");
      card.classList.add("course-card");

      card.innerHTML = `
        <h4>${event.title}</h4>
        <p><strong>Instructor:</strong> ${event.instructor}</p>
        <p><strong>Categoría:</strong> ${event.category}</p>
        <p><strong>Capacidad:</strong> ${event.visitors.length} / ${
        event.maxCapacity
      }</p>
        <p>${event.description}</p>
        <button 
          class="enroll-btn"
          ${inscrito || cupoLleno ? "disabled" : ""}
          data-id="${event.id}">
          ${inscrito ? "Ya inscrito" : cupoLleno ? "Cupo lleno" : "Inscribirme"}
        </button>
      `;

      list.appendChild(card);
    });

    //  Mostrar las tarjetas en pantalla

    container.innerHTML = "";
    container.appendChild(list);

    //  Manejar el evento de inscripción,  Por cada botón "Inscribirme" se agrega un evento click.
    document.querySelectorAll(".enroll-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const eventId = e.target.dataset.id;

        //  Actualizar el curso con nuevo estudiante
        const res = await fetch(`http://localhost:3000/events/${eventId}`);
        const event = await res.json();

        event.visitors.push(userId);

        await fetch(`http://localhost:3000/events/${eventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
        });

        // Mensaje de éxito y refrescar
        alert("Te has inscrito en el curso.");
        renderAvailableEvents(container, userId);
      });
    });
  } catch (err) {
    console.error("Error:", err);
    container.innerHTML = `<p>Error al cargar los eventos.</p>`;
  }
}
