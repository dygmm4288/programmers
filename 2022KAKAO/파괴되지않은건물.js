function solution(board, skill) {
    const n = board.length;
    const m = board[0].length;

    const next_board = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => 0),
    );

    skill.forEach(([type, r1, c1, r2, c2, degree]) => {
        const value = type === 1 ? -degree : degree;

        next_board[r1][c1] += value;
        // 우측 상단
        if (c2 + 1 < m) next_board[r1][c2 + 1] -= value;
        // 좌측 하단
        if (r2 + 1 < n) next_board[r2 + 1][c1] -= value;
        // 우측 하단
        if (r2 + 1 < n && c2 + 1 < m) next_board[r2 + 1][c2 + 1] += value;
    });
    let cnt = 0;
    for (let y = 0; y < n; y++) {
        for (let x = 1; x < m; x++) {
            next_board[y][x] += next_board[y][x - 1];
        }
    }
    for (let x = 0; x < m; x++) {
        for (let y = 1; y < n; y++) {
            next_board[y][x] += next_board[y - 1][x];
            if (board[y][x] + next_board[y][x] > 0) cnt++;
        }
    }
    for (let x = 0; x < m; x++) {
        if (board[0][x] + next_board[0][x] > 0) cnt++;
    }
    return cnt;
}

solution(
    [
        [5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5],
    ],
    [
        [1, 0, 0, 3, 4, 4],
        [1, 2, 0, 2, 3, 2],
        [2, 1, 0, 3, 1, 2],
        [1, 0, 1, 3, 3, 1],
    ],
);

/* 
    정답코드
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
            if(board[y][x] + table[y][x] > 0) cnt++;
        }
    }
    return cnt;
}

*/
