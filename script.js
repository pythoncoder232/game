const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 380,
    y: 500,
    width: 40,
    height: 40,
    color: 'yellow',
    sweatY: 10
};

let waterDroplet = {
    x: Math.floor(Math.random() * (canvas.width - 20)),
    y: 0,
    radius: 10,
    color: 'blue',
    speed: 2
};

let score = 0;

function drawPlayer() {
    // Draw the player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw the player's face
    ctx.fillStyle = 'black';
    // Eyes
    ctx.fillRect(player.x + 10, player.y + 10, 5, 5);
    ctx.fillRect(player.x + 25, player.y + 10, 5, 5);
    // Mouth
    ctx.fillRect(player.x + 15, player.y + 25, 10, 5);
    
    // Draw the sweat
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x + 5, player.y + player.sweatY, 5, 10);
    ctx.fillRect(player.x + 30, player.y + player.sweatY, 5, 10);

    // Update sweat position
    player.sweatY += 1;
    if (player.sweatY > 30) player.sweatY = 10;
}

function drawWaterDroplet() {
    ctx.fillStyle = waterDroplet.color;
    ctx.beginPath();
    ctx.arc(waterDroplet.x, waterDroplet.y, waterDroplet.radius, 0, Math.PI * 2);
    ctx.fill();
}

function updateWaterDroplet() {
    waterDroplet.y += waterDroplet.speed;
    if (waterDroplet.y > canvas.height) {
        resetWaterDroplet();
    }
}

function resetWaterDroplet() {
    waterDroplet.x = Math.floor(Math.random() * (canvas.width - 20));
    waterDroplet.y = 0;
    waterDroplet.speed += 0.2;
    score++;
    document.getElementById('score').innerText = `Score: ${score}`;
}

function checkCollision() {
    let dx = player.x + player.width / 2 - waterDroplet.x;
    let dy = player.y + player.height / 2 - waterDroplet.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.width / 2 + waterDroplet.radius) {
        resetWaterDroplet();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawPlayer();
    drawWaterDroplet();
    updateWaterDroplet();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= 20;
    } else if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += 20;
    }
});

gameLoop();