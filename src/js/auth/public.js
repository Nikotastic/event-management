// Redirects to your dashboard if the user is already logged in
export async function publicOnly() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // If someone is logged in, they shouldn't be seeing /login or /register.
  if (user) {
    try {
      const res = await fetch(`http://localhost:3000/roles?id=${user.rolId}`);
      const roles = await res.json();

      const role = roles[0]?.rol;

      // Role-based redirection
      if (role === "admin") {
        location.hash = "/admin";
      } else if (role === "visitor") {
        location.hash = "/visitors";
      } else {
        location.hash = "/";
      }
    } catch (error) {
      location.hash = "/";
    }
  }
}
