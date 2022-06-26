/* 
    다익스트라를 반복하니까 효율성에서 통과를 못함.. .ㅜ

*/

/* class MinHeap {
    constructor() {
        this.heap = [null];
    }
    push(value) {
        this.heap.push(value);
        let cur = this.heap.length - 1;
        let parent = Math.floor(cur / 2);

        while (parent !== 0 && this.heap[parent] > value) {
            this._swap(cur, parent);
            cur = parent;
            parent = Math.floor(cur / 2);
        }
    }
    pop() {
        const returnValue = this.heap[1];
        if (this.heap.length === 2) return this.heap.pop();
        this.heap[1] = this.heap.pop();
        let cur = 1,
            left = 2,
            right = 3;

        while (
            (this.heap[left] && this.heap[cur] > this.heap[left]) ||
            (this.heap[right] && this.heap[cur] > this.heap[right])
        ) {
            if (this.heap[left] === undefined) {
                this._swap(cur, right);
                cur = right;
            } else if (this.heap[right] === undefined) {
                this._swap(cur, left);
                cur = left;
            } else if (this.heap[left] < this.heap[right]) {
                this._swap(cur, left);
                cur = left;
            } else if (this.heap[left] > this.heap[right]) {
                this._swap(cur, right);
                cur = right;
            }
            left = cur * 2;
            right = cur * 2 + 1;
        }
        return returnValue;
    }
    isEmpty() {
        return this.heap.length === 1;
    }
    _swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
}

function solution(n, s, a, b, fares) {
    const adj = Array.from({ length: n + 1 }, () => []);
    const dist = Array.from({ length: n + 1 }, () =>
        Array.from({ length: n + 1 }, () => Infinity),
    );

    fares.forEach(([c, d, f]) => {
        adj[c].push([d, f]);
        adj[d].push([c, f]);
    });

    // toA , toB
    const srcStart = calcDistance(s, adj, dist);
    const toA = srcStart[a];
    const toB = srcStart[b];
    let ret = toA + toB;

    for (let i = 1; i < n + 1; i++) {
        if (i !== s) {
            // mid , mid to  A, mid to  b
            if (srcStart[i] < ret) {
                const srcMid = 
                const midToA = srcMid[a];
                const midToB = srcMid[b];
                ret = Math.min(ret, midToA + midToB + srcStart[i]);
            }
        }
    }
    console.log(dist);
    console.log(ret);
    return ret;
}
function calcDistance(src, adj, dist) {
    dist[src][src] = 0;
    const heap = new MinHeap();

    heap.push({ node: src, cost: 0 });

    while (!heap.isEmpty()) {
        const { node: cur, cost: curCost } = heap.pop();
        for (const [dest, f] of adj[cur]) {
            const nextCost = curCost + f;
            if (nextCost < dist[src][dest]) {
                dist[src][dest] = nextCost;
                dist[dest][src] = nextCost;
                heap.push({ node: dest, cost: nextCost });
            }
        }
    }
    return dist[src];
}
solution(6, 4, 6, 2, [
    [4, 1, 10],
    [3, 5, 24],
    [5, 6, 2],
    [3, 1, 41],
    [5, 1, 24],
    [4, 6, 50],
    [2, 4, 66],
    [2, 3, 22],
    [1, 6, 25],
]); */

function solution(n, s, a, b, fares) {
    const N = n + 1;
    const adj = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => Infinity),
    );

    fares.forEach(([c, d, f]) => {
        adj[c][d] = f;
        adj[d][c] = f;
    });

    for (let i = 1; i < N; i++) adj[i][i] = 0;

    for (let k = 1; k < N; k++) {
        for (let i = 1; i < N; i++) {
            for (let j = 1; j < N; j++) {
                adj[i][j] = Math.min(adj[i][j], adj[i][k] + adj[k][j]);
            }
        }
    }
    let ret = adj[s][a] + adj[s][b];

    for (let i = 1; i < N; i++) {
        if (i !== s && adj[s][i] < ret) {
            ret = Math.min(ret, adj[s][i] + adj[i][a] + adj[i][b]);
        }
    }
    return ret;
}

solution(6, 4, 6, 2, [
    [4, 1, 10],
    [3, 5, 24],
    [5, 6, 2],
    [3, 1, 41],
    [5, 1, 24],
    [4, 6, 50],
    [2, 4, 66],
    [2, 3, 22],
    [1, 6, 25],
]);
