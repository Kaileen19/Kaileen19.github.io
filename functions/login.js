import { queryGraph } from "./query.js";

export let loginContainer = document.createElement('div')
loginContainer.id = "loginContainer"

export const loginDiv = `
<div class="login" >
<h1 style="color: white">Login</h1>
<div>
<input name="username" id="username" placeholder="username"
style="border:1px solid black;">
</div>
<div>
<input name="password" id="password" type="password" placeholder="password"
style="border:1px solid black;">
</div>
<br>
<div>
<button class="loginbutton" style="border: 1px black solid"> login</button>
</div>
</div>
`


export function loginForm(){
    
    console.log('made it to login form')

    loginContainer.innerHTML = loginDiv
    document.body.appendChild(loginContainer)

    
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundImage = 'url("./pictures/loginPicture.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';

    loginContainer.style.backgroundColor = '#d8aaad';
    loginContainer.style.padding = '10px';
    loginContainer.style.border =  'black solid 1px';
    loginContainer.style.borderRadius = '1px'


    document.body.appendChild(loginContainer)

    document.querySelector('.loginbutton').addEventListener('click', identifyUser)
    }


 //Identification
export function identifyUser(){

    console.log('made it to identifyuser ')

    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    const credentials = btoa(`${username}:${password}`);
 
     return fetch('https://01.kood.tech/api/auth/signin',{
         method:'POST',
         headers: {
          "Content-Type": "application/json",
          "Authorization" : `Basic ${credentials}`
       },
     })
     .then(response => {
        if(!response.ok){
            if(response.status === 403){
                alert('Invalid credentials. Please check your username and password.')
                throw new Error ("Invalid credentials. Please check your username and password.")
            }else{
                alert('An error occurred during logic!')
                throw newError ("An error occurred during logic!")
            }
        }
        return response.json();
     })
     .then(data => {
        if (data){
            const jwtToken = data;

            console.log('Login successful, JWT token', jwtToken)

            //removes the container
            import('./loggedin.js').then (module=> {
                module.removeLoginForm()
            });
            queryGraph(jwtToken)
            
        }else{
            console.log('Login failed', data)
            alert('Login failed.Please check you credentials')
        }
     })
     .catch(error => console.log(error))
 
  }

  window.identifyUser = identifyUser;
 
 