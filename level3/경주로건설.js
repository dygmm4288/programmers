/* function solution(board) {
    const n = board.length;
    const m = board[0].length;
    const cache = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => Infinity),
    );

    search([0, 0], [0, 0], cache, board);
    console.log(cache);
}
function search(here, parent, cache, board) {
    const [y, x] = here;
    if (y < 0 || y >= board.length || x < 0 || x >= board[0].length) {
        return Infinity;
    }
    if (board[y][x]) {
        return Infinity;
    }
    board[y][x] = 1;
    let ret = cache[y][x];
    if (ret !== Infinity) return ret;

    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = [dy[i] + y, dx[i] + x];
        ret = Math.min(
            ret,
            search([nextY, nextX], here, cache, board) +
                isCorner(parent, [nextY, nextX])
                ? 500
                : 100,
        );
    }

    return (cache[y][x] = ret);
}

function isCorner(parent, next) {
    const dy = Math.abs(parent[0] - next[0]);
    const dx = Math.abs(parent[1] - next[1]);
    return dy - dx === 0 ? true : false;
}

solution([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]);
 */

function solution(board) {
    // 너비 우선 탐색..
    const n = board.length;

    // [y][x][dir] = cost
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: n }, () =>
            Array.from({ length: 4 }, () => Infinity),
        ),
    );

    const q = [];
    for (let i = 0; i < 4; i++) {
        q.push([0, 0, i]);
        visited[0][0][i] = 0;
    }

    // 상좌하우
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    const ddir = [2, 3, 0, 1];
    const outRange = (y, x) => y < 0 || y >= n || x < 0 || x >= n;
    while (q.length) {
        const [y, x, dir] = q.shift();
        const cost = visited[y][x][dir];
        for (let i = 0; i < 4; i++) {
            const ny = dy[i] + y;
            const nx = dx[i] + x;
            const ndir = ddir[i];
            if (
                outRange(ny, nx) ||
                Math.abs(ndir - dir) === 2 ||
                board[ny][nx] === 1
            )
                continue;

            const ncost = cost + (dir === ndir ? 100 : 600);
            if (visited[ny][nx][ndir] > ncost) {
                console.log({ y, x, dir, cost, ny, nx, ndir, ncost });
                visited[ny][nx][ndir] = ncost;
                q.push([ny, nx, ndir]);
            }
        }
    }
    console.log(Math.min(...visited[n - 1][n - 1]));
}

solution([
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 1],
    [1, 0, 0, 0],
]);
