function solution(rows, columns, queries) {
    const board = Array.from({ length: rows + 1 }, (row, y) =>
        Array.from({ length: columns + 1 }, () => 0),
    );

    let count = 1;
    for (let y = 1; y <= rows; y++) {
        for (let x = 1; x <= columns; x++) {
            board[y][x] = count++;
        }
    }
    return queries.map((query) => {
        const origin = board.map((row) => row.map((col) => col));
        const [y1, x1, y2, x2] = query;
        let min = Infinity;

        //1
        for (let x = x1 + 1; x <= x2; x++) {
            board[y1][x] = origin[y1][x - 1];
            min = Math.min(min, origin[y1][x - 1]);
        }
        //2
        for (let y = y1 + 1; y <= y2; y++) {
            board[y][x2] = origin[y - 1][x2];
            min = Math.min(min, origin[y - 1][x2]);
        }
        //3
        for (let x = x2 - 1; x >= x1; x--) {
            board[y2][x] = origin[y2][x + 1];
            min = Math.min(min, origin[y2][x + 1]);
        }

        //4
        for (let y = y2 - 1; y >= y1; y--) {
            board[y][x1] = origin[y + 1][x1];
            min = Math.min(min, origin[y + 1][x1]);
        }
        return min;
    });
}
