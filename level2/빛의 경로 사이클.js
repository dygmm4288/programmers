function solution(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => 0),
    );
    const ret = [];

    for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
            for (let d = 0; d < 4; d++) {
                if (!(visited[y][x] & (1 << d)))
                    ret.push(search(grid, y, x, d, visited));
            }
        }
    }

    return ret.sort((a, b) => a - b);
}
function search(grid, y, x, d, visited) {
    const n = grid.length;
    const m = grid[0].length;
    const dy = [-1, 0, 1, 0],
        dx = [0, 1, 0, -1];

    let cnt = 0;
    while (true) {
        if (!!(visited[y][x] & (1 << d))) break;

        cnt++;
        visited[y][x] |= 1 << d;
        if (grid[y][x] === 'R') {
            d = (d + 3) % 4;
        } else if (grid[y][x] === 'L') {
            d = (d + 1) % 4;
        }

        y = (y + dy[d] + n) % n;
        x = (x + dx[d] + m) % m;
    }
    return cnt;
}
