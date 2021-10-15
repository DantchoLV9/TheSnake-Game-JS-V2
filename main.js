const upButton = document.querySelector(".up-button");
const rightButton = document.querySelector(".right-button");
const downButton = document.querySelector(".down-button");
const leftButton = document.querySelector(".left-button");

upButton.addEventListener("click", (e) => {
	e.code = "ArrowUp";
	processUserInput(e);
});

rightButton.addEventListener("click", (e) => {
	e.code = "ArrowRight";
	processUserInput(e);
});

downButton.addEventListener("click", (e) => {
	e.code = "ArrowDown";
	processUserInput(e);
});

leftButton.addEventListener("click", (e) => {
	e.code = "ArrowLeft";
	processUserInput(e);
});

function updateScore() {
	scoreSpan.innerHTML = score;
}
