const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');

let isJumping = false;
let score = 0;
let gameInterval;
let scoreInterval;

const jumpSound = new Audio('jump.wav');
const dieSound = new Audio('die.wav');

function jump() {
  if (isJumping) return;
  isJumping = true;
  dino.style.bottom = '100px';
  jumpSound.play();

  setTimeout(() => {
    dino.style.bottom = '0';
    isJumping = false;
  }, 500);
}

function startGame() {
  gameOverDisplay.style.display = 'none';
  obstacle.style.animation = 'moveObstacle 2s linear infinite';
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;

  gameInterval = setInterval(() => {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      dinoRect.right > obstacleRect.left &&
      dinoRect.left < obstacleRect.right &&
      dinoRect.bottom > obstacleRect.top
    ) {
      endGame();
    }
  }, 10);

  scoreInterval = setInterval(() => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }, 100);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(scoreInterval);
  obstacle.style.animation = 'none';
  dieSound.play();
  gameOverDisplay.style.display = 'block';
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jump();
  }
});

startGame();
