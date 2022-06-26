function solution(n, computers) {
    const visited = Array.from({ length: n }, () => false);

    // 깊이 우선 탐색을 실시한다. 모든 노드에 대해서
    let cnt = 0;
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, computers, visited);
            cnt++;
        }
    }
    console.log(cnt);
}

function dfs(here, adj, visited) {
    visited[here] = true;
    for (let there = 0; there < adj[here].length; there++) {
        if (!visited[there] && adj[here][there]) {
            dfs(there, adj, visited);
        }
    }
}

solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
]);
solution(3, [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
]);
