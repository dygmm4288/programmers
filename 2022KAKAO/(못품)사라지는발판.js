function solution(board, aloc, bloc) {
    const cache = Array.from({ length: 32 * Math.pow(5, 5) }, () => -1);
    console.log(play(board, aloc, bloc, true, cache));
}
function isFinished(board, aloc, bloc) {
    const n = board.length;
    const m = board[0].length;
    const isRange = ([y, x]) => y < n && y > -1 && x < m && x > -1;
    const onBoard = (y, x, loc) => loc[0] === y && loc[1] === x;

    // 범위를 벗어날 경우
    if (!isRange(aloc) || !isRange(bloc)) return true;
    // 플레이어가 같은 곳에 있을 경우
    if (aloc[0] === bloc[0] && aloc[1] === bloc[1]) return true;

    for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
            //빈 발판일 경우 a 혹은 b가 해당 발판 위에 있을 경우
            if (
                board[y][x] === 0 &&
                (onBoard(y, x, aloc) || onBoard(y, x, bloc))
            )
                return true;
        }
    }
    return false;
}
function mapFunc(board) {
    const n = board.length;
    const m = board[0].length;
    let ret = 0;
    for (let y = 0; y < n; y++) {
        ret *= 5;
        let binary = 0;
        for (let x = 0; x < m; x++) {
            if (board[y][x] === 1) binary |= 1 << x;
        }
        ret += binary;
    }
    return ret;
}
function locMapfunc(n, loc) {
    return loc[0] * n + loc[1];
}
function play(board, aloc, bloc, turn, cache) {
    if (isFinished(board, aloc, bloc)) {
        return 0;
    }
    console.log(mapFunc(board));
    let ret = cache[mapFunc(board)];

    if (ret !== -1) return ret;

    const dy = [-1, 1, 0, 0],
        dx = [0, 0, 1, -1];
    ret = 0;
    for (let i = 0; i < 4; i++) {
        let next_a = [...aloc];
        let next_b = [...bloc];
        if (turn) {
            // aloc
            board[aloc[0]][aloc[1]] = 0;
            next_a[0] += dy[i];
            next_a[1] += dx[i];
        } else {
            //bloc
            board[bloc[0]][bloc[1]] = 0;
            next_b[0] += dy[i];
            next_b[1] += dx[i];
        }
        console.log({next_a,next_b});
        ret = Math.max(play([...board], next_a, next_b, !turn, cache) + 1, ret);

        if (turn) {
            board[aloc[0]][aloc[1]] = 1;
        } else {
            board[bloc[0]][bloc[1]] = 1;
        }
    }

    return (cache[mapFunc(board)] = ret);
}
solution(
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ],
    [1, 0],
    [1, 2],
);

solution(
    [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
    ],
    [1, 0],
    [1, 2],
);

solution([[1, 1, 1, 1, 1]], [0, 0], [0, 4]);
solution([[1]], [0, 0], [0, 0]);
