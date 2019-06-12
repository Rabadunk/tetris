function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }

    return matrix;
}


function rotateMatrix(matrix, dir) {
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