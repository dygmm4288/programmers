function solution(key, lock) {
    const n = lock.length;
    const m = key.length;
    const L = 2 * m + n;

    let board = Array.from({ length: L }, () =>
        Array.from({ length: L }, () => 0),
    );
    const setBoard = (board, keyLine, startY, startX, delta) => {
        const len = Math.sqrt(keyLine.length);
        let idx = 0;
        for (let y = startY; y < startY + len; y++) {
            for (let x = startX; x < startX + len; x++) {
                if (keyLine[idx++]) board[y][x] += delta;
            }
        }
        return board;
    };
    const center = m;
    const check = (board, center, n) => {
        const len = center + n;
        for (let y = center; y < len; y++) {
            for (let x = center; x < len; x++) {
                if (board[y][x] !== 1) return false;
            }
        }
        return true;
    };
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            board[center + y][center + x] = lock[y][x];
        }
    }

    for (let rot = 0; rot < 4; rot++) {
        key = rotate(key);
        const keyLine = key.reduce((a, c) => [...a, ...c], []);
        const len = L - m;
        for (let y = 0; y < len; y++) {
            for (let x = 0; x < len; x++) {
                board = setBoard(board, keyLine, y, x, 1);
                if (check(board, center, n)) {
                    return true;
                }
                board = setBoard(board, keyLine, y, x, -1);
            }
        }
    }
    return false;
}
function rotate(key) {
    const select = (idx) => (arr) => arr[idx];
    return key.reverse().map((v, index, outer) => outer.map(select(index)));
}
console.log(
    solution(
        [
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 1],
        ],
        [
            [1, 1, 1],
            [1, 1, 0],
            [1, 0, 1],
        ],
    ),
);
/* 
    정답 코드
    function solution(key, lock) {
    const N = lock.length;
    const M = key.length;
    const L = M*2 + N;
    let board = Array.from({ length: L }, () =>
        Array.from({ length: L }, () => 0)
    );
    const center = M;
    const check = (arr, center, len) => {
        for (let y = center; y < center + len; y++) {
            for (let x = center; x < center + len; x++) {
                if (arr[y][x] !== 1) return false;
            }
        }
        return true;
    };
    const setBoard = (board, keyline, startY, startX, delta) => {
        const len = Math.sqrt(keyline.length);
        let idx = 0;
        for (let y = startY; y < startY + len; y++) {
            for (let x = startX; x < startX + len; x++) {
                if (keyline[idx++]) board[y][x] += delta;
            }
        }
        return board;
    };
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            board[center + y][center + x] = lock[y][x];
        }
    }
    for (let rotation = 0; rotation < 4; rotation++) {
        key = rotate(key);
        let keyLine = key.reduce((a, c) => [...a, ...c], []);
        for (let y = 0, len = L - M; y < len; y++) {
            for (let x = 0; x < len; x++) {
                board = setBoard(board, keyLine, y, x, 1);
                if (check(board, center, N)) return true;
                board = setBoard(board, keyLine, y, x, -1);
            }
        }
    }
    return false;
}
function rotate(key) {
    const select = (index) => (arr) => arr[index];
    return [...key]
        .reverse()
        .map((v, index, outer) => outer.map(select(index)));
}
*/
