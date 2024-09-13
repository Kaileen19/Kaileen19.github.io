export function addLevel(level, container) {
    let lvl = document.createElement('p');
    lvl.innerHTML = `Level: ${level}`;
    container.appendChild(lvl);
}
