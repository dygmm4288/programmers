// 각 팀이 같은 곳을 다른 순서로 방문하도록 해서 먼저 순회를 마친
// 팀이 승리

// 방문할 곳의 2차원 좌표 값을 구하고
// 각 장소를 이진트리의 노드가 되도록 구성한 후
// 순회 방법을 힌트로 주어 각 팀이 스스로 경로를 찾도록 할 계획

// 트리 노드 구성 규칙
// 1. 트리를 구성하는 모든 노드의 x,y 좌표값은 정수이다.
//2.  모든 노드는 서로 다른 x값을 가진다.
//3. 같은 레벨에 있는 노드는 같은 y좌표를 가진다
//4. 자식노드이 y 값은 항상 부모 노드보다 작다
//5. 임의의 노드 v의 왼쪽 서브트리에 있는 모든 노드의 x값은
// V의 x 값보다 작다.
// 6. 임의 노드 v의 오른쪽 서브트리에 있는 모든 노드의 x값은
// V의 x값보다 크다.
class Node {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
    insert(node) {}
}
function solution(nodeinfo) {
    // 이진트리를 만드는게 중요한가
    // 어떻게 루트노드를 찾을 것인가?
    nodeinfo = nodeinfo.map((node, i) => new Node(...node, i + 1));
    nodeinfo.sort((a, b) => {
        if (a.y === b.y) return a.x - b.x;
        return b.y - a.y;
    });
}
solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
]);
