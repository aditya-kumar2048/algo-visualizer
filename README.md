# 🌌 3D Algorithm Visualizer

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4A4A55?style=for-the-badge&logo=react&logoColor=white)

A stunning, premium, and highly interactive **3D Algorithm Visualizer** built with modern web technologies. This application takes data structures and algorithms out of the flat terminal and into a beautiful, explorable 3D space, making complex computer science concepts highly accessible and visually engaging.

---

## ✨ Core Features

### 🎮 Multi-Mode 3D Rendering Engine
The visualizer doesn't just show arrays; it dynamically hot-swaps between entirely different 3D coordinate systems based on the algorithm you choose:
- **1D Arrays**: Floating 3D bars that scale dynamically. Used for Sorting and Searching.
- **3D Recursion Trees**: A node-and-edge graph layout. As recursion dives deeper, branches grow downwards into 3D space, preventing node collisions using exponential coordinate scaling.
- **2D Matrices**: A chessboard-style flat grid of 3D blocks. Perfect for visualizing Dynamic Programming state tabulation.

### 💎 Premium Glassmorphism UI
- **Aesthetic**: Frosted glass panels overlay the 3D canvas, creating a state-of-the-art, modern aesthetic.
- **Auto-Hide Settings**: UI elements intelligently fade away when an algorithm is playing to give center stage to the 3D visualization.
- **Contextual Controls**: The control panel dynamically adapts to your selection (e.g., swapping a generic input for an "N" input when switching from Arrays to Recursion).

### 🖱️ Deep Interactivity
- **Camera Controls**: Orbit, pan, and zoom around the 3D objects in real-time while the algorithms run.
- **Draggable Elements**: Click and drag individual 3D bars in the array visualization.
- **Speed & Size Control**: Real-time sliders allow you to throttle execution speed from 10ms to 500ms per step, or change the dataset size on the fly.

---

## 🧠 Supported Algorithms & Visual Key

### 📊 Sorting Algorithms
*Visualize the "compare and swap" nature of sorting.*
- **Bubble Sort**, **Selection Sort**, **Insertion Sort**, **Merge Sort**, **Quick Sort**.
- 🟦 **Blue**: Default state.
- 🟨 **Yellow**: Currently being compared.
- 🟥 **Red**: Currently being swapped.
- 🟩 **Green**: Sorted and locked in place.

### 🔍 Searching Algorithms
*Visualize traversal and divide-and-conquer.*
- **Linear Search**: Scans element by element.
- **Binary Search**: Automatically pre-sorts the array, then visually halves the search space.
- 🟪 **Purple**: Target element successfully found!

### 🌳 Recursion
*Visualize the Call Stack and LIFO execution.*
- **Fibonacci Sequence**: 
  - Watch as a root node (`fib(n)`) spawns and branches out left and right.
  - White glowing lines connect parent nodes to child nodes.
  - When base cases are hit, nodes turn 🟩 **Green** and pass their computed values up the tree.

### ♟️ Dynamic Programming
*Visualize Tabulation and overlapping subproblems.*
- **Unique Paths**:
  - The scene turns into a 2D matrix.
  - 🟨 **Yellow** cells highlight the dependencies (the subproblems) needed to compute the current cell.
  - 🟦 **Blue** cell highlights the current cell being computed.
  - 🟩 **Green** cells denote a permanently solved subproblem.

---

## 🏗️ Technical Architecture & Deep Dive

This project utilizes a highly decoupled architecture designed for performance and scalability.

### 1. The Generator Engine (`src/algorithms/engine.js`)
Writing algorithm animations using React `useEffect` and `setTimeout` is notoriously difficult and bug-prone. Instead, this project uses **JavaScript Generators (`function*`)**. 
- Algorithms are written as pure logic that `yield` semantic state objects (e.g., `{ type: 'COMPARE', indices: [1, 2] }` or `{ type: 'CALL', frame: 'fib(3)' }`).
- The `engine.js` acts as an orchestrator. It consumes these yielded steps, translates them into UI state, and handles the timing delays based on the global speed setting. 

### 2. Global State Management (`src/store/useStore.js`)
Powered by **Zustand**, the state is managed globally and completely outside of the React component tree. This allows the Engine to modify state (`array`, `colors`, `recursionTree`, `grid`) instantly without waiting for React renders, ensuring high-performance 3D updates.

### 3. 3D Reactivity (`@react-spring/three`)
The 3D components (`Visualizer.jsx`, `TreeVisualizer.jsx`, `GridVisualizer.jsx`) subscribe to the Zustand store. Instead of snapping instantly to new positions or colors, they use `@react-spring/three` to fluidly interpolate between states. This is what gives the algorithms their smooth, buttery animations.

### 📂 Project Structure
```text
src/
├── algorithms/           # JS Generators containing pure algorithm logic
│   ├── engine.js         # The orchestration engine
│   ├── bubbleSort.js
│   ├── fibonacciRecursion.js
│   └── uniquePathsDP.js
├── components/
│   ├── 3D/               # Three.js Canvas and Meshes
│   │   ├── Scene.jsx
│   │   ├── ElementBar.jsx
│   │   ├── TreeVisualizer.jsx
│   │   └── GridVisualizer.jsx
│   └── UI/               # HTML/Tailwind Overlays (Glassmorphism)
│       ├── Settings.jsx
│       ├── Controls.jsx
│       └── SearchResultModal.jsx
├── store/
│   └── useStore.js       # Zustand global state
└── App.jsx               # Main layout wrapper
```

---

## 🛠️ Developer Guide: Adding a New Algorithm

Adding a new algorithm is incredibly straightforward thanks to the decoupled Generator architecture.

1. **Create the Generator:** Create a new file in `src/algorithms/` (e.g., `dijkstra.js`).
2. **Yield States:** Write the algorithm logic and `yield` standard types:
   ```javascript
   export function* customAlgorithm(array) {
     yield { type: 'COMPARE', indices: [0, 1] };
     yield { type: 'SWAP', indices: [0, 1], array: newArray };
     yield { type: 'DONE' };
   }
   ```
3. **Register it:** Import it into `engine.js` and add it to the `algorithms` dictionary.
4. **Update UI:** Add the name to the `<select>` dropdown in `Settings.jsx`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository and navigate into the project directory:
   ```bash
   cd algo-visualizer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## 🔮 Future Roadmap
- [ ] **Graph Algorithms**: Adding a 3D Node/Edge graph mode for Dijkstra's, A*, and BFS/DFS.
- [ ] **Data Structures**: Visualizing Linked Lists, Heaps, and Hash Maps.
- [ ] **Custom Geometries**: Allowing users to swap out standard boxes for spheres, pyramids, or custom imported 3D models.
- [ ] **Code Tracing**: A side panel showing the actual code snippet, highlighting the current line executing in sync with the 3D visualization.
