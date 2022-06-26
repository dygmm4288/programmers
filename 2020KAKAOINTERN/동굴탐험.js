class Queue {
    constructor() {
        this.queue = [];
        this.left = 0;
        this.right = 0;
    }
    push(value) {
        this.queue.push(value);
        this.right += 1;
    }
    pop() {
        this.left += 1;
        return this.queue[this.left - 1];
    }
    isEmpty() {
        return this.left === this.right;
    }
}

function solution(n, path, order) {
    const visited = Array.from({ length: n }, () => 0);
    const discovered = Array.from({ length: n }, () => 0);
    const finished = Array.from({ length: n }, () => false);
    const undir = Array.from({ length: n }, () => []);
    const dir = Array.from({ length: n }, () => []);

    path.forEach(([a, b]) => {
        undir[a].push(b);
        undir[b].push(a);
    });

    const q = new Queue();
    q.push(0);
    visited[0] = 1;

    while (!q.isEmpty()) {
        const here = q.pop();
        console.log({ here });
        visited[here] = 1;
        for (const next of undir[here]) {
            if (!visited[next]) {
                q.push(next);
                dir[here].push(next);
            }
        }
    }
    order.forEach(([a, b]) => dir[a].push(b));

    const stack = [0];
    let counter = 1;

    while (stack.length) {
        const here = stack.pop();
        console.log(here);
        if (finished[here]) continue;
        let finish = true;
        discovered[here] = counter++;
        stack.push(here);
        for (const next of dir[here]) {
            if (discovered[next] === 0) {
                stack.push(next);
                finish = false;
            } else if (!finished[next]) return false;
        }

        if (finish) {
            finished[here] = true;
        }
    }

    return true;
}

function dfs(here, counter, dir, discovered, finished) {
    discovered[here] = counter;

    let flag = true;
    for (const next of dir[here]) {
        if (discovered[next] === 0) {
            flag &= dfs(next, counter + 1, dir, discovered, finished);
        } else if (finished[next] === false) {
            return false;
        }
    }
    finished[here] = true;
    return flag;
}
const board = [
    [0, 1],
    [0, 3],
    [0, 7],
    [8, 1],
    [3, 6],
    [1, 2],
    [4, 7],
    [7, 5],
];
console.log(
    solution(9, board, [
        [8, 5],
        [6, 7],
        [4, 1],
    ]),
);
console.log(
    solution(9, board, [
        [4, 1],
        [8, 7],
        [6, 5],
    ]),
);
