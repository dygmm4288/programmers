function solution(n, wires) {
    const adj = Array.from({ length: n + 1 }, () =>
        Array.from({ length: n + 1 }, () => 0),
    );

    wires.forEach(([a, b]) => {
        adj[a][b] = 1;
        adj[b][a] = 1;
    });
    let ret = Infinity;

    wires.forEach(([a, b]) => {
        adj[a][b] = 0;
        adj[b][a] = 0;

        const visited = Array.from({ length: n + 1 }, () => 0);

        const valueA = dfs(a, n, visited, adj);
        const valueB = dfs(b, n, visited, adj);
        const diff = Math.abs(valueA - valueB);
        ret = Math.min(diff, ret);

        adj[a][b] = 1;
        adj[b][a] = 1;
    });
    return ret;
}
function dfs(here, n, visited, adj) {
    visited[here] = true;
    let cnt = 0;
    for (let next = 1; next < adj[here].length; next++) {
        if (!adj[here][next]) continue;
        if (!visited[next]) {
            cnt += dfs(next, n, visited, adj) + 1;
        }
    }
    return cnt;
}
/* 이전코드
class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}
function degree(root, visited) {
    if (root.children.length === 0) return 1;
    const child = root.children;
    visited[root.value] = true;
    let cnt = 1;
    for (let i = 0; i < child.length; i++) {
        const there = child[i];
        if (!visited[there.value]) {
            visited[there.value] = true;
            cnt += degree(there, visited);
        }
    }
    return cnt;
}
function insert(node, newNode) {
    node.children.push(newNode);
    return node;
}
function erase(node, eraseNode) {
    node.children = node.children.filter((v) => v.value !== eraseNode.value);
    return node;
}
function getDegree(node, n) {
    const visited = Array.from({ length: n + 1 }, () => false);
    visited[node.value] = true;
    return degree(node, visited);
}
function solution(n, wires) {
    let ret = Infinity;

    const Nodes = Array.from({ length: n + 1 }, (v, i) => new Node(i));

    wires.forEach((wire) => {
        const [v1, v2] = wire;
        Nodes[v1] = insert(Nodes[v1], Nodes[v2]);
        Nodes[v2] = insert(Nodes[v2], Nodes[v1]);
    });

    wires.forEach((wire) => {
        const [v1, v2] = wire;
        Nodes[v1] = erase(Nodes[v1], Nodes[v2]);
        Nodes[v2] = erase(Nodes[v2], Nodes[v1]);

        const candi = Math.abs(
            getDegree(Nodes[v1], n) - getDegree(Nodes[v2], n),
        );

        ret = Math.min(ret, candi);

        Nodes[v1] = insert(Nodes[v1], Nodes[v2]);
        Nodes[v2] = insert(Nodes[v2], Nodes[v1]);
    });
    return ret;
}
*/
