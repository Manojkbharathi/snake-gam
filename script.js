"use strict";
const gameBoard = document.getElementById("game-board");

const scoreVal = document.getElementById("score-value");
const newGame = document.getElementById("new-game");
//  get context is  use to get access to the canvas tags 2D drawing functions.
const context = gameBoard.getContext("2d");
const widthX = gameBoard.width;
const heightY = gameBoard.height;
const unit = 25;

let foodX;
let foodY;
let snake;
let xMove;
let yMove;
let score;
let start = false;
let active = true;
// adding event listener on keyboard
window.addEventListener("keydown", keyPress);
// new game button to reset the game
newGame.addEventListener("click", resetGame);

// functions
function startGame() {
  snake = [
    { x: unit * 3, y: 0 },
    { x: unit * 2, y: 0 },
    { x: unit, y: 0 },
    { x: 0, y: 0 },
  ];
  xMove = 25;
  yMove = 0;
  score = 0;
  scoreVal.innerText = score;

  context.fillRect(0, 0, widthX, heightY);
  createFood();
  displayFood();
  createSnake();
}

function clearBoard() {
  context.fillStyle = " rgb(115, 110, 173)";
  context.fillRect(0, 0, widthX, heightY);
}

function createFood() {
  foodX = Math.floor((Math.random() * widthX) / unit) * unit;
  foodY = Math.floor((Math.random() * heightY) / unit) * unit;
}

function displayFood() {
  context.fillStyle = " rgb(77, 236, 241)";
  context.fillRect(foodX, foodY, unit, unit);
}

function createSnake() {
  context.fillStyle = "red";
  context.strokeStyle = "";

  snake.forEach((part) => {
    context.fillRect(part.x, part.y, unit, unit);
    context.strokeRect(part.x, part.y, unit, unit);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + xMove, y: snake[0].y + yMove };
  snake.unshift(head);

  if (snake[0].x === foodX && snake[0].y === foodY) {
    score++;
    scoreVal.innerText = score;
    createFood();
  } else {
    snake.pop();
  }
}

function moveFunction() {
  if (active) {
    setTimeout(() => {
      clearBoard();
      displayFood();
      moveSnake();
      createSnake();
      moveFunction();
      gameOver();
    }, 200);
  } else {
    clearBoard();
    alert("Game over");
  }
}
function keyPress(event) {
  if (start != true) {
    start = true;
    moveFunction();
  }

  const left = 37;
  const up = 38;
  const right = 39;
  const down = 40;
  switch (true) {
    // if right key pressed restrict to move left so != is used

    case event.keyCode == left && xMove != unit:
      // to move left we want to change the x value to minus
      xMove = -unit;
      // only we to move the snake left side   no need to give y value
      yMove = 0;

      break;
    // if right key pressed restrict to move left so != is used
    case event.keyCode == right && xMove != -unit:
      xMove = unit;
      yMove = 0;
      break;
    // if right key pressed restrict to move left so != is used

    case event.keyCode == up && yMove != unit:
      xMove = 0;
      yMove = -unit;
      break;
    // if down key pressed restrict to move up so != is used

    case event.keyCode == down && yMove != -unit:
      xMove = 0;
      yMove = unit;
  }
}

function gameOver() {
  switch (true) {
    case snake[0].x < 0:
    case snake[0].x >= widthX:
    case snake[0].y < 0:
    case snake[0].y >= heightY:
      active = false;

      break;
  }
  context.fillStyle = "yellow";
}

function resetGame() {
  active = true;
  moveFunction();
  startGame();
  keyPress(event);
}
startGame();
