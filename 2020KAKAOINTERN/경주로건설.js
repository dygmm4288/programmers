function solution(board) {
    const n = board.length;
    // visited[dir][y][x]
    const visited = Array.from({ length: 4 }, () =>
        Array.from({ length: n }, () =>
            Array.from({ length: n }, () => Infinity),
        ),
    );

    const q = [];

    for (let i = 0; i < 4; i++) {
        q.push([0, 0, i]);
        visited[i][0][0] = 0;
    }

    // 상 우 하 좌
    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];
    const ddir = [2, 3, 0, 1];
    const outRange = (y, x) => y < 0 || y >= n || x < 0 || x >= n;

    while (q.length) {
        let [dir, y, x] = q.shift();
        const cost = visited[dir][y][x];
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

            const nCost = cost + (dir === ndir ? 100 : 500);
            if (visited[ny][nx][ndir] > nCost) {
                visited[ny][nx][ndir] = nCost;
                q.push([ny, nx, ndir]);
            }
        }
    }
    return Math.min(...visited[n - 1][n - 1]);
}
const boards = [
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 1],
        [1, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 1],
        [0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0],
    ],
];

boards.forEach((board) => console.log(solution(board)));
