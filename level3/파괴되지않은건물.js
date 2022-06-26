function solution(board, skill) {
    const n = board.length;
    const m = board[0].length;
    const table = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => 0),
    );

    skill.forEach(([type, y1, x1, y2, x2, degree], i) => {
        const value = type === 1 ? -degree : degree;
        table[y1][x1] += value;
        if (y2 + 1 < n) table[y2 + 1][x1] += -value;
        if (x2 + 1 < m) table[y1][x2 + 1] += -value;
        if (y2 + 1 < n && x2 + 1 < m) table[y2 + 1][x2 + 1] += value;
    });
    for (let y = 0; y < n; y++) {
        for (let x = 1; x < m; x++) {
            table[y][x] += table[y][x - 1];
        }
    }
    for (let y = 1; y < n; y++) {
        for (let x = 0; x < m; x++) {
            table[y][x] += table[y - 1][x];
        }
    }
    let cnt = 0;

    for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
            if (board[y][x] + table[y][x] > 0) cnt++;
        }
    }
    return cnt;
}

solution(
    [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ],
    [
        [1, 1, 1, 2, 2, 4],
        [1, 0, 0, 1, 1, 2],
        [2, 2, 0, 2, 0, 100],
    ],
);
