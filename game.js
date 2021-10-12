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
		color: "#ff0",
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
let snakeSize = 3;
let snakeData = [];

function setUpGrid() {
	for (let i = 0; i < gridSize; i++) {
		gridData[i] = [];
		for (let j = 0; j < gridSize; j++) {
			gridData[i][j] = 0;
		}
	}
	setUpGridBorders();
	//console.log(gridData);
}

function setUpSnake() {
	let gridMiddle = Math.round(gridSize / 2);
	gridData[gridMiddle][gridMiddle] = 3;
	gridData[gridMiddle][gridMiddle + 1] = 40;
	gridData[gridMiddle][gridMiddle + 2] = 41;
	gridData[gridMiddle][gridMiddle + 3] = 42;
}

function moveSnake() {
	let newGridData = gridData.map((item) => {
		return item.slice();
	});
	let prevHeadX;
	let prevHeadY;
	let bodyParts = [];
	gridData.forEach((row, xi) => {
		row.forEach((tile, yi) => {
			if (tile === 3) {
				if (direction === 0) {
					console.log("UP");
					prevHeadX = xi;
					prevHeadY = yi;
					newGridData[xi][yi] = 0;
					newGridData[xi][yi - 1] = 3;
				}
				if (direction === 1) {
					console.log("RIGHT");
					prevHeadX = xi;
					prevHeadY = yi;
					newGridData[xi][yi] = 0;
					newGridData[xi + 1][yi] = 3;
				}
				if (direction === 2) {
					console.log("DOWN");
					prevHeadX = xi;
					prevHeadY = yi;
					newGridData[xi][yi] = 0;
					newGridData[xi][yi + 1] = 3;
				}
				if (direction === 3) {
					console.log("LEFT");
					prevHeadX = xi;
					prevHeadY = yi;
					newGridData[xi][yi] = 0;
					newGridData[xi - 1][yi] = 3;
				}
			}
			if (parseInt(tile.toString().charAt(0)) === 4) {
				bodyParts[parseInt(tile.toString().substring(1))] = {
					id: parseInt(tile.toString().substring(1)),
					x: xi,
					y: yi,
				};
				newGridData[xi][yi] = 0;
			}
		});
	});
	for (let i = 0; i < bodyParts.length; i++) {
		if (i === 0) {
			newGridData[prevHeadX][prevHeadY] = parseInt(`4${bodyParts[i].id}`);
		} else {
			newGridData[bodyParts[i - 1].x][bodyParts[i - 1].y] = parseInt(
				`4${bodyParts[i].id}`
			);
		}
	}
	gridData = newGridData.map((item) => {
		return item.slice();
	});
	draw();
}

setUpCanvas();
setUpGrid();
setUpSnake();
draw();
