export async function renderMyEvents(container, userId) {
  container.innerHTML = `<h3> Mis Events</h3>`;

  try {
    // Obtener todos los cursos desde JSON Server
    const res = await fetch("http://localhost:3000/events");
    const allEvents = await res.json();

    // Filtrar los cursos en los que el usuario está inscrito
    const myEvents = allEvents.filter((events) =>
      events.visitors.includes(userId)
    );

    // Mostrar mensaje si no está inscrito en ningún curso
    if (myEvents.length === 0) {
      container.innerHTML = `<p>No estás inscrito en ningún curso.</p>`;
      return;
    }

    // Crear tarjetas de los cursos
    const list = document.createElement("div");
    list.classList.add("student-courses");

    myEvents.forEach((events) => {
      const card = document.createElement("div");
      card.classList.add("course-card");

      card.innerHTML = `
        <h4>${events.title}</h4>
        <p><strong>Instructor:</strong> ${events.instructor}</p>
        <p><strong>Categoría:</strong> ${events.category}</p>
        <p>${events.description}</p>
      `;

      list.appendChild(card);
    });

    //  Limpiar y mostrar en pantalla
    container.innerHTML = "";
    container.appendChild(list);

    // Manejo de errores
  } catch (err) {
    console.error("Error:", err);
    container.innerHTML = `<p>Error al cargar tus eventos.</p>`;
  }
}
