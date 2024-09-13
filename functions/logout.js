import { loginForm } from "./login.js";

export function logout(mainContainer) {
  if (mainContainer) {
    console.log("Removing mainContainer");
    mainContainer.remove();
  } else {
    console.log("MainContainer not found in DOM");
  }
  loginForm();
}
