function generateFood() {
	while (!foodExists) {
		let randX = Math.floor(Math.random() * gridSize);
		let randY = Math.floor(Math.random() * gridSize);
		if (gridData[randX][randY] === undefined) {
			gridData[randX][randY] = 2;
			foodExists = true;
		}
	}
}

function eatFood() {
	foodExists = false;
	shouldGrow = true;
}
