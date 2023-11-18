var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    jump: true,
    height: 20,
    width: 20
};

var keys = {
    right: false,
    left: false,
    up: false,
};

var gravity = 0.6;
var friction = 0.7;
var num = 2;
var platforms = [];

function renderCanvas() {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, 270, 270);
}

function renderPlayer() {
    ctx.fillStyle = "#F08080";
    ctx.fillRect(player.x - 20, player.y - 20, player.width, player.height);
}

function createPlatforms() {
    for (let i = 0; i < num; i++) {
        platforms.push({
            x: 100 * i,
            y: 200 + 30 * i,
            width: 110,
            height: 15
        });
    }
}

function renderPlatforms() {
    ctx.fillStyle = "#45597E";
    ctx.fillRect(platforms[0].x, platforms[0].y, platforms[0].width, platforms[0].height);
    ctx.fillRect(platforms[1].x, platforms[1].y, platforms[1].width, platforms[1].height);
}

function keyDown(e) {
    if (e.keyCode == 37) {
        keys.left = true;
    }
    if (e.keyCode == 38) {
        if (player.jump == false) {
            player.y_v = -10;
        }
    }
    if (e.keyCode == 39) {
        keys.right = true;
    }
}

function keyUp(e) {
    if (e.keyCode == 37) {
        keys.left = false;
    }
    if (e.keyCode == 38) {
        if (player.y_v < -2) {
            player.y_v = -3;
        }
    }
    if (e.keyCode == 39) {
        keys.right = false;
    }
}

function gameLoop() {
    if (player.jump == false) {
        player.x_v *= friction;
    } else {
        player.y_v += gravity;
    }
    player.jump = true;

    if (keys.left) {
        player.x_v = -2.5;
    }
    if (keys.right) {
        player.x_v = 2.5;
    }

    player.y += player.y_v;
    player.x += player.x_v;

    let i = -1;
    if (
        platforms[0].x < player.x &&
        player.x < platforms[0].x + platforms[0].width &&
        platforms[0].y < player.y &&
        player.y < platforms[0].y + platforms[0].height
    ) {
        i = 0;
    }
    if (
        platforms[1].x < player.x &&
        player.x < platforms[1].x + platforms[1].width &&
        platforms[1].y < player.y &&
        player.y < platforms[1].y + platforms[1].height
    ) {
        i = 1;
    }
    if (i > -1) {
        player.jump = false;
        player.y = platforms[i].y;
    }

    renderCanvas();
    renderPlayer();
    renderPlatforms();
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 270;
canvas.width = 270;
createPlatforms();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
setInterval(gameLoop, 22);
