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

    move(dir)
    {
        this.player.pos.x += dir;
        if(this.arena.collisionCheck(this.player)) {
            this.player.pos.x -= dir;
        };
    }

    rotate(dir) {
        const pos = this.player.pos.x;
        let offset = 1;
        
        rotateMatrix(this.player.matrix, dir);
        while(this.arena.collisionCheck(this.player)) {
            this.player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if(offset > this.player.matrix[0].length) {
                rotateMatrix(this.player.matrix, -dir);
                this.player.pos.x = pos;
                return;
            }
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

    fullDrop() {
        this.player.pos.y++;
        while(!this.arena.collisionCheck(this.player)) {
            this.player.pos.y++;
        }

        this.player.pos.y--;
        this.arena.merge(this.player);
        this.reset();
        this.arena.sweep(this.player);
        this.player.updateScore();
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