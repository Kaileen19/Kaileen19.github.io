export function addExercises(exercises, container) {
    container.innerHTML = '';

    const viewportWidth = window.innerWidth * 0.9; 
    const viewportHeight = window.innerHeight * 0.6; 

    const scrollWrapper = document.createElement('div');
    scrollWrapper.style.overflowX = 'auto'; 
    scrollWrapper.style.width = `${viewportWidth}px`;
    scrollWrapper.style.height = `${viewportHeight}px`;

    scrollWrapper.style.backgroundColor = '#d8aaad'; 
    scrollWrapper.style.border = '2px solid #ccc';
    scrollWrapper.style.padding = '10px'; 
    scrollWrapper.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; 

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");

    const style = document.createElementNS(svgNS, "style");
    style.textContent = `
        .bar {
            cursor: pointer;
        }
        .bar:hover ~ .name-label {
            visibility: visible;
        }
        .name-label {
            visibility: hidden;
            cursor: pointer;
            transition: fill 0.3s ease;
        }
        .name-label:hover {
            fill: white; /* Change to your preferred hover color */
        }
    `;
    svg.appendChild(style);

    const barWidth = 40;
    const barSpacing = 60;
    const xOffset = 40;
    const yOffset = 20;
    const nameLabelOffset = 15; 
    const labelHeight = 20; 
    const totalBarsWidth = exercises.length * (barWidth + barSpacing) + xOffset;
    const svgWidth = Math.max(totalBarsWidth, viewportWidth); 

    const maxBarHeight = viewportHeight * 0.6; 
    const svgHeight = maxBarHeight + yOffset + labelHeight + nameLabelOffset; // Total height accounting for bars, labels, and offset

    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

    const maxXP = Math.max(...exercises.map(e => e.amount));

    exercises.forEach((exercise, index) => {
        const barHeight = (exercise.amount / maxXP) * maxBarHeight;

        const group = document.createElementNS(svgNS, "g");

        const bar = document.createElementNS(svgNS, "rect");
        bar.setAttribute("x", xOffset + index * (barWidth + barSpacing));
        bar.setAttribute("y", svgHeight - yOffset - barHeight - labelHeight); 
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "#c2999b");
        bar.setAttribute("stroke", "#6c5556");
        bar.setAttribute("class", "bar"); 
        group.appendChild(bar);

        const xpLabel = document.createElementNS(svgNS, "text");
        xpLabel.setAttribute("x", xOffset + index * (barWidth + barSpacing) + barWidth / 2);
        xpLabel.setAttribute("y", svgHeight - yOffset - barHeight - labelHeight - 5);
        xpLabel.setAttribute("text-anchor", "middle");
        xpLabel.setAttribute("fill", "#6c5556");
        xpLabel.textContent = `${exercise.amount} XP`;
        group.appendChild(xpLabel);

        const nameLabel = document.createElementNS(svgNS, "text");
        nameLabel.setAttribute("x", xOffset + index * (barWidth + barSpacing) + barWidth / 2);
        nameLabel.setAttribute("y", svgHeight - yOffset + nameLabelOffset);
        nameLabel.setAttribute("text-anchor", "middle");
        nameLabel.setAttribute("fill", "#6c5556");
        nameLabel.setAttribute("class", "name-label");
        nameLabel.textContent = exercise.object.name;
        group.appendChild(nameLabel);

        svg.appendChild(group);
    });

    scrollWrapper.appendChild(svg);

    container.appendChild(scrollWrapper);
}
