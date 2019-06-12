class Player
{

    constructor()
    {
        this.pos = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;
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

    getRandomPiece() {
        const pieces = 'ILJOTSZ';
        let piecesNum = pieces.length * Math.random() | 0;
        let colorNum = 55 * Math.random() | 0;

        let piece = this.createPiece(pieces[piecesNum], colorNum + 201);
        console.log(piece);
        return piece;
    }

    updateScore() {
        document.getElementById('score').innerText = this.score;
    }
    

}

