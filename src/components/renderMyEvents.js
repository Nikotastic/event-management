// Displays a list of events the user is registered for, with the option to unregister.

export async function renderMyEvents(container, userId) {
  container.innerHTML = `<h3> Mis Eventos</h3>`;

  try {
    const res = await fetch("http://localhost:3000/events");
    const allEvents = await res.json();

    // Filter events the user is enrolled in
    const myEvents = allEvents.filter((event) =>
      event.visitors.includes(userId)
    );

    if (myEvents.length === 0) {
      container.innerHTML = `<p>No estás inscrito en ningún evento.</p>`;
      return;
    }

    const list = document.createElement("div");
    list.classList.add("student-courses");

    myEvents.forEach((event) => {
      const card = document.createElement("div");
      card.classList.add("course-card");

      card.innerHTML = `
        <h4>${event.title}</h4>
        <p><strong>Instructor:</strong> ${event.instructor}</p>
        <p><strong>Categoría:</strong> ${event.category}</p>
        <p>${event.description}</p>
        <button class="cancel-btn" data-id="${event.id}">Cancelar inscripción</button>
      `;

      list.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(list);

    // Configure unsubscribe buttons
    document.querySelectorAll(".cancel-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const res = await fetch(`http://localhost:3000/events/${id}`);
        const event = await res.json();

        // Remove user from the visitor list
        const updated = {
          ...event,
          visitors: event.visitors.filter((v) => v !== userId),
        };

        await fetch(`http://localhost:3000/events/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });

        alert("Ya no estas en este evento.");
        renderMyEvents(container, userId);
      });
    });
  } catch (err) {
    console.error("Error:", err);
    container.innerHTML = `<p>Error al cargar tus eventos.</p>`;
  }
}
