const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let grid = [];
let size = 4;

// Create Grid
function createGrid(n) {
  grid = Array(n).fill().map(() =>
    Array(n).fill().map(() => ({
      pit: false,
      wumpus: false
    }))
  );

  // Place Wumpus
  let wx = Math.floor(Math.random() * n);
  let wy = Math.floor(Math.random() * n);
  grid[wx][wy].wumpus = true;

  // Place pits (reduced)
  for (let i = 0; i < Math.floor(n / 2); i++) {
    let px = Math.floor(Math.random() * n);
    let py = Math.floor(Math.random() * n);
    grid[px][py].pit = true;
  }

  // ✅ FORCE START SAFE
  grid[0][0].pit = false;
  grid[0][0].wumpus = false;

  // ✅ SAFE ZONE AROUND START (IMPORTANT)
  let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  dirs.forEach(([dx, dy]) => {
    let nx = 0 + dx;
    let ny = 0 + dy;

    if (grid[nx] && grid[nx][ny]) {
      grid[nx][ny].pit = false;
      grid[nx][ny].wumpus = false;
    }
  });
}

// Get percepts
function getPercepts(x, y) {
  let breeze = false;
  let stench = false;

  let dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  dirs.forEach(([dx, dy]) => {
    let nx = x + dx;
    let ny = y + dy;

    if (grid[nx] && grid[nx][ny]) {
      if (grid[nx][ny].pit) breeze = true;
      if (grid[nx][ny].wumpus) stench = true;
    }
  });

  return { breeze, stench };
}

// Start
app.post("/start", (req, res) => {
  size = req.body.size || 4;
  createGrid(size);

  res.send({ message: "Game Started" });
});

// Move
app.post("/move", (req, res) => {
  const { x, y } = req.body;

  if (x < 0 || y < 0 || x >= size || y >= size) {
    return res.send({ invalid: true });
  }

  const percepts = getPercepts(x, y);

  res.send({
    percepts,
    danger: grid[x][y].pit || grid[x][y].wumpus
  });
});

app.listen(5000, () => console.log("Server running on 5000"));