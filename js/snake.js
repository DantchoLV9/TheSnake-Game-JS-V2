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
				prevHeadX = xi;
				prevHeadY = yi;
				switch (direction) {
					case 0:
						if (!checkForCollision(xi, yi - 1)) {
							newGridData[xi][yi] = 0;
							newGridData[xi][yi - 1] = 3;
						}
						break;
					case 1:
						if (!checkForCollision(xi + 1, yi)) {
							newGridData[xi][yi] = 0;
							newGridData[xi + 1][yi] = 3;
						}
						break;
					case 2:
						if (!checkForCollision(xi, yi + 1)) {
							newGridData[xi][yi] = 0;
							newGridData[xi][yi + 1] = 3;
						}
						break;
					case 3:
						if (!checkForCollision(xi - 1, yi)) {
							newGridData[xi][yi] = 0;
							newGridData[xi - 1][yi] = 3;
						}
						break;
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
	if (alive) {
		if (shouldGrow) {
			grow(newGridData, bodyParts);
			shouldGrow = false;
		}
		console.log(bodyParts);
		gridData = newGridData.map((item) => {
			return item.slice();
		});
	}
}

// Triggers an action depending on the type of collision
// Returns 0 - No collision, Food collision, 1 - Dead collision
function checkForCollision(posX, posY) {
	if (gridData[posX][posY] === undefined || gridData[posX][posY] === 0) {
		return 0;
	} else if (gridData[posX][posY] === 2) {
		eatFood();
		return 0;
	} else {
		die();
		return 1;
	}
}

function grow(newGridData, bodyParts) {
	newGridData[bodyParts[bodyParts.length - 1].x][
		bodyParts[bodyParts.length - 1].y
	] = parseInt(`4${bodyParts[bodyParts.length - 1].id + 1}`);
	
}

function die() {
	alive = false;
	clearInterval(gameTimer);
	alert("You died");
}
