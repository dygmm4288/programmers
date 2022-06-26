function solution(m, n, board) {
    board = board.map((item) => item.split(''));
    let cnt = 0;
    let nextCnt = 0;
    while (true) {
        console.table(board);
        nextCnt = cnt + isSame(m, n, board);
        if (cnt === nextCnt) return cnt;
        cnt = nextCnt;
        swapBoard(board);
    }
}
function swap(y, x, ny, nx, board) {
    return ([board[ny][nx], board[y][x]] = [board[y][x], board[ny][nx]]);
}
function swapBoard(board) {
    const n = board[0].length;
    const m = board.length;
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m - 1; y++) {
            for (let ny = m - 1; ny > 0; ny--) {
                if (board[ny][x] === 0) swap(ny, x, ny - 1, x, board);
            }
        }
    }
    return board;
}
function isSame(m, n, board) {
    const dy = [0, 1, 1, 0];
    const dx = [1, 1, 0, 0];
    const inRange = (y, x) => y < 0 && y >= m && x < 0 && x >= n;
    let pointers = [];
    for (let y = 0; y < m - 1; y++) {
        for (let x = 0; x < n - 1; x++) {
            let flag = true;
            for (let i = 0; i < 3; i++) {
                const ny = dy[i] + y;
                const nx = dx[i] + x;
                if (inRange(ny, nx)) {
                    flag = false;
                    break;
                }
                if (board[y][x] === 0 || board[y][x] !== board[ny][nx]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                for (let i = 0; i < 4; i++) {
                    pointers.push([dy[i] + y, dx[i] + x]);
                }
            }
        }
    }
    let cnt = 0;
    pointers.forEach(([y, x]) => {
        if (board[y][x] !== 0) cnt++;
        board[y][x] = 0;
    });
    return cnt;
}
console.log(
    solution(8, 5, [
        'HGNHU',
        'CRSHV',
        'UKHVL',
        'MJHQB',
        'GSHOT',
        'MQMJJ',
        'AGJKK',
        'QULKK',
    ]),
);
