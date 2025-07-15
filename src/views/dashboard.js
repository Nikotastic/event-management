// Dashboard main
export function dashboard(container) {
  container.innerHTML = `
    <section class="landing">
      <div class="landing-content">
        <h1>Plataforma de eventos</h1>
        <p>Hay varios eventos relacionados con programación y tecnología que podrías encontrar interesantes</p>
        <div class="landing-buttons">
          <a href="#/login" class="btn primary">Iniciar Sesión</a>
          <a href="#/register" class="btn secondary">Registrarse</a>
        </div>
      </div>
    </section>
  `;
}
