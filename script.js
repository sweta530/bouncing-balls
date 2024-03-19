const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];

let mouse = {
    x: 0,
    y: 0
};

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createBall() {
    const radius = getRandom(10, 30);
    const x = getRandom(radius, canvas.width - radius);
    const y = getRandom(radius, canvas.height - radius);
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;
    const color = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
    balls.push({ x, y, dx, dy, radius, color, resized: false });
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function updateBall(ball) {
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        drawBall(ball);
        updateBall(ball);
    });
}

for (let i = 0; i < 50; i++) {
    createBall();
}

animate();

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    balls.forEach(ball => {
        const distance = Math.sqrt((mouse.x - ball.x) ** 2 + (mouse.y - ball.y) ** 2);
        if (distance < ball.radius && !ball.resized) {
            ball.radius += 10; 
            ball.resized = true; 
        } else if (distance >= ball.radius && ball.resized) {
            ball.radius -= 10; 
            ball.resized = false; 
            if (ball.radius < 10) {
                ball.radius = 10; 
            }
        }
    });
});

setInterval(() => {
    balls.shift();
    createBall();
}, 1000);