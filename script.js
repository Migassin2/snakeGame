const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const speedEl = document.getElementById('speed');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let velocity = { x: 0, y: 0 };
let food = { x: 15, y: 10 };
let score = 0;
let speed = 8;

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  velocity = { x: 0, y: 0 };
  food = { x: 15, y: 10 };
  score = 0;
  speed = 8;
  updateInfo();
}

function updateInfo() {
  scoreEl.textContent = `Score: ${score}`;
  speedEl.textContent = `Speed: ${speed}`;
}

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function draw() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  ctx.fillStyle = '#58d68d';
  snake.forEach((segment, index) => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    if (index === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(segment.x * gridSize + 4, segment.y * gridSize + 4, gridSize - 8, gridSize - 8);
      ctx.fillStyle = '#58d68d';
    }
  });
}

function moveSnake() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    resetGame();
    return;
  }

  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    resetGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    speed = Math.min(16, speed + 1);
    food = getRandomPosition();
    updateInfo();
  } else {
    snake.pop();
  }
}

function gameLoop() {
  moveSnake();
  draw();
  setTimeout(gameLoop, 1000 / speed);
}

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (velocity.y === 0) velocity = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (velocity.y === 0) velocity = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (velocity.x === 0) velocity = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (velocity.x === 0) velocity = { x: 1, y: 0 };
      break;
  }
});

resetGame();
gameLoop();
