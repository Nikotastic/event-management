export function login(container) {
  container.innerHTML = `
    <section class="login-container">
      <div class="login-card">
        <h2> Iniciar Sesión</h2>
        <p>Bienvenido a la plataforma de eventos</p>
        <form id="loginForm">
          <input id="email" type="email" placeholder="Correo electrónico" required />
          <input id="password" type="password" placeholder="Contraseña" required />
          <button type="submit" class="btn">Ingresar</button>
        </form>
        <p class="switch">¿No tienes cuenta? <a href="#/register">Regístrate aquí</a></p>
      </div>
    </section>
  `;

  // Capture form elements and send it
  const $form = document.getElementById("loginForm");
  const $email = document.getElementById("email");
  const $password = document.getElementById("password");

  $form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await loginUser();
  });

  // Main function of login
  async function loginUser() {
    try {
      const res = await fetch(
        `http://localhost:3000/users?email=${$email.value}`
      );
      const users = await res.json();

      if (users.length === 0) {
        alert("Correo no registrado, por favor regístrate.");
        return;
      }

      const user = users[0];

      if (user.password !== $password.value) {
        alert("Contraseña incorrecta");
        return;
      }

      // Search for user role
      console.log("ROL ID:", user.rolId);
      const roleRes = await fetch(
        `http://localhost:3000/roles?id=${user.rolId}`
      );
      const roles = await roleRes.json();
      console.log("Roles encontrados:", roles);

      if (roles.length === 0) {
        alert("Rol no encontrado para este usuario");
        return;
      }

      const role = roles[0].rol;

      // Save user to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect based on role
      if (role === "admin") {
        location.hash = "/admin";
      } else if (role === "visitor") {
        location.hash = "/visitors";
      } else {
        alert("Rol inválido");
        location.hash = "/login";
      }

      alert("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión. Intenta nuevamente.");
    }
  }
}
