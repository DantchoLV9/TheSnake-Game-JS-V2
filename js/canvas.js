function setUpCanvas() {
	tileSize = getTileSize(gameCanvas, gridSize);
	gameCanvas.height = gameCanvas.width;
}

function getTileSize(canvas, gridSize) {
	return canvas.width / gridSize;
}

function setUpGridBorders() {
	for (let i = 0; i < gridSize; i++) {
		gridData[i] = [];
		for (let j = 0; j < gridSize; j++) {
			if (i < 1 || i > gridSize - 2) {
				gridData[i][j] = 1;
			}
			if (j < 1 || j > gridSize - 2) {
				gridData[i][j] = 1;
			}
		}
	}
}

function draw() {
	gridData.forEach((row, xi) => {
		row.forEach((tile, yi) => {
			if (tile.toString().startsWith(4)) {
				ctx.fillStyle = tileTypes[tile.toString().charAt(0)].color;
			} else {
				ctx.fillStyle = tileTypes[tile].color;
			}
			ctx.fillRect(xi * tileSize, yi * tileSize, tileSize, tileSize);
		});
	});
}
