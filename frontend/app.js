let size;

// Sounds
const moveSound = new Audio("sounds/move.mp3");
const warningSound = new Audio("sounds/warn.mp3");
const deathSound = new Audio("sounds/death.mp3");
const winSound = new Audio("sounds/win.mp3");
const startSound = new Audio("sounds/start.mp3");

let currentSound = null;

function playSound(sound) {
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }
  currentSound = sound;
  currentSound.play().catch(() => {});
}

// Agent
let agentX = 0;
let agentY = 0;
let steps = 0;

// Start Game
function startGame() {
  size = parseInt(prompt("Enter grid size:", 4));

  agentX = 0;  
  agentY = 0;

  steps = 0;

  fetch("http://localhost:5000/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ size })
  });
  playSound(startSound);
  
  drawGrid();
  updateAgent();
  updateUI("None");
}

// Draw Grid
function drawGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  grid.style.gridTemplateColumns = `repeat(${size}, 60px)`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${i}-${j}`;
      grid.appendChild(cell);
    }
  }
}

// Arrow Keys
document.addEventListener("keydown", function(e) {

  let newX = agentX;
  let newY = agentY;

  if (e.key === "ArrowUp") newX--;
  if (e.key === "ArrowDown") newX++;
  if (e.key === "ArrowLeft") newY--;
  if (e.key === "ArrowRight") newY++;

  // boundary
  if (newX < 0 || newY < 0 || newX >= size || newY >= size) return;

  move(newX, newY);
});

// Move
function move(x, y) {

  fetch("http://localhost:5000/move", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ x, y })
  })
  .then(res => res.json())
  .then(data => {

    if (data.invalid) return;

    agentX = x;
    agentY = y;

    steps++;
    document.getElementById("steps").innerText = steps;

    playSound(moveSound);

    let cell = document.getElementById(`cell-${x}-${y}`);

    // Lose
    if (data.danger) {
      cell.className = "cell danger";
      cell.innerText = "💀";
      playSound(deathSound);

      setTimeout(() => {
        if (confirm("Game Over! Restart?")) startGame();
      }, 200);

      return;
    }

    // Win
    if (x === size - 1 && y === size - 1) {
      cell.className = "cell safe";
      cell.innerText = "💰";
      playSound(winSound);

      setTimeout(() => alert("You Win!"), 200);
      return;
    }

    let text = "";

    if (data.percepts.breeze || data.percepts.stench) {
      cell.className = "cell warning";
      
      if (data.percepts.breeze) text += "B ";
      if (data.percepts.stench) text += "S ";

      cell.innerText = text;
    } else {
      cell.className = "cell visited";
      cell.innerText = "";
    }

    updateUI(text || "None");
    updateAgent();

  });
}

// Agent display
function updateAgent() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerText = cell.innerText.replace("🤖", "");
  });

  let agentCell = document.getElementById(`cell-${agentX}-${agentY}`);
  agentCell.innerText += " 🤖";
}

// UI
function updateUI(text) {
  document.getElementById("percepts").innerText = text;
}