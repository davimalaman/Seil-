const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const character = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 50,
    color: '#00F'
};

const balls = [];

function drawCharacter() {
    ctx.fillStyle = character.color;
    ctx.fillRect(character.x - character.width / 2, character.y - character.height / 2, character.width, character.height);
}

function drawBalls() {
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function update() {
    // Update character position or any other game logic here

    // Update ball positions
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        ball.y += 5; // Adjust the speed of falling balls

        // Check collision with character
        if (
            ball.x + ball.radius > character.x - character.width / 2 &&
            ball.x - ball.radius < character.x + character.width / 2 &&
            ball.y + ball.radius > character.y - character.height / 2 &&
            ball.y - ball.radius < character.y + character.height / 2
        ) {
            // Handle collision (e.g., end the game or remove the ball)
            balls.splice(i, 1);
            i--;
        }

        // Remove balls that are out of the screen
        if (ball.y - ball.radius > canvas.height) {
            balls.splice(i, 1);
            i--;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCharacter();
    drawBalls();
    update();

    requestAnimationFrame(gameLoop);
}

function spawnBall() {
    const ball = {
        x: Math.random() * canvas.width,
        y: 0,
        radius: 20,
        color: '#F00'
    };
    balls.push(ball);
}

// Set up event listeners or controls for character movement if needed

setInterval(spawnBall, 1000); // Adjust the interval as needed
gameLoop();

// ... (existing code)

const leftButton = document.getElementById('move-left');
const rightButton = document.getElementById('move-right');

// Add event listeners for button clicks
leftButton.addEventListener('click', () => moveCharacter('left'));
rightButton.addEventListener('click', () => moveCharacter('right'));

function moveCharacter(direction) {
    const speed = 5; // Adjust the speed as needed

    if (direction === 'left') {
        character.x -= speed;
    } else if (direction === 'right') {
        character.x += speed;
    }

    // Ensure the character stays within the canvas boundaries
    if (character.x - character.width / 2 < 0) {
        character.x = character.width / 2;
    } else if (character.x + character.width / 2 > canvas.width) {
        character.x = canvas.width - character.width / 2;
    }
}

// ... (existing code)
