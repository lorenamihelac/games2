const gameArea = document.getElementById('game-area');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const message = document.getElementById('message');
const soundCorrect = document.getElementById('sound-correct');
const soundWrong = document.getElementById('sound-wrong');

let circles = [];
let currentCircle = 0;
let score = 0;

// ustvari 10 krogov
for (let i = 0; i < 10; i++) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.top = `${i * 60 + 20}px`;
  gameArea.appendChild(circle);
  circles.push(circle);
}

// postavi žogo na prvi krog
function resetGame() {
  currentCircle = 0;
  score = 0;
  scoreDisplay.textContent = `Točke: ${score}`;
  message.textContent = '';
  moveBallToCurrentCircle();
}

function moveBallToCurrentCircle() {
  const circle = circles[currentCircle];
  ball.style.top = circle.style.top;
}

// obdelava tipk
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (currentCircle < circles.length - 1) {
      currentCircle++;
      score += 2;
      scoreDisplay.textContent = `Točke: ${score}`;
      soundCorrect.play();
      moveBallToCurrentCircle();
      if (currentCircle === circles.length - 1) {
        message.textContent = 'Zmagali ste! 🏆 20 točk!';
      }
    }
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    soundWrong.play();
    message.textContent = 'Žoga je padla! Začetek znova!';
    setTimeout(resetGame, 1000);
  }
});

resetGame();
