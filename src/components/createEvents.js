export function createEvents(container) {
  container.innerHTML = `
    <section class="course-creator">
      <h2>➕ Crear Evento</h2>
      <form id="courseForm">
        <input id="title" type="text" placeholder="Título del evento" required />
        <textarea id="description" placeholder="Descripción" required></textarea>
        
        <input id="category" type="text" placeholder="Categoría del evento" required />
        <input id="maxCapacity" type="number" placeholder="Capacidad máxima" required min="1" />
        <input id="instructor" type="text" placeholder="Nombre del artista" required />

        <button type="submit" class="btn">Crear Curso</button>
      </form>
    </section>
  `;

  const $form = document.getElementById("courseForm");
  const $title = document.getElementById("title");
  const $description = document.getElementById("description");
  const $category = document.getElementById("category");
  const $maxCapacity = document.getElementById("maxCapacity");
  const $instructor = document.getElementById("instructor");

  // Evento de envío (submit)
  $form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validations: capacity > 0
    if (Number($maxCapacity.value) <= 0) {
      alert("La capacidad debe ser mayor a cero.");
      return;
    }

    // Unrepeated title
    const courseRes = await fetch("http://localhost:3000/events");
    const courses = await courseRes.json();
    const exists = courses.some(
      (c) => c.title.toLowerCase() === $title.value.toLowerCase()
    );
    if (exists) {
      alert("Ya existe un curso con ese título.");
      return;
    }

    // Structure of the new event
    const newEvent = {
      title: $title.value,
      description: $description.value,
      category: $category.value,
      maxCapacity: Number($maxCapacity.value),
      instructor: $instructor.value,
      visitors: [], // inicia vacío
    };

    try {
      // Sending to the database
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      // Success or error handling
      if (!res.ok) {
        throw new Error("No se pudo crear el curso");
      }

      alert("Curso creado correctamente");
      $form.reset();
    } catch (error) {
      console.error("Error al crear curso:", error);
      alert("Error al crear el curso");
    }
  });
}
