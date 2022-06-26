/* 
    NxN 크기의 정사각 격자 형태의 자물쇠
    MxM 크기의 정사각 격자 형태의 열쇠
    
    자물쇠 영역을 벗어난 부분에 있는 열쇠의 홈과 돌기는
    자물쇠를 여는 데 영향을 주지 않는다
    영역 내에서는 열쇠의 돌기 부분과 자물쇠의 홈 부분이 정확히 일치해야한다.

    열쇠의 회전과 이동이 자유롭다.
*/

function solution(key, lock) {
    const m = key.length;
    const n = lock.length;
    const l = 2 * m + n;

    const board = Array.from({ length: l }, () =>
        Array.from({ length: l }, () => 0),
    );
    lock.forEach((line, y) =>
        line.forEach((value, x) => {
            board[m + y][m + x] = value;
        }),
    );

    for (let k = 0; k < 4; k++) {
        key = rotate(key);
        // 열쇠와 자물쇠가 맞물리면
        if (isMatch(key, board)) return true;
    }
    return false;
}
function isMatch(key, board) {
    const m = key.length;
    const n = board.length - 2 * m;
    const l = board.length;
    const keyline = key.reduce((a, c) => [...a, ...c], []);
    for (let y = 0; y < l - m; y++) {
        for (let x = 0; x < l - m; x++) {
            set(board, y, x, keyline, 1);
            if (check(board, m, n)) return true;
            set(board, y, x, keyline, -1);
        }
    }
    return false;
}
function set(board, startY, startX, keyline, delta) {
    const n = Math.sqrt(keyline.length);
    let next = 0;
    for (let y = startY; y < startY + n; y++) {
        for (let x = startX; x < startX + n; x++) {
            if (keyline[next++]) board[y][x] += delta;
        }
    }
}
function check(board, m, n) {
    const len = m + n;
    for (let y = m; y < len; y++) {
        for (let x = m; x < len; x++) {
            if (board[y][x] !== 1) return false;
        }
    }
    return true;
}
function rotate(key) {
    return key
        .reverse()
        .map((inside, i, outside) => inside.map((_, j) => outside[j][i]));
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
        정답코드
*/
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
                if (check(board, center, n)) return true;
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
