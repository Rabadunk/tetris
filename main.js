const tetris = new Tetris;


document.addEventListener('keydown', event => {
    if(event.keyCode === 37) {
        tetris.game.move(-1);
    } else if (event.keyCode === 39) {
        tetris.game.move(1);
    } else if (event.keyCode === 40) {
        tetris.game.autoDrop();
    } else if (event.keyCode === 38) {
        tetris.game.rotate(1);
    } else if (event.keyCode == 32) {
        tetris.game.fullDrop();
    }
});


tetris.loop();