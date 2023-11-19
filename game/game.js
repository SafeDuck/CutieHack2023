var player1 = createPlayer(100, 375, "#F08080");
var player2 = createPlayer(50, 375, "#80F080");

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

const levels = [
    [
        {
            "x": 10,
            "y": 450,
            "width": 200,
            "height": 15
        },
        {
            "x": 240,
            "y": 370,
            "width": 100,
            "height": 30
        },
        {
            "x": 400,
            "y": 430,
            "width": 100,
            "height": 30
        },
        {
            "x": 550,
            "y": 400,
            "width": 75,
            "height": 15
        },
        {
            "x": 700,
            "y": 450,
            "width": 150,
            "height": 15
        },
        {
            "x": 850,
            "y": 400,
            "width": 150,
            "height": 15
        },
    ],
];


function createPlatforms() {
    
    
}


function renderCanvas() {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, 1200, 500);
    ctx.fillRect(0, 0, 1200, 500);
}

function renderPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - 20, player.y - 20, player.width, player.height);
}

function renderPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color || "#45597E";
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

    // Allow jumping only if the player is on the ground
    if (upKey && !player.jump) {
        player.y_v = -jumpStrength;
        player.jump = true;
    }

    // Horizontal movement
    if (isGamepadConnected) {
        if (Math.abs(leftKey) > .1) {
            player.x_v = leftKey * 2.5;
        } else {
            player.x_v = 0;
        }
    } else {
        if (leftKey) {
            player.x_v = -2.5;
        }
        if (rightKey) {
            player.x_v = 2.5;
        }
    }

    // find platform that is below player and closest to player
    let closestPlatform = null;
    platforms.forEach(platform => {
        if (
            player.x > platform.x &&
            player.x < platform.x + platform.width + player.width &&
            player.y <= platform.y
        ) {
            if (closestPlatform === null) {
                closestPlatform = platform;
            } else if (platform.y < closestPlatform.y) {
                closestPlatform = platform;
            }
        }
    });

    // if player would fall through platform, move player to platform
    if (closestPlatform !== null) {
        closestPlatform.color = "#FF0000"
        if ((player.y + player.y_v) > closestPlatform.y) {
            player.y = closestPlatform.y;
            player.y_v = 0;
            player.jump = false;
        } else {
            player.y += player.y_v;
        }
    } else {
        player.y += player.y_v;
    }
    player.x += player.x_v;

    //if player would fall below canvas, respawn
    if(player.y > canvas.height){
        player.x = 100;
        player.y = 375;
    }

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
            player.y_v = 0;

        }
    });
}


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 1200;
canvas.height = 500;
canvas.width = 1200;
createPlatforms();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
setInterval(gameLoop, 22);