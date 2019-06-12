class Game 
{

    constructor()
    {
        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.arena = new Arena;
        this.player = new Player;
    }
    
    
    updateDropTime(deltaTime)
    {
        this.dropCounter += deltaTime;
        if(this.dropCounter > this.dropInterval) {
            this.autoDrop();
        }
    }


    autoDrop() {
        this.player.pos.y++;
    
        if(this.arena.collisionCheck(this.player)) {
            this.player.pos.y--;
            this.arena.merge(this.player);
            this.reset();
            this.arena.sweep(this.player);
            this.player.updateScore();
        }
    
        this.dropCounter = 0;
    }


    reset() {
        this.player.matrix = this.player.getRandomPiece();
        this.player.pos.y = 0;
        this.player.pos.x = (this.arena.matrix[0].length / 2 | 0) - (this.player.matrix[0].length /2 | 0);
    
        if (this.arena.collisionCheck(this.player)) {
            this.arena.matrix.forEach(row => row.fill(0));
            this.player.score = 0;
        }
    }

}