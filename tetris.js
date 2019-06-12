const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);

const arena = new Arena;

const player = new Player;

let lastTime = 0;

function updateScore() {
    document.getElementById('score').innerText = player.score;
}

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    player.update(deltaTime);

    clearCanvas();
    draw();
    requestAnimationFrame(update);
}

function draw() {
    clearCanvas();
    drawMatrix(arena.matrix, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function clearCanvas() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.clientWidth, canvas.height)
}

function drawMatrix(matrix, offset) {

    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            
            value2 = (55 * Math.random() | 0) + 1;
            value3 = (55 * Math.random() | 0) + 1;

            if (value !== 0) {
                context.fillStyle = `rgb(
                    ${value - value2},
                    ${value - value3},
                    ${value})`;
                context.fillRect(x + offset.x, 
                    y + offset.y, 
                    1, 1);
            }
    
        });
    });

}

document.addEventListener('keydown', event => {
    if(event.keyCode === 37) {
        player.move(-1);
    } else if (event.keyCode === 39) {
        player.move(1);
    } else if (event.keyCode === 40) {
        player.drop();
    } else if (event.keyCode === 81) {
        player.rotate(-1);
    } else if (event.keyCode === 87) {
        player.rotate(1);
    }
});

player.reset();
updateScore();
update();
