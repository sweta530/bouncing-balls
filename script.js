const svg = document.getElementById('myCanvas');
const width = window.innerWidth;
const height = window.innerHeight;

svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

const balls = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createBall() {
    const radius = getRandom(15,30);
    const x = getRandom(radius, width - radius);
    const y = getRandom(radius, height - radius);
    const dx = (Math.random() - 0.5) * 8;
    const dy = (Math.random() - 0.5) * 5;
    const color = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;

    const ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ball.setAttribute("cx", x);
    ball.setAttribute("cy", y);
    ball.setAttribute("r", radius);
    ball.setAttribute("fill", color);
    ball.addEventListener('mouseover', function() {
        const currentRadius = parseFloat(ball.getAttribute('r'));
        ball.setAttribute('r', currentRadius + 15);
    });
    ball.addEventListener('mouseout', function() {
        const currentRadius = parseFloat(ball.getAttribute('r'));
        ball.setAttribute('r', currentRadius - 15);
    });
    svg.appendChild(ball);

    balls.push({ element: ball, dx, dy, radius });
}

function updateBall(ball) {
    const x = parseFloat(ball.element.getAttribute("cx"));
    const y = parseFloat(ball.element.getAttribute("cy"));
    const radius = parseFloat(ball.element.getAttribute("r"));
    let dx = ball.dx;
    let dy = ball.dy;

    if (x + dx > width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy > height - radius || y + dy < radius) {
        dy = -dy;
    }

    ball.element.setAttribute("cx", x + dx);
    ball.element.setAttribute("cy", y + dy);

    ball.dx = dx;
    ball.dy = dy;
}

function animate() {
    requestAnimationFrame(animate);
    balls.forEach(ball => {
        updateBall(ball);
    });
}

for (let i = 0; i < 50; i++) {
    createBall();
}

animate();

setInterval(() => {
    svg.removeChild(balls[0].element);
    balls.shift();
    createBall();
}, 1000);