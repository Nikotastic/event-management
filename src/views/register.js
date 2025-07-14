export function register(container) {
  container.innerHTML = `
    <section class="register-container">
      <div class="register-card">
        <h2>Crear cuenta</h2>
        <p>Regístrate para acceder a los eventos</p>
        <form id="registerForm">
          <input id="name" type="text" placeholder="Nombre completo" required />
          <input id="email" type="email" placeholder="Correo electrónico" required />
          <input id="password" type="password" placeholder="Contraseña" required />
          <input id="confirmPass" type="password" placeholder="Confirmar contraseña" required />
          <button type="submit" class="btn">Registrarse</button>
        </form>
        <p class="switch">¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a></p>
      </div>
    </section>
  `;

  const $form = document.getElementById("registerForm");
  const $name = document.getElementById("name");
  const $email = document.getElementById("email");
  const $password = document.getElementById("password");
  const $confirmPass = document.getElementById("confirmPass");

  $form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleRegister();
  });

  async function handleRegister() {
    if ($password.value !== $confirmPass.value) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Aseguramos limpieza de datos y codificación
    const cleanEmail = encodeURIComponent($email.value.trim());

    // Verificamos si el correo ya está registrado
    const res = await fetch(`http://localhost:3000/users?email=${cleanEmail}`);
    const users = await res.json();

    if (users.length > 0) {
      alert("Este correo ya está registrado. Inicia sesión.");
      return;
    }

    // Crear el nuevo usuario con rol de estudiante por defecto (rolId: 2)
    const newUser = {
      name: $name.value.trim(),
      email: $email.value.trim(),
      password: $password.value,
      rolId: 2,
    };

    // Enviamos al backend (json-server)
    const postRes = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!postRes.ok) {
      alert("Error al registrar. Intenta de nuevo.");
      return;
    }

    // Guardamos en localStorage y redirigimos
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    alert("Registro exitoso");
    location.hash = "/visitors";
  }
}
