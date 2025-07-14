export function error(container) {
  container.innerHTML = `
    <section class="center">
    <h1>Pagina no encontrada</h1>
    <p>Lo sentimos, la página que buscas no existe o fue movida.</p>
    <a href="/">Volver al inicio</a>
  </section>
    
    `;
}
