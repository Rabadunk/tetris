class Tetris
{
    constructor() 
    {
        this.canvas = document.getElementById('tetris');
        this.context = this.canvas.getContext('2d');
        this.context.scale(20, 20);
        this.lastTime = 0;
        this.game = new Game
        this.game.reset();

        const update = (time = 0) => {
            const deltaTime = time - this.lastTime;
            this.lastTime = time;
        
            this.game.updateDropTime(deltaTime);
        
            this.clearCanvas();
            this.draw();
            requestAnimationFrame(update);
        }

        update();
    }

    draw() {
        this.clearCanvas();
        this.drawMatrix(this.game.arena.matrix, {x: 0, y: 0});
        this.drawMatrix(this.game.player.matrix, this.game.player.pos);
    }

    drawMatrix(matrix, offset) {

        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                
                let value2 = (55 * Math.random() | 0) + 1;
                let value3 = (55 * Math.random() | 0) + 1;
    
                if (value !== 0) {
                    this.context.fillStyle = `rgb(
                        ${value - value2},
                        ${value - value3},
                        ${value})`;
                    this.context.fillRect(x + offset.x, 
                        y + offset.y, 
                        1, 1);
                }
        
            });
        });
    
    }
    
    clearCanvas() {
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.height)
    }

    loop() {
        this.game.reset();
        this.game.player.updateScore();
    }
}
