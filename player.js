class Player
{

    constructor()
    {

        this.dropCounter = 0;
        this.dropInterval = 1000;

        this.pos = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;

    }


    move(dir)
    {
        this.pos.x += dir;
        if(arena.collide(this)) {
            this.pos.x -= dir;
        };
    }

    rotate(dir) {
        const pos = this.pos.x;
        let offset = 1;
        
        rotateMatrix(this.matrix, dir);
        while(arena.collide(this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if(offset > this.matrix[0].length) {
                rotateMatrix(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    drop() {
        this.pos.y++;
    
        if(arena.collide(this)) {
            this.pos.y--;
            arena.merge(this);
            this.reset();
            arena.sweep();
            updateScore();
        }
    
        this.dropCounter = 0;
    }

    update(deltaTime)
    {
        this.dropCounter += deltaTime;
        if(this.dropCounter > this.dropInterval) {
            this.drop();
        }
    }

    reset() {
        const pieces = 'ILJOTSZ';
        let piecesNum = pieces.length * Math.random() | 0;
        let colorNum = 55 * Math.random() | 0;
        console.log(piecesNum);
        player.matrix = this.createPiece(pieces[piecesNum], colorNum + 201);
        player.pos.y = 0;
        player.pos.x = (arena.matrix[0].length / 2 | 0) - (player.matrix[0].length /2 | 0);
    
        if (arena.collide(this)) {
            arena.matrix.forEach(row => row.fill(0));
            player.score = 0;
        }
    }

    createPiece(type, c) {

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

}

