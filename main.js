const tetris = new Tetris;


document.addEventListener('keydown', event => {
    if(event.keyCode === 37) {
        tetris.game.player.move(-1);
    } else if (event.keyCode === 39) {
        tetris.game.player.move(1);
    } else if (event.keyCode === 40) {
        teris.game.autoDrop();
    } else if (event.keyCode === 81) {
        teris.game.player.rotate(-1);
    } else if (event.keyCode === 87) {
        tetris.game.player.rotate(1);
    }
});


tetris.loop();