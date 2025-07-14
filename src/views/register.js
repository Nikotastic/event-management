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

  
}
