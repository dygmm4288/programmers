function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;

    const inRange = (y, x) => y >= 0 && y < n && x >= 0 && x < m;

    const dy = [0, 0, -1, 1];
    const dx = [1, -1, 0, 0];
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => 0),
    );
    const q = [[0, 0]];
    visited[0][0] = 1;
    while (q.length) {
        const [y, x] = q.shift();
        for (let i = 0; i < 4; i++) {
            const nextY = y + dy[i];
            const nextX = x + dx[i];

            if (!inRange(nextY, nextX)) continue;

            if (visited[nextY][nextX] === 0 && maps[nextY][nextX] === 1) {
                visited[nextY][nextX] = visited[y][x] + 1;
                q.push([nextY, nextX]);
            }
        }
    }

    return visited[n - 1][m - 1] === 0 ? -1 : visited[n - 1][m - 1];
}

/* 이전코드
function solution(maps) {
    return search(maps);
}

function search(maps, y = 0, x = 0) {
    const n = maps.length - 1,
        m = maps[0].length - 1,
        dx = [0, 0, -1, 1],
        dy = [1, -1, 0, 0];
    const visited = Array.from({ length: n + 2 }, () =>
        Array.from({ length: m + 2 }, () => false),
    );
    const q = [new Node(y, x)];
    visited[y][x] = true;
    while (q.length !== 0) {
        const cur = q.shift();
        if (cur._x === m && cur._y === n) return cur._cnt;
        for (let i = 0; i < 4; i++) {
            const nextY = cur._y + dy[i],
                nextX = cur._x + dx[i];
            //보드판 안에 있다면..
            if (nextY <= n && nextY >= 0 && nextX <= m && nextX >= 0) {
                //방문하지 않았으면서 벽이 아닌 곳을 찾았으면
                if (maps[nextY][nextX] === 1 && !visited[nextY][nextX]) {
                    q.push(new Node(nextY, nextX, cur._cnt + 1));
                    visited[nextY][nextX] = true;
                }
            }
        }
    }
    return -1;
}
class Node {
    constructor(y, x, cnt = 1) {
        this._y = y;
        this._x = x;
        this._cnt = cnt;
    }
}
*/
