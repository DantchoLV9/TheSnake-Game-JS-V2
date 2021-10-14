const gameCanvas = document.querySelector("#game-canvas");
const ctx = gameCanvas.getContext("2d");
const gridSize = 30;
const tileTypes = [
	{
		// Empty Tile
		id: 0,
		color: "#fff",
	},
	{
		// Border Tile
		id: 1,
		color: "#000",
	},
	{
		// Food Tile
		id: 2,
		color: "#bb0",
	},
	{
		// Head Tile
		id: 3,
		color: "#b00",
	},
	{
		// Body Tile
		id: 4,
		color: "#f00",
	},
];
let tileSize;
let gridData = [];
// 0 = Up, 1 = Right, 2 = Down, 3 = Left
let direction = 0;
let foodExists = false;
let gameTimer;
let alive = true;
let shouldGrow = false;

function setUpGrid() {
	for (let i = 0; i < gridSize; i++) {
		gridData[i] = [];
		for (let j = 0; j < gridSize; j++) {
			gridData[i][j] = 0;
		}
	}
	setUpGridBorders();
	setUpSnake();
	generateFood();
}

document.addEventListener("keydown", (e) => {
	if (e.code === "KeyW" || e.code === "ArrowUp") {
		if (direction !== 2) {
			direction = 0;
		}
	}
	if (e.code === "KeyD" || e.code === "ArrowRight") {
		if (direction !== 3) {
			direction = 1;
		}
	}
	if (e.code === "KeyS" || e.code === "ArrowDown") {
		if (direction !== 0) {
			direction = 2;
		}
	}
	if (e.code === "KeyA" || e.code === "ArrowLeft") {
		if (direction !== 1) {
			direction = 3;
		}
	}
});

gameTimer = window.setInterval(() => {
	if (document.hasFocus() && alive) {
		generateFood();
		moveSnake();
		draw();
	}
}, 1000);

setUpCanvas();
setUpGrid();
draw();
