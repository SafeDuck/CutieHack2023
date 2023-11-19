var player1 = createPlayer(200, 230, "#F08080");
var player2 = createPlayer(100, 200, "#80F080");

var keys = {
    left: false,
    right: false,
    up: false,
    a: false,
    d: false,
    w: false,
    s: false,
};

var gravity = 0.6;
var friction = 0.7;
var jumpStrength = 10;
var numPlatforms = 10;
var platforms = [];

function createPlayer(x, y, color) {
    return {
        x: x,
        y: y,
        x_v: 0,
        y_v: 4.7,
        jump: false,
        height: 20,
        width: 20,
        color: color,
    };
}

function createPlatforms() {
    platforms.push({
        x: 100,
        y: 300,
        width: 110,
        height: 15,
    });

    platforms.push({
        x: 300,
        y: 400,
        width: 110,
        height: 15,
    });

    platforms.push({
        x: 500,
        y: 250,
        width: 110,
        height: 15,
    });

    platforms.push({
        x: 700,
        y: 350,
        width: 110,
        height: 15,
    });

    platforms.push({
        x: 900,
        y: 300,
        width: 110,
        height: 15,
    });
}


function renderCanvas() {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, 1000, 1000);
}

function renderPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - 20, player.y - 20, player.width, player.height);
}

function renderPlatforms() {
    ctx.fillStyle = "#45597E";
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function keyDown(e) {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
    if (e.key === "ArrowUp") keys.up = true;
    if (e.key === "a") keys.a = true;
    if (e.key === "d") keys.d = true;
    if (e.key === "w") keys.w = true;
    if (e.key === "s") keys.s = true;
}

function keyUp(e) {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
    if (e.key === "ArrowUp") keys.up = false;
    if (e.key === "a") keys.a = false;
    if (e.key === "d") keys.d = false;
    if (e.key === "w") keys.w = false;
    if (e.key === "s") keys.s = false;
}

function gameLoop() {
    updatePlayer(player1, keys.left, keys.right, keys.up);
    updatePlayer(player2, keys.a, keys.d, keys.w);
    renderCanvas();
    renderPlayer(player1);
    renderPlayer(player2);
    renderPlatforms();
}

function updatePlayer(player, leftKey, rightKey, upKey) {
    if (player.jump === false) {
        player.x_v *= friction;
    } else {
        player.y_v += gravity;
    }

    // Allow jumping only if player is on the ground
    if (upKey && !player.jump) {
        player.y_v = -jumpStrength;
        player.jump = true;
    }

    // Horizontal movement
    if (leftKey) {
        player.x_v = -2.5;
    }
    if (rightKey) {
        player.x_v = 2.5;
    }

    player.y += player.y_v;
    player.x += player.x_v;

    // Collision with platforms
    platforms.forEach(platform => {
        if (
            player.x > platform.x &&
            player.x < platform.x + platform.width + player.width &&
            player.y > platform.y &&
            player.y < platform.y + platform.height
        ) {
            player.jump = false;
            player.y = platform.y;
        }
    });
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 1000;
canvas.width = 1000;
createPlatforms();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
setInterval(gameLoop, 22);