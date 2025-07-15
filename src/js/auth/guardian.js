// Function that protects routes according to the expected role
export async function guardian(expectedRole) {
  
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("No has iniciado sesión");
    location.hash = "/login";
    return false;
  }

  try {
    // Search for role in the database and validate it
    const res = await fetch(`http://localhost:3000/roles?id=${user.rolId}`);
    const roles = await res.json();

    if (roles.length === 0) {
      alert("Rol no encontrado");
      location.href = "/not-found";
      return false;
    }

    // Check if the role name matches the expected one, if not, access is blocked and sent to not-found
    const rolName = roles[0].rol;

    if (rolName !== expectedRole) {
      alert("No tienes permiso para acceder a esta sección");
      location.href = "/not-found";
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error en guardian:", error);
    location.href = "/not-found";
    return false;
  }
}
