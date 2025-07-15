// main function where it shows available events for a user to sign up for.
export async function renderAvailableEvents(container, userId) {
  container.innerHTML = `<h3> Eventos Disponibles</h3>`;

  try {
    const res = await fetch("http://localhost:3000/events");
    const events = await res.json();

    const list = document.createElement("div");
    list.classList.add("student-courses");

    // Filter events in which the user is NOT registered
    const disponibles = events.filter(
      (event) => !event.visitors.includes(userId)
    );
    if (disponibles.length === 0) {
      container.innerHTML = `<p>No hay eventos disponibles para inscribirte.</p>`;
      return;
    }

    disponibles.forEach((event) => {
      const inscrito = event.visitors.includes(userId);
      const cupoLleno = event.visitors.length >= event.maxCapacity;

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
        <button class="enroll-btn" ${
          inscrito || cupoLleno ? "disabled" : ""
        } data-id="${event.id}">
          ${inscrito ? "Ya inscrito" : cupoLleno ? "Cupo lleno" : "Inscribirme"}
        </button>
      `;

      list.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(list);

    // Configure subscription buttons
    document.querySelectorAll(".enroll-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const eventId = e.target.dataset.id;

        const res = await fetch(`http://localhost:3000/events/${eventId}`);
        const event = await res.json();

        // Check capacity and add user
        if (
          !event.visitors.includes(userId) &&
          event.visitors.length < event.maxCapacity
        ) {
          event.visitors.push(userId);

          await fetch(`http://localhost:3000/events/${eventId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
          });

          alert("Te has inscrito en el evento.");
          renderAvailableEvents(container, userId);
        }
      });
    });
  } catch (err) {
    console.error("Error:", err);
    container.innerHTML = `<p>Error al cargar los eventos.</p>`;
  }
}
