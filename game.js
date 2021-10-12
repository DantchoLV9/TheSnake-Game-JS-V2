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
}

function moveSnake() {
	let prevHeadX;
	let prevHeadY;
	let prevBodyX = [];
	let prevBodyY = [];
	let movementPerformed = false;
	console.log(movementPerformed);
	gridData.forEach((row, xi) => {
		row.forEach((tile, yi) => {
			if (tile === 3 && !movementPerformed) {
				if (direction === 0) {
					console.log("UP");
					prevHeadX = xi;
					prevHeadY = yi;
					gridData[xi][yi] = 0;
					gridData[xi][yi - 1] = 3;
				}
				if (direction === 1) {
					console.log("RIGHT");
					prevHeadX = xi;
					prevHeadY = yi;
					gridData[xi][yi] = 0;
					gridData[xi + 1][yi] = 3;
				}
				if (direction === 2) {
					console.log("DOWN");
					prevHeadX = xi;
					prevHeadY = yi;
					gridData[xi][yi] = 0;
					gridData[xi][yi + 1] = 3;
				}
				if (direction === 3) {
					console.log("LEFT");
					prevHeadX = xi;
					prevHeadY = yi;
					gridData[xi][yi] = 0;
					gridData[xi - 1][yi] = 3;
				}
				movementPerformed = true;
			}
			if (parseInt(tile.toString().charAt(0)) === 4 && !movementPerformed) {
				if (tile === 40) {
					gridData[xi][yi] = 0;
					gridData[prevHeadX][prevHeadY] = 40;
					prevBodyX[0] = xi;
					prevBodyY[0] = yi;
				} else {
					gridData[xi][yi] = 0;
					gridData[prevBodyX[parseInt(tile.toString().substring(1)) - 1]][
						prevBodyY[parseInt(tile.toString().substring(1)) - 1]
					] = parseInt(`4${parseInt(tile.toString().substring(1))}`);
					prevBodyX[parseInt(tile.toString().substring(1))] = xi;
					prevBodyY[parseInt(tile.toString().substring(1))] = yi;
				}
			}
		});
		draw();
	});
	//console.log(prevBodyX, prevBodyY);
}

setUpCanvas();
setUpGrid();
setUpSnake();
draw();
