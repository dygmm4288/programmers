class Sets {
    constructor(n) {
        this.roots = Array.from({ length: n }, (_, i) => i);
    }
    find(a) {
        if (a === this.roots[a]) return a;
        return (this.roots[a] = this.find(this.roots[a]));
    }
    union(a, b) {
        a = this.find(a);
        b = this.find(b);
        if (a === b) return;
        this.roots[a] = b;
    }
}
function solution(land, height) {
    const n = land.length;
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => -1),
    );

    const dy = [0, 0, 1, -1];
    const dx = [-1, 1, 0, 0];
    const inRange = (y, x) => y >= 0 && y < n && x >= 0 && x < n;
    let area = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (visited[i][j] === -1) {
                const stack = [[i, j]];
                while (stack.length) {
                    const [y, x] = stack.pop();
                    visited[y][x] = area;
                    for (let i = 0; i < 4; i++) {
                        const nextY = y + dy[i];
                        const nextX = x + dx[i];

                        if (
                            inRange(nextY, nextX) &&
                            visited[nextY][nextX] === -1 &&
                            Math.abs(land[y][x] - land[nextY][nextX]) <= height
                        ) {
                            stack.push([nextY, nextX]);
                            visited[nextY][nextX] = area;
                        }
                    }
                }
                area++;
            }
        }
    }

    const edges = makeEdges(visited, land, area, inRange).sort(
        (a, b) => a[2] - b[2],
    );

    const sets = new Sets(area);

    let ret = 0;
    edges.forEach(([a, b, c]) => {
        const rootA = sets.find(a);
        const rootB = sets.find(b);
        if (rootA !== rootB) {
            ret += c;
            sets.union(a, b);
        }
    });
    console.log(ret);
    return ret;
}
function makeEdges(visited, land, area, inRange) {
    const n = land.length;
    const graph = Array.from({ length: area }, () => new Map());

    const dy = [0, 0, -1, 1];
    const dx = [1, -1, 0, 0];

    for (let y = 0; y < n; y++) {
        for (let x = y; x < n; x++) {
            for (let i = 0; i < 4; i++) {
                const nextY = y + dy[i];
                const nextX = x + dx[i];
                if (
                    inRange(nextY, nextX) &&
                    visited[nextY][nextX] !== visited[y][x]
                ) {
                    const a = visited[nextY][nextX];
                    const b = visited[y][x];
                    const diff = Math.abs(land[nextY][nextX] - land[y][x]);
                    if (!graph[a].has(b)) graph[a].set(b, Infinity);
                    graph[a].set(b, Math.min(graph[a].get(b), diff));
                }
            }
        }
    }

    const edges = [];
    for (let i = 0; i < area; i++) {
        if (graph[i].size !== 0) {
            graph[i].forEach((value, key) => {
                edges.push([i, key, value]);
            });
        }
    }
    return edges;
}
solution(
    [
        [1, 4, 8, 10],
        [5, 5, 5, 5],
        [10, 10, 10, 10],
        [10, 10, 10, 20],
    ],
    3,
);
