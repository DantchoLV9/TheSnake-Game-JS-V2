const gameCanvas = document.querySelector("#game-canvas");
const scoreSpan = document.querySelector("#score-span");
const ctx = gameCanvas.getContext("2d");
const gridSize = 30;
const minSpeed = 300;
const maxSpeed = 125;
const scorePerFood = 100;
const speedLimitScore = 3000;
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
let score = 0;
let timer = 300;
let inputLocked = false;

document.addEventListener("keydown", (e) => {
	processUserInput(e);
});

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

function processUserInput(e) {
	if (!inputLocked) {
		if (e.code === "KeyW" || e.code === "ArrowUp") {
			if (direction !== 2) {
				direction = 0;
				inputLocked = true;
			}
		}
		if (e.code === "KeyD" || e.code === "ArrowRight") {
			if (direction !== 3) {
				direction = 1;
				inputLocked = true;
			}
		}
		if (e.code === "KeyS" || e.code === "ArrowDown") {
			if (direction !== 0) {
				direction = 2;
				inputLocked = true;
			}
		}
		if (e.code === "KeyA" || e.code === "ArrowLeft") {
			if (direction !== 1) {
				direction = 3;
				inputLocked = true;
			}
		}
	}
}

function render() {
	if (document.hasFocus() && alive) {
		generateFood();
		moveSnake();
		draw();
		inputLocked = false;
	}
	updateScore();
	setTimeout(render, timer);
}

setUpCanvas();
setUpGrid();
draw();
render();
