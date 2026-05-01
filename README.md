# 🧠 Dynamic-Wumpus-Logic-Agent (Web-Based AI Game)

## 📌 Project Overview
This project is a web-based implementation of the classic **Wumpus World problem** from Artificial Intelligence. It simulates a percept-based agent navigating a grid environment while avoiding hazards.

The game combines AI concepts with an interactive UI, movement controls, and sound feedback.

---

## 🎯 Features
- Grid-based environment (dynamic size)
- Agent movement using arrow keys
- Percept system:
  - Breeze → Pit nearby
  - Stench → Wumpus nearby
- Color-coded cells for better visualization
- Sound effects:
  - Movement
  - Warning
  - Death
  - Win
- Step counter and percept display
- Win and lose conditions

---

## 🕹️ How to Play
1. Click **Start Game**
2. Enter grid size (e.g., 4 or 5)
3. Use arrow keys to move:
   - ↑ Up
   - ↓ Down
   - ← Left
   - → Right
4. Avoid dangerous cells
5. Reach the goal (bottom-right cell) to win

---

## 🎨 Visual Indicators
| Symbol / Color | Meaning |
|---------------|--------|
| 🤖 | Agent |
| Blue | Visited safe cell |
| Orange | Warning (Breeze / Stench) |
| Red | Danger (Pit / Wumpus) |
| 💀 | Death |
| 💰 | Goal |

---

## 🔊 Sound System
The game includes sound feedback for different events:
- Start sound
- Movement sound
- Death sound
- Victory sound

Only one sound plays at a time using a sound override mechanism.

---

## ⚙️ Technologies Used
### Frontend:
- HTML
- CSS
- JavaScript

### Backend:
- Node.js
- Express.js

---

## 🧠 AI Concept
This project demonstrates a **percept-based agent** where:
- The agent uses environmental cues (Breeze, Stench)
- Makes decisions based on partial information

---

## 📂 Project Structure
```
wumpus-world-agent/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── sounds/
│
└── README.md
```

---

## 🚀 How to Run Locally

### Backend:
```
cd backend
npm install
node server.js
```

### Frontend:
Open `index.html` in browser

---

## 📌 Future Improvements
- Intelligent auto-agent
- Fog of war (hidden map)
- Score system
- Better UI animations

---

## 👨‍💻 Author
Muhammad Qasim 
BS Computer Science
FAST - NUCES
