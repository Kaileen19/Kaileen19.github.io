export function xpChart(xp, container) {
    container.innerHTML = '';
    let xpDiv = document.createElement('div');
    xpDiv.innerHTML = `XP: ${xp}`;
    container.appendChild(xpDiv);
}
