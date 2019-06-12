const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if(arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}


function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos]

    for(let y = 0; y < m.length; ++y) {

        for(let x = 0; x < m[y].length; ++x) {

            if (m[y][x] !== 0 && 
                (arena[y + o.y] && 
                arena[y + o.y][x + o.x]) !== 0){
                    return true;
                }

        }
    }

    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }

    return matrix;
}

function createPiece(type, c) {

    if (type === 'T') {
        return [
            [0, 0, 0],
            [c, c, c],
            [0, c, 0]
        ];
    } else if (type == 'O') {
        return [
            [0, 0, 0],
            [0, c, c],
            [0, c, c]
        ]
    } else if (type == 'L') {
        return [
            [0, c, 0],
            [0, c, 0],
            [0, c, c]
        ]
    } else if (type == 'J') {
        return [
            [0, c, 0],
            [0, c, 0],
            [c, c, 0]
        ]
    } else if (type == 'I') {
        return [
            [0, c, 0, 0],
            [0, c, 0, 0],
            [0, c, 0, 0],
            [0, c, 0, 0]
        ]
    } else if (type == 'Z') {
        return [
            [0, 0, 0],
            [c, c, 0],
            [0, c, c]
        ]
    } else if (type == 'S') {
        return [
            [0, 0, 0],
            [0, c, c],
            [c, c, 0]
        ]
    }
}

const arena = createMatrix(12, 20);

const player = new Player;


function merge(arena, player) {

    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}



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
    drawMatrix(arena, {x: 0, y: 0});
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


function rotate(matrix, dir) {
    for(let y = 0; y < matrix.length; ++y) {
        
        for(let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]
            ];
        }
    }

    if(dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
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
