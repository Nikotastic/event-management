// Función que protege rutas según el rol esperado
export async function guardian(expectedRole) {
  // Recupera al usuario actual desde localStorage
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Si no hay usuario, redirige a login
  if (!user) {
    alert("No has iniciado sesión");
    location.hash = "/login";
    return false;
  }

  try {
    // Buscar rol en la base de datos
    const res = await fetch(`http://localhost:3000/roles?id=${user.rolId}`);
    const roles = await res.json();

    // Validación del rol
    if (roles.length === 0) {
      alert("Rol no encontrado");
      location.href = "/not-found";
      return false;
    }

    // Verifica si el nombre del rol (rolName) coincide con el esperado (expectedRole).
    const rolName = roles[0].rol;

    // Si no, se bloquea el acceso y lo manda a not-found
    if (rolName !== expectedRole) {
      alert("No tienes permiso para acceder a esta sección");
      location.href = "/not-found";
      return false;
    }

    return true; // Permiso concedido

    //  En caso de error
  } catch (error) {
    console.error("Error en guardian:", error);
    location.href = "/not-found";
    return false;
  }
}
