import { loginContainer } from "./login.js";

export function removeLoginForm() {
  if (loginContainer) {
    console.log('Removing login container');
    loginContainer.remove(); 
  } else {
    console.log('loginContainer not found in DOM');
  }
}

let mainDiv = document.createElement('div')
    mainDiv.id= 'mainDiv'

    

