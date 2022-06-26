/* 
    CEO : 1번 
    팀장 : 자손이 있으면,
    팀원 : 자손이 없으면

    팀장은 한 팀의 팀원이 될 수도 있지만 한 팀의 팀장이 될 수도 있다.
    -> 상호배타적 집합이 될 수 없음..
    너비 우선 탐색을 하면서 팀을 나누는게 좋을 것 같은데 

    팀을 나눈 다음에.. 완전탐색을 구현한다.
    1번부터 시작해서..
    각 조각마다 팀에서 한명을 선출한다 최종적으로 매출이 최소화 되는 모습이 되야 한다.

*/
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    enqueue(newValue) {
        const newNode = new Node(newValue);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        return this;
    }
    dequeue() {
        const value = this.head.value;
        this.head = this.head.next;
        return value;
    }
    isEmpty() {
        return this.head === null;
    }
}
function solution(sales, links) {
    const n = sales.length + 1;
    const adj = Array.from({ length: n }, () => []);
    const team = Array.from({ length: n }, () => []);
    links.forEach(([a, b]) => {
        adj[a].push(b);
    });

    const q = new Queue().enqueue(1);
    let visited = Array.from({ length: n }, () => false);
    visited[1] = true;
    const teamList = [];
    while (!q.isEmpty()) {
        let parent = q.dequeue();
        if (adj[parent].length) {
            teamList.push(parent);
        }
        for (const child of adj[parent]) {
            if (!visited[child]) {
                team[parent].push(child);
                q.enqueue(child);
            }
        }
    }
}
/* 
    각 팀이 주어지고 팀에서 한명씩 뽑을 때 구할 수 있는 최소 매출액은?
*/
function workshop() {
    // 기저사례 : 더이상 구할 팀이 없을 때
    if (null) {
    }

    let ret = Infinity;

    return ret;
}
solution(
    [14, 17, 15, 18, 19, 14, 13, 16, 28, 17],
    [
        [10, 8],
        [1, 9],
        [9, 7],
        [5, 4],
        [1, 5],
        [5, 10],
        [10, 6],
        [1, 3],
        [10, 2],
    ],
);
