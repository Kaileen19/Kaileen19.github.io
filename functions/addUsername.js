export function addUsername(username, container) {
    let user = document.createElement('p');
    user.innerHTML = `Username: ${username}`;
    container.appendChild(user);
}
