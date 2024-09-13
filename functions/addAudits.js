export function addAudits(audits, xp, container) {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const width = 400;  
    const height = 220;  // Increased height to accommodate ratio label
    const barHeight = 40; 
    const gap = 20;
    
    const svg = document.createElementNS(svgNamespace, 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    container.appendChild(svg);
    
    const totalTransactions = audits.incoming + audits.outgoing;
    const incomingRatio = totalTransactions ? (audits.incoming / totalTransactions) * 100 : 0;
    const outgoingRatio = totalTransactions ? (audits.outgoing / totalTransactions) * 100 : 0;

    const incomingXP = xp * (incomingRatio / 100);
    const outgoingXP = xp * (outgoingRatio / 100);
    
    const maxValue = Math.max(audits.incoming, audits.outgoing);

    const bytesToMB = 1_000_000; // 1 MB = 1,048,576 bytes
    const incomingMB = audits.incoming / bytesToMB;
    const outgoingMB = audits.outgoing / bytesToMB;

    let ratio = 0;
    if (audits.outgoing !== 0 && audits.incoming !== 0) {
        ratio = audits.incoming > audits.outgoing ? 
                audits.incoming / audits.outgoing : 
                audits.outgoing / audits.incoming;
    } else if (audits.outgoing === 0) {
        ratio = audits.incoming; // Handle case where outgoing is 0
    } else if (audits.incoming === 0) {
        ratio = audits.outgoing; // Handle case where incoming is 0
    }

    const createBar = (y, value, color) => {
        const widthScale = width - 40; 
        const barWidth = (value / maxValue) * widthScale;
        const x = 20; 
        const rect = document.createElementNS(svgNamespace, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barHeight);
        rect.setAttribute('fill', color);
        rect.setAttribute('stroke', '#795f5f');
        svg.appendChild(rect);
    };
    
    const startY = 20;
    const barSpacing = barHeight + gap;
    createBar(startY, audits.incoming, '#c2999b');  // Incoming transactions bar
    createBar(startY + barSpacing, audits.outgoing, '#c2999b');  // Outgoing transactions bar
    
    const addLabel = (x, y, text) => {
        const label = document.createElementNS(svgNamespace, 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('font-size', '14');
        label.setAttribute('fill', 'black');
        label.textContent = text;
        svg.appendChild(label);
    };
    
    addLabel(10, startY + barHeight / 2, `Audits made`);
    addLabel(10, startY + barSpacing + barHeight / 2, `Audits received`);
    
    const addTotalLabel = (x, y, value) => {
        const label = document.createElementNS(svgNamespace, 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('font-size', '14');
        label.setAttribute('fill', 'black');
        label.textContent = value;
        svg.appendChild(label);
    };
    
    // Display audit values as MB and XP
    addTotalLabel(350, startY + barHeight / 2, `${incomingMB.toFixed(2)} MB (${incomingXP.toFixed(2)} XP)`);
    addTotalLabel(350, startY + barSpacing + barHeight / 2, `${outgoingMB.toFixed(2)} MB (${outgoingXP.toFixed(2)} XP)`);

    // Display the ratio between incoming and outgoing audits
    addTotalLabel(20, height - 10, `Audit Ratio: ${ratio.toFixed(1)}`);
}
