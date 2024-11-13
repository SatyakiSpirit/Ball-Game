const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.querySelector('.game-container');
let score = 0;
let ballSpeed = 3;
let ballDirectionX = 1;
let ballDirectionY = 1;
let gameWidth = gameContainer.offsetWidth;
let gameHeight = gameContainer.offsetHeight;

// Paddle movement
window.addEventListener('mousemove', (e) => {
  let paddleX = e.clientX - gameContainer.getBoundingClientRect().left;
  if (paddleX > 0 && paddleX < gameWidth - paddle.offsetWidth) {
    paddle.style.left = `${paddleX}px`;
  }
});

// Ball movement
function moveBall() {
  let ballX = ball.offsetLeft + ballSpeed * ballDirectionX;
  let ballY = ball.offsetTop + ballSpeed * ballDirectionY;

  // Wall collision
  if (ballX <= 0 || ballX >= gameWidth - ball.offsetWidth) {
    ballDirectionX *= -1;
  }
  if (ballY <= 0) {
    ballDirectionY *= -1;
  }

  // Paddle collision
  if (
    ballY >= gameHeight - paddle.offsetHeight - ball.offsetHeight &&
    ballX >= paddle.offsetLeft &&
    ballX <= paddle.offsetLeft + paddle.offsetWidth
  ) {
    ballDirectionY *= -1;
    score++;
    scoreDisplay.textContent = score;
  }

  // Reset if ball misses paddle
  if (ballY > gameHeight) {
    alert(`Game Over! Final Score: ${score}`);
    resetGame();
  }

  // Move the ball
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

// Reset Game
function resetGame() {
  ball.style.left = '50%';
  ball.style.top = '0';
  score = 0;
  scoreDisplay.textContent = score;
  ballDirectionY = 1;
}

// Game loop
setInterval(moveBall, 20);
