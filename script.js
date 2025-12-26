const display = document.getElementById("display");
let scale = 40;

/* CALCULATOR */
function append(value) {
  if (display.textContent === "0") display.textContent = "";
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = "0";
}

function calculate() {
  try {
    const result = math.evaluate(display.textContent);
    display.textContent = result;
  } catch {
    display.textContent = "Error";
  }
}

/* GRAPH */
function plotGraph() {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");
  const expr = document.getElementById("funcInput").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(ctx, canvas);

  if (!expr) return;

  ctx.strokeStyle = "#2d65ff";
  ctx.lineWidth = 2;
  ctx.beginPath();

  let first = true;
  for (let px = 0; px < canvas.width; px++) {
    const x = (px - canvas.width / 2) / scale;
    try {
      const y = math.evaluate(expr, { x });
      const py = canvas.height / 2 - y * scale;
      if (first) {
        ctx.moveTo(px, py);
        first = false;
      } else {
        ctx.lineTo(px, py);
      }
    } catch {}
  }
  ctx.stroke();
}

function drawGrid(ctx, canvas) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  for (let x = cx % scale; x < canvas.width; x += scale) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = cy % scale; y < canvas.height; y += scale) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#cbd5f5";
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(canvas.width, cy);
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, canvas.height);
  ctx.stroke();
}

function zoomIn() {
  scale += 10;
  plotGraph();
}

function zoomOut() {
  scale = Math.max(10, scale - 10);
  plotGraph();
}
function toggleRealGraph() {
  const button = event.currentTarget;
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");
  const expr = document.getElementById("funcInput").value;
  let isRealGraph = button.textContent.includes("Real Math");

  if (isRealGraph) {
    button.textContent = "Switch to Approximate Graph";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas);
    if (!expr) return;

    ctx.strokeStyle = "#2d65ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    let first = true;
    for (let px = 0; px < canvas.width; px++) {
      const x = (px - canvas.width / 2) / scale;
      try {
        const y = math.evaluate(expr, { x });
        if (typeof y !== 'number' || !isFinite(y)) continue;
        const py = canvas.height / 2 - y * scale;
        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }
      catch {}
    }
    button.textContent = "Switch to Real Math Graph";
    plotGraph();
  }
}

/* INITIALIZE */
document.getElementById("funcInput").addEventListener("input", plotGraph);
plotGraph();


/* ZOOM BUTTONS */
/* HTML MODIFICATION */
// Add the following HTML snippet inside the <div id="graphContainer"> in index.html
const zoomControls = document.createElement("div");
zoomControls.id = "zoomControls";
zoomControls.innerHTML = `<button onclick="zoomIn()">+</button> <button onclick="zoomOut()">-</button>
<button id="toggleGraphBtn" onclick="toggleRealGraph()">Switch to Real Math Graph</button>`;
document.getElementById("graphContainer").appendChild(zoomControls);

/* CSS MODIFICATION */
const style = document.createElement("style");
style.textContent = `
  #zoomControls {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
  }
  #zoomControls button {
    margin-bottom: 4px;
    padding: 4px;
    border-radius: 4px;
    background: #374151;
    border: 1px solid var(--border);
    color: var(--text);
    cursor: pointer;
  }
`; 
document.head.appendChild(style);
document.head.appendChild(style);
const netStatus = document.getElementById("netStatus");

function updateNetworkStatus() {
  if (navigator.onLine) {
    netStatus.textContent = "● Online";
    netStatus.classList.remove("offline");
    netStatus.classList.add("online");
  } else {
    netStatus.textContent = "● Offline";
    netStatus.classList.remove("online");
    netStatus.classList.add("offline");
  }
}

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

updateNetworkStatus();


/* END OF SCRIPT.JS */