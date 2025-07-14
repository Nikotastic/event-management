import { dashboard } from "../views/dashboard";
import { login } from "../views/login";
import { register } from "../views/register";
import { publicOnly } from "./auth/public";
import { guardian } from "./auth/guardian";
import { error } from "../views/not-found";
import { visitors } from "../views/dashvisitors";
import { admin } from "../views/dashadmin";

export async function router() {
  const route = location.hash.slice(1);
  const app = document.getElementById("app");

  switch (route) {
    case "":
    case "/":
      dashboard(app);
      break;

    case "/login":
       await publicOnly();  //  prevents access if already logged in
      login(app);
      break;

    case "/register":
       await publicOnly();  //  prevents access if already logged in
      register(app);
      break;

     case "/admin":
      if (await guardian("admin")) admin(app); //  only admin can
      break;

    case "/visitors":
      if (await guardian("visitor")) visitors(app); //  only visitor can
      break; 

    default:
      error(app);
      break;
  }
}
