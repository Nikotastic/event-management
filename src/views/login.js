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

 
}
