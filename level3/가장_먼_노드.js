/* function solution(n, vertex) {
    // bfs를 사용하면 될 것 같은데 높이라는 변수를 가지고 있고 각 높이에 맞는 노드의 수배열에 저장해놓으면
    // 마지막 높이의 갯수를 반환하면 될 것 같은데

    let bestHeight = 0;
    // 쭉 일렬로 놓았다고 해서 height이 독립적으로 작용하는 것은 아니니까 ...
    // n으로 놓자
    // 쭉 일렬로 놓았을 때 n이 2<=n<=20000 이니까 최대 20000까지 나올 듯
    const heightArray = Array.from({ length: n + 1 }, () => []);
    // 일단 인접 행렬로 풀어보자 20000이니까 아마 할 만하지 않을까 인접행렬로 푸니까 시간초과되서 그냥 인접리스트?로 만듦
    const adj = Array.from({ length: n + 1 }, () => []);
    // 그래프를 만들어주고
    vertex.forEach((v) => {
        const [a, b] = v;
        adj[a].push(b);
        adj[b].push(a);
    });

    const distance = Array.from({ length: n + 1 }, () => -1);
    const q = [1];
    distance[1] = 1;

    // 1번 노드에서 가장 멀리 떨어진 노드를 찾는거니까 항상 1번 노드 부터 시작 하겠지?
    // 부모 노드의 정보를 가지고 이보다 1을 더해서 알아가는 게 좋을 것 같은데
    while (q.length !== 0) {
        const here = q.shift();
        for (let i = 0; i < adj[here].length; i++) {
            let there = adj[here][i];
            if (distance[there] === -1) {
                distance[there] = distance[here] + 1;
                bestHeight = Math.max(distance[there], bestHeight);
                heightArray[distance[there]].push(there);
                q.push(there);
            }
        }
    }
    return heightArray[bestHeight].length;
}

console.log(
    solution(6, [
        [3, 6],
        [4, 3],
        [3, 2],
        [1, 3],
        [1, 2],
        [2, 4],
        [5, 2],
    ]),
); */
/* 
    정답 코드
    function solution(n, edge) {
    const h = Array.from({ length: n + 1 }, () => 0);
    const visited = Array.from({ length: n + 1 }, () => false);
    const adj = Array.from({ length: n + 1 }, () => []);
    edge.forEach((e) => {
        const [here, next] = e;
        adj[here].push(next);
        adj[next].push(here);
    });
    let max = 0;
    const q = [1];
    h[1] = 1;
    visited[1] = true;
    while (q.length !== 0) {
        const here = q.shift();
        for (let i = 0, len = adj[here].length; i < len; i++) {
            const there = adj[here][i];
            if (!visited[there]) {
                q.push(there);
                h[there] = h[here] + 1;
                visited[there] = true;
                max = Math.max(max, h[there]);
            }
        }
    }
    return h.filter((v) => v === max).length;
}

*/

function solution(n, vertext) {
    const distance = Array.from({ length: n + 1 }, () => -1);
    let maxHeight = 0;
    const heightArray = Array.from({ length: n }, () => []);
    const adj = Array.from({ length: n + 1 }, () => []);

    vertext.forEach((v) => {
        const [a, b] = v;
        adj[a].push(b);
        adj[b].push(a);
    });

    const q = [1];
    distance[1] = 0;

    while (q.length !== 0) {
        const here = q.shift();
        for (let i = 0; i < adj[here].length; i++) {
            const there = adj[here][i];
            if (distance[there] === -1) {
                distance[there] = distance[here] + 1;
                maxHeight = Math.max(maxHeight, distance[there]);
                q.push(there);
                heightArray[distance[there]].push(there);
            }
        }
    }
    console.log(heightArray[maxHeight].length);
    return heightArray[maxHeight].length;
}
solution(6, [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
]);
